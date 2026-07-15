'use client'

import { usePathname } from 'next/navigation'
import { Bell, Moon, Search, Slash } from 'lucide-react'
import { Button } from '@/components/ui/button'

function labelFromPath(pathname: string) {
  if (pathname === '/') return ['Dashboard']
  return pathname
    .split('/')
    .filter(Boolean)
    .map((part) => part.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()))
}

export function Header() {
  const segments = labelFromPath(usePathname())

  return (
    <header className="header">
      <div className="breadcrumbs" aria-label="Breadcrumb">
        {segments.map((segment, index) => (
          <span key={`${segment}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {index > 0 && <Slash size={14} />}
            <span className={index === segments.length - 1 ? 'breadcrumb-current' : undefined}>{segment}</span>
          </span>
        ))}
      </div>
      <div className="header-actions">
        <Button variant="secondary" aria-label="Open command palette">
          <Search size={16} />
          <span>Search</span>
          <kbd style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>⌘K</kbd>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" style={{ position: 'relative' }}>
          <Bell size={18} />
          <span className="notification-dot" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Moon size={18} />
        </Button>
        <span className="avatar" aria-label="Signed in as admin">A</span>
      </div>
    </header>
  )
}
