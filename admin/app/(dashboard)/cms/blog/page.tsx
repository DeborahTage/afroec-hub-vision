'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { cmsApi } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/shared/data-table'
import type { BlogPost } from '@/types'

export default function CmsBlogPage() {
  const { data = [] } = useQuery<BlogPost[]>({ queryKey:['cms-blog'], queryFn: cmsApi.getBlogPosts })
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">CMS Blog</h1>
          <p className="page-subtitle">Manage blog posts, drafts, categories, tags, and SEO metadata.</p>
        </div>
        <Link href="/cms/blog/new" className="btn btn-primary">New Post</Link>
      </div>
      <DataTable
        data={data}
        emptyTitle="No blog posts"
        emptyDescription="Create the first Afroec blog post to start publishing updates."
        columns={[
          { key: 'title', header: 'Title', sortable: true },
          { key: 'status', header: 'Status', sortable: true, render: (row) => <Badge variant={row.status === 'PUBLISHED' ? 'success' : row.status === 'ARCHIVED' ? 'default' : 'warning'}>{row.status}</Badge> },
          { key: 'author', header: 'Author', render: (row) => row.author || 'Afroec Team' },
          { key: 'category', header: 'Category', render: (row) => row.category || '-' },
          { key: 'publishedAt', header: 'Published', render: (row) => row.publishedAt ? new Date(row.publishedAt).toLocaleDateString() : '-' },
          { key: 'actions', header: 'Actions', render: (row) => <Link className="btn btn-secondary" href={`/cms/blog/${row.id}`}>Edit</Link> }
        ]}
      />
    </div>
  )
}
