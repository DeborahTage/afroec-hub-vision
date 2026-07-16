import { Image, Link, Quote, Save, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function BlogEditorPage() {
  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">New Blog Post</h1>
          <p className="page-subtitle">Rich editorial workspace for drafting and publishing CMS content.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary"><Save size={16} />Save</Button>
          <Button><Send size={16} />Publish</Button>
        </div>
      </div>
      <label>
        <span className="label">Title</span>
        <Input placeholder="Enter post title..." />
      </label>
      <div className="card">
        <div className="filter-bar" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', borderWidth: '0 0 1px' }}>
          {['B', 'I', 'U', 'H1', 'H2'].map((item) => <button key={item} className="btn btn-ghost">{item}</button>)}
          <button className="btn btn-ghost"><Quote size={16} />Quote</button>
          <button className="btn btn-ghost"><Link size={16} />Link</button>
          <button className="btn btn-ghost"><Image size={16} />Image</button>
          <button className="btn btn-ghost">Code</button>
        </div>
        <Textarea placeholder="Start writing your post..." style={{ minHeight: 320, border: 0, borderRadius: 0 }} />
      </div>
      <div className="two-column-grid">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Featured Image</h2></div>
          <div className="card-content">
            <div className="empty-state" style={{ border: '1px dashed var(--border-hover)', borderRadius: 'var(--radius-lg)' }}>
              <Image size={42} />
              <h3>Upload area</h3>
              <p>Drag a featured image here, or select one from the media library.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Settings</h2></div>
          <div className="card-content" style={{ display: 'grid', gap: 14 }}>
            <label><span className="label">Status</span><Select><option>DRAFT</option><option>PUBLISHED</option></Select></label>
            <label><span className="label">Category</span><Select><option>News</option><option>Events</option><option>Programs</option></Select></label>
            <div><span className="label">Tags</span><div style={{ display: 'flex', gap: 8 }}><Badge>Cybersecurity</Badge><Badge>Community</Badge><button className="page-pill">+</button></div></div>
            <label><span className="label">Author</span><Input placeholder="Afroec Team" /></label>
            <label><span className="label">Meta Title</span><Input /></label>
            <label><span className="label">Meta Description</span><Textarea /></label>
          </div>
        </div>
      </div>
    </div>
  )
}
