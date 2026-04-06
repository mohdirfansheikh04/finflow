// ─────────────────────────────────────────────────────────────
//  FinFlow — Dashboard Page
//  src/pages/Dashboard.jsx
// ─────────────────────────────────────────────────────────────
import StatCards          from "../components/dashboard/StatCards"
import BalanceTrendChart  from "../components/dashboard/BalanceTrendChart"
import SpendingDonutChart from "../components/dashboard/SpendingDonutChart"
import RecentTransactions from "../components/dashboard/RecentTransactions"
import { QuickActions, BudgetProgress } from "../components/dashboard/QuickActions"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">

      {/* ── Row 1 — Stat cards ─────────────────────────────── */}
      <StatCards />

      {/* ── Row 2 — Balance chart (left) + Spending (right) ── */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <BalanceTrendChart />
        </div>
        <div>
          <SpendingDonutChart />
        </div>
      </div>

      {/* ── Row 3 — Recent transactions (left) + Actions + Budget (right) ── */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-5">
          <QuickActions />
          <BudgetProgress />
        </div>
      </div>

    </div>
   )
}