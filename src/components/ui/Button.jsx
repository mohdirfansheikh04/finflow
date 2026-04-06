// ─────────────────────────────────────────────────────────────
//  FinFlow — Button
//  src/components/ui/Button.jsx
// ─────────────────────────────────────────────────────────────
import { Loader2 } from "lucide-react"

// ─── Variant styles ───────────────────────────────────────────
const VARIANTS = {
  primary: {
    base:     "bg-[#5a52db] text-white border-[#5a52db]",
    hover:    "hover:bg-[#4740c2] hover:border-[#4740c2]",
    disabled: "disabled:bg-[#5a52db]/40 disabled:border-[#5a52db]/40",
  },
  secondary: {
    base:     "bg-transparent text-[#e8e9f4] border-[rgba(255,255,255,0.12)]",
    hover:    "hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.20)]",
    disabled: "disabled:opacity-40",
  },
  ghost: {
    base:     "bg-transparent text-[#9091b0] border-transparent",
    hover:    "hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e8e9f4]",
    disabled: "disabled:opacity-40",
  },
  danger: {
    base:     "bg-transparent text-[#e05c6b] border-[rgba(224,92,107,0.35)]",
    hover:    "hover:bg-[rgba(224,92,107,0.10)] hover:border-[#e05c6b]",
    disabled: "disabled:opacity-40",
  },
  success: {
    base:     "bg-[#1dbd8f] text-white border-[#1dbd8f]",
    hover:    "hover:brightness-90",
    disabled: "disabled:opacity-40",
  },
  income: {
    base:     "bg-[rgba(29,189,143,0.12)] text-[#1dbd8f] border-[rgba(29,189,143,0.30)]",
    hover:    "hover:bg-[rgba(29,189,143,0.20)]",
    disabled: "disabled:opacity-40",
  },
  expense: {
    base:     "bg-[rgba(224,92,107,0.12)] text-[#e05c6b] border-[rgba(224,92,107,0.30)]",
    hover:    "hover:bg-[rgba(224,92,107,0.20)]",
    disabled: "disabled:opacity-40",
  },
}

// ─── Size styles ──────────────────────────────────────────────
const SIZES = {
  xs: "h-7  px-2.5 text-xs  gap-1.5 rounded-md",
  sm: "h-8  px-3   text-xs  gap-1.5 rounded-md",
  md: "h-9  px-4   text-sm  gap-2   rounded-lg",
  lg: "h-11 px-5   text-sm  gap-2   rounded-lg",
  xl: "h-12 px-6   text-base gap-2  rounded-xl",
}

// ─── Main Button ──────────────────────────────────────────────
export default function Button({
  children,
  variant   = "primary",
  size      = "md",
  icon,                    // leading icon (ReactNode)
  iconRight,               // trailing icon (ReactNode)
  loading   = false,
  disabled  = false,
  fullWidth = false,
  onClick,
  type      = "button",
  className = "",
  style     = {},
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary
  const s = SIZES[size]      ?? SIZES.md

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={style}
      className={[
        "inline-flex items-center justify-center font-medium border transition-all duration-150 select-none whitespace-nowrap",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:pointer-events-none",
        s,
        v.base,
        !isDisabled && v.hover,
        v.disabled,
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      {children}
      {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}

// ─── Icon-only Button ─────────────────────────────────────────
export function IconButton({
  icon,
  size      = "md",
  variant   = "ghost",
  label,
  onClick,
  className = "",
}) {
  const sizeMap = {
    xs: "w-6  h-6  rounded-md",
    sm: "w-7  h-7  rounded-md",
    md: "w-8  h-8  rounded-lg",
    lg: "w-10 h-10 rounded-lg",
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      aria-label={label}
      className={[
        "flex items-center justify-center p-0 border-0 shrink-0",
        sizeMap[size] ?? sizeMap.md,
        className,
      ].join(" ")}
    >
      {icon}
    </Button>
  )
}