// ─────────────────────────────────────────────────────────────
//  FinFlow — Route Constants
//  src/constants/routes.js
// ─────────────────────────────────────────────────────────────

// ─── Route Paths ──────────────────────────────────────────────
export const ROUTES = {
  DASHBOARD:       "/",
  TRANSACTIONS:    "/transactions",
  INSIGHTS:        "/insights",
  ADD_TRANSACTION: "/add-transaction",
  SETTINGS:        "/settings",
  PROFILE:         "/profile",
}

// ─── Nav Items (drives Sidebar rendering) ─────────────────────
//     section: "main" | "account"
//     badge:   optional label shown next to the nav item (e.g. "New")
export const NAV_ITEMS = [
  // ── Main section ──────────────────────────────────────────
  {
    id:        "dashboard",
    label:     "Dashboard",
    path:      ROUTES.DASHBOARD,
    icon:      "LayoutDashboard",   // lucide-react icon name
    section:   "main",
    badge:     null,
    end:       true,                // react-router NavLink `end` prop (exact match)
  },
  {
    id:        "transactions",
    label:     "Transactions",
    path:      ROUTES.TRANSACTIONS,
    icon:      "ArrowLeftRight",
    section:   "main",
    badge:     null,
    end:       false,
  },
  {
    id:        "insights",
    label:     "Insights",
    path:      ROUTES.INSIGHTS,
    icon:      "TrendingUp",
    section:   "main",
    badge:     "New",
    end:       false,
  },
  {
    id:        "add-transaction",
    label:     "Add Transaction",
    path:      ROUTES.ADD_TRANSACTION,
    icon:      "PlusCircle",
    section:   "main",
    badge:     null,
    end:       false,
  },

  // ── Account section ───────────────────────────────────────
  {
    id:        "settings",
    label:     "Settings",
    path:      ROUTES.SETTINGS,
    icon:      "Settings",
    section:   "account",
    badge:     null,
    end:       false,
  },
  {
    id:        "profile",
    label:     "Profile",
    path:      ROUTES.PROFILE,
    icon:      "User",
    section:   "account",
    badge:     null,
    end:       false,
  },
]

// ─── Grouped nav items (for Sidebar section rendering) ────────
export const NAV_SECTIONS = [
  {
    key:   "main",
    label: "Main",
    items: NAV_ITEMS.filter((n) => n.section === "main"),
  },
  {
    key:   "account",
    label: "Account",
    items: NAV_ITEMS.filter((n) => n.section === "account"),
  },
]

// ─── Page metadata (drives Topbar title + subtitle) ───────────
export const PAGE_META = {
  [ROUTES.DASHBOARD]: {
    title:    "Dashboard Overview",
    subtitle: "Monday, 23 June 2025",   // replaced dynamically
    dynamic:  true,                     // subtitle = today's date
  },
  [ROUTES.TRANSACTIONS]: {
    title:    "Transactions",
    subtitle: "Monday, 23 June 2025",
    dynamic:  true,
  },
  [ROUTES.INSIGHTS]: {
    title:    "Insights",
    subtitle: "Auto-derived analytics · June 2025",
    dynamic:  false,
  },
  [ROUTES.ADD_TRANSACTION]: {
    title:    "Add Transaction",
    subtitle: "Record a new income or expense",
    dynamic:  false,
  },
  [ROUTES.SETTINGS]: {
    title:    "Settings",
    subtitle: "Preferences & account configuration",
    dynamic:  false,
  },
  [ROUTES.PROFILE]: {
    title:    "Profile",
    subtitle: "Your personal account details",
    dynamic:  false,
  },
}

// ─── Quick Navigation links (used in Settings right panel) ────
export const QUICK_NAV_LINKS = [
  { label: "Dashboard",    path: ROUTES.DASHBOARD,    icon: "LayoutDashboard" },
  { label: "Transactions", path: ROUTES.TRANSACTIONS, icon: "ArrowLeftRight"  },
  { label: "Insights",     path: ROUTES.INSIGHTS,     icon: "TrendingUp"      },
  { label: "Add Txn",      path: ROUTES.ADD_TRANSACTION, icon: "PlusCircle"   },
]