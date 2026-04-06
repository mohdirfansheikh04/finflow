// ─────────────────────────────────────────────────────────────
//  FinFlow — Notification Settings (right panel)
//  src/components/settings/NotificationSettings.jsx
// ─────────────────────────────────────────────────────────────
import { useAuth } from "../../context/AuthContext"

// ─── Inline toggle ────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 cursor-pointer",
        checked ? "bg-[#5a52db]" : "bg-[rgba(255,255,255,0.12)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  )
}

// ─── Notification row ─────────────────────────────────────────
function NotifRow({ label, description, checked, onChange }) {
  return (
    <div
      className="flex items-center justify-between gap-3 py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#e8e9f4] leading-none">{label}</p>
        {description && (
          <p className="text-xs text-[#9091b0] mt-0.5 leading-none">{description}</p>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function NotificationSettings() {
  const { user, updateNotifications } = useAuth()
  const notifs = user.notifications ?? {}

  const rows = [
    {
      key:         "budgetAlerts",
      label:       "Budget Alerts",
      description: "When spending exceeds budget",
    },
    {
      key:         "weeklySummary",
      label:       "Weekly Summary",
      description: "Digest every Monday",
    },
    {
      key:         "largeTransactions",
      label:       "Large Transactions",
      description: "Transactions over $500",
    },
    {
      key:         "savingsMilestones",
      label:       "Savings Milestones",
      description: "Goal achievement alerts",
    },
  ]

  return (
    <div
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow:     "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(240,160,48,0.15)" }}
        >
          <span className="text-sm">🔔</span>
        </div>
        <p className="text-sm font-semibold text-[#e8e9f4]">Notifications</p>
      </div>

      {/* Rows */}
      <div className="px-4">
        {rows.map((r) => (
          <NotifRow
            key={r.key}
            label={r.label}
            description={r.description}
            checked={notifs[r.key] ?? false}
            onChange={(val) => updateNotifications(r.key, val)}
          />
        ))}
      </div>
    </div>
  )
}