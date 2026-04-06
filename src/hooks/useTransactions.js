// ─────────────────────────────────────────────────────────────
//  FinFlow — useTransactions Hook
//  src/hooks/useTransactions.js
//
//  Wraps the raw TransactionContext with filter / sort /
//  search / pagination logic so pages stay clean.
// ─────────────────────────────────────────────────────────────
import { useState, useMemo, useCallback } from "react"
import { useTransactions as useCtx }      from "../context/TransactionContext"

// ─── Defaults ─────────────────────────────────────────────────
const DEFAULT_FILTERS = {
  search:   "",
  category: "",
  type:     "",          // "" | "income" | "expense"
  dateFrom: "",
  dateTo:   "",
}

const DEFAULT_SORT = {
  field: "date",         // "date" | "amount" | "desc"
  dir:   "desc",         // "asc"  | "desc"
}

const DEFAULT_PER_PAGE = 10

// ─── Main hook ────────────────────────────────────────────────
export default function useTransactions({
  perPage     = DEFAULT_PER_PAGE,
  initialSort = DEFAULT_SORT,
} = {}) {
  // ── Raw data from context ────────────────────────────────────
  const ctx = useCtx()

  // ── Local filter / sort / page state ─────────────────────────
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort,    setSort]    = useState(initialSort)
  const [page,    setPage]    = useState(1)

  // ── Filter setters (individual) ──────────────────────────────
  const setSearch   = useCallback((v) => { setFilters((p) => ({ ...p, search:   v })); setPage(1) }, [])
  const setCategory = useCallback((v) => { setFilters((p) => ({ ...p, category: v })); setPage(1) }, [])
  const setType     = useCallback((v) => { setFilters((p) => ({ ...p, type:     v })); setPage(1) }, [])
  const setDateFrom = useCallback((v) => { setFilters((p) => ({ ...p, dateFrom: v })); setPage(1) }, [])
  const setDateTo   = useCallback((v) => { setFilters((p) => ({ ...p, dateTo:   v })); setPage(1) }, [])

  // ── Bulk filter reset ────────────────────────────────────────
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }, [])

  // ── Sort toggle ──────────────────────────────────────────────
  //    Clicking the same field flips dir; new field defaults desc
  const toggleSort = useCallback((field) => {
    setSort((prev) => ({
      field,
      dir: prev.field === field && prev.dir === "desc" ? "asc" : "desc",
    }))
    setPage(1)
  }, [])

  const setSortField = useCallback((field) => {
    setSort((prev) => ({ ...prev, field }))
    setPage(1)
  }, [])

  const setSortDir = useCallback((dir) => {
    setSort((prev) => ({ ...prev, dir }))
  }, [])

  // ── Convenience sort string (for Transactions page selects) ──
  //    e.g. "date_desc" — parse back with split("_")
  const sortString = `${sort.field}_${sort.dir}`

  const setSortFromString = useCallback((str) => {
    const [field, dir] = str.split("_")
    setSort({ field, dir })
    setPage(1)
  }, [])

  // ── Active filter count (for UI badge) ───────────────────────
  const activeFilterCount = useMemo(() => {
    return [
      filters.search.trim(),
      filters.category,
      filters.type,
      filters.dateFrom,
      filters.dateTo,
    ].filter(Boolean).length
  }, [filters])

  // ── Filtered list ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...ctx.transactions]

    // Search — matches description, subtitle, category
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim()
      list = list.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.subtitle?.toLowerCase().includes(q)    ||
          t.category?.toLowerCase().includes(q)    ||
          t.notes?.toLowerCase().includes(q)
      )
    }

    // Category
    if (filters.category) {
      list = list.filter((t) => t.category === filters.category)
    }

    // Type
    if (filters.type) {
      list = list.filter((t) => t.type === filters.type)
    }

    // Date range
    if (filters.dateFrom) {
      list = list.filter((t) => t.date >= filters.dateFrom)
    }
    if (filters.dateTo) {
      list = list.filter((t) => t.date <= filters.dateTo)
    }

    return list
  }, [ctx.transactions, filters])

  // ── Sorted list ───────────────────────────────────────────────
  const sorted = useMemo(() => {
    const mul = sort.dir === "asc" ? 1 : -1
    return [...filtered].sort((a, b) => {
      switch (sort.field) {
        case "date":
          return mul * (new Date(a.date) - new Date(b.date))
        case "amount":
          return mul * (a.amount - b.amount)
        case "desc":
          return mul * a.description.localeCompare(b.description)
        case "type":
          return mul * a.type.localeCompare(b.type)
        case "category":
          return mul * a.category.localeCompare(b.category)
        default:
          return 0
      }
    })
  }, [filtered, sort])

  // ── Pagination ────────────────────────────────────────────────
  const totalItems  = sorted.length
  const totalPages  = Math.max(1, Math.ceil(totalItems / perPage))

  // Clamp page to valid range whenever totalPages changes
  const safePage    = Math.min(page, totalPages)

  const paginated   = useMemo(
    () => sorted.slice((safePage - 1) * perPage, safePage * perPage),
    [sorted, safePage, perPage]
  )

  const goToPage  = useCallback((p) => setPage(Math.max(1, Math.min(p, totalPages))), [totalPages])
  const nextPage  = useCallback(() => goToPage(safePage + 1), [safePage, goToPage])
  const prevPage  = useCallback(() => goToPage(safePage - 1), [safePage, goToPage])
  const firstPage = useCallback(() => goToPage(1),            [goToPage])
  const lastPage  = useCallback(() => goToPage(totalPages),   [totalPages, goToPage])

  const isFirstPage = safePage === 1
  const isLastPage  = safePage === totalPages

  // Range label — "Showing 1–10 of 248"
  const rangeStart  = totalItems === 0 ? 0 : (safePage - 1) * perPage + 1
  const rangeEnd    = Math.min(safePage * perPage, totalItems)
  const rangeLabel  = totalItems === 0
    ? "No results"
    : `Showing ${rangeStart}–${rangeEnd} of ${totalItems}`

  // ── Filtered totals (for the Transactions stats bar) ─────────
  const filteredIncome = useMemo(
    () => filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [filtered]
  )
  const filteredExpenses = useMemo(
    () => filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [filtered]
  )
  const filteredNet = filteredIncome - filteredExpenses

  // ── Return ───────────────────────────────────────────────────
  return {
    // ── Paginated rows for the table ──────────────────────────
    rows: paginated,

    // ── Counts ────────────────────────────────────────────────
    totalItems,
    totalPages,
    rangeLabel,
    rangeStart,
    rangeEnd,

    // ── Current filter state ──────────────────────────────────
    filters,
    activeFilterCount,

    // ── Individual filter setters ─────────────────────────────
    setSearch,
    setCategory,
    setType,
    setDateFrom,
    setDateTo,
    resetFilters,

    // ── Sort state + setters ──────────────────────────────────
    sort,
    sortString,
    toggleSort,
    setSortField,
    setSortDir,
    setSortFromString,

    // ── Pagination ────────────────────────────────────────────
    page: safePage,
    perPage,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    isFirstPage,
    isLastPage,

    // ── Filtered aggregates ───────────────────────────────────
    filteredIncome,
    filteredExpenses,
    filteredNet,

    // ── Pass-through from context (actions + derived) ─────────
    addTransaction:      ctx.addTransaction,
    editTransaction:     ctx.editTransaction,
    deleteTransaction:   ctx.deleteTransaction,
    resetTransactions:   ctx.resetTransactions,
    clearAllTransactions:ctx.clearAllTransactions,
    exportCSV:           ctx.exportCSV,
    exportJSON:          ctx.exportJSON,
    importJSON:          ctx.importJSON,
    transactions:        ctx.transactions,       // full unfiltered list
    recentTransactions:  ctx.recentTransactions,
    budgetProgress:      ctx.budgetProgress,
    monthlySummary:      ctx.monthlySummary,
    storageInfo:         ctx.storageInfo,
    savingsGoal:         ctx.savingsGoal,
  }
}