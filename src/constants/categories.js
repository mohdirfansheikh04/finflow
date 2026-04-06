// ─────────────────────────────────────────────────────────────
//  FinFlow — Category Constants
//  src/constants/categories.js
// ─────────────────────────────────────────────────────────────

// ─── All Categories ───────────────────────────────────────────
export const CATEGORIES = [
  {
    id:          "housing",
    label:       "Housing",
    icon:        "🏠",
    color:       "#7169ea",
    bg:          "rgba(113, 105, 234, 0.15)",
    textColor:   "#a49ef5",
    type:        "expense",
    description: "Rent, mortgage, repairs",
  },
  {
    id:          "food",
    label:       "Food & Dining",
    icon:        "🍴",
    color:       "#1dbd8f",
    bg:          "rgba(29, 189, 143, 0.15)",
    textColor:   "#1dbd8f",
    type:        "expense",
    description: "Groceries, restaurants, takeout",
  },
  {
    id:          "transport",
    label:       "Transport",
    icon:        "🚗",
    color:       "#f0a030",
    bg:          "rgba(240, 160, 48, 0.15)",
    textColor:   "#f0a030",
    type:        "expense",
    description: "Gas, Uber, public transit",
  },
  {
    id:          "entertainment",
    label:       "Entertainment",
    icon:        "🎬",
    color:       "#a78bfa",
    bg:          "rgba(167, 139, 250, 0.15)",
    textColor:   "#a78bfa",
    type:        "expense",
    description: "Streaming, movies, events",
  },
  {
    id:          "health",
    label:       "Health",
    icon:        "❤️",
    color:       "#e05c6b",
    bg:          "rgba(224, 92, 107, 0.15)",
    textColor:   "#e05c6b",
    type:        "expense",
    description: "Doctor, pharmacy, gym",
  },
  {
    id:          "shopping",
    label:       "Shopping",
    icon:        "🛍️",
    color:       "#f472b6",
    bg:          "rgba(244, 114, 182, 0.15)",
    textColor:   "#f472b6",
    type:        "expense",
    description: "Clothing, electronics, Amazon",
  },
  {
    id:          "utilities",
    label:       "Utilities",
    icon:        "⚡",
    color:       "#fbbf24",
    bg:          "rgba(251, 191, 36, 0.15)",
    textColor:   "#fbbf24",
    type:        "expense",
    description: "Electric, internet, phone",
  },
  {
    id:          "education",
    label:       "Education",
    icon:        "📚",
    color:       "#818cf8",
    bg:          "rgba(129, 140, 248, 0.15)",
    textColor:   "#818cf8",
    type:        "expense",
    description: "Courses, books, tuition",
  },
  {
    id:          "travel",
    label:       "Travel",
    icon:        "✈️",
    color:       "#38bdf8",
    bg:          "rgba(56, 189, 248, 0.15)",
    textColor:   "#38bdf8",
    type:        "expense",
    description: "Flights, hotels, vacation",
  },
  {
    id:          "insurance",
    label:       "Insurance",
    icon:        "🛡️",
    color:       "#94a3b8",
    bg:          "rgba(148, 163, 184, 0.15)",
    textColor:   "#94a3b8",
    type:        "expense",
    description: "Health, car, home insurance",
  },
  {
    id:          "salary",
    label:       "Salary",
    icon:        "💼",
    color:       "#1dbd8f",
    bg:          "rgba(29, 189, 143, 0.15)",
    textColor:   "#1dbd8f",
    type:        "income",
    description: "Monthly salary deposit",
  },
  {
    id:          "freelance",
    label:       "Freelance",
    icon:        "💻",
    color:       "#34d399",
    bg:          "rgba(52, 211, 153, 0.15)",
    textColor:   "#34d399",
    type:        "income",
    description: "Client projects, contracts",
  },
  {
    id:          "investment",
    label:       "Investment",
    icon:        "📈",
    color:       "#60a5fa",
    bg:          "rgba(96, 165, 250, 0.15)",
    textColor:   "#60a5fa",
    type:        "income",
    description: "Dividends, interest, returns",
  },
  {
    id:          "other",
    label:       "Other",
    icon:        "📦",
    color:       "#94a3b8",
    bg:          "rgba(148, 163, 184, 0.15)",
    textColor:   "#94a3b8",
    type:        "both",
    description: "Miscellaneous transactions",
  },
]

// ─── Expense-only categories (for Add Transaction modal) ──────
export const EXPENSE_CATEGORIES = CATEGORIES.filter(
  (c) => c.type === "expense" || c.type === "both"
)

// ─── Income-only categories (for Add Transaction modal) ───────
export const INCOME_CATEGORIES = CATEGORIES.filter(
  (c) => c.type === "income" || c.type === "both"
)

// ─── Lookup helpers ───────────────────────────────────────────
export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES.find((c) => c.id === "other")

export const getCategoryLabel = (id) => getCategoryById(id)?.label ?? "Other"

export const getCategoryIcon = (id) => getCategoryById(id)?.icon ?? "📦"

export const getCategoryColor = (id) => getCategoryById(id)?.color ?? "#94a3b8"

export const getCategoryBg = (id) => getCategoryById(id)?.bg ?? "rgba(148,163,184,0.15)"

// ─── Chart color map (for Recharts / donut) ───────────────────
//     keyed by category id → hex string
export const CATEGORY_CHART_COLORS = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c.color])
)

// ─── Spending categories list (Insights page) ─────────────────
//     ordered by typical monthly spend share
export const SPENDING_ORDER = [
  "housing",
  "food",
  "transport",
  "entertainment",
  "health",
  "shopping",
  "utilities",
  "insurance",
  "education",
  "travel",
  "other",
]