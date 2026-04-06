// ─────────────────────────────────────────────────────────────
//  FinFlow — Auth Context (Role System)
//  src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { mockUser } from "../data/mockData"
import {
  ROLES,
  ROLE_META,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasFullPermission,
} from "../constants/roles"

// ─── Storage keys ─────────────────────────────────────────────
const ROLE_KEY = "finflow_user_role"
const USER_KEY = "finflow_user_profile"

// ─── Helpers ──────────────────────────────────────────────────
const loadRole = () => {
  try {
    const stored = localStorage.getItem(ROLE_KEY)
    if (stored && Object.values(ROLES).includes(stored)) return stored
  } catch {}
  return mockUser.role // default: Viewer
}

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (raw) return { ...mockUser, ...JSON.parse(raw) }
  } catch {}
  return mockUser
}

const saveRole = (role) => {
  try { localStorage.setItem(ROLE_KEY, role) } catch {}
}

const saveProfile = (profile) => {
  try { localStorage.setItem(USER_KEY, JSON.stringify(profile)) } catch {}
}

// ─── Context ──────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role,    setRoleState]    = useState(loadRole)
  const [user,    setUserState]    = useState(loadProfile)
  const [isActive, setIsActive]   = useState(true) // mock "Active" badge

  // Persist role
  useEffect(() => { saveRole(role) }, [role])

  // Persist profile
  useEffect(() => { saveProfile(user) }, [user])

  // ── Role actions ─────────────────────────────────────────────
  const switchRole = useCallback((newRole) => {
    if (!Object.values(ROLES).includes(newRole)) return
    setRoleState(newRole)
    setUserState((prev) => ({ ...prev, role: newRole }))
  }, [])

  // ── Profile actions ──────────────────────────────────────────
  const updateProfile = useCallback((updates) => {
    setUserState((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateNotifications = useCallback((key, value) => {
    setUserState((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }, [])

  const updatePreferences = useCallback((updates) => {
    setUserState((prev) => ({ ...prev, ...updates }))
  }, [])

  // ── Permission helpers ───────────────────────────────────────
  // can(permission) → boolean: true if role has any access (read or full)
  const can = useCallback(
    (permission) => hasPermission(role, permission),
    [role]
  )

  // canFull(permission) → boolean: true only if role has write access
  const canFull = useCallback(
    (permission) => hasFullPermission(role, permission),
    [role]
  )

  // getAccess(permission) → "full" | "read" | false
  const getAccess = useCallback(
    (permission) => ROLE_PERMISSIONS[role]?.[permission] ?? false,
    [role]
  )

  // ── Convenience booleans (used frequently in UI) ─────────────
  const isViewer  = role === ROLES.VIEWER
  const isAdmin   = role === ROLES.ADMIN
  const isAnalyst = role === ROLES.ANALYST

  const canAddTransactions    = canFull(PERMISSIONS.ADD_TRANSACTIONS)
  const canEditTransactions   = canFull(PERMISSIONS.EDIT_TRANSACTIONS)
  const canDeleteTransactions = canFull(PERMISSIONS.DELETE_TRANSACTIONS)
  const canExportData         = can(PERMISSIONS.EXPORT_DATA)
  const canImportData         = canFull(PERMISSIONS.IMPORT_DATA)
  const canManageSettings     = canFull(PERMISSIONS.MANAGE_SETTINGS)
  const canClearData          = canFull(PERMISSIONS.CLEAR_DATA)

  // ── Role meta (color, icon, etc. for display) ────────────────
  const roleMeta = ROLE_META[role]

  // ── localStorage size info for Settings storage panel ────────
  const storageKeys = [
    { key: "finflow_transactions", label: "finflow_transactions" },
    { key: "finflow_settings",     label: "finflow_settings"     },
    { key: ROLE_KEY,               label: "finflow_user_role"    },
    { key: "finflow_preferences",  label: "finflow_preferences"  },
  ]

  const storageStatus = storageKeys.map(({ key, label }) => {
    try {
      const raw = localStorage.getItem(key)
      const kb  = raw ? (new Blob([raw]).size / 1024).toFixed(1) : null
      return { label, kb, status: raw ? "synced" : "pending" }
    } catch {
      return { label, kb: null, status: "pending" }
    }
  })

  // ── Context value ─────────────────────────────────────────────
  const value = {
    // User
    user,
    updateProfile,
    updateNotifications,
    updatePreferences,
    isActive,

    // Role
    role,
    roleMeta,
    switchRole,
    isViewer,
    isAdmin,
    isAnalyst,

    // Generic permission checkers
    can,
    canFull,
    getAccess,

    // Convenience permission booleans
    canAddTransactions,
    canEditTransactions,
    canDeleteTransactions,
    canExportData,
    canImportData,
    canManageSettings,
    canClearData,

    // Storage status (for Settings panel)
    storageStatus,

    // Re-export constants so consumers don't need separate imports
    ROLES,
    PERMISSIONS,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

export default AuthContext