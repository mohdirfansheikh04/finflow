// ─────────────────────────────────────────────────────────────
//  FinFlow — App Layout
//  src/components/layout/AppLayout.jsx
// ─────────────────────────────────────────────────────────────
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar  from "./Topbar"

export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen" style={{ background: "#11122a" }}>
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Fixed topbar (sits to the right of sidebar) */}
      <Topbar />

      {/* Scrollable main content */}
      <main
        style={{
          marginLeft: "200px",
          paddingTop: "64px",
          minHeight:  "100vh",
        }}
      >
        {/* Inner padding wrapper — all pages render here */}
        <div
          key={pathname}
          className="p-6 animate-fade-in"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}