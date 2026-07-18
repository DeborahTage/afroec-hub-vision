'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Loader2, Shield } from 'lucide-react'
import { authApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authApi.login(username, password)
      router.replace('/')
    } catch (err) {
      setError(err instanceof Error ? safeLoginError(err.message) : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  function safeLoginError(message: string): string {
    if (/ADMIN_LOCALHOST_ONLY|locked on the server/i.test(message)) return message
    if (/Access denied|Forbidden/i.test(message)) {
      return 'Admin login is locked on the server. In Render, set ADMIN_LOCALHOST_ONLY=false and redeploy.'
    }
    if (/https?:\/\//i.test(message) || /onrender\.com|\/api\/v1|HTTP\s*\d{3}|\{|\}/i.test(message)) {
      return 'Unable to sign in. Please try again.'
    }
    return message || 'Invalid credentials'
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        <CardHeader style={{ textAlign:'center', display: 'block', padding: 0 }}>
          <div className="login-icon"><Shield size={40} /></div>
          <CardTitle style={{ fontSize: '1.5rem' }}>Afroec Admin</CardTitle>
          <p style={{ color:'var(--text-secondary)', marginTop: 8 }}>Sign in to continue</p>
        </CardHeader>
        <CardContent style={{ padding: '24px 0 0' }}>
          <form onSubmit={handleSubmit} style={{ display:'grid', gap:16 }}>
            {error && <div role="alert" style={{ color:'var(--danger)', border:'1px solid rgba(239,68,68,.25)', padding:12, borderRadius:10 }}>{error}</div>}
            <label><span className="label">Username</span><Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required /></label>
            <label>
              <span className="label">Password</span>
              <span style={{ position: 'relative', display: 'block' }}>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingRight: 44 }} />
                <button type="button" className="btn btn-ghost btn-icon" aria-label="Toggle password visibility" onClick={() => setShowPassword((value) => !value)} style={{ position: 'absolute', right: 2, top: 2 }}>
                  <Eye size={16} />
                </button>
              </span>
            </label>
            <Button type="submit" disabled={loading} style={{ width: '100%', minHeight: 44, fontSize: '1rem' }}>{loading && <Loader2 size={16} />} Sign In</Button>
            <p style={{ color:'var(--text-muted)', textAlign: 'center', fontSize: '.75rem', margin: 0 }}>Protected area. Authorized users only.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
