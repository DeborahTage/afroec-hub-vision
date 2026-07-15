import { Bell, Lock, Palette, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Profile, security, notification, and dashboard preferences.</p>
        </div>
        <Button>Save changes</Button>
      </div>
      <div className="responsive-grid">
        <Card>
          <CardHeader><User size={20} /><div><CardTitle>Profile</CardTitle><CardDescription>Admin account identity.</CardDescription></div></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Name</span><Input placeholder="Admin User" /></label>
            <label><span className="label">Email</span><Input placeholder="support@afroec.com" /></label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Lock size={20} /><div><CardTitle>Security</CardTitle><CardDescription>Session and password settings.</CardDescription></div></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Current password</span><Input type="password" /></label>
            <label><span className="label">New password</span><Input type="password" /></label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Bell size={20} /><div><CardTitle>Notifications</CardTitle><CardDescription>Control admin alerts.</CardDescription></div></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Email summary</span><Select><option>Daily</option><option>Weekly</option><option>Off</option></Select></label>
            <label><span className="label">Critical alerts</span><Select><option>Enabled</option><option>Disabled</option></Select></label>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Palette size={20} /><div><CardTitle>Appearance</CardTitle><CardDescription>Dark mode is default.</CardDescription></div></CardHeader>
          <CardContent style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Theme</span><Select><option>Dark</option><option>System</option></Select></label>
            <label><span className="label">Density</span><Select><option>Comfortable</option><option>Compact</option></Select></label>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
