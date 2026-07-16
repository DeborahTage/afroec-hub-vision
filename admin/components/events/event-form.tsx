'use client'

import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'

export function EventForm({ onSuccess }: { onSuccess?: () => void }) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ title:'', slug:'', description:'', eventDate:'', eventTime:'', location:'', category:'Workshops', status:'UPCOMING', published:true })
  const mutation = useMutation({ mutationFn: eventsApi.create, onSuccess: () => { qc.invalidateQueries({ queryKey:['events'] }); onSuccess?.() } })
  function submit(e: FormEvent) { e.preventDefault(); mutation.mutate(form) }
  return (
    <form onSubmit={submit} style={{ display:'grid', gap:14 }}>
      <label><span className="label">Title</span><Input required placeholder="Event title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></label>
      <label><span className="label">Slug</span><Input placeholder="event-slug" value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})}/></label>
      <label><span className="label">Description</span><Textarea placeholder="Short public event description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></label>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <label><span className="label">Date</span><Input type="date" value={form.eventDate} onChange={(e)=>setForm({...form,eventDate:e.target.value})}/></label>
        <label><span className="label">Time</span><Input type="time" value={form.eventTime} onChange={(e)=>setForm({...form,eventTime:e.target.value})}/></label>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <label><span className="label">Location</span><Input placeholder="Addis Ababa / Online" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})}/></label>
        <label><span className="label">Status</span><Select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}><option>UPCOMING</option><option>ONGOING</option><option>PAST</option><option>CANCELLED</option></Select></label>
      </div>
      <Button type="submit" disabled={mutation.isPending}>Create Event</Button>
    </form>
  )
}
