// ─────────────────────────────────────────────────────────────
//  FinFlow — Add Transaction Modal
//  src/components/add-transaction/AddTransactionModal.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useEffect }  from "react"
import { X, PlusCircle }        from "lucide-react"
import { createPortal }         from "react-dom"
import { useTransactions }      from "../../context/TransactionContext"
import { useAuth }              from "../../context/AuthContext"
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../constants/categories"
import { PAYMENT_METHODS }      from "../../data/mockData"

// ─── Today's date as yyyy-mm-dd ───────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0]

// ─── Initial form state ───────────────────────────────────────
const INIT = {
  type:          "income",
  description:   "",
  amount:        "",
  category:      "",
  date:          todayStr(),
  paymentMethod: "",
  notes:         "",
  isRecurring:   false,
}

// ─── Label ────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-[#9091b0] mb-1.5">
      {children}{required && <span className="text-[#e05c6b] ml-0.5">*</span>}
    </label>
  )
}

// ─── Input ────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", maxLength, className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={[
        "w-full h-10 px-3 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none transition-all",
        "focus:ring-2 focus:ring-[#5a52db] focus:ring-offset-0",
        className,
      ].join(" ")}
      style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
    />
  )
}

// ─── Textarea ─────────────────────────────────────────────────
function Textarea({ value, onChange, placeholder, maxLength }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={3}
      className="w-full px-3 py-2.5 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none resize-none transition-all focus:ring-2 focus:ring-[#5a52db]"
      style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
    />
  )
}

// ─── Select ───────────────────────────────────────────────────
function StyledSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 rounded-lg text-sm text-[#e8e9f4] outline-none appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-[#5a52db]"
      style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {placeholder && (
        <option value="" style={{ background: "#1c1d3c" }}>{placeholder}</option>
      )}
      {options.map((o) => (
        <option key={o.id ?? o.value ?? o} value={o.id ?? o.value ?? o} style={{ background: "#1c1d3c" }}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  )
}

// ─── Toggle switch ────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative w-10 h-5 rounded-full transition-colors duration-200",
        checked ? "bg-[#5a52db]" : "bg-[rgba(255,255,255,0.12)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  )
}

// ─── Main modal ───────────────────────────────────────────────
export default function AddTransactionModal({ open, onClose }) {
  const [form, setForm]   = useState(INIT)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { addTransaction }  = useTransactions()
  const { role, roleMeta, canAddTransactions } = useAuth()

  // Reset on open
  useEffect(() => {
    if (open) { setForm(INIT); setErrors({}) }
  }, [open])

  // Escape key close
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
  }, [open, onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }))

  // Category options based on type
  const catOptions = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  // ── Validation ───────────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.description.trim()) e.description = "Description is required"
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount"
    if (!form.category) e.category = "Select a category"
    if (!form.date)     e.date     = "Select a date"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300)) // simulate async

    addTransaction({
      type:          form.type,
      description:   form.description.trim(),
      subtitle:      form.paymentMethod
        ? `${PAYMENT_METHODS.find((m) => m.id === form.paymentMethod)?.label ?? ""}`
        : "",
      category:      form.category,
      amount:        parseFloat(form.amount),
      date:          form.date,
      paymentMethod: form.paymentMethod,
      notes:         form.notes.trim(),
      isRecurring:   form.isRecurring,
    })

    setLoading(false)
    onClose()
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/60 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="flex flex-col h-full animate-slide-in"
        style={{
          width:      "420px",
          maxWidth:   "100vw",
          background: "#171830",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow:  "-8px 0 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(90,82,219,0.15)" }}
            >
              <PlusCircle size={16} color="#8f87f2" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#e8e9f4] leading-none">
                Add Transaction
              </p>
              <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
                Fill in the details below
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Role badge */}
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: roleMeta.bg, color: roleMeta.color }}
            >
              ⭐ {role}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── ESC hint ───────────────────────────────────────── */}
        <div className="px-5 py-2 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-xs text-[#5a5b80]">
            Press <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[rgba(255,255,255,0.07)] text-[#9091b0]">Esc</kbd>{" "}
            to dismiss or click outside
          </p>
        </div>

        {/* ── Scrollable body ────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

          {/* Transaction type */}
          <div>
            <Label required>Transaction Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { set("type")(t); set("category")("") }}
                  className="flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: form.type === t
                      ? t === "income"
                        ? "rgba(29,189,143,0.20)"
                        : "rgba(224,92,107,0.20)"
                      : "rgba(255,255,255,0.04)",
                    border: form.type === t
                      ? t === "income"
                        ? "1px solid rgba(29,189,143,0.45)"
                        : "1px solid rgba(224,92,107,0.45)"
                      : "1px solid rgba(255,255,255,0.08)",
                    color: form.type === t
                      ? t === "income" ? "#1dbd8f" : "#e05c6b"
                      : "#9091b0",
                  }}
                >
                  <span>{t === "income" ? "↑" : "↓"}</span>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label required>Description</Label>
              <span className="text-[10px] text-[#5a5b80]">{form.description.length} / 80</span>
            </div>
            <Input
              value={form.description}
              onChange={set("description")}
              placeholder="e.g. Salary Deposit, Rent Payment..."
              maxLength={80}
            />
            {errors.description && (
              <p className="text-xs text-[#e05c6b] mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <Label required>Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#9091b0]">$</span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => set("amount")(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full h-10 pl-7 pr-3 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none transition-all focus:ring-2 focus:ring-[#5a52db]"
                style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-[#e05c6b] mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category + Date (side by side) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Category</Label>
              <StyledSelect
                value={form.category}
                onChange={set("category")}
                options={catOptions}
                placeholder="Select category"
              />
              {errors.category && (
                <p className="text-xs text-[#e05c6b] mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <Label required>Date</Label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date")(e.target.value)}
                className="w-full h-10 px-3 rounded-lg text-sm text-[#e8e9f4] outline-none transition-all focus:ring-2 focus:ring-[#5a52db]"
                style={{
                  background:  "#1c1d3c",
                  border:      "1px solid rgba(255,255,255,0.08)",
                  colorScheme: "dark",
                }}
              />
              {errors.date && (
                <p className="text-xs text-[#e05c6b] mt-1">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Payment method */}
          <div>
            <Label>Payment Method</Label>
            <StyledSelect
              value={form.paymentMethod}
              onChange={set("paymentMethod")}
              options={PAYMENT_METHODS}
              placeholder="Select method (optional)"
            />
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#9091b0]">
                Notes <span className="normal-case font-normal tracking-normal">(optional)</span>
              </label>
              <span className="text-[10px] text-[#5a5b80]">{form.notes.length} / 200</span>
            </div>
            <Textarea
              value={form.notes}
              onChange={set("notes")}
              placeholder="Add any additional notes or context..."
              maxLength={200}
            />
          </div>

          {/* Recurring toggle */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="text-sm font-medium text-[#e8e9f4] leading-none">Recurring Transaction</p>
              <p className="text-xs text-[#9091b0] mt-0.5">Automatically repeat this transaction</p>
            </div>
            <Toggle checked={form.isRecurring} onChange={set("isRecurring")} />
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div
          className="px-5 py-4 shrink-0 space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg text-sm font-medium text-[#e8e9f4] transition-colors hover:bg-[rgba(255,255,255,0.05)]"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !canAddTransactions}
              className="h-10 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "#5a52db" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <PlusCircle size={15} />
                  Add Transaction
                </>
              )}
            </button>
          </div>
          {!canAddTransactions && (
            <p className="text-center text-[11px] text-[#9091b0]">
              ⭐ Admin access required to add transactions
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}