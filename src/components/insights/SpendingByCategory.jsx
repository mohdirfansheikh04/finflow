// ─────────────────────────────────────────────────────────────
//  FinFlow — Spending By Category
//  src/components/insights/SpendingByCategory.jsx
// ─────────────────────────────────────────────────────────────
import { useMemo }         from "react"
import { useNavigate }     from "react-router-dom"
import { ArrowRight }      from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"
import { getCategoryById, SPENDING_ORDER } from "../../constants/categories"
import { ROUTES }          from "../../constants/routes"

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 0,
  }).format(n)
}

// ─── Single category row ──────────────────────────────────────
function CategoryRow({ cat, amount, pct, maxPct }) {
  // Bar width relative to the highest-spending category
  const barWidth = maxPct > 0 ? (pct / maxPct) * 100 : 0

  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
        style={{ background: cat.bg }}
      >
        {cat.icon}
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-[#e8e9f4] leading-none">
            {cat.label}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-semibold text-[#e8e9f4] tabular-nums">
              {fmt(amount)}
            </span>
            <span
              className="text-xs font-semibold w-10 text-right tabular-nums"
              style={{ color: cat.color }}
            >
              {pct.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width:      `${barWidth}%`,
              background: cat.color,
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Exported component ───────────────────────────────────────
export default function SpendingByCategory() {
  const { expensesByCategory, currentMonthExpenses } = useTransactions()
  const navigate = useNavigate()

  const rows = useMemo(() => {
    const total = currentMonthExpenses || 1
    return SPENDING_ORDER
      .filter((id) => (expensesByCategory[id] ?? 0) > 0)
      .map((id) => {
        const cat    = getCategoryById(id)
        const amount = expensesByCategory[id] ?? 0
        const pct    = (amount / total) * 100
        return { cat, amount, pct }
      })
      .sort((a, b) => b.amount - a.amount)
  }, [expensesByCategory, currentMonthExpenses])

  const maxPct = rows[0]?.pct ?? 100

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
          <p className="text-sm font-semibold text-[#e8e9f4]">Spending by Category</p>
          <p className="text-xs text-[#9091b0] mt-0.5">June 2025 breakdown</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.TRANSACTIONS)}
          className="flex items-center gap-1 text-xs font-medium text-[#8f87f2] hover:text-[#a49ef5] transition-colors shrink-0"
        >
          View Transactions <ArrowRight size={12} />
        </button>
      </div>

      {/* Rows */}
      <div className="mt-3">
        {rows.length === 0 ? (
          <p className="text-sm text-[#9091b0] text-center py-8">
            No expense data for this period
          </p>
        ) : (
          rows.map(({ cat, amount, pct }) => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              amount={amount}
              pct={pct}
              maxPct={maxPct}
            />
          ))
        )}
      </div>
    </div>
  )
}