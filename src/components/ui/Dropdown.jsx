// ─────────────────────────────────────────────────────────────
//  FinFlow — Dropdown / Select
//  src/components/ui/Dropdown.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

// ─── Native Select wrapper ────────────────────────────────────
//     Lightest option — wraps a <select> with custom styling.
//     Use for simple selects (currency, date format, category).
export function Select({
  value,
  onChange,
  options   = [],  // [{ value, label }] or ["string"]
  placeholder = "Select…",
  disabled  = false,
  size      = "md",
  className = "",
  style     = {},
}) {
  const sizeClasses = {
    sm: "h-8  text-xs  px-2.5 pr-7",
    md: "h-9  text-sm  px-3   pr-8",
    lg: "h-10 text-sm  px-3.5 pr-9",
  }

  const normalised = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  )

  return (
    <div className={["relative inline-flex", className].join(" ")} style={style}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={[
          "w-full appearance-none rounded-lg font-medium transition-all duration-150 outline-none",
          "text-[#e8e9f4] cursor-pointer",
          "focus:ring-2 focus:ring-[#5a52db] focus:ring-offset-0",
          disabled ? "opacity-40 cursor-not-allowed" : "",
          sizeClasses[size] ?? sizeClasses.md,
        ].join(" ")}
        style={{
          background:   "#1e2050",
          border:       "1px solid rgba(255,255,255,0.10)",
          ...( !disabled && { cursor: "pointer" }),
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {normalised.map((o) => (
          <option key={o.value} value={o.value} style={{ background: "#1e2050" }}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9091b0] pointer-events-none"
      />
    </div>
  )
}

// ─── Custom Dropdown ──────────────────────────────────────────
//     Fully custom — renders a button + floating list.
//     Use when you need icons, groups, or richer item rendering.
export default function Dropdown({
  trigger,             // ReactNode — the button that opens the menu
  items   = [],        // [{ label, value, icon, danger, divider }]
  onSelect,
  selected,
  align   = "right",   // "left" | "right"
  width   = "auto",    // "auto" | "full" | number (px)
  className = "",
}) {
  const [open, setOpen]   = useState(false)
  const containerRef      = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  const handleSelect = (item) => {
    if (item.divider || item.disabled) return
    onSelect?.(item.value ?? item.label)
    setOpen(false)
  }

  const menuWidth =
    width === "full" ? "100%" : width === "auto" ? "auto" : `${width}px`

  return (
    <div ref={containerRef} className={["relative inline-block", className].join(" ")}>
      {/* Trigger */}
      <div onClick={() => setOpen((p) => !p)}>{trigger}</div>

      {/* Floating menu */}
      {open && (
        <div
          className="absolute z-50 mt-1.5 py-1 animate-fade-in"
          style={{
            [align === "right" ? "right" : "left"]: 0,
            width:        menuWidth,
            minWidth:     "160px",
            background:   "#1c1d3c",
            border:       "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            boxShadow:    "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${i}`}
                  className="my-1"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                />
              )
            }

            const isSelected = selected === (item.value ?? item.label)

            return (
              <button
                key={item.value ?? item.label ?? i}
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                className={[
                  "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors duration-100",
                  item.danger
                    ? "text-[#e05c6b] hover:bg-[rgba(224,92,107,0.10)]"
                    : isSelected
                    ? "text-[#8f87f2] bg-[rgba(90,82,219,0.12)]"
                    : "text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]",
                  item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
              >
                {item.icon && (
                  <span className="shrink-0 text-[#9091b0]">{item.icon}</span>
                )}
                <span className="flex-1 truncate">{item.label}</span>
                {isSelected && (
                  <Check size={13} className="shrink-0 text-[#8f87f2]" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Filter Dropdown ──────────────────────────────────────────
//     Pre-styled dropdown trigger for the Transactions filter bar.
export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  icon,
  className = "",
}) {
  return (
    <div className={["relative", className].join(" ")}>
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9091b0] pointer-events-none">
        {icon}
      </div>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placeholder={label}
        className="w-full"
        style={{ paddingLeft: icon ? "2rem" : undefined }}
      />
    </div>
  )
}