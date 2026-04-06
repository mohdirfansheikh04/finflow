// ─────────────────────────────────────────────────────────────
//  FinFlow — Insights Page
//  src/pages/Insights.jsx
// ─────────────────────────────────────────────────────────────
import InsightCards        from "../components/insights/InsightCards"
import IncomeExpensesChart from "../components/insights/IncomeExpensesChart"
import SpendingByCategory  from "../components/insights/SpendingByCategory"
import SavingsRate         from "../components/insights/SavingsRate"
import UpcomingBills       from "../components/insights/UpcomingBills"

export default function Insights() {
  return (
    <div className="flex flex-col gap-5">

      {/* ── Row 1 — 4 metric cards ─────────────────────────── */}
      <InsightCards />

      {/* ── Row 2 — Income vs Expenses chart (full width) ──── */}
      <IncomeExpensesChart />

      {/* ── Row 3 — Category breakdown + right panel ─────────  */}
      <div className="grid grid-cols-3 gap-5">

        {/* Spending by category — 2/3 width */}
        <div className="col-span-2">
          <SpendingByCategory />
        </div>

        {/* Right column — Savings Rate + Upcoming Bills */}
        <div className="flex flex-col gap-5">
          <SavingsRate />
          <UpcomingBills />
        </div>

      </div>

    </div>
  )
}