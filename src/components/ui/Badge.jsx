// ─────────────────────────────────────────────────────────────
//  FinFlow — Badge
//  src/components/ui/Badge.jsx
// ─────────────────────────────────────────────────────────────

// ─── Variant config ───────────────────────────────────────────
const VARIANTS = {
  income: {
    bg:     "rgba(29,189,143,0.12)",
    color:  "#1dbd8f",
    border: "rgba(29,189,143,0.25)",
    dot:    "#1dbd8f",
  },
  expense: {
    bg:     "rgba(224,92,107,0.12)",
    color:  "#e05c6b",
    border: "rgba(224,92,107,0.25)",
    dot:    "#e05c6b",
  },
  warning: {
    bg:     "rgba(240,160,48,0.12)",
    color:  "#f0a030",
    border: "rgba(240,160,48,0.25)",
    dot:    "#f0a030",
  },
  brand: {
    bg:     "rgba(90,82,219,0.15)",
    color:  "#8f87f2",
    border: "rgba(90,82,219,0.30)",
    dot:    "#8f87f2",
  },
  neutral: {
    bg:     "rgba(255,255,255,0.07)",
    color:  "#9091b0",
    border: "rgba(255,255,255,0.10)",
    dot:    "#9091b0",
  },
  success: {
    bg:     "rgba(29,189,143,0.12)",
    color:  "#1dbd8f",
    border: "rgba(29,189,143,0.25)",
    dot:    "#1dbd8f",
  },
  danger: {
    bg:     "rgba(224,92,107,0.12)",
    color:  "#e05c6b",
    border: "rgba(224,92,107,0.25)",
    dot:    "#e05c6b",
  },
  info: {
    bg:     "rgba(74,159,245,0.12)",
    color:  "#4a9ff5",
    border: "rgba(74,159,245,0.25)",
    dot:    "#4a9ff5",
  },
  admin: {
    bg:     "rgba(240,160,48,0.12)",
    color:  "#f0a030",
    border: "rgba(240,160,48,0.25)",
    dot:    "#f0a030",
  },
  viewer: {
    bg:     "rgba(90,82,219,0.15)",
    color:  "#8f87f2",
    border: "rgba(90,82,219,0.30)",
    dot:    "#8f87f2",
  },
  analyst: {
    bg:     "rgba(29,189,143,0.12)",
    color:  "#1dbd8f",
    border: "rgba(29,189,143,0.25)",
    dot:    "#1dbd8f",
  },
}

// ─── Main Badge ───────────────────────────────────────────────
export default function Badge({
  children,
  variant   = "neutral",
  dot       = false,       // show leading dot indicator
  pill      = true,        // rounded-full vs rounded-md
  size      = "sm",        // "xs" | "sm" | "md"
  className = "",
  style     = {},
}) {
  const v = VARIANTS[variant] ?? VARIANTS.neutral

  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  }

  return (
    <span
      className={[
        "inline-flex items-center gap-1 font-medium whitespace-nowrap leading-none",
        sizeClasses[size] ?? sizeClasses.sm,
        pill ? "rounded-full" : "rounded-md",
        className,
      ].join(" ")}
      style={{
        background:   v.bg,
        color:        v.color,
        border:       `1px solid ${v.border}`,
        ...style,
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: v.dot }}
        />
      )}
      {children}
    </span>
  )
}

// ─── Transaction type badge (Income / Expense) ────────────────
export function TypeBadge({ type }) {
  return (
    <Badge variant={type === "income" ? "income" : "expense"} dot>
      {type === "income" ? "Income" : "Expense"}
    </Badge>
  )
}

// ─── Role badge ───────────────────────────────────────────────
export function RoleBadge({ role }) {
  const variant = role?.toLowerCase() ?? "neutral"
  return <Badge variant={variant}>{role}</Badge>
}

// ─── Status badge (Saved / Unsaved / Pending / Healthy) ───────
export function StatusBadge({ status }) {
  const map = {
    Saved:    "success",
    Unsaved:  "warning",
    Pending:  "warning",
    Healthy:  "success",
    Synced:   "success",
    Error:    "danger",
    New:      "brand",
  }
  return <Badge variant={map[status] ?? "neutral"}>{status}</Badge>
}

// ─── Access level badge (Full / Read / None — Settings table) ─
export function AccessBadge({ access }) {
  const map = {
    full: { variant: "success", label: "✓ Full" },
    read: { variant: "warning", label: "~ Read" },
    none: { variant: "neutral", label: "✕ None" },
  }
  const cfg = map[access] ?? map.none
  return (
    <Badge variant={cfg.variant} pill={false} className="font-mono">
      {cfg.label}
    </Badge>
  )
}