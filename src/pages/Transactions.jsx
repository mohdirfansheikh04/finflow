// ─────────────────────────────────────────────────────────────
//  FinFlow — Transactions Page
//  src/pages/Transactions.jsx
// ─────────────────────────────────────────────────────────────
import { useState, useMemo, useEffect } from "react"
import { useLocation }                  from "react-router-dom"
import { ChevronLeft, ChevronRight }    from "lucide-react"

import TransactionStats   from "../components/transactions/TransactionStats"
import TransactionFilters from "../components/transactions/TransactionFilters"
import TransactionTable   from "../components/transactions/TransactionTable"
import AddTransactionModal from "../components/add-transaction/AddTransactionModal"
import { useTransactions } from "../context/TransactionContext"

const PER_PAGE = 10

// ─── Pagination ───────────────────────────────────────────────
function Pagination({ page, total, perPage, onPage }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  if (totalPages <= 1) return null

  // Build page number list (show max 5)
  const pages = []
  const start = Math.max(1, Math.min(page - 2, totalPages - 4))
  const end   = Math.min(totalPages, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)

  const btnBase = "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors"

  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-xs text-[#9091b0]">
        Showing{" "}
        <span className="text-[#e8e9f4] font-medium">
          {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)}
        </span>{" "}
        of{" "}
        <span className="text-[#e8e9f4] font-medium">{total}</span> transactions
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className={[btnBase, "text-[#9091b0] disabled:opacity-30 hover:bg-[rgba(255,255,255,0.05)]"].join(" ")}
        >
          <ChevronLeft size={15} />
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={[
              btnBase,
              p === page
                ? "bg-[#5a52db] text-white"
                : "text-[#9091b0] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e8e9f4]",
            ].join(" ")}
          >
            {p}
          </button>
        ))}

        {/* Last page shortcut */}
        {end < totalPages && (
          <>
            <span className="text-[#5a5b80] text-sm px-1">…</span>
            <button
              onClick={() => onPage(totalPages)}
              className={[btnBase, "text-[#9091b0] hover:bg-[rgba(255,255,255,0.05)]"].join(" ")}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className={[btnBase, "text-[#9091b0] disabled:opacity-30 hover:bg-[rgba(255,255,255,0.05)]"].join(" ")}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────
export default function Transactions() {
  const location = useLocation()
  const { transactions } = useTransactions()

  // ── Filter state ─────────────────────────────────────────────
  const [search,   setSearch]   = useState("")
  const [category, setCategory] = useState("")
  const [type,     setType]     = useState("")
  const [dateFrom, setDateFrom] = useState("2025-06-01")
  const [dateTo,   setDateTo]   = useState("2025-06-23")
  const [sort,     setSort]     = useState("date_desc")
  const [page,     setPage]     = useState(1)
  const [modal,    setModal]    = useState(false)

  // Auto-open modal if navigated from sidebar "Add Transaction"
  useEffect(() => {
    if (location.state?.openModal) setModal(true)
  }, [location.state])

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1) }, [search, category, type, dateFrom, dateTo, sort])

  // ── Handle sort column toggle ────────────────────────────────
  const handleSort = (field) => {
    setSort((prev) => {
      const [col, dir] = prev.split("_")
      if (col === field) return `${field}_${dir === "asc" ? "desc" : "asc"}`
      return `${field}_desc`
    })
  }

  // ── Filtered + sorted data ───────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...transactions]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.subtitle?.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    // Category
    if (category) list = list.filter((t) => t.category === category)

    // Type
    if (type) list = list.filter((t) => t.type === type)

    // Date range
    if (dateFrom) list = list.filter((t) => t.date >= dateFrom)
    if (dateTo)   list = list.filter((t) => t.date <= dateTo)

    // Sort
    const [col, dir] = sort.split("_")
    const mul = dir === "asc" ? 1 : -1
    list.sort((a, b) => {
      if (col === "date")   return mul * (new Date(a.date) - new Date(b.date))
      if (col === "amount") return mul * (a.amount - b.amount)
      if (col === "desc")   return mul * a.description.localeCompare(b.description)
      return 0
    })

    return list
  }, [transactions, search, category, type, dateFrom, dateTo, sort])

  // ── Paginated slice ──────────────────────────────────────────
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  )

  return (
    <div className="flex flex-col gap-4">

      {/* ── Stat cards ─────────────────────────────────────── */}
      <TransactionStats />

      {/* ── Filters ────────────────────────────────────────── */}
      <div
        className="p-4"
        style={{
          background:   "#171830",
          border:       "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
        }}
      >
        <TransactionFilters
          search={search}     onSearch={setSearch}
          category={category} onCategory={setCategory}
          type={type}         onType={setType}
          dateFrom={dateFrom} onDateFrom={setDateFrom}
          dateTo={dateTo}     onDateTo={setDateTo}
          sort={sort}         onSort={setSort}
          onAdd={() => setModal(true)}
        />
      </div>

      {/* ── Table ──────────────────────────────────────────── */}
      <TransactionTable
        transactions={paginated}
        sort={sort}
        onSort={handleSort}
        total={filtered.length}
        page={page}
        perPage={PER_PAGE}
      />

      {/* ── Pagination ─────────────────────────────────────── */}
      <Pagination
        page={page}
        total={filtered.length}
        perPage={PER_PAGE}
        onPage={setPage}
      />

      {/* ── Add Transaction modal ───────────────────────────── */}
      <AddTransactionModal open={modal} onClose={() => setModal(false)} />
    </div>
  )
}