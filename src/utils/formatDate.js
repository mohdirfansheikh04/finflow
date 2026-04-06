// ─────────────────────────────────────────────────────────────
//  FinFlow — Date Formatting Utilities
//  src/utils/formatDate.js
// ─────────────────────────────────────────────────────────────

// ─── Safe date parser ─────────────────────────────────────────
//     Handles "YYYY-MM-DD" strings without timezone shift
function parseDate(input) {
  if (!input) return new Date(NaN)
  if (input instanceof Date) return input
  // "2025-06-20" → treat as local, not UTC
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
    const [y, m, d] = input.split("-").map(Number)
    return new Date(y, m - 1, d)
  }
  return new Date(input)
}

// ─── Core: full date ──────────────────────────────────────────
//     formatDate("2025-06-20")            → "Jun 20, 2025"
//     formatDate("2025-06-20", "DD/MM/YYYY") → "20/06/2025"
//     formatDate("2025-06-20", "MM/DD/YYYY") → "06/20/2025"
//     formatDate("2025-06-20", "YYYY-MM-DD") → "2025-06-20"
export function formatDate(input, pattern = "MMM DD, YYYY") {
  const d = parseDate(input)
  if (isNaN(d)) return "—"

  const day   = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year  = String(d.getFullYear())
  const mon   = d.toLocaleString("en-US", { month: "short" })

  switch (pattern) {
    case "MMM DD, YYYY": return `${mon} ${parseInt(day, 10)}, ${year}`
    case "DD/MM/YYYY":   return `${day}/${month}/${year}`
    case "MM/DD/YYYY":   return `${month}/${day}/${year}`
    case "YYYY-MM-DD":   return `${year}-${month}-${day}`
    case "MMM YYYY":     return `${mon} ${year}`
    case "MMM DD":       return `${mon} ${parseInt(day, 10)}`
    case "DD MMM":       return `${parseInt(day, 10)} ${mon}`
    default:             return `${mon} ${parseInt(day, 10)}, ${year}`
  }
}

// ─── Short date (for transaction rows) ───────────────────────
//     formatShortDate("2025-06-20") → "Jun 20"
export function formatShortDate(input) {
  return formatDate(input, "MMM DD")
}

// ─── Month label (for chart X axes) ──────────────────────────
//     formatMonthLabel("2025-06") → "Jun"
export function formatMonthLabel(monthStr) {
  const [year, mon] = monthStr.split("-").map(Number)
  return new Date(year, mon - 1).toLocaleString("en-US", { month: "short" })
}

// ─── Full month + year (for section headings) ─────────────────
//     formatMonthYear("2025-06-20") → "June 2025"
export function formatMonthYear(input) {
  const d = parseDate(input)
  if (isNaN(d)) return "—"
  return d.toLocaleString("en-US", { month: "long", year: "numeric" })
}

// ─── Relative time (for sync labels) ─────────────────────────
//     formatRelative(new Date())              → "Just now"
//     formatRelative(new Date() - 120_000)    → "2 min ago"
//     formatRelative(new Date() - 86_400_000) → "Yesterday"
export function formatRelative(input) {
  const d    = parseDate(input)
  if (isNaN(d)) return "—"
  const diff = Date.now() - d.getTime()
  const sec  = Math.floor(diff / 1000)
  const min  = Math.floor(sec  / 60)
  const hr   = Math.floor(min  / 60)
  const day  = Math.floor(hr   / 24)

  if (sec  <  60) return "Just now"
  if (min  <  60) return `${min} min ago`
  if (hr   <  24) return `${hr} hr ago`
  if (day  ===  1) return "Yesterday"
  if (day  <    7) return `${day} days ago`
  return formatDate(d)
}

// ─── toInputValue — format date for <input type="date"> ──────
//     toInputDate("Jun 20, 2025") → "2025-06-20"
export function toInputDate(input) {
  const d = parseDate(input)
  if (isNaN(d)) return ""
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

// ─── isToday ──────────────────────────────────────────────────
export function isToday(input) {
  const d   = parseDate(input)
  const now = new Date()
  return (
    d.getDate()     === now.getDate()     &&
    d.getMonth()    === now.getMonth()    &&
    d.getFullYear() === now.getFullYear()
  )
}

// ─── Date range helpers ───────────────────────────────────────
//     startOfMonth("2025-06-20") → "2025-06-01"
//     endOfMonth  ("2025-06-20") → "2025-06-30"
export function startOfMonth(input) {
  const d = parseDate(input)
  return toInputDate(new Date(d.getFullYear(), d.getMonth(), 1))
}

export function endOfMonth(input) {
  const d = parseDate(input)
  return toInputDate(new Date(d.getFullYear(), d.getMonth() + 1, 0))
}

// ─── nDaysAgo ─────────────────────────────────────────────────
//     nDaysAgo(30) → "2025-05-21"  (30 days before today)
export function nDaysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toInputDate(d)
}

// ─── Default export ───────────────────────────────────────────
export default formatDate