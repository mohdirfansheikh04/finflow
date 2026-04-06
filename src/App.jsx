import { Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import { ROUTES } from "./constants/routes"

import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Insights from "./pages/Insights"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import "./App.css"

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.INSIGHTS} element={<Insights />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />

        {/* Redirect /add-transaction to transactions with modal flag */}
        <Route path={ROUTES.ADD_TRANSACTION} element={<Navigate to={ROUTES.TRANSACTIONS} state={{ openModal: true }} replace />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
      </Route>
    </Routes>
  )
}
