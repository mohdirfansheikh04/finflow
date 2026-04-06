// ─────────────────────────────────────────────────────────────
//  FinFlow — Upcoming Bills
//  src/components/insights/UpcomingBills.jsx
// ─────────────────────────────────────────────────────────────
import { useMemo }         from "react"
import { useNavigate }     from "react-router-dom"
import { CalendarClock, Plus } from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"
import { getCategoryById } from "../../constants/categories"
import { ROUTES }          from "../../constants/routes"

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style:                 "currency",
    currency:              "USD",
    minimumFractionDigits: 2,
  }).format(n)
}

// ─── Single bill row ──────────────────────────────────────────
function BillRow({ txn }) {
  const cat = getCategoryById(txn.category)

  // Estimate next due date (same day next month)
  const lastDate = new Date(txn.date)
  const nextDue  = new Date(lastDate)
  nextDue.setMonth(nextDue.getMonth() + 1)
  const dueSoon  = nextDue - new Date() < 7 * 24 * 60 * 60 * 1000 // within 7 days

  const dueDateStr = nextDue.toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
  })

  return (
    <div
      className="flex items-center gap-3 py-2.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Category icon */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
        style={{ background: cat.bg }}
      >
        {cat.icon}
      </div>

      {/* Name + due date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#e8e9f4] leading-none truncate">
          {txn.description}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <CalendarClock size={10} className="text-[#9091b0]" />
          <p className="text-[11px] text-[#9091b0] leading-none">
            Due {dueDateStr}
          </p>
          {dueSoon && (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-none"
              style={{
                background: "rgba(240,160,48,0.15)",
                color:      "#f0a030",
              }}
            >
              Soon
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <span className="text-sm font-semibold text-[#e05c6b] shrink-0 tabular-nums">
        -{fmt(txn.amount)}
      </span>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <CalendarClock size={18} className="text-[#9091b0]" />
      </div>
      <div>
        <p className="text-sm font-medium text-[#9091b0] leading-none">
          Not enough data
        </p>
        <p className="text-xs text-[#5a5b80] mt-1 leading-snug">
          Add recurring transactions to<br />see upcoming bills
        </p>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function UpcomingBills() {
  const { transactions } = useTransactions()
  const navigate = useNavigate()

  // Deduplicate recurring expenses — one entry per unique description
  const bills = useMemo(() => {
    const seen = new Set()
    return transactions
      .filter((t) => t.type === "expense" && t.isRecurring)
      .filter((t) => {
        if (seen.has(t.description)) return false
        seen.add(t.description)
        return true
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4)
  }, [transactions])

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
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4] leading-none">
            Upcoming Bills
          </p>
          <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
            Recurring expenses
          </p>
        </div>
        {bills.length > 0 && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(90,82,219,0.15)",
              color:      "#8f87f2",
            }}
          >
            {bills.length} due
          </span>
        )}
      </div>

      {/* Bill rows or empty state */}
      {bills.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {bills.map((t) => (
            <BillRow key={t.id} txn={t} />
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate(ROUTES.ADD_TRANSACTION)}
        className="w-full mt-4 h-8 rounded-lg text-xs font-medium transition-all hover:bg-[rgba(90,82,219,0.10)] active:scale-[0.98] flex items-center justify-center gap-1.5"
        style={{
          color:  "#8f87f2",
          border: "1px solid rgba(90,82,219,0.25)",
        }}
      >
        <Plus size={12} />
        Add Recurring
      </button>
    </div>
  )
}