'use client'
import { useQuery } from '@tanstack/react-query'
import { Download } from 'lucide-react'
import { emailsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import type { NewsletterSubscriber } from '@/types'

export default function SubscribersPage() {
  const { data = [] } = useQuery<NewsletterSubscriber[]>({ queryKey:['subscribers'], queryFn: emailsApi.getSubscribers })
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscribers</h1>
          <p className="page-subtitle">Manage newsletter audience records and exports.</p>
        </div>
        <Button variant="secondary"><Download size={16} />Export CSV</Button>
      </div>
      <DataTable
        data={data}
        emptyTitle="No subscribers yet"
        emptyDescription="Newsletter signups will be listed here once users subscribe."
        columns={[
          { key: 'email', header: 'Email', sortable: true },
          { key: 'active', header: 'Active', render: (row) => <Badge variant={(row.active ?? row.isActive) ? 'success' : 'danger'}>{(row.active ?? row.isActive) ? 'Active' : 'Inactive'}</Badge> },
          { key: 'subscribedAt', header: 'Subscribed', sortable: true, render: (row) => row.subscribedAt ? new Date(row.subscribedAt).toLocaleDateString() : '-' },
          { key: 'actions', header: 'Actions', render: () => <button className="btn btn-ghost btn-icon" aria-label="Open subscriber actions">⋮</button> }
        ]}
      />
    </div>
  )
}
