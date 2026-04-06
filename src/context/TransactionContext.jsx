// ─────────────────────────────────────────────────────────────
//  FinFlow — Transaction Context
//  src/context/TransactionContext.jsx
// ─────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { mockTransactions, mockBudgets, mockSavingsGoal } from "../data/mockData"
import {
  getTotalIncome,
  getTotalExpenses,
  getNetBalance,
  getExpensesByCategory,
  getMonthlySummary,
  getBudgetProgress,
  getTransactionsByMonth,
} from "../data/mockData"

// ─── Storage key ──────────────────────────────────────────────
const STORAGE_KEY = "finflow_transactions"

// ─── Helpers ──────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

const saveToStorage = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch {}
}

const generateId = () =>
  `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

// ─── Reducer ──────────────────────────────────────────────────
const ACTIONS = {
  ADD:    "ADD",
  EDIT:   "EDIT",
  DELETE: "DELETE",
  RESET:  "RESET",
  SET:    "SET",
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD: {
      const newTxn = { ...action.payload, id: generateId() }
      return [newTxn, ...state]
    }
    case ACTIONS.EDIT: {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      )
    }
    case ACTIONS.DELETE: {
      return state.filter((t) => t.id !== action.payload)
    }
    case ACTIONS.RESET: {
      return mockTransactions
    }
    case ACTIONS.SET: {
      return action.payload
    }
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────
const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(
    reducer,
    null,
    () => loadFromStorage() ?? mockTransactions
  )

  // Persist every change to localStorage
  useEffect(() => {
    saveToStorage(transactions)
  }, [transactions])

  // ── Actions ─────────────────────────────────────────────────
  const addTransaction = useCallback((data) => {
    dispatch({ type: ACTIONS.ADD, payload: data })
  }, [])

  const editTransaction = useCallback((data) => {
    dispatch({ type: ACTIONS.EDIT, payload: data })
  }, [])

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id })
  }, [])

  const resetTransactions = useCallback(() => {
    dispatch({ type: ACTIONS.RESET })
  }, [])

  const clearAllTransactions = useCallback(() => {
    dispatch({ type: ACTIONS.SET, payload: [] })
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  // ── Derived values (memoised) ────────────────────────────────
  const totalIncome   = useMemo(() => getTotalIncome(transactions),   [transactions])
  const totalExpenses = useMemo(() => getTotalExpenses(transactions),  [transactions])
  const netBalance    = useMemo(() => getNetBalance(transactions),     [transactions])
  const monthlySummary = useMemo(() => getMonthlySummary(transactions), [transactions])

  // Current month (June 2025 to match mock data)
  const NOW_YEAR  = 2025
  const NOW_MONTH = 6

  const currentMonthTxns = useMemo(
    () => getTransactionsByMonth(transactions, NOW_YEAR, NOW_MONTH),
    [transactions]
  )

  const currentMonthIncome   = useMemo(() => getTotalIncome(currentMonthTxns),   [currentMonthTxns])
  const currentMonthExpenses = useMemo(() => getTotalExpenses(currentMonthTxns), [currentMonthTxns])
  const currentMonthNet      = useMemo(() => getNetBalance(currentMonthTxns),    [currentMonthTxns])

  const expensesByCategory = useMemo(
    () => getExpensesByCategory(currentMonthTxns),
    [currentMonthTxns]
  )

  const budgetProgress = useMemo(
    () => getBudgetProgress(transactions, mockBudgets, NOW_YEAR, NOW_MONTH),
    [transactions]
  )

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [transactions]
  )

  // localStorage size info (for Settings storage status)
  const storageInfo = useMemo(() => {
    try {
      const raw  = localStorage.getItem(STORAGE_KEY) ?? ""
      const kb   = (new Blob([raw]).size / 1024).toFixed(1)
      return { kb, raw: raw.length }
    } catch {
      return { kb: "0.0", raw: 0 }
    }
  }, [transactions])

  // ── Export helpers ───────────────────────────────────────────
  const exportCSV = useCallback(() => {
    const headers = ["id","type","description","subtitle","category","amount","date","paymentMethod","notes","isRecurring"]
    const rows    = transactions.map((t) =>
      headers.map((h) => JSON.stringify(t[h] ?? "")).join(",")
    )
    const csv  = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href     = url
    a.download = `finflow_transactions_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [transactions])

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(transactions, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href     = url
    a.download = `finflow_transactions_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [transactions])

  const importJSON = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        if (Array.isArray(parsed)) {
          dispatch({ type: ACTIONS.SET, payload: parsed })
        }
      } catch {
        console.error("Failed to parse imported JSON")
      }
    }
    reader.readAsText(file)
  }, [])

  // ── Context value ────────────────────────────────────────────
  const value = {
    // Raw data
    transactions,

    // Actions
    addTransaction,
    editTransaction,
    deleteTransaction,
    resetTransactions,
    clearAllTransactions,

    // All-time derived
    totalIncome,
    totalExpenses,
    netBalance,
    monthlySummary,

    // Current month derived
    currentMonthTxns,
    currentMonthIncome,
    currentMonthExpenses,
    currentMonthNet,
    expensesByCategory,
    budgetProgress,
    recentTransactions,

    // Savings (from mock goal — can be made dynamic later)
    savingsGoal: mockSavingsGoal,

    // Storage
    storageInfo,

    // Import / Export
    exportCSV,
    exportJSON,
    importJSON,

    // Constants
    NOW_YEAR,
    NOW_MONTH,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useTransactions() {
  const ctx = useContext(TransactionContext)
  if (!ctx) throw new Error("useTransactions must be used inside <TransactionProvider>")
  return ctx
}

export default TransactionContext