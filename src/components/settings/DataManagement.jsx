// ─────────────────────────────────────────────────────────────
//  FinFlow — Data Management
//  src/components/settings/DataManagement.jsx
// ─────────────────────────────────────────────────────────────
import { useRef, useState }   from "react"
import { Download, Upload, RefreshCw, Trash2 } from "lucide-react"
import { useTransactions }    from "../../context/TransactionContext"
import { useAuth }            from "../../context/AuthContext"

// ─── Confirm overlay ──────────────────────────────────────────
function ConfirmBanner({ onConfirm, onCancel }) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl mt-3"
      style={{ background: "rgba(224,92,107,0.10)", border: "1px solid rgba(224,92,107,0.25)" }}
    >
      <p className="text-xs text-[#e05c6b] leading-snug">
        This will permanently remove all transactions and settings. This cannot be undone.
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCancel}
          className="h-7 px-3 rounded-lg text-xs font-medium text-[#9091b0] hover:text-[#e8e9f4] transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.10)" }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="h-7 px-3 rounded-lg text-xs font-medium text-white transition-colors"
          style={{ background: "#e05c6b" }}
        >
          Clear Data
        </button>
      </div>
    </div>
  )
}

// ─── Action button ────────────────────────────────────────────
function ActionBtn({ icon, label, sublabel, onClick, disabled, color = "#8f87f2", bg = "rgba(90,82,219,0.12)", border = "rgba(90,82,219,0.25)" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      style={{ background: bg, border: `1px solid ${border}`, color }}
    >
      <span style={{ color }}>{icon}</span>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
      <span className="text-[10px] text-[#9091b0]">{sublabel}</span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────
export default function DataManagement() {
  const { exportCSV, exportJSON, importJSON, clearAllTransactions, storageInfo } =
    useTransactions()
  const { canExportData, canImportData, canClearData } = useAuth()

  const fileRef        = useRef(null)
  const [confirm, setConfirm] = useState(false)

  // localStorage usage bar
  const MAX_KB  = 5 * 1024  // 5 MB in KB
  const usedKB  = parseFloat(storageInfo?.kb ?? 0)
  const pct     = Math.min((usedKB / MAX_KB) * 100, 100)
  const healthy = pct < 70

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (file) { importJSON(file); e.target.value = "" }
  }

  const handleClear = () => {
    clearAllTransactions()
    setConfirm(false)
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
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(240,160,48,0.15)" }}
        >
          <span className="text-base">🗄️</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#e8e9f4] leading-none">
            Data Management
          </p>
          <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
            Import, export, and manage your financial data
          </p>
        </div>
      </div>

      <div className="px-5 py-4 space-y-5">

        {/* ── Storage usage bar ──────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#e8e9f4]">
                localStorage Usage
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#9091b0]">
                {usedKB.toFixed(1)} KB / 5 MB
              </span>
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  background: healthy ? "rgba(29,189,143,0.12)" : "rgba(224,92,107,0.12)",
                  color:      healthy ? "#1dbd8f"               : "#e05c6b",
                }}
              >
                {healthy ? "Healthy" : "High"}
              </span>
            </div>
          </div>

          {/* Bar */}
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width:      `${pct}%`,
                background: healthy ? "#5a52db" : "#e05c6b",
              }}
            />
          </div>

          <p className="text-[11px] text-[#5a5b80] mt-1.5">
            Transactions: {storageInfo?.kb ?? "0.0"} KB · Settings: 0.6 KB
          </p>
        </div>

        {/* ── Action buttons ─────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3">
          <ActionBtn
            icon={<Download size={20} />}
            label="Export Data"
            sublabel="CSV / JSON"
            onClick={exportCSV}
            disabled={!canExportData}
            color="#1dbd8f"
            bg="rgba(29,189,143,0.10)"
            border="rgba(29,189,143,0.25)"
          />

          <ActionBtn
            icon={<Upload size={20} />}
            label="Import Data"
            sublabel="CSV / JSON"
            onClick={() => fileRef.current?.click()}
            disabled={!canImportData}
            color="#1dbd8f"
            bg="rgba(29,189,143,0.10)"
            border="rgba(29,189,143,0.25)"
          />

          <ActionBtn
            icon={<RefreshCw size={20} />}
            label="Sync Backup"
            sublabel="Cloud sync"
            onClick={() => {}}
            color="#8f87f2"
            bg="rgba(90,82,219,0.10)"
            border="rgba(90,82,219,0.25)"
          />
        </div>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept=".json,.csv"
          className="hidden"
          onChange={handleImport}
        />

        {/* ── Danger zone ─────────────────────────────────────── */}
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(224,92,107,0.06)", border: "1px solid rgba(224,92,107,0.15)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trash2 size={15} className="text-[#e05c6b]" />
              <div>
                <p className="text-sm font-medium text-[#e05c6b] leading-none">
                  Clear All Data
                </p>
                <p className="text-xs text-[#9091b0] mt-0.5 leading-none">
                  Permanently removes all transactions and settings from localStorage
                </p>
              </div>
            </div>
            <button
              onClick={() => setConfirm(true)}
              disabled={!canClearData || confirm}
              className="h-8 px-4 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{ background: "#e05c6b" }}
            >
              Clear Data
            </button>
          </div>

          {confirm && (
            <ConfirmBanner
              onConfirm={handleClear}
              onCancel={() => setConfirm(false)}
            />
          )}
        </div>

      </div>
    </div>
  )
}