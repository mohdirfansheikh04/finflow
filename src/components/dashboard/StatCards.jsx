// ─────────────────────────────────────────────────────────────
//  FinFlow — Dashboard Stat Cards
//  src/components/dashboard/StatCards.jsx
// ─────────────────────────────────────────────────────────────
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { useTransactions } from "../../context/TransactionContext"

function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n)
}

// ─── Mini sparkline (pure SVG) ────────────────────────────────
function Sparkline({ points = [], color = "#8f87f2", up = true }) {
  if (!points.length) return null
  const w = 80, h = 28
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const xs = points.map((_, i) => (i / (points.length - 1)) * w)
  const ys = points.map((v) => h - ((v - min) / range) * h)
  const d  = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ")
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Single stat card ─────────────────────────────────────────
function StatCard({ label, value, trend, trendUp, icon, iconBg, iconColor, sparkPoints, sparkColor }) {
  return (
    <div
      className="p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-[#9091b0]">{label}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <span style={{ color: iconColor }}>{icon}</span>
        </div>
      </div>

      <div>
        <p className="text-[1.6rem] font-bold text-[#e8e9f4] leading-none">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-1.5">
            <span
              className={[
                "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full",
                trendUp
                  ? "bg-[rgba(29,189,143,0.12)] text-[#1dbd8f]"
                  : "bg-[rgba(224,92,107,0.12)] text-[#e05c6b]",
              ].join(" ")}
            >
              {trendUp ? "▲" : "▼"} {trend}
            </span>
          </div>
        )}
      </div>

      {sparkPoints && (
        <div className="mt-auto">
          <Sparkline points={sparkPoints} color={sparkColor} up={trendUp} />
        </div>
      )}
    </div>
  )
}

// ─── Exported component ───────────────────────────────────────
export default function StatCards() {
  const {
    netBalance,
    currentMonthIncome,
    currentMonthExpenses,
  } = useTransactions()

  const cards = [
    {
      label:       "Total Balance",
      value:       formatCurrency(netBalance),
      trend:       "8.4%",
      trendUp:     true,
      icon:        <Wallet size={16} />,
      iconBg:      "rgba(90,82,219,0.18)",
      iconColor:   "#8f87f2",
      sparkPoints: [68000, 70000, 72000, 75000, 78000, 81000, 84291],
      sparkColor:  "#8f87f2",
    },
    {
      label:       "Monthly Income",
      value:       formatCurrency(currentMonthIncome),
      trend:       "12.1%",
      trendUp:     true,
      icon:        <TrendingUp size={16} />,
      iconBg:      "rgba(29,189,143,0.15)",
      iconColor:   "#1dbd8f",
      sparkPoints: [7800, 8200, 8000, 8500, 8300, 9000, currentMonthIncome],
      sparkColor:  "#1dbd8f",
    },
    {
      label:       "Monthly Expenses",
      value:       formatCurrency(currentMonthExpenses),
      trend:       "3.2%",
      trendUp:     false,
      icon:        <TrendingDown size={16} />,
      iconBg:      "rgba(224,92,107,0.15)",
      iconColor:   "#e05c6b",
      sparkPoints: [5200, 4900, 5100, 4800, 5000, 4700, currentMonthExpenses],
      sparkColor:  "#e05c6b",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </div>
  )
}