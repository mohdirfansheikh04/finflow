// ─────────────────────────────────────────────────────────────
//  FinFlow — Balance Trend Chart
//  src/components/dashboard/BalanceTrendChart.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts"
import { useTransactions } from "../../context/TransactionContext"

const TABS = ["6M", "1Y", "All"]

// ─── Tooltip ──────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2.5 text-xs"
      style={{
        background:   "#1c1d3c",
        border:       "1px solid rgba(255,255,255,0.10)",
        borderRadius: "8px",
      }}
    >
      <p className="text-[#9091b0] mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name === "balance" ? "Balance" : "Income"}: $
          {Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  const [activeTab, setActiveTab] = useState("6M")
  const { monthlySummary }        = useTransactions()

  const data = useMemo(() => {
    const months = {
      "6M": 6,
      "1Y": 12,
      "All": monthlySummary.length,
    }
    const slice   = monthlySummary.slice(-months[activeTab])
    let running   = 68000

    return slice.map((m) => {
      running += m.net
      const [year, mon] = m.month.split("-")
      const label = new Date(Number(year), Number(mon) - 1).toLocaleString("en-US", {
        month: "short",
      })
      return {
        month:   label,
        balance: Math.round(running),
        income:  Math.round(m.income),
      }
    })
  }, [monthlySummary, activeTab])

  const peak = useMemo(
    () => data.reduce((a, b) => (b.balance > a.balance ? b : a), data[0] ?? {}),
    [data]
  )

  return (
    <div
      className="p-5"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4]">Balance Trend</p>
          <p className="text-xs text-[#9091b0] mt-0.5">6-month overview</p>
        </div>

        {/* Tab switcher */}
        <div
          className="flex items-center rounded-lg overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab
                  ? "bg-[#5a52db] text-white"
                  : "text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ background: "#8f87f2", display: "inline-block" }} />
          <span className="text-xs text-[#9091b0]">Balance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ background: "#1dbd8f", display: "inline-block", borderTop: "2px dashed #1dbd8f", height: 0 }} />
          <span className="text-xs text-[#9091b0]">Income</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#5a52db" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5a52db" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1dbd8f" stopOpacity={0.20} />
              <stop offset="100%" stopColor="#1dbd8f" stopOpacity={0.00} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#9091b0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9091b0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />

          {/* Peak label */}
          {peak?.month && (
            <ReferenceDot
              x={peak.month}
              y={peak.balance}
              r={4}
              fill="#5a52db"
              stroke="#fff"
              strokeWidth={1.5}
              label={{
                value:    `$${(peak.balance / 1000).toFixed(0)}k`,
                position: "top",
                fill:     "#e8e9f4",
                fontSize: 11,
                fontWeight: 600,
              }}
            />
          )}

          <Area
            type="monotone"
            dataKey="income"
            stroke="#1dbd8f"
            strokeWidth={1.5}
            strokeDasharray="4 3"
            fill="url(#incomeGrad)"
            dot={false}
            name="income"
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#8f87f2"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#8f87f2", stroke: "#fff", strokeWidth: 1.5 }}
            name="balance"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}