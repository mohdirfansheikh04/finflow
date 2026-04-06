// ─────────────────────────────────────────────────────────────
//  FinFlow — Transaction Row
//  src/components/transactions/TransactionRow.jsx
// ─────────────────────────────────────────────────────────────
import { Pencil, Trash2 }  from "lucide-react"
import { getCategoryById } from "../../constants/categories"
import { useAuth }         from "../../context/AuthContext"
import { useTransactions } from "../../context/TransactionContext"

// ─── Helpers ──────────────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style:                 "currency",
    currency:              "USD",
    minimumFractionDigits: 2,
  }).format(n)
}

function fmtDate(s) {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  })
}

// ─────────────────────────────────────────────────────────────
export default function TransactionRow({ txn, selected, onSelect }) {
  const cat      = getCategoryById(txn.category)
  const isIncome = txn.type === "income"

  const { canEditTransactions, canDeleteTransactions } = useAuth()
  const { deleteTransaction } = useTransactions()

  return (
    <tr
      className="group transition-colors duration-100 hover:bg-[rgba(255,255,255,0.025)]"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* ── Checkbox ─────────────────────────────────────────── */}
      <td className="pl-4 pr-2 py-3.5 w-8">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(txn.id)}
          className="w-3.5 h-3.5 rounded accent-[#5a52db] cursor-pointer"
        />
      </td>

      {/* ── Description + subtitle ────────────────────────────── */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          {/* Category icon bubble */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0"
            style={{ background: cat.bg }}
          >
            {cat.icon}
          </div>

          {/* Text */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#e8e9f4] leading-none truncate max-w-50">
              {txn.description}
            </p>
            <p className="text-xs text-[#9091b0] mt-0.5 leading-none truncate max-w-50">
              {txn.subtitle}
            </p>
          </div>
        </div>
      </td>

      {/* ── Category ─────────────────────────────────────────── */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{cat.icon}</span>
          <span className="text-sm text-[#9091b0]">{cat.label}</span>
        </div>
      </td>

      {/* ── Type badge ───────────────────────────────────────── */}
      <td className="px-4 py-3.5">
        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: isIncome
              ? "rgba(29,189,143,0.12)"
              : "rgba(224,92,107,0.12)",
            color: isIncome ? "#1dbd8f" : "#e05c6b",
            border: isIncome
              ? "1px solid rgba(29,189,143,0.25)"
              : "1px solid rgba(224,92,107,0.25)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: isIncome ? "#1dbd8f" : "#e05c6b" }}
          />
          {isIncome ? "Income" : "Expense"}
        </span>
      </td>

      {/* ── Date ─────────────────────────────────────────────── */}
      <td className="px-4 py-3.5">
        <span className="text-sm text-[#9091b0]">{fmtDate(txn.date)}</span>
      </td>

      {/* ── Amount ───────────────────────────────────────────── */}
      <td className="px-4 py-3.5 text-right">
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: isIncome ? "#1dbd8f" : "#e05c6b" }}
        >
          {isIncome ? "+" : "-"}{fmt(txn.amount)}
        </span>
      </td>

      {/* ── Actions (hover-reveal) ────────────────────────────── */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {canEditTransactions && (
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#8f87f2] hover:bg-[rgba(90,82,219,0.12)] transition-colors"
              title="Edit transaction"
            >
              <Pencil size={13} />
            </button>
          )}
          {canDeleteTransactions && (
            <button
              onClick={() => deleteTransaction(txn.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#e05c6b] hover:bg-[rgba(224,92,107,0.10)] transition-colors"
              title="Delete transaction"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}