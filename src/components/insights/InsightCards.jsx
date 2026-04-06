// ─────────────────────────────────────────────────────────────
//  FinFlow — Insight Cards (4 top metrics)
//  src/components/insights/InsightCards.jsx
// ─────────────────────────────────────────────────────────────
import { useMemo } from "react"
import { Home, TrendingDown, ArrowUpCircle, Calendar } from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"
import { getCategoryById } from "../../constants/categories"

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2,
  }).format(n)
}

// ─── Single card ──────────────────────────────────────────────
function InsightCard({ tag, tagColor, tagBg, title, value, sub, icon, iconBg, iconColor }) {
  return (
    <div
      className="p-4 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      {/* Tag + icon row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={{ background: tagBg, color: tagColor }}
        >
          {tag}
        </span>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
      </div>

      {/* Label */}
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#9091b0] leading-none">
        {title}
      </p>

      {/* Value */}
      <p className="text-2xl font-bold text-[#e8e9f4] leading-none">{value}</p>

      {/* Sub */}
      {sub && (
        <p className="text-xs text-[#9091b0] leading-none mt-auto">{sub}</p>
      )}
    </div>
  )
}

// ─── Exported component ───────────────────────────────────────
export default function InsightCards() {
  const { transactions, monthlySummary, currentMonthExpenses, currentMonthTxns } =
    useTransactions()

  const metrics = useMemo(() => {
    // 1. Highest spending category this month
    const expMap = {}
    currentMonthTxns
      .filter((t) => t.type === "expense")
      .forEach((t) => { expMap[t.category] = (expMap[t.category] || 0) + t.amount })
    const topCatId  = Object.keys(expMap).sort((a, b) => expMap[b] - expMap[a])[0] ?? "housing"
    const topCat    = getCategoryById(topCatId)
    const topAmt    = expMap[topCatId] ?? 0
    const topPct    = currentMonthExpenses > 0
      ? ((topAmt / currentMonthExpenses) * 100).toFixed(1)
      : "0.0"

    // 2. MoM expense change
    const last2  = monthlySummary.slice(-2)
    const momPct = last2.length === 2 && last2[0].expenses > 0
      ? (((last2[1].expenses - last2[0].expenses) / last2[0].expenses) * 100).toFixed(1)
      : null
    const momUp  = momPct !== null ? Number(momPct) > 0 : false

    // 3. Biggest single transaction
    const biggest = [...transactions].sort((a, b) => b.amount - a.amount)[0]

    // 4. Avg daily spend (last 30 days)
    const now     = new Date()
    const from    = new Date(now); from.setDate(from.getDate() - 30)
    const recent  = transactions.filter(
      (t) => t.type === "expense" && new Date(t.date) >= from
    )
    const total30 = recent.reduce((s, t) => s + t.amount, 0)
    const avgDay  = total30 / 30

    return { topCat, topAmt, topPct, momPct, momUp, biggest, avgDay }
  }, [transactions, monthlySummary, currentMonthExpenses, currentMonthTxns])

  const cards = [
    {
      tag:       "Top",
      tagColor:  "#8f87f2",
      tagBg:     "rgba(90,82,219,0.15)",
      title:     "Highest Spending",
      value:     metrics.topCat?.label ?? "Housing",
      sub:       `${fmt(metrics.topAmt)} · ${metrics.topPct}% of expenses`,
      icon:      <Home size={15} />,
      iconBg:    "rgba(90,82,219,0.15)",
      iconColor: "#8f87f2",
    },
    {
      tag:       metrics.momUp ? "▲ " + Math.abs(metrics.momPct) + "%" : "▼ " + Math.abs(metrics.momPct) + "%",
      tagColor:  metrics.momUp ? "#e05c6b" : "#1dbd8f",
      tagBg:     metrics.momUp ? "rgba(224,92,107,0.12)" : "rgba(29,189,143,0.12)",
      title:     "MoM Expenses",
      value:     fmt(metrics.biggest?.amount ? monthlySummary.slice(-1)[0]?.expenses ?? 0 : 0),
      sub:       `vs ${fmt(monthlySummary.slice(-2)[0]?.expenses ?? 0)} last month`,
      icon:      <TrendingDown size={15} />,
      iconBg:    "rgba(224,92,107,0.12)",
      iconColor: "#e05c6b",
    },
    {
      tag:       "Largest",
      tagColor:  "#f0a030",
      tagBg:     "rgba(240,160,48,0.12)",
      title:     "Biggest Transaction",
      value:     fmt(metrics.biggest?.amount ?? 0),
      sub:       metrics.biggest
        ? `${metrics.biggest.description} · ${new Date(metrics.biggest.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        : "",
      icon:      <ArrowUpCircle size={15} />,
      iconBg:    "rgba(240,160,48,0.12)",
      iconColor: "#f0a030",
    },
    {
      tag:       "Daily",
      tagColor:  "#a78bfa",
      tagBg:     "rgba(167,139,250,0.12)",
      title:     "Avg Daily Spend",
      value:     fmt(metrics.avgDay),
      sub:       "Based on 30-day period · Trending stable",
      icon:      <Calendar size={15} />,
      iconBg:    "rgba(167,139,250,0.12)",
      iconColor: "#a78bfa",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((c) => <InsightCard key={c.title} {...c} />)}
    </div>
  )
}