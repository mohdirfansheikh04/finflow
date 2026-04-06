// ─────────────────────────────────────────────────────────────
//  FinFlow — Modal
//  src/components/ui/Modal.jsx
// ─────────────────────────────────────────────────────────────
import { useEffect, useCallback } from "react"
import { createPortal }           from "react-dom"
import { X }                      from "lucide-react"

// ─── Base Modal ───────────────────────────────────────────────
export default function Modal({
  open,
  onClose,
  children,
  title,
  subtitle,
  headerRight,            // ReactNode — e.g. role badge
  footer,                 // ReactNode — action buttons
  size      = "md",       // "sm" | "md" | "lg" | "xl" | "full"
  position  = "center",   // "center" | "right"
  closeOnOverlay = true,
  showClose      = true,
  className      = "",
}) {
  // Close on Escape
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape" && open) onClose?.() },
    [open, onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [handleKey])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  // ── Size map (center modal) ──────────────────────────────────
  const sizeMap = {
    sm:   "max-w-sm",
    md:   "max-w-lg",
    lg:   "max-w-2xl",
    xl:   "max-w-4xl",
    full: "max-w-[95vw]",
  }

  // ── Right slide-in panel ─────────────────────────────────────
  if (position === "right") {
    return createPortal(
      <div className="fixed inset-0 z-50 flex">
        {/* Overlay */}
        <div
          className="flex-1 bg-black/60 animate-fade-in"
          onClick={closeOnOverlay ? onClose : undefined}
        />

        {/* Panel */}
        <div
          className={["flex flex-col h-full animate-slide-in overflow-hidden", className].join(" ")}
          style={{
            width:       "420px",
            maxWidth:    "100vw",
            background:  "#171830",
            borderLeft:  "1px solid rgba(255,255,255,0.08)",
            boxShadow:   "-8px 0 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2.5">
              <div>
                {title && (
                  <p className="text-base font-semibold text-[#e8e9f4] leading-none">
                    {title}
                  </p>
                )}
                {subtitle && (
                  <p className="text-xs text-[#9091b0] mt-1 leading-none">{subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {headerRight}
              {showClose && (
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">{children}</div>

          {/* Footer */}
          {footer && (
            <div
              className="px-5 py-4 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>,
      document.body
    )
  }

  // ── Center modal ─────────────────────────────────────────────
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Dialog */}
      <div
        className={[
          "relative w-full flex flex-col animate-slide-up overflow-hidden",
          sizeMap[size] ?? sizeMap.md,
          className,
        ].join(" ")}
        style={{
          background:   "#171830",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          boxShadow:    "0 24px 64px rgba(0,0,0,0.7)",
          maxHeight:    "90vh",
        }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              {title && (
                <p className="text-base font-semibold text-[#e8e9f4] leading-none">
                  {title}
                </p>
              )}
              {subtitle && (
                <p className="text-xs text-[#9091b0] mt-1 leading-none">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {headerRight}
              {showClose && (
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="px-5 py-4 shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// ─── Confirm Dialog ───────────────────────────────────────────
//     Simple yes/no confirmation (used for Clear Data, Delete txn)
export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title       = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel  = "Cancel",
  danger      = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <div className="px-5 py-4">
        {description && (
          <p className="text-sm text-[#9091b0] leading-relaxed">{description}</p>
        )}
        <div className="flex items-center gap-2.5 mt-5">
          <button
            onClick={onClose}
            className="flex-1 h-9 rounded-lg text-sm font-medium text-[#e8e9f4] transition-colors hover:bg-[rgba(255,255,255,0.05)]"
            style={{ border: "1px solid rgba(255,255,255,0.10)" }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => { onConfirm?.(); onClose?.() }}
            className={[
              "flex-1 h-9 rounded-lg text-sm font-medium text-white transition-colors",
              danger
                ? "bg-[#e05c6b] hover:bg-[#c94d5c]"
                : "bg-[#5a52db] hover:bg-[#4740c2]",
            ].join(" ")}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}