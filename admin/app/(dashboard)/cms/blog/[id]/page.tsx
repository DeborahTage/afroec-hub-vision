'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Save, Send } from 'lucide-react'
import { cmsApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import type { BlogPost } from '@/types'

const EMPTY_POST: Omit<BlogPost, 'id'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  author: 'Afroec Team',
  category: 'News',
  tags: '',
  status: 'DRAFT'
}

export default function BlogEditorPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const isNew = params.id === 'new'
  const numericId = Number(params.id)
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(EMPTY_POST)

  const postQuery = useQuery({
    queryKey: ['cms-blog', numericId],
    queryFn: () => cmsApi.getBlogPost(numericId),
    enabled: !isNew && Number.isFinite(numericId)
  })

  useEffect(() => {
    if (postQuery.data) {
      const { id: _id, ...post } = postQuery.data
      setForm(post)
    }
  }, [postQuery.data])

  const save = useMutation({
    mutationFn: (next: Omit<BlogPost, 'id'>) =>
      isNew ? cmsApi.createBlogPost(next) : cmsApi.updateBlogPost(numericId, next),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cms-blog'] })
      router.push('/cms/blog')
    }
  })

  function submit(event: { preventDefault(): void }, status = form.status) {
    event.preventDefault()
    save.mutate({ ...form, status })
  }

  if (postQuery.isLoading) return <p className="page-subtitle">Loading post…</p>

  return (
    <form className="section-grid" onSubmit={submit}>
      <div className="page-header">
        <div>
          <h1 className="page-title">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
          <p className="page-subtitle">Create, edit, and publish website articles.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button type="submit" variant="secondary" disabled={save.isPending}><Save size={16} />Save</Button>
          <Button type="button" disabled={save.isPending} onClick={(event) => submit(event, 'PUBLISHED')}><Send size={16} />Publish</Button>
        </div>
      </div>
      {(postQuery.error || save.error) && (
        <p role="alert" style={{ color: 'var(--danger)' }}>
          {(postQuery.error || save.error)?.message}
        </p>
      )}
      <div className="two-column-grid">
        <div style={{ display: 'grid', gap: 14 }}>
          <label><span className="label">Title</span><Input required value={form.title} onChange={(e) => setForm({...form, title:e.target.value})}/></label>
          <label><span className="label">Slug</span><Input value={form.slug} onChange={(e) => setForm({...form, slug:e.target.value})}/></label>
          <label><span className="label">Excerpt</span><Textarea value={form.excerpt || ''} onChange={(e) => setForm({...form, excerpt:e.target.value})}/></label>
          <label><span className="label">Content</span><Textarea style={{ minHeight: 360 }} value={form.content || ''} onChange={(e) => setForm({...form, content:e.target.value})}/></label>
          <label><span className="label">Featured image URL</span><Input type="url" value={form.featuredImage || ''} onChange={(e) => setForm({...form, featuredImage:e.target.value})}/></label>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Settings</h2></div>
          <div className="card-content" style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Status</span><Select value={form.status} onChange={(e) => setForm({...form, status:e.target.value as BlogPost['status']})}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></Select></label>
            <label><span className="label">Category</span><Input value={form.category || ''} onChange={(e) => setForm({...form, category:e.target.value})}/></label>
            <label><span className="label">Tags (comma separated)</span><Input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''} onChange={(e) => setForm({...form, tags:e.target.value})}/></label>
            <label><span className="label">Author</span><Input value={form.author || ''} onChange={(e) => setForm({...form, author:e.target.value})}/></label>
            <label><span className="label">Meta Title</span><Input value={form.metaTitle || ''} onChange={(e) => setForm({...form, metaTitle:e.target.value})}/></label>
            <label><span className="label">Meta Description</span><Textarea value={form.metaDescription || ''} onChange={(e) => setForm({...form, metaDescription:e.target.value})}/></label>
          </div>
        </div>
      </div>
    </form>
  )
}
