// ─────────────────────────────────────────────────────────────
//  FinFlow — Financial Calculation Utilities
//  src/utils/calculations.js
// ─────────────────────────────────────────────────────────────

// ─── Basic aggregates ─────────────────────────────────────────

export function totalIncome(transactions = []) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)
}

export function totalExpenses(transactions = []) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0)
}

export function netBalance(transactions = []) {
  return totalIncome(transactions) - totalExpenses(transactions)
}

// ─── Savings rate ─────────────────────────────────────────────
//     savingsRate(8500, 4820) → 43  (% of income saved)
export function savingsRate(income, expenses) {
  if (!income || income <= 0) return 0
  const saved = income - expenses
  return Math.max(0, Math.round((saved / income) * 100))
}

// ─── Month-over-month change ──────────────────────────────────
//     momChange(4980, 4820) → -3.21  (% change, negative = lower)
export function momChange(prev, current) {
  if (!prev || prev === 0) return null
  return parseFloat((((current - prev) / prev) * 100).toFixed(2))
}

// ─── Average daily spend (last N days) ───────────────────────
export function avgDailySpend(transactions = [], days = 30) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)

  const total = transactions
    .filter((t) => t.type === "expense" && new Date(t.date) >= cutoff)
    .reduce((s, t) => s + t.amount, 0)

  return parseFloat((total / days).toFixed(2))
}

// ─── Expenses by category ─────────────────────────────────────
//     Returns { housing: 1800, food: 1060, ... }
export function expensesByCategory(transactions = []) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount
      return acc
    }, {})
}

// ─── Budget progress ──────────────────────────────────────────
//     Returns enriched budget array with spent + percent fields
export function budgetProgress(transactions = [], budgets = [], year, month) {
  const monthTxns = transactions.filter((t) => {
    const d = new Date(t.date)
    return d.getFullYear() === year && d.getMonth() + 1 === month
  })
  const byCategory = expensesByCategory(monthTxns)

  return budgets.map((b) => {
    const spent   = byCategory[b.category] ?? 0
    const percent = Math.min(Math.round((spent / b.limit) * 100), 100)
    return { ...b, spent, percent, remaining: Math.max(0, b.limit - spent) }
  })
}

// ─── Monthly summary ──────────────────────────────────────────
//     Groups all transactions by "YYYY-MM" and returns sorted array:
//     [{ month: "2025-01", income, expenses, net }, ...]
export function monthlySummary(transactions = []) {
  const map = {}
  transactions.forEach((t) => {
    const d   = new Date(t.date)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    if (!map[key]) map[key] = { income: 0, expenses: 0 }
    if (t.type === "income")  map[key].income   += t.amount
    if (t.type === "expense") map[key].expenses += t.amount
  })

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      income:   parseFloat(data.income.toFixed(2)),
      expenses: parseFloat(data.expenses.toFixed(2)),
      net:      parseFloat((data.income - data.expenses).toFixed(2)),
    }))
}

// ─── Biggest transaction ──────────────────────────────────────
export function biggestTransaction(transactions = []) {
  if (!transactions.length) return null
  return [...transactions].sort((a, b) => b.amount - a.amount)[0]
}

// ─── Top spending category ────────────────────────────────────
//     Returns { categoryId, amount, percent }
export function topSpendingCategory(transactions = []) {
  const exp = expensesByCategory(transactions)
  if (!Object.keys(exp).length) return null

  const totalExp = Object.values(exp).reduce((s, v) => s + v, 0)
  const topId    = Object.keys(exp).sort((a, b) => exp[b] - exp[a])[0]
  const amount   = exp[topId]
  const percent  = totalExp > 0
    ? parseFloat(((amount / totalExp) * 100).toFixed(1))
    : 0

  return { categoryId: topId, amount, percent }
}

// ─── Running balance (for chart) ─────────────────────────────
//     Takes a sorted monthly summary and a starting balance,
//     returns each month with its cumulative balance.
export function runningBalance(summary = [], startBalance = 0) {
  let balance = startBalance
  return summary.map((m) => {
    balance += m.net
    return { ...m, balance: parseFloat(balance.toFixed(2)) }
  })
}

// ─── Percent of total ─────────────────────────────────────────
//     pct(1800, 4820) → 37.3
export function pct(part, total) {
  if (!total || total === 0) return 0
  return parseFloat(((part / total) * 100).toFixed(1))
}

// ─── Clamp ────────────────────────────────────────────────────
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// ─── Round to 2 decimal places ────────────────────────────────
export function round2(n) {
  return Math.round(n * 100) / 100
}