// ─────────────────────────────────────────────────────────────
//  FinFlow — Income vs Expenses Chart
//  src/components/insights/IncomeExpensesChart.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useMemo } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { useTransactions } from "../../context/TransactionContext"

// ─── Custom tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2.5 text-xs min-w-40"
      style={{
        background:   "#1c1d3c",
        border:       "1px solid rgba(255,255,255,0.10)",
        borderRadius: "8px",
      }}
    >
      <p className="text-[#9091b0] font-medium mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-[#9091b0] capitalize">{p.name}</span>
          </div>
          <span className="font-semibold" style={{ color: p.color }}>
            ${Number(p.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Custom legend ────────────────────────────────────────────
function ChartLegend({ chartType }) {
  const items = [
    { color: "#7169ea", label: "Income"      },
    { color: "#e05c6b", label: "Expenses"    },
    { color: "#1dbd8f", label: "Net Savings", dashed: true },
  ]
  return (
    <div className="flex items-center gap-4">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5">
          {i.dashed ? (
            <svg width="20" height="10" viewBox="0 0 20 10">
              <line
                x1="0" y1="5" x2="20" y2="5"
                stroke={i.color} strokeWidth="1.5"
                strokeDasharray="4 2"
              />
            </svg>
          ) : (
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: i.color }}
            />
          )}
          <span className="text-xs text-[#9091b0]">{i.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Summary row ──────────────────────────────────────────────
function SummaryRow({ data }) {
  const totIncome  = data.reduce((s, d) => s + d.income,   0)
  const totExpense = data.reduce((s, d) => s + d.expenses, 0)
  const totNet     = totIncome - totExpense

  const items = [
    { label: "6M Total Income",   value: `$${(totIncome  / 1000).toFixed(1)}k`, color: "#e8e9f4" },
    { label: "6M Total Expenses", value: `$${(totExpense / 1000).toFixed(1)}k`, color: "#e05c6b" },
    { label: "6M Net Savings",    value: `+$${(totNet    / 1000).toFixed(1)}k`, color: "#1dbd8f" },
  ]

  return (
    <div className="flex items-center gap-6 mt-2">
      {items.map((i) => (
        <div key={i.label}>
          <p className="text-[11px] text-[#9091b0] leading-none">{i.label}</p>
          <p className="text-sm font-bold mt-0.5 leading-none" style={{ color: i.color }}>
            {i.value}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function IncomeExpensesChart() {
  const [chartType, setChartType] = useState("Bar") // "Bar" | "Line"
  const { monthlySummary } = useTransactions()

  // Last 6 months
  const data = useMemo(() => {
    return monthlySummary.slice(-6).map((m) => {
      const [year, mon] = m.month.split("-")
      const label = new Date(Number(year), Number(mon) - 1).toLocaleString("en-US", {
        month: "short",
      })
      return {
        month:    label,
        income:   Math.round(m.income),
        expenses: Math.round(m.expenses),
        net:      Math.round(m.net),
      }
    })
  }, [monthlySummary])

  return (
    <div
      className="p-5"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4]">Income vs Expenses</p>
          <p className="text-xs text-[#9091b0] mt-0.5">
            Grouped comparison · Last 6 months
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Legend */}
          <ChartLegend chartType={chartType} />

          {/* Bar / Line toggle */}
          <div
            className="flex items-center rounded-lg overflow-hidden ml-2"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {["Bar", "Line"].map((t) => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={[
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  chartType === t
                    ? "bg-[#5a52db] text-white"
                    : "text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary totals */}
      <SummaryRow data={data} />

      {/* ── Chart ──────────────────────────────────────────── */}
      <div className="mt-5">
        <ResponsiveContainer width="100%" height={280}>
          {chartType === "Bar" ? (
            <ComposedChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
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
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />

              {/* Income bars */}
              <Bar
                dataKey="income"
                name="income"
                fill="#7169ea"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                fillOpacity={0.9}
              />

              {/* Expense bars */}
              <Bar
                dataKey="expenses"
                name="expenses"
                fill="#e05c6b"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                fillOpacity={0.85}
              />

              {/* Net savings line */}
              <Line
                type="monotone"
                dataKey="net"
                name="net savings"
                stroke="#1dbd8f"
                strokeWidth={1.5}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 4, fill: "#1dbd8f", stroke: "#fff", strokeWidth: 1.5 }}
              />
            </ComposedChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#7169ea" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#7169ea" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="expenseGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#e05c6b" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#e05c6b" stopOpacity={0.02} />
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
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)" }} />

              <Area
                type="monotone"
                dataKey="income"
                name="income"
                stroke="#7169ea"
                strokeWidth={2}
                fill="url(#incomeGrad2)"
                dot={false}
                activeDot={{ r: 4, fill: "#7169ea", stroke: "#fff", strokeWidth: 1.5 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="expenses"
                stroke="#e05c6b"
                strokeWidth={2}
                fill="url(#expenseGrad2)"
                dot={false}
                activeDot={{ r: 4, fill: "#e05c6b", stroke: "#fff", strokeWidth: 1.5 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}