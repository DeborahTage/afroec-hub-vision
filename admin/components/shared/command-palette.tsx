'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { Input } from '@/components/ui/input'

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const results = useMemo(() => {
    return NAV_ITEMS.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  if (!open) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Command palette" onClick={() => setOpen(false)}>
      <div className="command-modal" onClick={(event) => event.stopPropagation()}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: 18, color: 'var(--text-tertiary)' }} />
          <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages, actions, settings..." style={{ height: 56, paddingLeft: 46, border: 0 }} />
        </div>
        <div style={{ padding: 12 }}>
          <div className="nav-label">Pages</div>
          {results.map((item) => (
            <button
              key={item.href}
              className="nav-link"
              style={{ width: '100%' }}
              onClick={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <span>{item.title}</span>
              <kbd style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>↵</kbd>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
