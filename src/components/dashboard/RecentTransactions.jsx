// ─────────────────────────────────────────────────────────────
//  FinFlow — Recent Transactions (Dashboard)
//  src/components/dashboard/RecentTransactions.jsx
// ─────────────────────────────────────────────────────────────
import { useNavigate } from "react-router-dom"
import { ArrowRight }  from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"
import { getCategoryById } from "../../constants/categories"
import { ROUTES }          from "../../constants/routes"

function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n)
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// ─── Single row ───────────────────────────────────────────────
function TxnRow({ txn }) {
  const cat    = getCategoryById(txn.category)
  const isIncome = txn.type === "income"

  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Category icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
        style={{ background: cat.bg }}
      >
        {cat.icon}
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#e8e9f4] truncate leading-none">
          {txn.description}
        </p>
        <p className="text-xs text-[#9091b0] mt-0.5 leading-none truncate">
          {formatDate(txn.date)} · {txn.subtitle?.split("·")[0]?.trim()}
        </p>
      </div>

      {/* Amount + badge */}
      <div className="text-right shrink-0">
        <p
          className="text-sm font-semibold leading-none"
          style={{ color: isIncome ? "#1dbd8f" : "#e05c6b" }}
        >
          {isIncome ? "+" : "-"}{formatCurrency(txn.amount)}
        </p>
        <span
          className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1"
          style={{
            background: isIncome ? "rgba(29,189,143,0.12)" : `${cat.bg}`,
            color:      isIncome ? "#1dbd8f"               : cat.color,
          }}
        >
          {isIncome ? "Income" : cat.label}
        </span>
      </div>
    </div>
  )
}

// ─── Exported component ───────────────────────────────────────
export default function RecentTransactions() {
  const { recentTransactions } = useTransactions()
  const navigate = useNavigate()

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
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4]">Recent Transactions</p>
          <p className="text-xs text-[#9091b0] mt-0.5">Last 5 transactions</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.TRANSACTIONS)}
          className="flex items-center gap-1 text-xs font-medium text-[#8f87f2] hover:text-[#a49ef5] transition-colors"
        >
          View All <ArrowRight size={12} />
        </button>
      </div>

      {/* List */}
      <div className="mt-2">
        {recentTransactions.map((txn) => (
          <TxnRow key={txn.id} txn={txn} />
        ))}
      </div>
    </div>
  )
}