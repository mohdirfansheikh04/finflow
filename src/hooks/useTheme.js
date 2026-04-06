// ─────────────────────────────────────────────────────────────
//  FinFlow — useTheme Hook
//  src/hooks/useTheme.js
//
//  Thin re-export of ThemeContext so components
//  import from one consistent place.
// ─────────────────────────────────────────────────────────────
export { useTheme as default } from "../context/ThemeContext"

// ─── Usage ────────────────────────────────────────────────────
//
//  import useTheme from "../hooks/useTheme"
//
//  const { isDark, toggleTheme, setDark, setLight } = useTheme()
//
//  isDark       → boolean  — true when dark mode is active
//  toggleTheme  → ()       — flip current mode
//  setDark      → ()       — force dark mode
//  setLight     → ()       — force light mode