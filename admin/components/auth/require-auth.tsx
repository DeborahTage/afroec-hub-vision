'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const TOKEN_KEY = 'afh_admin_token'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent(pathname || '/')}`)
      return
    }
    setReady(true)
  }, [pathname, router])

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-secondary)' }}>
        Checking session…
      </div>
    )
  }

  return <>{children}</>
}
