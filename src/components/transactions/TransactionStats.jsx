// ─────────────────────────────────────────────────────────────
//  FinFlow — Transaction Stats (top 4 cards)
//  src/components/transactions/TransactionStats.jsx
// ─────────────────────────────────────────────────────────────
import { AlignLeft, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(n))
}

export default function TransactionStats() {
  const { transactions, currentMonthIncome, currentMonthExpenses, currentMonthNet } =
    useTransactions()

  const cards = [
    {
      label:    "Total Transactions",
      value:    transactions.length,
      icon:     <AlignLeft size={16} />,
      iconBg:   "rgba(90,82,219,0.15)",
      iconColor:"#8f87f2",
      plain:    true,
    },
    {
      label:    "Total Income",
      value:    `+${fmt(currentMonthIncome)}`,
      icon:     <TrendingUp size={16} />,
      iconBg:   "rgba(29,189,143,0.15)",
      iconColor:"#1dbd8f",
      valueColor:"#1dbd8f",
    },
    {
      label:    "Total Expenses",
      value:    `-${fmt(currentMonthExpenses)}`,
      icon:     <TrendingDown size={16} />,
      iconBg:   "rgba(224,92,107,0.15)",
      iconColor:"#e05c6b",
      valueColor:"#e05c6b",
    },
    {
      label:     "Net Balance",
      value:     `+${fmt(currentMonthNet)}`,
      icon:      <Plus size={16} />,
      iconBg:    "rgba(90,82,219,0.15)",
      iconColor: "#8f87f2",
      valueColor:"#8f87f2",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="p-4 flex items-center gap-3"
          style={{
            background:   "#171830",
            border:       "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: c.iconBg, color: c.iconColor }}
          >
            {c.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-[#9091b0] font-medium uppercase tracking-wide leading-none truncate">
              {c.label}
            </p>
            <p
              className="text-lg font-bold mt-1 leading-none truncate"
              style={{ color: c.plain ? "#e8e9f4" : c.valueColor }}
            >
              {c.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}