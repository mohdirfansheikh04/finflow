// ─────────────────────────────────────────────────────────────
//  FinFlow — Settings Page
//  src/pages/Settings.jsx
// ─────────────────────────────────────────────────────────────
import { Check }              from "lucide-react"
import RolePermissions        from "../components/settings/RolePermissions"
import DisplayPreferences     from "../components/settings/DisplayPreferences"
import DataManagement         from "../components/settings/DataManagement"
import AccountInfo            from "../components/settings/AccountInfo"
import NotificationSettings   from "../components/settings/NotificationSettings"
import StorageStatus          from "../components/settings/StorageStatus"

// ─── Save Changes topbar button ───────────────────────────────
function SaveBar() {
  return (
    <div className="flex items-center justify-end mb-5">
      <button
        className="flex items-center gap-2 h-9 px-5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-90 active:scale-[0.98]"
        style={{ background: "#5a52db" }}
      >
        <Check size={15} />
        Save Changes
      </button>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────
export default function Settings() {
  return (
    <div className="flex flex-col gap-5">

      {/* Save button */}
      <SaveBar />

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-5 items-start">

        {/* ── Left column (2/3) — main settings ─────────────── */}
        <div className="col-span-2 flex flex-col gap-5">
          <RolePermissions />
          <DisplayPreferences />
          <DataManagement />
        </div>

        {/* ── Right column (1/3) — account panel ─────────────── */}
        <div className="flex flex-col gap-4">
          <AccountInfo />
          <NotificationSettings />
          <StorageStatus />
        </div>

      </div>
    </div>
  )
}