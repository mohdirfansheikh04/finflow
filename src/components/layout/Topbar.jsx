// ─────────────────────────────────────────────────────────────
//  FinFlow — Topbar
//  src/components/layout/Topbar.jsx
// ─────────────────────────────────────────────────────────────
import { useLocation } from "react-router-dom";
import { Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { PAGE_META, ROUTES } from "../../constants/routes";
import { ROLES } from "../../constants/roles";

// ─── Dynamic subtitle (date for dashboard/transactions) ───────
function getSubtitle(meta) {
  if (!meta.dynamic) return meta.subtitle;
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Role pill ────────────────────────────────────────────────
function RolePill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 rounded-md text-xs font-medium transition-all duration-150",
        active
          ? "bg-[#5a52db] text-white"
          : "text-[#9091b0] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#e8e9f4]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ─── Topbar variants per page ─────────────────────────────────
//     Some pages show role switcher (Transactions, Dashboard)
//     Some show time-range tabs (Insights)
//     Settings shows sync status
const ROLE_SWITCHER_PAGES = [ROUTES.TRANSACTIONS, ROUTES.DASHBOARD];
const TIME_RANGE_PAGES = [ROUTES.INSIGHTS];

function TimeRangeTabs() {
  return (
    <div
      className="flex items-center rounded-lg overflow-hidden text-xs font-medium"
      style={{ border: "1px solid rgba(255,255,255,0.10)" }}
    >
      {["6M", "1Y", "All"].map((tab, i) => (
        <button
          key={tab}
          className={[
            "px-3 py-1.5 transition-colors",
            i === 0
              ? "bg-[#5a52db] text-white"
              : "text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function SyncBadge() {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#1dbd8f]"
      style={{
        background: "rgba(29,189,143,0.10)",
        border: "1px solid rgba(29,189,143,0.25)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#1dbd8f] animate-pulse-soft" />
      localStorage synced
    </div>
  );
}

// ─── Main Topbar ──────────────────────────────────────────────
export default function Topbar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, role, roleMeta, switchRole, isActive } = useAuth();

  const path = location.pathname;
  const meta = PAGE_META[path] ?? {
    title: "FinFlow",
    subtitle: "",
    dynamic: false,
  };
  const subtitle = getSubtitle(meta);

  const showRoleSwitcher = ROLE_SWITCHER_PAGES.includes(path);
  const showTimeRange = TIME_RANGE_PAGES.includes(path);
  const showSync = path === ROUTES.SETTINGS;

  return (
    <header
      className="fixed top-0 right-0 flex items-center px-6 z-30"
      style={{
        left: "200px",
        height: "64px",
        background: "#11122a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Page title ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-[#e8e9f4] leading-none truncate">
          {meta.title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#9091b0] mt-0.5 leading-none truncate">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Right controls ─────────────────────────────────── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Role switcher (Dashboard + Transactions) */}
        {showRoleSwitcher && (
          <div
            className="flex items-center rounded-lg p-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {Object.values(ROLES).map((r) => (
              <RolePill
                key={r}
                label={r}
                active={role === r}
                onClick={() => switchRole(r)}
              />
            ))}
          </div>
        )}

        {/* Time range (Insights) */}
        {showTimeRange && <TimeRangeTabs />}

        {/* Sync badge (Settings) */}
        {showSync && <SyncBadge />}

        <div className="flex items-center gap-2">
          <Sun size={13} className="text-[#9091b0]" />

          <button
            onClick={toggleTheme}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
              isDark ? "bg-[#5a52db]" : "bg-[rgba(255,255,255,0.15)]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                isDark ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>

          <p className="text-xs text-[#9091b0]">{isDark ? "Dark" : "Light"}</p>
        </div>

        {/* Notification bell */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#5a52db]" />
        </button>

        {/* Avatar + role badge */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-[#e8e9f4] leading-none">
              {user.name}
            </p>
            <div className="flex items-center justify-end gap-1 mt-0.5">
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                style={{
                  background: roleMeta.bg,
                  color: roleMeta.color,
                }}
              >
                {role}
              </span>
              {isActive && (
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(29,189,143,0.12)",
                    color: "#1dbd8f",
                  }}
                >
                  Active
                </span>
              )}
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#5a52db] flex items-center justify-center text-xs font-semibold text-white shrink-0">
            {user.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
