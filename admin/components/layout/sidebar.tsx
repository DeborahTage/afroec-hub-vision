'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart3, Bell, BookOpen, Calendar, ChevronDown, FileText, HelpCircle, LayoutDashboard, LifeBuoy, LogOut, Mail, Settings, Shield, Users } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { authApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const icons = { LayoutDashboard, BarChart3, Users, Calendar, FileText, BookOpen, Mail, Bell, Settings }

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await authApi.logout()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="sidebar" aria-label="Admin navigation">
      <div className="sidebar-brand">
        <div className="avatar">
          <Shield size={20} />
        </div>
        <strong>Afroec Admin</strong>
      </div>
      <nav className="nav-section">
        <div className="nav-label">Navigation</div>
        {NAV_ITEMS.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons] || LayoutDashboard
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className={cn('nav-link', active && 'nav-link-active')} aria-current={active ? 'page' : undefined}>
              <Icon size={18} />
              <span>{item.title}</span>
            </Link>
          )
        })}
        <div className="nav-label">Secondary</div>
        <Link href="/settings" className="nav-link">
          <LifeBuoy size={18} />
          <span>Documentation</span>
        </Link>
        <Link href="/emails" className="nav-link">
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <div className="user-chip" style={{ marginBottom: 12 }}>
          <span className="avatar">A</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Admin User</div>
            <div style={{ fontSize: '.75rem' }}>support@afroec.com</div>
          </div>
          <ChevronDown size={16} />
        </div>
        <Button variant="secondary" onClick={handleSignOut} style={{ width: '100%' }}>
          <LogOut size={16}/>
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}
