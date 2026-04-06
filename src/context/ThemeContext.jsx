// ─────────────────────────────────────────────────────────────
//  FinFlow — Theme Context
//  src/context/ThemeContext.jsx
// ─────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

const STORAGE_KEY = "finflow_theme"

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) return JSON.parse(stored)
    } catch {}
    return true // default: dark mode
  })

  // Sync <html> class and persist on every change
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark))
    } catch {}
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const setDark  = () => setIsDark(true)
  const setLight = () => setIsDark(false)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setDark, setLight }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}

export default ThemeContext