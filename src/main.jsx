// ─────────────────────────────────────────────────────────────
//  FinFlow — App Entry Point
//  src/main.jsx
// ─────────────────────────────────────────────────────────────
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// import { BrowserRouter } from "react-router-dom"
import { HashRouter } from "react-router-dom"

import { ThemeProvider }      from "./context/ThemeContext"
import { AuthProvider }       from "./context/AuthContext"
import { TransactionProvider } from "./context/TransactionContext"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <TransactionProvider>
            <App />
          </TransactionProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)