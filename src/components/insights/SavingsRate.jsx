// ─────────────────────────────────────────────────────────────
//  FinFlow — Savings Rate
//  src/components/insights/SavingsRate.jsx
// ─────────────────────────────────────────────────────────────
import { useTransactions } from "../../context/TransactionContext"

function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style:                 "currency",
    currency:              "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n)
}

// ─── Circular gauge (pure SVG) ────────────────────────────────
function CircleGauge({ pct, size = 80 }) {
  const radius = (size - 10) / 2
  const circ   = 2 * Math.PI * radius
  const filled = circ * (Math.min(pct, 100) / 100)
  const color  = pct >= 50 ? "#1dbd8f" : pct >= 30 ? "#f0a030" : "#e05c6b"

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={8}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
      {/* Centre label */}
      <text
        x="50%" y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fill: color, fontSize: 14, fontWeight: 700 }}
      >
        {Math.round(pct)}%
      </text>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function SavingsRate() {
  const { savingsGoal, currentMonthIncome, currentMonthNet } = useTransactions()

  const savedAmt = Math.max(currentMonthNet, 0)
  const rate     = currentMonthIncome > 0
    ? Math.round((savedAmt / currentMonthIncome) * 100)
    : 0
  const target   = savingsGoal?.targetRate ?? 50

  // Status
  const isHealthy  = rate >= target
  const isOnTrack  = !isHealthy && rate >= target * 0.7
  const statusLabel = isHealthy ? "Healthy" : isOnTrack ? "On Track" : "Below Target"
  const statusColor = isHealthy ? "#1dbd8f" : isOnTrack ? "#f0a030" : "#e05c6b"
  const statusBg    = isHealthy
    ? "rgba(29,189,143,0.12)"
    : isOnTrack
    ? "rgba(240,160,48,0.12)"
    : "rgba(224,92,107,0.12)"

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
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#e8e9f4]">Savings Rate</p>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: statusBg, color: statusColor }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Gauge + amount */}
      <div className="flex items-center gap-4">
        <CircleGauge pct={rate} size={80} />
        <div>
          <p className="text-2xl font-bold text-[#e8e9f4] leading-none">
            {fmt(savedAmt)}
          </p>
          <p className="text-xs text-[#9091b0] mt-1 leading-none">saved this month</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width:      `${Math.min(rate, 100)}%`,
              background: statusColor,
            }}
          />
        </div>
        <p className="text-xs text-[#9091b0] mt-1.5">
          Target: {target}% ·{" "}
          {isHealthy ? (
            <span style={{ color: "#1dbd8f" }}>You're exceeding it!</span>
          ) : (
            <span style={{ color: "#f0a030" }}>{target - rate}% to go</span>
          )}
        </p>
      </div>
    </div>
  )
}