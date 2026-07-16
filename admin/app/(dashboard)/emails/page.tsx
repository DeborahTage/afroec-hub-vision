'use client'
import { useQuery } from '@tanstack/react-query'
import { emailsApi } from '@/lib/api'
import { MailPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import type { ContactMessage } from '@/types'

export default function EmailsPage() {
  const { data = [] } = useQuery<ContactMessage[]>({ queryKey:['contacts'], queryFn: emailsApi.getContacts })
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Email Inbox</h1>
          <p className="page-subtitle">Review contact messages and support requests sent to support@afroec.com.</p>
        </div>
        <Button><MailPlus size={16} />Compose</Button>
      </div>
      <div className="filter-bar">
        {['All', 'New', 'In Progress', 'Resolved', 'Spam'].map((item, index) => (
          <button key={item} className={index === 0 ? 'page-pill page-pill-active' : 'page-pill'}>{item}</button>
        ))}
      </div>
      <DataTable
        data={data}
        emptyTitle="Inbox is empty"
        emptyDescription="New contact messages will appear here for triage."
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email', sortable: true },
          { key: 'subject', header: 'Subject' },
          { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'RESOLVED' ? 'success' : row.status === 'SPAM' ? 'danger' : 'warning'}>{row.status}</Badge> },
          { key: 'createdAt', header: 'Received', sortable: true, render: (row) => new Date(row.createdAt).toLocaleString() },
          { key: 'actions', header: 'Actions', render: () => <button className="btn btn-ghost btn-icon" aria-label="Open message actions">⋮</button> }
        ]}
      />
    </div>
  )
}
