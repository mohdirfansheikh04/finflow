// ─────────────────────────────────────────────────────────────
//  FinFlow — Profile Page
//  src/pages/Profile.jsx
// ─────────────────────────────────────────────────────────────
import { useState }        from "react"
import { Check, Camera }   from "lucide-react"
import { useAuth }         from "../context/AuthContext"
import { useTransactions } from "../context/TransactionContext"
import { formatDate }      from "../utils/formatDate"
import { formatCurrency }  from "../utils/formatCurrency"
import { savingsRate }     from "../utils/calculations"

// ─── Stat pill ────────────────────────────────────────────────
function StatPill({ label, value, color }) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-lg font-bold leading-none" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] text-[#9091b0] leading-none">{label}</p>
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div
      style={{
        background:   "#171830",
        border:       "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow:     "hidden",
      }}
    >
      <div
        className="px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-sm font-semibold text-[#e8e9f4]">{title}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

// ─── Info row ─────────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span className="text-sm text-[#9091b0]">{label}</span>
      <span className="text-sm font-medium text-[#e8e9f4]">{value}</span>
    </div>
  )
}

// ─── Editable field ───────────────────────────────────────────
function EditField({ label, value, onChange, type = "text", disabled }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9091b0] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full h-10 px-3 rounded-lg text-sm text-[#e8e9f4] outline-none transition-all focus:ring-2 focus:ring-[#5a52db] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#1c1d3c", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────
export default function Profile() {
  const { user, role, roleMeta, isActive, updateProfile, canManageSettings } = useAuth()
  const {
    transactions,
    currentMonthIncome,
    currentMonthExpenses,
  } = useTransactions()

  const [name,  setName]  = useState(user.name  ?? "")
  const [email, setEmail] = useState(user.email ?? "")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateProfile({ name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Stats
  const rate     = savingsRate(currentMonthIncome, currentMonthExpenses)
  const incCount = transactions.filter((t) => t.type === "income").length
  const expCount = transactions.filter((t) => t.type === "expense").length

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      {/* ── Profile hero ─────────────────────────────────────── */}
      <div
        className="p-6 flex flex-col items-center text-center gap-4"
        style={{
          background:   "#171830",
          border:       "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
        }}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-[#5a52db] flex items-center justify-center text-2xl font-bold text-white">
            {user.initials}
          </div>
          <button
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "#1e2050", border: "2px solid #171830" }}
          >
            <Camera size={12} className="text-[#9091b0]" />
          </button>
        </div>

        {/* Name + email */}
        <div>
          <h2 className="text-xl font-bold text-[#e8e9f4] leading-none">{user.name}</h2>
          <p className="text-sm text-[#9091b0] mt-1 leading-none">{user.email}</p>
        </div>

        {/* Role + active badges */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: roleMeta.bg, color: roleMeta.color }}
          >
            {roleMeta.icon} {role}
          </span>
          {isActive && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "rgba(29,189,143,0.12)", color: "#1dbd8f" }}
            >
              ● Active
            </span>
          )}
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-3 mt-1">
          <StatPill
            label="Transactions"
            value={transactions.length}
            color="#8f87f2"
          />
          <StatPill
            label="Savings Rate"
            value={`${rate}%`}
            color="#1dbd8f"
          />
          <StatPill
            label="Income Records"
            value={incCount}
            color="#1dbd8f"
          />
          <StatPill
            label="Expenses"
            value={expCount}
            color="#e05c6b"
          />
        </div>
      </div>

      {/* ── Edit profile ──────────────────────────────────────── */}
      <Section title="Personal Information">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <EditField
              label="Display Name"
              value={name}
              onChange={setName}
              disabled={!canManageSettings}
            />
            <EditField
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
              disabled={!canManageSettings}
            />
          </div>

          {canManageSettings && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 h-9 px-5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-90 active:scale-[0.98]"
                style={{ background: saved ? "#1dbd8f" : "#5a52db" }}
              >
                {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </Section>

      {/* ── Account details ───────────────────────────────────── */}
      <Section title="Account Details">
        <div>
          <InfoRow label="User ID"        value={user.id ?? "usr_001"} />
          <InfoRow label="Role"           value={role} />
          <InfoRow label="Member Since"   value={formatDate(user.joinedAt ?? "2024-01-15")} />
          <InfoRow label="Currency"       value={user.currency ?? "USD ($)"} />
          <InfoRow label="Date Format"    value={user.dateFormat ?? "MMM DD, YYYY"} />
          <InfoRow
            label="Dark Mode"
            value={user.darkMode ? "Enabled" : "Disabled"}
          />
        </div>
      </Section>

      {/* ── Financial summary ─────────────────────────────────── */}
      <Section title="This Month's Summary">
        <div>
          <InfoRow
            label="Total Income"
            value={formatCurrency(currentMonthIncome)}
          />
          <InfoRow
            label="Total Expenses"
            value={formatCurrency(currentMonthExpenses)}
          />
          <InfoRow
            label="Net Saved"
            value={formatCurrency(Math.max(currentMonthIncome - currentMonthExpenses, 0))}
          />
          <InfoRow
            label="Savings Rate"
            value={`${rate}%`}
          />
        </div>
      </Section>

    </div>
  )
}