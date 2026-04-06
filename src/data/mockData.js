// ─────────────────────────────────────────────────────────────
//  FinFlow — Mock Data
//  src/data/mockData.js
// ─────────────────────────────────────────────────────────────

// ─── User Profile ────────────────────────────────────────────
export const mockUser = {
  id: "usr_001",
  name: "Alex Morgan",
  email: "alex@finflow.io",
  avatar: null,                   // swap with an image URL if needed
  initials: "AM",
  role: "Viewer",                 // default role: Viewer | Admin | Analyst
  joinedAt: "2024-01-15",
  currency: "USD",
  dateFormat: "MMM DD, YYYY",
  compactView: false,
  darkMode: true,
  notifications: {
    budgetAlerts: true,
    weeklySummary: true,
    largeTransactions: false,
    savingsMilestones: true,
  },
}

// ─── Categories ───────────────────────────────────────────────
export const CATEGORIES = [
  { id: "housing",       label: "Housing",       icon: "🏠", color: "#7169ea", bg: "rgba(113,105,234,0.15)" },
  { id: "food",          label: "Food & Dining",  icon: "🍴", color: "#1dbd8f", bg: "rgba(29,189,143,0.15)"  },
  { id: "transport",     label: "Transport",      icon: "🚗", color: "#f0a030", bg: "rgba(240,160,48,0.15)"  },
  { id: "entertainment", label: "Entertainment",  icon: "🎬", color: "#a78bfa", bg: "rgba(167,139,250,0.15)" },
  { id: "health",        label: "Health",         icon: "❤️", color: "#e05c6b", bg: "rgba(224,92,107,0.15)"  },
  { id: "shopping",      label: "Shopping",       icon: "🛍️", color: "#f472b6", bg: "rgba(244,114,182,0.15)" },
  { id: "salary",        label: "Salary",         icon: "💼", color: "#1dbd8f", bg: "rgba(29,189,143,0.15)"  },
  { id: "freelance",     label: "Freelance",      icon: "💻", color: "#34d399", bg: "rgba(52,211,153,0.15)"  },
  { id: "investment",    label: "Investment",     icon: "📈", color: "#60a5fa", bg: "rgba(96,165,250,0.15)"  },
  { id: "utilities",     label: "Utilities",      icon: "⚡", color: "#fbbf24", bg: "rgba(251,191,36,0.15)"  },
  { id: "education",     label: "Education",      icon: "📚", color: "#818cf8", bg: "rgba(129,140,248,0.15)" },
  { id: "travel",        label: "Travel",         icon: "✈️", color: "#38bdf8", bg: "rgba(56,189,248,0.15)"  },
  { id: "insurance",     label: "Insurance",      icon: "🛡️", color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
  { id: "other",         label: "Other",          icon: "📦", color: "#94a3b8", bg: "rgba(148,163,184,0.15)" },
]

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES.find((c) => c.id === "other")

// ─── Payment Methods ──────────────────────────────────────────
export const PAYMENT_METHODS = [
  { id: "visa_4521",    label: "Visa ****4521" },
  { id: "mc_8832",      label: "Mastercard ****8832" },
  { id: "bank_chase",   label: "Chase Bank (Transfer)" },
  { id: "paypal",       label: "PayPal" },
  { id: "autopay",      label: "Auto-pay" },
  { id: "brokerage",    label: "Brokerage (Fidelity)" },
  { id: "cash",         label: "Cash" },
  { id: "zelle",        label: "Zelle" },
]

// ─── Budget Goals ─────────────────────────────────────────────
export const mockBudgets = [
  { category: "housing",       limit: 2000,  icon: "🏠", color: "#7169ea" },
  { category: "food",          limit: 800,   icon: "🍴", color: "#1dbd8f" },
  { category: "transport",     limit: 400,   icon: "🚗", color: "#f0a030" },
  { category: "entertainment", limit: 300,   icon: "🎬", color: "#a78bfa" },
  { category: "health",        limit: 250,   icon: "❤️", color: "#e05c6b" },
  { category: "shopping",      limit: 500,   icon: "🛍️", color: "#f472b6" },
  { category: "utilities",     limit: 200,   icon: "⚡", color: "#fbbf24" },
]

// ─── Savings Goal ─────────────────────────────────────────────
export const mockSavingsGoal = {
  targetRate: 50,           // % of income to save
  currentRate: 61,
  savedThisMonth: 7630,
  status: "Healthy",
}

// ─── Helpers ──────────────────────────────────────────────────
let _id = 1
const uid = () => `txn_${String(_id++).padStart(4, "0")}`

const date = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`

// ─── Transactions (248) ───────────────────────────────────────
//  Fields:
//    id, type ("income"|"expense"), description, subtitle,
//    category, amount, date, paymentMethod, notes, isRecurring
// ─────────────────────────────────────────────────────────────

export const mockTransactions = [

  // ── June 2025 ────────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,6,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,6,18), paymentMethod: "bank_chase",  notes: "Monthly rent",              isRecurring: true  },
  { id: uid(), type: "expense", description: "Uber Eats",             subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   42.80, date: date(2025,6,17), paymentMethod: "visa_4521",   notes: "Dinner order",              isRecurring: false },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,6,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Client Project",         category: "freelance",     amount:  950.00, date: date(2025,6,14), paymentMethod: "paypal",      notes: "UI design project",         isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Ride",             subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   18.50, date: date(2025,6,13), paymentMethod: "visa_4521",   notes: "Airport pickup",            isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",   amount:  124.99, date: date(2025,6,12), paymentMethod: "mc_8832",     notes: "Electronics accessories",   isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,6,10), paymentMethod: "brokerage",   notes: "Quarterly dividend",        isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   89.40, date: date(2025,6, 8), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  156.30, date: date(2025,6, 7), paymentMethod: "visa_4521",   notes: "Weekly groceries",          isRecurring: false },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,6, 6), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,6, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   62.10, date: date(2025,6, 4), paymentMethod: "visa_4521",   notes: "Full tank",                 isRecurring: false },
  { id: uid(), type: "expense", description: "Doctor Appointment",    subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   75.00, date: date(2025,6, 3), paymentMethod: "visa_4521",   notes: "Co-pay",                    isRecurring: false },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   28.40, date: date(2025,6, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,6, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Restaurant Dinner",     subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   98.50, date: date(2025,6, 1), paymentMethod: "visa_4521",   notes: "Anniversary dinner",        isRecurring: false },
  { id: uid(), type: "expense", description: "Online Course",         subtitle: "Card Payment · Mastercard ****8832", category: "education", amount:   49.00, date: date(2025,6, 1), paymentMethod: "mc_8832",     notes: "React advanced course",     isRecurring: false },
  { id: uid(), type: "expense", description: "Parking Fee",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   12.00, date: date(2025,6, 1), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,6, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },

  // ── May 2025 ─────────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,5,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,5,18), paymentMethod: "bank_chase",  notes: "Monthly rent",              isRecurring: true  },
  { id: uid(), type: "expense", description: "Whole Foods",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  134.20, date: date(2025,5,17), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,5,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,5,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · UI Kit project",         category: "freelance",     amount: 1200.00, date: date(2025,5,14), paymentMethod: "paypal",      notes: "Design system delivery",    isRecurring: false },
  { id: uid(), type: "expense", description: "Target",                subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   87.45, date: date(2025,5,13), paymentMethod: "mc_8832",     notes: "Household items",           isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Ride",             subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   22.30, date: date(2025,5,12), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,5,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   94.20, date: date(2025,5, 8), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,5, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   55.80, date: date(2025,5, 4), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,5, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,5, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Movie Tickets",         subtitle: "Card Payment · Visa ****4521",    category: "entertainment", amount:   36.00, date: date(2025,5, 9), paymentMethod: "visa_4521",   notes: "IMAX tickets x2",           isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   32.50, date: date(2025,5, 6), paymentMethod: "visa_4521",   notes: "Prescription",              isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   18.40, date: date(2025,5, 3), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Parking Ticket",        subtitle: "Cash",                            category: "transport",     amount:   65.00, date: date(2025,5,21), paymentMethod: "cash",        notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Hair Salon",            subtitle: "Card Payment · Mastercard ****8832", category: "health",    amount:   85.00, date: date(2025,5,22), paymentMethod: "mc_8832",     notes: "Haircut + styling",         isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant Lunch",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   42.00, date: date(2025,5,16), paymentMethod: "visa_4521",   notes: "Team lunch",                isRecurring: false },

  // ── April 2025 ───────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,4,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,4,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   82.60, date: date(2025,4, 8), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,4,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,4,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · App project",            category: "freelance",     amount:  750.00, date: date(2025,4,12), paymentMethod: "paypal",      notes: "Mobile app screens",        isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  145.60, date: date(2025,4,10), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,4,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,4, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,4, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,4, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Clothing Purchase",     subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:  210.00, date: date(2025,4,22), paymentMethod: "mc_8832",     notes: "Spring wardrobe",           isRecurring: false },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   58.40, date: date(2025,4,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   27.90, date: date(2025,4, 9), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   64.50, date: date(2025,4,25), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   35.20, date: date(2025,4,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Online Shopping",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   78.99, date: date(2025,4,14), paymentMethod: "mc_8832",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2025,4, 3), paymentMethod: "autopay",     notes: "Coffee bean delivery",      isRecurring: true  },
  { id: uid(), type: "expense", description: "Dental Checkup",        subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:  120.00, date: date(2025,4,28), paymentMethod: "visa_4521",   notes: "Routine cleaning",          isRecurring: false },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   26.80, date: date(2025,4, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },

  // ── March 2025 ───────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,3,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,3,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,3,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,3,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Dashboard project",      category: "freelance",     amount: 1800.00, date: date(2025,3,10), paymentMethod: "paypal",      notes: "Analytics dashboard",       isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  162.40, date: date(2025,3, 8), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,3,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  108.30, date: date(2025,3, 8), paymentMethod: "autopay",     notes: "Higher — winter heating",   isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,3, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,3, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,3, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   61.20, date: date(2025,3,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   55.99, date: date(2025,3,12), paymentMethod: "mc_8832",     notes: "Books",                     isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   52.80, date: date(2025,3,22), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   22.50, date: date(2025,3,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   41.60, date: date(2025,3,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Online Course",         subtitle: "Card Payment · Mastercard ****8832", category: "education", amount:   29.00, date: date(2025,3, 4), paymentMethod: "mc_8832",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2025,3, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   25.60, date: date(2025,3, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   18.90, date: date(2025,3,27), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },

  // ── February 2025 ────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,2,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,2,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,2,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,2,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Landing page",           category: "freelance",     amount:  650.00, date: date(2025,2,12), paymentMethod: "paypal",      notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Valentine's Day",       subtitle: "Card Payment · Visa ****4521",    category: "shopping",      amount:  145.00, date: date(2025,2,14), paymentMethod: "visa_4521",   notes: "Flowers + dinner",          isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  128.90, date: date(2025,2, 7), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,2,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  112.80, date: date(2025,2, 8), paymentMethod: "autopay",     notes: "High — cold month",         isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,2, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,2, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,2, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   59.90, date: date(2025,2,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   88.00, date: date(2025,2,14), paymentMethod: "visa_4521",   notes: "Valentine's dinner",        isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   16.40, date: date(2025,2,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   28.70, date: date(2025,2,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2025,2, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   24.20, date: date(2025,2, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   42.99, date: date(2025,2,22), paymentMethod: "mc_8832",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   22.40, date: date(2025,2,25), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },

  // ── January 2025 ─────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2025,1,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2025,1,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2025,1,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2025,1,15), paymentMethod: "autopay",     notes: "New Year fitness goal",     isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Brand project",          category: "freelance",     amount:  500.00, date: date(2025,1,10), paymentMethod: "paypal",      notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "New Year Shopping",     subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:  320.00, date: date(2025,1, 3), paymentMethod: "mc_8832",     notes: "Home decor",                isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  138.60, date: date(2025,1, 9), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2025,1,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  118.40, date: date(2025,1, 8), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2025,1, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2025,1, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2025,1, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   63.40, date: date(2025,1,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   45.60, date: date(2025,1,22), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   14.80, date: date(2025,1,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   33.50, date: date(2025,1,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2025,1, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   23.10, date: date(2025,1, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   99.99, date: date(2025,1,24), paymentMethod: "mc_8832",     notes: "Smart home device",         isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   19.80, date: date(2025,1,27), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },

  // ── December 2024 ────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,12,20), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Year-End Bonus",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 5000.00, date: date(2024,12,22), paymentMethod: "bank_chase", notes: "Annual performance bonus",  isRecurring: false },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,12,18), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Christmas Shopping",    subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:  680.00, date: date(2024,12,20), paymentMethod: "mc_8832",    notes: "Gifts for family",          isRecurring: false },
  { id: uid(), type: "expense", description: "Holiday Travel",        subtitle: "Card Payment · Visa ****4521",    category: "travel",        amount:  840.00, date: date(2024,12,23), paymentMethod: "visa_4521",  notes: "Flights home",              isRecurring: false },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,12,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,12,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,12,10), paymentMethod: "brokerage",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  115.60, date: date(2024,12, 8), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,12, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,12, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Holiday Dinner",        subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  185.00, date: date(2024,12,25), paymentMethod: "visa_4521",  notes: "Family Christmas dinner",   isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  142.30, date: date(2024,12, 7), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   57.80, date: date(2024,12,16), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,12, 5), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   22.60, date: date(2024,12, 2), paymentMethod: "bank_chase", notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,12, 3), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "New Year Party",        subtitle: "Card Payment · Visa ****4521",    category: "entertainment", amount:  120.00, date: date(2024,12,31), paymentMethod: "visa_4521",  notes: "Party supplies & drinks",  isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:  235.00, date: date(2024,12,18), paymentMethod: "mc_8832",    notes: "Winter gear",               isRecurring: false },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · End of year project",    category: "freelance",     amount:  900.00, date: date(2024,12,11), paymentMethod: "paypal",     notes: "",                          isRecurring: false },

  // ── November 2024 ────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,11,20), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,11,18), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Black Friday Shopping", subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:  520.00, date: date(2024,11,29), paymentMethod: "mc_8832",    notes: "Electronics deals",         isRecurring: false },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,11,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,11,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · SaaS dashboard",         category: "freelance",     amount: 1400.00, date: date(2024,11,14), paymentMethod: "paypal",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  148.70, date: date(2024,11, 6), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,11,10), paymentMethod: "brokerage",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   96.40, date: date(2024,11, 8), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,11, 5), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,11, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,11, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   54.20, date: date(2024,11,16), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Thanksgiving Dinner",   subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  168.40, date: date(2024,11,28), paymentMethod: "visa_4521",  notes: "Turkey + groceries",        isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   29.80, date: date(2024,11,22), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,11, 3), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   21.90, date: date(2024,11, 2), paymentMethod: "bank_chase", notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   68.99, date: date(2024,11,11), paymentMethod: "mc_8832",    notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   24.60, date: date(2024,11,25), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   72.50, date: date(2024,11,17), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },

  // ── October 2024 ─────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,10,20), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,10,18), paymentMethod: "bank_chase", notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,10,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,10,15), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · E-commerce project",     category: "freelance",     amount:  850.00, date: date(2024,10,12), paymentMethod: "paypal",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Halloween Costumes",    subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   95.00, date: date(2024,10,25), paymentMethod: "mc_8832",    notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  131.40, date: date(2024,10, 5), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,10,10), paymentMethod: "brokerage",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   88.20, date: date(2024,10, 8), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,10, 5), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,10, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,10, 1), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   56.60, date: date(2024,10,16), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   58.90, date: date(2024,10,22), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   17.20, date: date(2024,10,11), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   31.40, date: date(2024,10,19), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,10, 3), paymentMethod: "autopay",    notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   21.30, date: date(2024,10, 2), paymentMethod: "bank_chase", notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   54.99, date: date(2024,10,14), paymentMethod: "mc_8832",    notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   16.80, date: date(2024,10,27), paymentMethod: "visa_4521",  notes: "",                          isRecurring: false },

  // ── September 2024 ───────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,9,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,9,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,9,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,9,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Portfolio site",         category: "freelance",     amount:  620.00, date: date(2024,9,10), paymentMethod: "paypal",      notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Back to School",        subtitle: "Card Payment · Mastercard ****8832", category: "education", amount:  185.00, date: date(2024,9, 5), paymentMethod: "mc_8832",     notes: "Courses & books",           isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  126.80, date: date(2024,9, 6), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,9,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:   99.80, date: date(2024,9, 8), paymentMethod: "autopay",     notes: "High — summer AC",          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,9, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,9, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,9, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   51.40, date: date(2024,9,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   66.30, date: date(2024,9,22), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   15.60, date: date(2024,9,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   26.90, date: date(2024,9,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,9, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   20.80, date: date(2024,9, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   38.99, date: date(2024,9,14), paymentMethod: "mc_8832",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   14.90, date: date(2024,9,27), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },

  // ── August 2024 ──────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,8,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,8,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Summer Vacation",       subtitle: "Card Payment · Visa ****4521",    category: "travel",        amount: 1240.00, date: date(2024,8,10), paymentMethod: "visa_4521",   notes: "Beach resort 4 nights",     isRecurring: false },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,8,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,8,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Logo & branding",        category: "freelance",     amount:  480.00, date: date(2024,8,12), paymentMethod: "paypal",      notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  118.60, date: date(2024,8, 7), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,8,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  122.40, date: date(2024,8, 8), paymentMethod: "autopay",     notes: "Peak summer",               isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,8, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,8, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,8, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   60.20, date: date(2024,8,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   74.80, date: date(2024,8,22), paymentMethod: "visa_4521",   notes: "Vacation dinner",           isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,8, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   20.10, date: date(2024,8, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   72.49, date: date(2024,8,14), paymentMethod: "mc_8832",     notes: "Summer gear",               isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   13.80, date: date(2024,8,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   24.50, date: date(2024,8,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   11.90, date: date(2024,8,27), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },

  // ── July 2024 ────────────────────────────────────────────────
  { id: uid(), type: "income",  description: "Salary Deposit",        subtitle: "Direct Transfer · Chase Bank",    category: "salary",        amount: 8500.00, date: date(2024,7,20), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Rent Payment",          subtitle: "Bank Transfer · Landlord",        category: "housing",       amount: 1800.00, date: date(2024,7,18), paymentMethod: "bank_chase",  notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Netflix Subscription",  subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:   15.99, date: date(2024,7,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gym Membership",        subtitle: "Auto-pay · Monthly",              category: "health",        amount:   49.99, date: date(2024,7,15), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Freelance Payment",     subtitle: "PayPal · Website redesign",       category: "freelance",     amount: 1100.00, date: date(2024,7,12), paymentMethod: "paypal",      notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "July 4th BBQ",          subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  138.00, date: date(2024,7, 4), paymentMethod: "visa_4521",   notes: "Party supplies",            isRecurring: false },
  { id: uid(), type: "expense", description: "Grocery Shopping",      subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:  124.30, date: date(2024,7, 7), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "income",  description: "Dividend Income",       subtitle: "Brokerage · Fidelity",            category: "investment",    amount:  320.00, date: date(2024,7,10), paymentMethod: "brokerage",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Electric Bill",         subtitle: "Auto-pay · ConEd",                category: "utilities",     amount:  105.60, date: date(2024,7, 8), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Spotify Premium",       subtitle: "Auto-pay · Monthly",              category: "entertainment", amount:    9.99, date: date(2024,7, 5), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Health Insurance",      subtitle: "Auto-pay · Monthly",              category: "insurance",     amount:  245.00, date: date(2024,7, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Internet Bill",         subtitle: "Auto-pay · Comcast",              category: "utilities",     amount:   79.99, date: date(2024,7, 1), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "expense", description: "Gas Station",           subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   53.80, date: date(2024,7,16), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Restaurant",            subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   62.40, date: date(2024,7,22), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Subscription",   subtitle: "Auto-pay · Monthly",              category: "food",          amount:   24.00, date: date(2024,7, 3), paymentMethod: "autopay",     notes: "",                          isRecurring: true  },
  { id: uid(), type: "income",  description: "Interest Income",       subtitle: "Chase Savings Account",           category: "investment",    amount:   19.50, date: date(2024,7, 2), paymentMethod: "bank_chase",  notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Amazon Purchase",       subtitle: "Card Payment · Mastercard ****8832", category: "shopping",  amount:   46.99, date: date(2024,7,14), paymentMethod: "mc_8832",     notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Coffee Shop",           subtitle: "Card Payment · Visa ****4521",    category: "food",          amount:   12.60, date: date(2024,7,11), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Uber Rides",            subtitle: "Card Payment · Visa ****4521",    category: "transport",     amount:   22.80, date: date(2024,7,19), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
  { id: uid(), type: "expense", description: "Pharmacy",              subtitle: "Card Payment · Visa ****4521",    category: "health",        amount:   13.40, date: date(2024,7,27), paymentMethod: "visa_4521",   notes: "",                          isRecurring: false },
]

// ─── Derived Calculations (for Insights / Dashboard) ─────────
export function getTransactionsByMonth(transactions, year, month) {
  return transactions.filter((t) => {
    const d = new Date(t.date)
    return d.getFullYear() === year && d.getMonth() + 1 === month
  })
}

export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getNetBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions)
}

export function getExpensesByCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense")
  const totals = {}
  expenses.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount
  })
  return totals
}

export function getMonthlySummary(transactions) {
  const months = {}
  transactions.forEach((t) => {
    const d    = new Date(t.date)
    const key  = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    if (!months[key]) months[key] = { income: 0, expenses: 0 }
    if (t.type === "income")  months[key].income   += t.amount
    if (t.type === "expense") months[key].expenses += t.amount
  })
  return Object.entries(months)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      income:   data.income,
      expenses: data.expenses,
      net:      data.income - data.expenses,
    }))
}

export function getBudgetProgress(transactions, budgets, year, month) {
  const monthTxns    = getTransactionsByMonth(transactions, year, month)
  const byCategory   = getExpensesByCategory(monthTxns)
  return budgets.map((b) => ({
    ...b,
    label:   CATEGORIES.find((c) => c.id === b.category)?.label ?? b.category,
    spent:   byCategory[b.category] ?? 0,
    percent: Math.min(Math.round(((byCategory[b.category] ?? 0) / b.limit) * 100), 100),
  }))
}