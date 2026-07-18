'use client'

import { useQuery } from '@tanstack/react-query'
import { Download } from 'lucide-react'
import { emailsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import type { NewsletterSubscriber } from '@/types'

function downloadSubscribersCsv(rows: NewsletterSubscriber[]) {
  const header = ['id', 'email', 'active', 'subscribedAt']
  const escape = (value: unknown) => {
    const text = value == null ? '' : String(value)
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const lines = [
    header.join(','),
    ...rows.map((row) =>
      [row.id, row.email, row.active ?? row.isActive ?? false, row.subscribedAt].map(escape).join(',')
    )
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'subscribers-export.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function SubscribersPage() {
  const { data = [], isError, error, refetch } = useQuery<NewsletterSubscriber[]>({
    queryKey: ['subscribers'],
    queryFn: emailsApi.getSubscribers
  })

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscribers</h1>
          <p className="page-subtitle">Manage newsletter audience records and exports.</p>
        </div>
        <Button variant="secondary" onClick={() => downloadSubscribersCsv(data)} disabled={data.length === 0}>
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {isError && (
        <div role="alert" style={{ color: 'var(--danger)', border: '1px solid rgba(239,68,68,.25)', padding: 14, borderRadius: 12 }}>
          {error instanceof Error ? error.message : 'Unable to load subscribers.'}
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={() => refetch()}>Try again</Button>
          </div>
        </div>
      )}

      <DataTable
        data={data}
        emptyTitle="No subscribers yet"
        emptyDescription="Newsletter signups will be listed here once users subscribe."
        getRowId={(row) => row.id}
        onExportSelected={(ids) => {
          downloadSubscribersCsv(data.filter((row) => ids.includes(row.id)))
        }}
        columns={[
          { key: 'email', header: 'Email', sortable: true },
          {
            key: 'active',
            header: 'Active',
            render: (row) => (
              <Badge variant={(row.active ?? row.isActive) ? 'success' : 'danger'}>
                {(row.active ?? row.isActive) ? 'Active' : 'Inactive'}
              </Badge>
            )
          },
          {
            key: 'subscribedAt',
            header: 'Subscribed',
            sortable: true,
            render: (row) => (row.subscribedAt ? new Date(row.subscribedAt).toLocaleDateString() : '-')
          }
        ]}
      />
    </div>
  )
}
