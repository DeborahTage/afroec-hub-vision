import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { CommandPalette } from '@/components/shared/command-palette'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="content-container page-enter">{children}</main>
      </div>
      <CommandPalette />
    </div>
  )
}
