'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, Eye, MailPlus, X } from 'lucide-react'
import { emailsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import { Select } from '@/components/ui/input'
import type { ContactMessage } from '@/types'

function downloadContactsCsv(rows: ContactMessage[]) {
  const header = ['id', 'name', 'email', 'subject', 'status', 'message', 'createdAt']
  const escape = (value: unknown) => {
    const text = value == null ? '' : String(value)
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const lines = [
    header.join(','),
    ...rows.map((row) =>
      [row.id, row.name, row.email, row.subject, row.status, row.message, row.createdAt].map(escape).join(',')
    )
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'contacts-export.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function EmailsPage() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const { data = [], isError, error, refetch } = useQuery<ContactMessage[]>({
    queryKey: ['contacts'],
    queryFn: emailsApi.getContacts
  })

  const rows = useMemo(() => {
    if (filter === 'All') return data
    const wanted = filter.toUpperCase().replace(' ', '_')
    return data.filter((item) => String(item.status).toUpperCase() === wanted || String(item.status).toUpperCase() === filter.toUpperCase())
  }, [data, filter])

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => emailsApi.updateContactStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
    }
  })

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Email Inbox</h1>
          <p className="page-subtitle">Review contact messages and support requests sent to support@afroec.com.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" onClick={() => downloadContactsCsv(rows)} disabled={rows.length === 0}>
            <Download size={16} /> Export
          </Button>
          <Button disabled title="Compose is not connected to mail yet">
            <MailPlus size={16} /> Compose
          </Button>
        </div>
      </div>

      {isError && (
        <div role="alert" style={{ color: 'var(--danger)', border: '1px solid rgba(239,68,68,.25)', padding: 14, borderRadius: 12 }}>
          {error instanceof Error ? error.message : 'Unable to load messages.'}
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={() => refetch()}>Try again</Button>
          </div>
        </div>
      )}

      <div className="filter-bar">
        {[
          { value: 'All', label: 'All' },
          { value: 'NEW', label: 'New' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'RESOLVED', label: 'Resolved' },
          { value: 'SPAM', label: 'Spam' }
        ].map((item) => (
          <button
            key={item.value}
            className={filter === item.value ? 'page-pill page-pill-active' : 'page-pill'}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <DataTable
        data={rows}
        emptyTitle="Inbox is empty"
        emptyDescription="New contact messages will appear here for triage."
        getRowId={(row) => row.id}
        onExportSelected={(ids) => {
          const selectedRows = rows.filter((row) => ids.includes(row.id))
          downloadContactsCsv(selectedRows)
        }}
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email', sortable: true },
          { key: 'subject', header: 'Subject' },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <Badge variant={row.status === 'RESOLVED' ? 'success' : row.status === 'SPAM' ? 'danger' : 'warning'}>
                {row.status}
              </Badge>
            )
          },
          {
            key: 'createdAt',
            header: 'Received',
            sortable: true,
            render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleString() : '-')
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <Button variant="secondary" onClick={() => setSelected(row)}>
                <Eye size={14} /> View
              </Button>
            )
          }
        ]}
      />

      {selected && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 50,
            padding: 16
          }}
        >
          <div className="card" onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <h2 style={{ margin: 0 }}>{selected.subject}</h2>
                <p className="page-subtitle">{selected.name} · {selected.email}</p>
              </div>
              <Button variant="secondary" size="icon" onClick={() => setSelected(null)} aria-label="Close">
                <X size={16} />
              </Button>
            </div>
            <Select
              value={selected.status}
              onChange={(event) => {
                const next = event.target.value
                setSelected({ ...selected, status: next })
                statusMutation.mutate({ id: selected.id, status: next })
              }}
              aria-label="Update message status"
              style={{ maxWidth: 220, marginBottom: 16 }}
            >
              {['NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM'].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </Select>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{selected.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}
