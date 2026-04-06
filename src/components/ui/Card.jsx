// ─────────────────────────────────────────────────────────────
//  FinFlow — Card
//  src/components/ui/Card.jsx
// ─────────────────────────────────────────────────────────────

// ─── Base Card ────────────────────────────────────────────────
export default function Card({
  children,
  className = "",
  padding   = "p-5",
  hover     = false,
  onClick,
  style     = {},
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        ...style,
      }}
      className={[
        padding,
        hover && "cursor-pointer transition-colors duration-150 hover:border-[rgba(255,255,255,0.12)]",
        onClick && "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
}

// ─── Card Header (optional title + subtitle + right slot) ─────
export function CardHeader({ title, subtitle, right, className = "" }) {
  return (
    <div className={["flex items-start justify-between gap-4 mb-4", className].join(" ")}>
      <div>
        {title && (
          <p className="text-sm font-semibold text-[#e8e9f4] leading-none">{title}</p>
        )}
        {subtitle && (
          <p className="text-xs text-[#9091b0] mt-1 leading-none">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  )
}

// ─── Stat Card (dashboard top metrics) ───────────────────────
export function StatCard({
  label,
  value,
  icon,
  trend,       // e.g. "+8.4%"
  trendUp,     // true | false | null (neutral)
  sparkline,   // optional ReactNode (mini chart)
  iconBg = "rgba(90,82,219,0.15)",
  iconColor = "#8f87f2",
  className = "",
}) {
  return (
    <div
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
      className={["p-5 relative overflow-hidden", className].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest text-[#9091b0] mb-2">
            {label}
          </p>
          <p className="text-2xl font-bold text-[#e8e9f4] leading-none truncate">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={[
                  "text-xs font-medium",
                  trendUp === true  && "text-[#1dbd8f]",
                  trendUp === false && "text-[#e05c6b]",
                  trendUp === null  && "text-[#9091b0]",
                ].filter(Boolean).join(" ")}
              >
                {trendUp === true ? "▲" : trendUp === false ? "▼" : ""} {trend}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: iconBg }}
          >
            <span style={{ color: iconColor }}>{icon}</span>
          </div>
        )}
      </div>
      {sparkline && <div className="mt-3">{sparkline}</div>}
    </div>
  )
}

// ─── Alt surface card (slightly different bg) ─────────────────
export function CardAlt({ children, className = "", padding = "p-5", style = {} }) {
  return (
    <div
      style={{
        background:   "#1c1d3c",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        ...style,
      }}
      className={[padding, className].join(" ")}
    >
      {children}
    </div>
  )
}