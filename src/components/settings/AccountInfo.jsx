// ─────────────────────────────────────────────────────────────
//  FinFlow — Account Info (right panel)
//  src/components/settings/AccountInfo.jsx
// ─────────────────────────────────────────────────────────────
import { useState }  from "react"
import { Check }     from "lucide-react"
import { useAuth }   from "../../context/AuthContext"

export default function AccountInfo() {
  const { user, role, roleMeta, isActive, updateProfile, canManageSettings } = useAuth()

  const [displayName, setDisplayName] = useState(user.name  ?? "")
  const [email,       setEmail]       = useState(user.email ?? "")
  const [saved,       setSaved]       = useState(false)

  const handleSave = () => {
    updateProfile({ name: displayName, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

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
          style={{ background: "rgba(90,82,219,0.15)" }}
        >
          <span className="text-sm">👤</span>
        </div>
        <p className="text-sm font-semibold text-[#e8e9f4]">Account Info</p>
      </div>

      <div className="p-4 space-y-4">

        {/* Avatar row */}
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div className="w-12 h-12 rounded-full bg-[#5a52db] flex items-center justify-center text-base font-bold text-white shrink-0">
            {user.initials}
          </div>

          {/* Name + role badges */}
          <div>
            <p className="text-sm font-semibold text-[#e8e9f4] leading-none">
              {user.name}
            </p>
            <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
              {user.email}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: roleMeta.bg, color: roleMeta.color }}
              >
                {role}
              </span>
              {isActive && (
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(29,189,143,0.12)",
                    color:      "#1dbd8f",
                  }}
                >
                  Active
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

        {/* Display name input */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9091b0] mb-1.5">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={!canManageSettings}
            className="w-full h-9 px-3 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none transition-all focus:ring-2 focus:ring-[#5a52db] disabled:opacity-50"
            style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* Email input */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#9091b0] mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!canManageSettings}
            className="w-full h-9 px-3 rounded-lg text-sm text-[#e8e9f4] placeholder-[#5a5b80] outline-none transition-all focus:ring-2 focus:ring-[#5a52db] disabled:opacity-50"
            style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* Save button */}
        {canManageSettings && (
          <button
            onClick={handleSave}
            className="w-full h-9 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:brightness-90 active:scale-[0.98]"
            style={{ background: saved ? "#1dbd8f" : "#5a52db" }}
          >
            {saved ? (
              <>
                <Check size={14} />
                Saved!
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        )}
      </div>
    </div>
  )
}