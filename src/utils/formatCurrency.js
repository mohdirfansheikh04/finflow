// ─────────────────────────────────────────────────────────────
//  FinFlow — Currency Formatting Utilities
//  src/utils/formatCurrency.js
// ─────────────────────────────────────────────────────────────

// ─── Supported currencies ─────────────────────────────────────
const CURRENCY_MAP = {
  USD: { locale: "en-US",    currency: "USD", symbol: "$"  },
  EUR: { locale: "de-DE",    currency: "EUR", symbol: "€"  },
  GBP: { locale: "en-GB",    currency: "GBP", symbol: "£"  },
  INR: { locale: "en-IN",    currency: "INR", symbol: "₹"  },
  JPY: { locale: "ja-JP",    currency: "JPY", symbol: "¥"  },
}

// ─── Core formatter ───────────────────────────────────────────
//     formatCurrency(1234.5)           → "$1,234.50"
//     formatCurrency(1234.5, "EUR")    → "€1.234,50"
//     formatCurrency(1234.5, "USD", 0) → "$1,235"
export function formatCurrency(
  amount,
  currencyCode = "USD",
  decimals     = 2
) {
  const cfg = CURRENCY_MAP[currencyCode] ?? CURRENCY_MAP.USD
  try {
    return new Intl.NumberFormat(cfg.locale, {
      style:                 "currency",
      currency:              cfg.currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  } catch {
    return `${cfg.symbol}${Number(amount).toFixed(decimals)}`
  }
}

// ─── Signed formatter (+ for income, − for expense) ──────────
//     formatSigned(500,  "income")  → "+$500.00"
//     formatSigned(200,  "expense") → "-$200.00"
export function formatSigned(amount, type, currencyCode = "USD") {
  const abs = formatCurrency(Math.abs(amount), currencyCode)
  return type === "income" ? `+${abs}` : `-${abs}`
}

// ─── Compact formatter (abbreviates large numbers) ────────────
//     formatCompact(84291.5)  → "$84.3k"
//     formatCompact(1200000)  → "$1.2M"
export function formatCompact(amount, currencyCode = "USD") {
  const cfg = CURRENCY_MAP[currencyCode] ?? CURRENCY_MAP.USD
  const abs = Math.abs(amount)
  if (abs >= 1_000_000) {
    return `${cfg.symbol}${(amount / 1_000_000).toFixed(1)}M`
  }
  if (abs >= 1_000) {
    return `${cfg.symbol}${(amount / 1_000).toFixed(1)}k`
  }
  return formatCurrency(amount, currencyCode)
}

// ─── Integer formatter (no decimals) ─────────────────────────
//     formatInt(4820.30) → "$4,820"
export function formatInt(amount, currencyCode = "USD") {
  return formatCurrency(amount, currencyCode, 0)
}

// ─── Symbol-only getter ───────────────────────────────────────
//     getCurrencySymbol("GBP") → "£"
export function getCurrencySymbol(currencyCode = "USD") {
  return (CURRENCY_MAP[currencyCode] ?? CURRENCY_MAP.USD).symbol
}

// ─── Parse a formatted string back to number ─────────────────
//     parseCurrency("$1,234.50") → 1234.5
export function parseCurrency(str) {
  const cleaned = String(str).replace(/[^0-9.-]/g, "")
  const n = parseFloat(cleaned)
  return isNaN(n) ? 0 : n
}

// ─── Default export (most common use) ────────────────────────
export default formatCurrency