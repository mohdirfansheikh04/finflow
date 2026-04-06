// ─────────────────────────────────────────────────────────────
//  FinFlow — Role & Permissions
//  src/components/settings/RolePermissions.jsx
// ─────────────────────────────────────────────────────────────
import { useState }  from "react"
import { useAuth }   from "../../context/AuthContext"
import {
  ROLES,
  ROLE_LIST,
  ROLE_META,
  PERMISSION_MATRIX_ROWS,
  ACCESS_STYLES,
} from "../../constants/roles"

// ─── Access cell ──────────────────────────────────────────────
function AccessCell({ access }) {
  const s = ACCESS_STYLES[access] ?? ACCESS_STYLES.none
  return (
    <td className="px-4 py-3 text-center">
      <span
        className="inline-flex items-center justify-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg min-w-16"
        style={{
          background: s.bg,
          color:      s.color,
          border:     `1px solid ${s.border}`,
        }}
      >
        <span className="font-mono text-[11px]">{s.icon}</span>
        {s.label}
      </span>
    </td>
  )
}

// ─── Role tab ─────────────────────────────────────────────────
function RoleTab({ role, active, onClick }) {
  const meta = ROLE_META[role]
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
        active
          ? "text-white"
          : "text-[#9091b0] hover:text-[#e8e9f4] hover:bg-[rgba(255,255,255,0.05)]",
      ].join(" ")}
      style={active ? { background: meta.color } : {}}
    >
      <span className="text-base">{meta.icon}</span>
      {role}
    </button>
  )
}

// ─── Column header ────────────────────────────────────────────
function ColHeader({ role }) {
  const meta = ROLE_META[role]
  return (
    <th className="px-4 py-3 text-center">
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: meta.color }}
        >
          {role}
        </span>
      </div>
    </th>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function RolePermissions() {
  const { role: activeRole, switchRole, canManageSettings } = useAuth()
  const [previewRole, setPreviewRole] = useState(activeRole)

  const handleRoleClick = (r) => {
    setPreviewRole(r)
    // Actually switch the active role
    switchRole(r)
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="flex items-start justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(90,82,219,0.15)" }}
          >
            <span className="text-base">👤</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#e8e9f4] leading-none">
              Role & Permissions
            </p>
            <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
              Controls UI access and feature visibility
            </p>
          </div>
        </div>

        {/* Persisted badge */}
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(29,189,143,0.12)",
            color:      "#1dbd8f",
            border:     "1px solid rgba(29,189,143,0.20)",
          }}
        >
          ✓ Persisted
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="px-5 py-4">

        {/* Active role label */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9091b0] mb-2">
          Active Role
        </p>

        {/* Role tab switcher */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {ROLE_LIST.map((r) => (
            <RoleTab
              key={r}
              role={r}
              active={activeRole === r}
              onClick={() => handleRoleClick(r)}
            />
          ))}
        </div>

        <p className="text-xs text-[#5a5b80] mt-2 mb-5">
          Role changes immediately update UI permissions across all sections
        </p>

        {/* Permission matrix label */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9091b0] mb-3">
          Permission Matrix
        </p>

        {/* Table */}
        <div
          className="overflow-hidden"
          style={{
            background:   "rgba(255,255,255,0.02)",
            border:       "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
          }}
        >
          <table className="w-full border-collapse">
            <thead style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#9091b0]">
                  Feature
                </th>
                {ROLE_LIST.map((r) => <ColHeader key={r} role={r} />)}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_MATRIX_ROWS.map((row, i) => (
                <tr
                  key={row.permission}
                  className="transition-colors hover:bg-[rgba(255,255,255,0.02)]"
                  style={{
                    borderBottom:
                      i < PERMISSION_MATRIX_ROWS.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm text-[#e8e9f4]">{row.feature}</span>
                  </td>
                  <AccessCell access={row.viewer.access}  />
                  <AccessCell access={row.admin.access}   />
                  <AccessCell access={row.analyst.access} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}