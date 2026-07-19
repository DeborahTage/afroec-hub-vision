'use client'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cmsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/data-table'
import { Input, Textarea } from '@/components/ui/input'
import type { CmsPage } from '@/types'

export default function CmsPagesPage() {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState<CmsPage | null>(null)
  const [draft, setDraft] = useState<CmsPage | null>(null)
  const { data = [], isError, error, refetch } = useQuery<CmsPage[]>({ queryKey:['cms-pages'], queryFn: cmsApi.getPages })
  const save = useMutation({
    mutationFn: (page: CmsPage) => cmsApi.updatePage(page.pageKey, page),
    onSuccess: async () => {
      setEditing(null)
      setDraft(null)
      await queryClient.invalidateQueries({ queryKey: ['cms-pages'] })
    }
  })

  function edit(page?: CmsPage) {
    const next = page || { pageKey: '', title: '', content: '', metaTitle: '', metaDescription: '', published: false }
    setEditing(next)
    setDraft({ ...next })
  }

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">CMS Pages</h1>
          <p className="page-subtitle">Edit public page content, SEO fields, and publish state.</p>
        </div>
        <Button onClick={() => edit()}>New Page</Button>
      </div>
      {isError && (
        <div role="alert" className="card" style={{ padding: 16, color: 'var(--danger)' }}>
          {error instanceof Error ? error.message : 'Unable to load CMS pages.'}
          <div style={{ marginTop: 8 }}><Button variant="secondary" onClick={() => refetch()}>Retry</Button></div>
        </div>
      )}
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
          { key: 'actions', header: 'Actions', render: (row) => <Button variant="secondary" onClick={() => edit(row)}>Edit</Button> }
        ]}
      />
      {editing && draft && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Edit CMS page"
          onClick={() => setEditing(null)}
          style={{ position:'fixed', inset:0, background:'rgba(15,23,42,.45)', display:'grid', placeItems:'center', zIndex:50, padding:16 }}
        >
          <form
            className="card"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => { event.preventDefault(); save.mutate(draft) }}
            style={{ width:'min(720px, 100%)', maxHeight:'90vh', overflow:'auto', padding:20, display:'grid', gap:14 }}
          >
            <h2 style={{ margin: 0 }}>{editing.pageKey ? `Edit ${editing.pageKey}` : 'New CMS Page'}</h2>
            <label>
              <span className="label">Page key</span>
              <Input required disabled={Boolean(editing.pageKey)} value={draft.pageKey} onChange={(e) => setDraft({...draft, pageKey:e.target.value})}/>
            </label>
            <label>
              <span className="label">Title</span>
              <Input required value={draft.title} onChange={(e) => setDraft({...draft, title:e.target.value})}/>
            </label>
            <label>
              <span className="label">Content</span>
              <Textarea value={draft.content || ''} onChange={(e) => setDraft({...draft, content:e.target.value})}/>
            </label>
            <label>
              <span className="label">SEO title</span>
              <Input value={draft.metaTitle || ''} onChange={(e) => setDraft({...draft, metaTitle:e.target.value})}/>
            </label>
            <label>
              <span className="label">SEO description</span>
              <Textarea value={draft.metaDescription || ''} onChange={(e) => setDraft({...draft, metaDescription:e.target.value})}/>
            </label>
            <label style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input type="checkbox" checked={Boolean(draft.published)} onChange={(e) => setDraft({...draft, published:e.target.checked})}/>
              Published
            </label>
            {save.error && <p role="alert" style={{ color:'var(--danger)' }}>{save.error.message}</p>}
            <div style={{ display:'flex', gap:8 }}>
              <Button type="submit" disabled={save.isPending}>Save Page</Button>
              <Button type="button" variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
