// ─────────────────────────────────────────────────────────────
//  FinFlow — Transaction Filters
//  src/components/transactions/TransactionFilters.jsx
// ─────────────────────────────────────────────────────────────
import { Search, Download, Plus, ChevronDown } from "lucide-react"
import { CATEGORIES } from "../../constants/categories"
import { useAuth }    from "../../context/AuthContext"
import { useTransactions } from "../../context/TransactionContext"

const SORT_OPTIONS = [
  { value: "date_desc",   label: "Date: Newest" },
  { value: "date_asc",    label: "Date: Oldest" },
  { value: "amount_desc", label: "Amount: High" },
  { value: "amount_asc",  label: "Amount: Low"  },
  { value: "desc_asc",    label: "Name: A–Z"    },
]

const TYPE_OPTIONS = [
  { value: "",        label: "All Types"  },
  { value: "income",  label: "Income"     },
  { value: "expense", label: "Expense"    },
]

// ─── Styled select ────────────────────────────────────────────
function StyledSelect({ value, onChange, options, icon }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9091b0] pointer-events-none">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 appearance-none rounded-lg text-sm text-[#e8e9f4] font-medium pr-7 outline-none cursor-pointer transition-all"
        style={{
          background:  "#1e2050",
          border:      "1px solid rgba(255,255,255,0.10)",
          paddingLeft: icon ? "2rem" : "0.75rem",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: "#1e2050" }}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9091b0] pointer-events-none"
      />
    </div>
  )
}

// ─── Date input ───────────────────────────────────────────────
function DateInput({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 px-3 rounded-lg text-sm text-[#e8e9f4] outline-none cursor-pointer"
      style={{
        background:    "#1e2050",
        border:        "1px solid rgba(255,255,255,0.10)",
        colorScheme:   "dark",
      }}
    />
  )
}

export default function TransactionFilters({
  search,    onSearch,
  category,  onCategory,
  type,      onType,
  dateFrom,  onDateFrom,
  dateTo,    onDateTo,
  sort,      onSort,
  onAdd,
}) {
  const { canExportData, canAddTransactions } = useAuth()
  const { exportCSV } = useTransactions()

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* ── Row 1 — search + filters ───────────────────────── */}
      <div className="flex items-center gap-2.5 flex-wrap">

        {/* Search */}
        <div className="relative flex-1 min-w-50">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9091b0] pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full h-9 pl-9 pr-3 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none"
            style={{
              background: "#1e2050",
              border:     "1px solid rgba(255,255,255,0.10)",
            }}
          />
        </div>

        {/* Category */}
        <StyledSelect
          value={category}
          onChange={onCategory}
          options={categoryOptions}
        />

        {/* Type */}
        <StyledSelect
          value={type}
          onChange={onType}
          options={TYPE_OPTIONS}
        />

        {/* Date from */}
        <DateInput value={dateFrom} onChange={onDateFrom} />

        <span className="text-xs text-[#5a5b80]">to</span>

        {/* Date to */}
        <DateInput value={dateTo} onChange={onDateTo} />

        {/* Sort */}
        <StyledSelect
          value={sort}
          onChange={onSort}
          options={SORT_OPTIONS}
        />
      </div>

      {/* ── Row 2 — action buttons ─────────────────────────── */}
      <div className="flex items-center gap-2.5">
        {canExportData && (
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: "rgba(29,189,143,0.12)",
              border:     "1px solid rgba(29,189,143,0.25)",
              color:      "#1dbd8f",
            }}
          >
            <Download size={14} />
            Export CSV
          </button>
        )}

        <button
          onClick={onAdd}
          disabled={!canAddTransactions}
          className="flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "#5a52db",
            color:      "#fff",
          }}
        >
          <Plus size={14} />
          Add Transaction
        </button>
      </div>
    </div>
  )
}