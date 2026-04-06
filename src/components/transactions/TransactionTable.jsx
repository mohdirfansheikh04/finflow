// ─────────────────────────────────────────────────────────────
//  FinFlow — Transaction Table
//  src/components/transactions/TransactionTable.jsx
// ─────────────────────────────────────────────────────────────
import { useState }   from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import TransactionRow from "./TransactionRow"

// ─── Sort icon ────────────────────────────────────────────────
function SortIcon({ field, sort }) {
  const [col, dir] = sort.split("_")
  if (col !== field)
    return <ChevronsUpDown size={12} className="text-[#5a5b80]" />
  return dir === "asc"
    ? <ChevronUp   size={12} className="text-[#8f87f2]" />
    : <ChevronDown size={12} className="text-[#8f87f2]" />
}

// ─── Sortable header cell ─────────────────────────────────────
function Th({ label, field, sort, onSort, align = "left" }) {
  const sortable = Boolean(field)
  return (
    <th
      onClick={() => sortable && onSort(field)}
      className={[
        "px-4 py-3 text-[11px] font-semibold uppercase tracking-wider",
        "text-[#9091b0] whitespace-nowrap select-none",
        `text-${align}`,
        sortable ? "cursor-pointer hover:text-[#e8e9f4] transition-colors" : "",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex items-center gap-1",
          align === "right" ? "justify-end w-full" : "",
        ].join(" ")}
      >
        {label}
        {sortable && <SortIcon field={field} sort={sort} />}
      </span>
    </th>
  )
}

// ─── Main table ───────────────────────────────────────────────
export default function TransactionTable({ transactions, sort, onSort }) {
  const [selected, setSelected] = useState([])

  const allSelected =
    transactions.length > 0 && selected.length === transactions.length

  const toggleAll = () =>
    setSelected(allSelected ? [] : transactions.map((t) => t.id))

  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  return (
    <div
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow:     "hidden",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* ── Head ─────────────────────────────────────────── */}
          <thead style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <tr style={{ background: "rgba(255,255,255,0.02)" }}>

              {/* Select-all checkbox */}
              <th className="pl-4 pr-2 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded accent-[#5a52db] cursor-pointer"
                />
              </th>

              <Th label="Description" field="desc"   sort={sort} onSort={onSort} />
              <Th label="Category"                    sort={sort} onSort={onSort} />
              <Th label="Type"                        sort={sort} onSort={onSort} />
              <Th label="Date"        field="date"   sort={sort} onSort={onSort} />
              <Th
                label="Amount"
                field="amount"
                sort={sort}
                onSort={onSort}
                align="right"
              />
              <Th label="Actions" sort={sort} onSort={onSort} />
            </tr>
          </thead>

          {/* ── Body ─────────────────────────────────────────── */}
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-20 text-center text-sm text-[#9091b0]"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <TransactionRow
                  key={txn.id}
                  txn={txn}
                  selected={selected.includes(txn.id)}
                  onSelect={toggleOne}
                />
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ── Selection count bar ──────────────────────────────── */}
      {selected.length > 0 && (
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-[#9091b0]">
            <span className="text-[#e8e9f4] font-medium">{selected.length}</span>{" "}
            {selected.length === 1 ? "transaction" : "transactions"} selected
          </p>
          <button
            onClick={() => setSelected([])}
            className="text-xs text-[#8f87f2] hover:text-[#a49ef5] transition-colors"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  )
}