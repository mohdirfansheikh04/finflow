// ─────────────────────────────────────────────────────────────
//  FinFlow — Quick Actions + Budget Progress
//  src/components/dashboard/QuickActions.jsx
// ─────────────────────────────────────────────────────────────
import { useNavigate }     from "react-router-dom"
import { PlusCircle, ArrowLeftRight, TrendingUp, Settings } from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"
import { ROUTES }          from "../../constants/routes"

function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

// ─── Quick Actions ─────────────────────────────────────────────
export function QuickActions() {
  const navigate = useNavigate()

  const actions = [
    {
      label:   "Add Txn",
      icon:    <PlusCircle size={20} />,
      path:    ROUTES.ADD_TRANSACTION,
      primary: true,
    },
    {
      label:   "Transfer",
      icon:    <ArrowLeftRight size={20} />,
      path:    ROUTES.TRANSACTIONS,
      primary: false,
    },
    {
      label:   "Insights",
      icon:    <TrendingUp size={20} />,
      path:    ROUTES.INSIGHTS,
      primary: false,
    },
    {
      label:   "Settings",
      icon:    <Settings size={20} />,
      path:    ROUTES.SETTINGS,
      primary: false,
    },
  ]

  return (
    <div
      className="p-5"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <p className="text-sm font-semibold text-[#e8e9f4] mb-3">Quick Actions</p>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: a.primary
                ? "rgba(90,82,219,0.20)"
                : "rgba(255,255,255,0.04)",
              border: a.primary
                ? "1px solid rgba(90,82,219,0.35)"
                : "1px solid rgba(255,255,255,0.06)",
              color: a.primary ? "#8f87f2" : "#9091b0",
            }}
          >
            {a.icon}
            <span className="text-xs font-medium">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Budget Progress ───────────────────────────────────────────
export function BudgetProgress() {
  const { budgetProgress } = useTransactions()

  // Show top 3 only on dashboard
  const items = budgetProgress.slice(0, 3)

  return (
    <div
      className="p-5"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <p className="text-sm font-semibold text-[#e8e9f4] mb-4">Budget Progress</p>

      <div className="space-y-4">
        {items.map((item) => {
          const over = item.percent >= 100
          const warn = item.percent >= 80 && !over

          const barColor = over ? "#e05c6b" : warn ? "#f0a030" : item.color

          return (
            <div key={item.category}>
              {/* Label row */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-[#e8e9f4]">{item.label}</span>
                <span className="text-xs text-[#9091b0]">
                  {formatCurrency(item.spent)} / {formatCurrency(item.limit)}
                </span>
              </div>

              {/* Bar */}
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width:      `${Math.min(item.percent, 100)}%`,
                    background: barColor,
                  }}
                />
              </div>

              {/* Over-budget warning */}
              {over && (
                <p className="text-[10px] text-[#e05c6b] mt-1">Over budget</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}