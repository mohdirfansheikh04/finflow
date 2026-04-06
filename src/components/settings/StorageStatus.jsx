// ─────────────────────────────────────────────────────────────
//  FinFlow — Storage Status (right panel)
//  src/components/settings/StorageStatus.jsx
// ─────────────────────────────────────────────────────────────
import { useNavigate }  from "react-router-dom"
import { RefreshCw }    from "lucide-react"
import { useAuth }      from "../../context/AuthContext"
import { QUICK_NAV_LINKS } from "../../constants/routes"
import {
  LayoutDashboard, ArrowLeftRight,
  TrendingUp, PlusCircle,
} from "lucide-react"

// ─── Icon map ─────────────────────────────────────────────────
const ICON_MAP = {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  PlusCircle,
}

// ─── Storage row ──────────────────────────────────────────────
function StorageRow({ label, kb, status }) {
  const synced  = status === "synced"
  const dotColor = synced ? "#1dbd8f" : "#f0a030"

  return (
    <div
      className="flex items-center justify-between py-2"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: dotColor }}
        />
        <span className="text-xs text-[#9091b0] truncate font-mono">{label}</span>
      </div>
      <span
        className="text-xs font-semibold shrink-0 ml-2 tabular-nums"
        style={{ color: synced ? "#e8e9f4" : "#f0a030" }}
      >
        {kb ? `${kb} KB` : "Pending"}
      </span>
    </div>
  )
}

// ─── Quick nav button ─────────────────────────────────────────
function QuickNavBtn({ label, icon, onClick }) {
  const Icon = ICON_MAP[icon]
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-[#9091b0] transition-all hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {Icon && <Icon size={13} />}
      {label}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function StorageStatus() {
  const { storageStatus } = useAuth()
  const navigate = useNavigate()

  // Simulate last-synced time
  const syncedAgo = "2 min ago"

  return (
    <>
      {/* ── Storage Status card ──────────────────────────────── */}
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
            style={{ background: "rgba(29,189,143,0.15)" }}
          >
            <span className="text-sm">💾</span>
          </div>
          <p className="text-sm font-semibold text-[#e8e9f4]">Storage Status</p>
        </div>

        {/* Rows */}
        <div className="px-4 py-1">
          {storageStatus.map((s) => (
            <StorageRow
              key={s.label}
              label={s.label}
              kb={s.kb}
              status={s.status}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px] text-[#5a5b80]">
            Last synced · {syncedAgo}
          </p>
          <button
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#8f87f2] hover:text-[#a49ef5] transition-colors"
          >
            <RefreshCw size={11} />
            Sync Now
          </button>
        </div>
      </div>

      {/* ── Quick Navigation card ─────────────────────────────── */}
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
          className="px-4 py-3.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm font-semibold text-[#e8e9f4]">Quick Navigation</p>
        </div>

        {/* 2×2 grid */}
        <div className="p-4 grid grid-cols-2 gap-2">
          {QUICK_NAV_LINKS.map((link) => (
            <QuickNavBtn
              key={link.label}
              label={link.label}
              icon={link.icon}
              onClick={() => navigate(link.path)}
            />
          ))}
        </div>
      </div>
    </>
  )
}