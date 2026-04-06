// ─────────────────────────────────────────────────────────────
//  FinFlow — Toggle
//  src/components/ui/Toggle.jsx
// ─────────────────────────────────────────────────────────────

// ─── Base Toggle switch ───────────────────────────────────────
export default function Toggle({
  checked   = false,
  onChange,
  disabled  = false,
  size      = "md",    // "sm" | "md" | "lg"
  label,               // optional label beside the toggle
  labelPos  = "right", // "left" | "right"
  className = "",
}) {
  // Size variants
  const sizes = {
    sm: { track: "w-8  h-4",   thumb: "w-3 h-3", translate: "translate-x-4",  offset: "top-0.5 left-0.5" },
    md: { track: "w-10 h-5",   thumb: "w-4 h-4", translate: "translate-x-5",  offset: "top-0.5 left-0.5" },
    lg: { track: "w-12 h-6",   thumb: "w-5 h-5", translate: "translate-x-6",  offset: "top-0.5 left-0.5" },
  }
  const s = sizes[size] ?? sizes.md

  const trackEl = (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        "relative rounded-full transition-colors duration-200 shrink-0 focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#5a52db] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11122a]",
        s.track,
        checked  ? "bg-[#5a52db]"               : "bg-[rgba(255,255,255,0.12)]",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        className={[
          "absolute rounded-full bg-white shadow transition-transform duration-200",
          s.offset,
          s.thumb,
          checked ? s.translate : "translate-x-0",
        ].join(" ")}
      />
    </button>
  )

  if (!label) {
    return <div className={className}>{trackEl}</div>
  }

  return (
    <div
      className={[
        "flex items-center gap-2.5",
        disabled ? "opacity-40" : "cursor-pointer",
        className,
      ].join(" ")}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      {labelPos === "left" && (
        <span className="text-sm text-[#e8e9f4] select-none">{label}</span>
      )}
      {trackEl}
      {labelPos === "right" && (
        <span className="text-sm text-[#e8e9f4] select-none">{label}</span>
      )}
    </div>
  )
}

// ─── Toggle Row (used in Settings — label + description + toggle) ─
export function ToggleRow({
  label,
  description,
  checked,
  onChange,
  disabled  = false,
  badge,               // optional ReactNode (e.g. <StatusBadge status="Saved" />)
  size      = "md",
  className = "",
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-4 py-3",
        className,
      ].join(" ")}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-[#e8e9f4] leading-none">{label}</p>
          {badge}
        </div>
        {description && (
          <p className="text-xs text-[#9091b0] mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <Toggle
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size={size}
      />
    </div>
  )
}