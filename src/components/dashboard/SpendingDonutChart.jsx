// ─────────────────────────────────────────────────────────────
//  FinFlow — Spending Donut Chart
//  src/components/dashboard/SpendingDonutChart.jsx
// ─────────────────────────────────────────────────────────────
import { useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useTransactions } from "../../context/TransactionContext"
import { getCategoryById, SPENDING_ORDER } from "../../constants/categories"

// ─── Custom tooltip ───────────────────────────────────────────
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div
      className="px-3 py-2 text-xs"
      style={{
        background:   "#1c1d3c",
        border:       "1px solid rgba(255,255,255,0.10)",
        borderRadius: "8px",
      }}
    >
      <p className="text-[#9091b0]">{d.name}</p>
      <p className="font-semibold mt-0.5" style={{ color: d.payload.color }}>
        ${Number(d.value).toLocaleString()} ({d.payload.pct}%)
      </p>
    </div>
  )
}

// ─── Centre label ─────────────────────────────────────────────
function CentreLabel({ total }) {
  return (
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
      <tspan
        x="50%"
        dy="-6"
        style={{ fill: "#e8e9f4", fontSize: 18, fontWeight: 700 }}
      >
        ${(total / 1000).toFixed(1)}k
      </tspan>
      <tspan
        x="50%"
        dy="18"
        style={{ fill: "#9091b0", fontSize: 10 }}
      >
        Total Spent
      </tspan>
    </text>
  )
}

export default function SpendingDonutChart() {
  const { expensesByCategory } = useTransactions()

  const { data, total } = useMemo(() => {
    const total = Object.values(expensesByCategory).reduce((s, v) => s + v, 0) || 1
    const data  = SPENDING_ORDER
      .filter((id) => expensesByCategory[id] > 0)
      .map((id) => {
        const cat = getCategoryById(id)
        const val = expensesByCategory[id] ?? 0
        return {
          name:  cat.label,
          value: Math.round(val),
          color: cat.color,
          pct:   Math.round((val / total) * 100),
        }
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    return { data, total }
  }, [expensesByCategory])

  return (
    <div
      className="p-5 flex flex-col"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#e8e9f4]">Spending</p>
        <p className="text-xs text-[#9091b0] mt-0.5">By category · June</p>
      </div>

      {/* Donut */}
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
              <CentreLabel total={total} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: d.color }}
              />
              <span className="text-xs text-[#9091b0]">{d.name}</span>
            </div>
            <span className="text-xs font-medium text-[#e8e9f4]">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}