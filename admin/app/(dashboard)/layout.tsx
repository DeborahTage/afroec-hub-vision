import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { CommandPalette } from '@/components/shared/command-palette'
import { RequireAuth } from '@/components/auth/require-auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="admin-shell">
        <Sidebar />
        <div className="dashboard-main">
          <Header />
          <main className="content-container page-enter">{children}</main>
        </div>
        <CommandPalette />
      </div>
    </RequireAuth>
  )
}
