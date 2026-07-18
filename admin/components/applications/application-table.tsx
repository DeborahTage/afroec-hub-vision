'use client'

import { useEffect, useRef, useState } from 'react'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/data-table'
import type { Application } from '@/types'

type Props = {
  data?: Application[]
  onView: (row: Application) => void
  onDelete: (row: Application) => void
  onExportSelected?: (rows: Application[]) => void
  onDeleteSelected?: (rows: Application[]) => void
}

export function ApplicationTable({
  data = [],
  onView,
  onDelete,
  onExportSelected,
  onDeleteSelected
}: Props) {
  const statusVariant = (status: string) => {
    if (status === 'ACCEPTED' || status === 'ACTIVE') return 'success'
    if (status === 'REJECTED' || status === 'DECLINED' || status === 'SPAM') return 'danger'
    if (status === 'INTERVIEW' || status === 'IN_DISCUSSION') return 'info'
    return 'warning'
  }

  const byKey = new Map(data.map((row) => [`${row.type}-${row.id}`, row]))

  return (
    <DataTable
      data={data}
      emptyTitle="No applications found"
      emptyDescription="Try changing the filters, or wait for new applications to arrive."
      getRowId={(row) => `${row.type}-${row.id}`}
      onExportSelected={(ids) => {
        const rows = ids.map((id) => byKey.get(String(id))).filter(Boolean) as Application[]
        onExportSelected?.(rows)
      }}
      onDeleteSelected={(ids) => {
        const rows = ids.map((id) => byKey.get(String(id))).filter(Boolean) as Application[]
        onDeleteSelected?.(rows)
      }}
      columns={[
        { key: 'id', header: 'ID', sortable: true, render: (row) => `#${row.id}` },
        { key: 'type', header: 'Type', sortable: true, render: (row) => <Badge variant="info">{row.type}</Badge> },
        { key: 'fullName', header: 'Name', sortable: true },
        { key: 'email', header: 'Email' },
        {
          key: 'status',
          header: 'Status',
          sortable: true,
          render: (row) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
        },
        {
          key: 'createdAt',
          header: 'Date',
          sortable: true,
          render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-')
        },
        {
          key: 'actions',
          header: 'Actions',
          render: (row) => (
            <RowActions
              onView={() => onView(row)}
              onDelete={() => onDelete(row)}
            />
          )
        }
      ]}
    />
  )
}

function RowActions({ onView, onDelete }: { onView: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        className="btn btn-ghost btn-icon"
        aria-label="Open row actions"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: '110%',
            zIndex: 20,
            minWidth: 160,
            background: 'var(--surface, #fff)',
            border: '1px solid var(--border, #e5e7eb)',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
            padding: 6
          }}
        >
          <button
            type="button"
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', gap: 8 }}
            onClick={() => {
              setOpen(false)
              onView()
            }}
          >
            <Eye size={14} /> View details
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', gap: 8, color: 'var(--danger)' }}
            onClick={() => {
              setOpen(false)
              onDelete()
            }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}
