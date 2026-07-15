'use client'
import { useQuery } from '@tanstack/react-query'
import { cmsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import type { CmsPage } from '@/types'

export default function CmsPagesPage() {
  const { data = [] } = useQuery<CmsPage[]>({ queryKey:['cms-pages'], queryFn: cmsApi.getPages })
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">CMS Pages</h1>
          <p className="page-subtitle">Edit public page content, SEO fields, and publish state.</p>
        </div>
        <Button>New Page</Button>
      </div>
      <DataTable
        data={data}
        emptyTitle="No CMS pages"
        emptyDescription="CMS-managed page records will appear here."
        getRowId={(row, index) => row.id ?? row.pageKey ?? index}
        columns={[
          { key: 'pageKey', header: 'Key', sortable: true },
          { key: 'title', header: 'Title', sortable: true },
          { key: 'published', header: 'Published', render: (row) => <Badge variant={row.published ? 'success' : 'warning'}>{row.published ? 'Published' : 'Draft'}</Badge> },
          { key: 'updatedAt', header: 'Updated', render: (row) => row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : '-' },
          { key: 'actions', header: 'Actions', render: () => <button className="btn btn-ghost btn-icon" aria-label="Open page actions">⋮</button> }
        ]}
      />
    </div>
  )
}
