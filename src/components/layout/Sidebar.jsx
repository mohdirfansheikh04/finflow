// ─────────────────────────────────────────────────────────────
//  FinFlow — Sidebar
//  src/components/layout/Sidebar.jsx
// ─────────────────────────────────────────────────────────────
import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  PlusCircle,
  Settings,
  User,
  LogOut,
  Wallet,
} from "lucide-react"
import { NAV_SECTIONS } from "../../constants/routes"
import { useAuth } from "../../context/AuthContext"

// ─── Icon map (lucide name → component) ──────────────────────
const ICON_MAP = {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  PlusCircle,
  Settings,
  User,
}

function NavIcon({ name, size = 16 }) {
  const Icon = ICON_MAP[name]
  return Icon ? <Icon size={size} /> : null
}

// ─── Single nav link ──────────────────────────────────────────
function SidebarLink({ item }) {
  return (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        [
          "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 select-none",
          isActive
            ? "bg-[rgba(90,82,219,0.15)] text-[#8f87f2] font-medium"
            : "text-[#9091b0] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e8e9f4]",
        ].join(" ")
      }
    >
      <NavIcon name={item.icon} size={16} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#5a52db] text-white leading-none">
          {item.badge}
        </span>
      )}
    </NavLink>
  )
}

// ─── Main Sidebar ─────────────────────────────────────────────
export default function Sidebar() {
  const { user, role, roleMeta } = useAuth()
  const navigate = useNavigate()

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-40"
      style={{
        width: "200px",
        background: "linear-gradient(180deg, #1e2050 0%, #171830 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Logo ───────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2.5 px-4 shrink-0"
        style={{ height: "64px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="w-8 h-8 rounded-lg bg-[#5a52db] flex items-center justify-center shrink-0">
          <Wallet size={16} color="#fff" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4] leading-none">FinFlow</p>
          <p className="text-[10px] text-[#9091b0] mt-0.5 leading-none">Personal Finance</p>
        </div>
      </div>

      {/* ── Nav sections ────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
        {NAV_SECTIONS.map((section) => (
          <div key={section.key}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5a5b80] px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarLink key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── User card ────────────────────────────────────────── */}
      <div
        className="px-3 py-3 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#5a52db] flex items-center justify-center shrink-0 text-xs font-semibold text-white">
            {user.initials}
          </div>

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#e8e9f4] truncate leading-none">
              {user.name}
            </p>
            <p className="text-[10px] text-[#9091b0] truncate mt-0.5 leading-none">
              {user.email}
            </p>
          </div>

          {/* Logout icon */}
          <button
            onClick={() => navigate("/")}
            className="text-[#5a5b80] hover:text-[#e8e9f4] transition-colors shrink-0"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}