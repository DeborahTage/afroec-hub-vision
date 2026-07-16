import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/data-table'
import type { Application } from '@/types'

export function ApplicationTable({ data = [] }: { data?: Application[] }) {
  const statusVariant = (status: string) => {
    if (status === 'ACCEPTED') return 'success'
    if (status === 'REJECTED') return 'danger'
    if (status === 'INTERVIEW') return 'info'
    return 'warning'
  }

  return (
    <DataTable
      data={data}
      emptyTitle="No applications found"
      emptyDescription="Try changing the filters, or wait for new applications to arrive."
      getRowId={(row) => `${row.type}-${row.id}`}
      columns={[
        { key: 'id', header: 'ID', sortable: true, render: (row) => `#${row.id}` },
        { key: 'type', header: 'Type', sortable: true, render: (row) => <Badge variant="info">{row.type}</Badge> },
        { key: 'fullName', header: 'Name', sortable: true },
        { key: 'email', header: 'Email' },
        { key: 'status', header: 'Status', sortable: true, render: (row) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge> },
        { key: 'createdAt', header: 'Date', sortable: true, render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-' },
        { key: 'actions', header: 'Actions', render: () => <button className="btn btn-ghost btn-icon" aria-label="Open row actions">⋮</button> }
      ]}
    />
  )
}
