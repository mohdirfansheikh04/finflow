// ─────────────────────────────────────────────────────────────
//  FinFlow — Role & Permission Constants
//  src/constants/roles.js
// ─────────────────────────────────────────────────────────────

// ─── Role IDs ─────────────────────────────────────────────────
export const ROLES = {
  VIEWER:  "Viewer",
  ADMIN:   "Admin",
  ANALYST: "Analyst",
}

// ─── Role metadata (used in Settings + Topbar pills) ──────────
export const ROLE_META = {
  [ROLES.VIEWER]: {
    id:          ROLES.VIEWER,
    label:       "Viewer",
    icon:        "👁",
    color:       "#7169ea",
    bg:          "rgba(113, 105, 234, 0.15)",
    description: "Read-only access to dashboard and insights",
  },
  [ROLES.ADMIN]: {
    id:          ROLES.ADMIN,
    label:       "Admin",
    icon:        "⭐",
    color:       "#f0a030",
    bg:          "rgba(240, 160, 48, 0.15)",
    description: "Full access — add, edit, and delete transactions",
  },
  [ROLES.ANALYST]: {
    id:          ROLES.ANALYST,
    label:       "Analyst",
    icon:        "📊",
    color:       "#1dbd8f",
    bg:          "rgba(29, 189, 143, 0.15)",
    description: "Read access plus insights and analytics",
  },
}

// ─── Permission Keys ──────────────────────────────────────────
export const PERMISSIONS = {
  VIEW_DASHBOARD:       "view_dashboard",
  VIEW_TRANSACTIONS:    "view_transactions",
  VIEW_INSIGHTS:        "view_insights",
  VIEW_SETTINGS:        "view_settings",
  ADD_TRANSACTIONS:     "add_transactions",
  EDIT_TRANSACTIONS:    "edit_transactions",
  DELETE_TRANSACTIONS:  "delete_transactions",
  EXPORT_DATA:          "export_data",
  IMPORT_DATA:          "import_data",
  MANAGE_SETTINGS:      "manage_settings",
  SWITCH_ROLE:          "switch_role",
  CLEAR_DATA:           "clear_data",
}

// ─── Permission Matrix ────────────────────────────────────────
//     true  → full access
//     false → no access
//     "read"→ read-only (used for partial access display)
export const ROLE_PERMISSIONS = {
  [ROLES.VIEWER]: {
    [PERMISSIONS.VIEW_DASHBOARD]:      true,
    [PERMISSIONS.VIEW_TRANSACTIONS]:   true,
    [PERMISSIONS.VIEW_INSIGHTS]:       true,
    [PERMISSIONS.VIEW_SETTINGS]:       true,
    [PERMISSIONS.ADD_TRANSACTIONS]:    false,
    [PERMISSIONS.EDIT_TRANSACTIONS]:   false,
    [PERMISSIONS.DELETE_TRANSACTIONS]: false,
    [PERMISSIONS.EXPORT_DATA]:         false,
    [PERMISSIONS.IMPORT_DATA]:         false,
    [PERMISSIONS.MANAGE_SETTINGS]:     false,
    [PERMISSIONS.SWITCH_ROLE]:         true,
    [PERMISSIONS.CLEAR_DATA]:          false,
  },
  [ROLES.ADMIN]: {
    [PERMISSIONS.VIEW_DASHBOARD]:      true,
    [PERMISSIONS.VIEW_TRANSACTIONS]:   true,
    [PERMISSIONS.VIEW_INSIGHTS]:       true,
    [PERMISSIONS.VIEW_SETTINGS]:       true,
    [PERMISSIONS.ADD_TRANSACTIONS]:    true,
    [PERMISSIONS.EDIT_TRANSACTIONS]:   true,
    [PERMISSIONS.DELETE_TRANSACTIONS]: true,
    [PERMISSIONS.EXPORT_DATA]:         true,
    [PERMISSIONS.IMPORT_DATA]:         true,
    [PERMISSIONS.MANAGE_SETTINGS]:     true,
    [PERMISSIONS.SWITCH_ROLE]:         true,
    [PERMISSIONS.CLEAR_DATA]:          true,
  },
  [ROLES.ANALYST]: {
    [PERMISSIONS.VIEW_DASHBOARD]:      true,
    [PERMISSIONS.VIEW_TRANSACTIONS]:   true,
    [PERMISSIONS.VIEW_INSIGHTS]:       true,
    [PERMISSIONS.VIEW_SETTINGS]:       true,
    [PERMISSIONS.ADD_TRANSACTIONS]:    "read",
    [PERMISSIONS.EDIT_TRANSACTIONS]:   false,
    [PERMISSIONS.DELETE_TRANSACTIONS]: false,
    [PERMISSIONS.EXPORT_DATA]:         true,
    [PERMISSIONS.IMPORT_DATA]:         false,
    [PERMISSIONS.MANAGE_SETTINGS]:     false,
    [PERMISSIONS.SWITCH_ROLE]:         true,
    [PERMISSIONS.CLEAR_DATA]:          false,
  },
}

// ─── Permission Matrix Table Rows (Settings page display) ─────
//     Drives the "Permission Matrix" table in RolePermissions.jsx
export const PERMISSION_MATRIX_ROWS = [
  {
    feature:    "View Dashboard",
    permission: PERMISSIONS.VIEW_DASHBOARD,
    viewer:     { access: "full",  label: "Full" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "full",  label: "Full" },
  },
  {
    feature:    "View Transactions",
    permission: PERMISSIONS.VIEW_TRANSACTIONS,
    viewer:     { access: "full",  label: "Full" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "full",  label: "Full" },
  },
  {
    feature:    "Add Transactions",
    permission: PERMISSIONS.ADD_TRANSACTIONS,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "read",  label: "Read" },
  },
  {
    feature:    "Edit Transactions",
    permission: PERMISSIONS.EDIT_TRANSACTIONS,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "none",  label: "None" },
  },
  {
    feature:    "Delete Transactions",
    permission: PERMISSIONS.DELETE_TRANSACTIONS,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "none",  label: "None" },
  },
  {
    feature:    "Export Data",
    permission: PERMISSIONS.EXPORT_DATA,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "full",  label: "Full" },
  },
  {
    feature:    "Import Data",
    permission: PERMISSIONS.IMPORT_DATA,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "none",  label: "None" },
  },
  {
    feature:    "Manage Settings",
    permission: PERMISSIONS.MANAGE_SETTINGS,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "none",  label: "None" },
  },
  {
    feature:    "Clear All Data",
    permission: PERMISSIONS.CLEAR_DATA,
    viewer:     { access: "none",  label: "None" },
    admin:      { access: "full",  label: "Full" },
    analyst:    { access: "none",  label: "None" },
  },
]

// ─── Access level styles (for rendering permission cells) ─────
export const ACCESS_STYLES = {
  full: {
    icon:      "✓",
    label:     "Full",
    color:     "#1dbd8f",
    bg:        "rgba(29, 189, 143, 0.15)",
    border:    "rgba(29, 189, 143, 0.30)",
  },
  read: {
    icon:      "~",
    label:     "Read",
    color:     "#f0a030",
    bg:        "rgba(240, 160, 48, 0.15)",
    border:    "rgba(240, 160, 48, 0.30)",
  },
  none: {
    icon:      "✕",
    label:     "None",
    color:     "#9091b0",
    bg:        "rgba(144, 145, 176, 0.10)",
    border:    "rgba(144, 145, 176, 0.20)",
  },
}

// ─── Helper — check if a role has a permission ────────────────
export const hasPermission = (role, permission) => {
  const matrix = ROLE_PERMISSIONS[role]
  if (!matrix) return false
  return matrix[permission] === true || matrix[permission] === "read"
}

// ─── Helper — check if a role has FULL (write) permission ─────
export const hasFullPermission = (role, permission) => {
  const matrix = ROLE_PERMISSIONS[role]
  if (!matrix) return false
  return matrix[permission] === true
}

// ─── Helper — get role list for the tab switcher ──────────────
export const ROLE_LIST = [ROLES.VIEWER, ROLES.ADMIN, ROLES.ANALYST]