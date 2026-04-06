// ─────────────────────────────────────────────────────────────
//  FinFlow — useLocalStorage Hook
//  src/hooks/useLocalStorage.js
// ─────────────────────────────────────────────────────────────
import { useState, useCallback, useEffect } from "react"

// ─── Core hook ────────────────────────────────────────────────
//     Works like useState but syncs to localStorage.
//     Supports any JSON-serialisable value.
export default function useLocalStorage(key, initialValue) {
  // Initialise from storage, fall back to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  // Persist every change
  const setValue = useCallback(
    (value) => {
      try {
        // Accept updater functions like setState
        const next =
          typeof value === "function" ? value(storedValue) : value
        setStoredValue(next)
        localStorage.setItem(key, JSON.stringify(next))
      } catch (err) {
        console.warn(`useLocalStorage: failed to set "${key}"`, err)
      }
    },
    [key, storedValue]
  )

  // Remove key from storage and reset to initialValue
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (err) {
      console.warn(`useLocalStorage: failed to remove "${key}"`, err)
    }
  }, [key, initialValue])

  // Sync across browser tabs / windows
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== key) return
      try {
        setStoredValue(
          e.newValue !== null ? JSON.parse(e.newValue) : initialValue
        )
      } catch {
        setStoredValue(initialValue)
      }
    }
    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [key, initialValue])

  // Storage size in KB for the current key
  const sizeKB = useCallback(() => {
    try {
      const raw = localStorage.getItem(key) ?? ""
      return parseFloat((new Blob([raw]).size / 1024).toFixed(2))
    } catch {
      return 0
    }
  }, [key])

  return [storedValue, setValue, removeValue, sizeKB]
}

// ─── Convenience: read-only getter ───────────────────────────
export function useLocalStorageValue(key, fallback = null) {
  const [value] = useLocalStorage(key, fallback)
  return value
}

// ─── Convenience: check if a key exists ──────────────────────
export function useLocalStorageExists(key) {
  return localStorage.getItem(key) !== null
}

// ─── Utility: get total localStorage usage ───────────────────
export function getTotalStorageKB() {
  try {
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      const v = localStorage.getItem(k) ?? ""
      total  += new Blob([k + v]).size
    }
    return parseFloat((total / 1024).toFixed(2))
  } catch {
    return 0
  }
}