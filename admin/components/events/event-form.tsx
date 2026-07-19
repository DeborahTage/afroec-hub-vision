'use client'

import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { eventsApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import type { Event } from '@/types'

type EventDraft = {
  title: string
  slug: string
  description: string
  content: string
  eventDate: string
  eventTime: string
  location: string
  imageUrl: string
  registrationLink: string
  maxAttendees: string
  category: string
  status: string
  published: boolean
}

function draftFrom(event?: Event | null): EventDraft {
  return {
    title: event?.title || '',
    slug: event?.slug || '',
    description: event?.description || '',
    content: event?.content || '',
    eventDate: event?.eventDate || '',
    eventTime: event?.eventTime || '',
    location: event?.location || '',
    imageUrl: event?.imageUrl || '',
    registrationLink: event?.registrationLink || '',
    maxAttendees: event?.maxAttendees ? String(event.maxAttendees) : '',
    category: event?.category || 'Workshops',
    status: event?.status || 'UPCOMING',
    published: event?.published ?? event?.isPublished ?? true
  }
}

export function EventForm({ event, onSuccess, onCancel }: { event?: Event | null; onSuccess?: () => void; onCancel?: () => void }) {
  const qc = useQueryClient()
  const [form, setForm] = useState<EventDraft>(() => draftFrom(event))
  const mutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => event ? eventsApi.update(event.id, data) : eventsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey:['events'] })
      setForm(draftFrom())
      onSuccess?.()
    }
  })
  function submit(e: FormEvent) {
    e.preventDefault()
    mutation.mutate({
      ...form,
      maxAttendees: form.maxAttendees ? Number(form.maxAttendees) : null,
      eventDate: form.eventDate || null,
      eventTime: form.eventTime || null
    })
  }
  return (
    <form onSubmit={submit} style={{ display:'grid', gap:14 }}>
      <label><span className="label">Title</span><Input required placeholder="Event title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></label>
      <label><span className="label">Slug</span><Input placeholder="event-slug" value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})}/></label>
      <label><span className="label">Description</span><Textarea placeholder="Short public event description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></label>
      <label><span className="label">Full content</span><Textarea placeholder="Event details" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})}/></label>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <label><span className="label">Date</span><Input type="date" value={form.eventDate} onChange={(e)=>setForm({...form,eventDate:e.target.value})}/></label>
        <label><span className="label">Time</span><Input type="time" value={form.eventTime} onChange={(e)=>setForm({...form,eventTime:e.target.value})}/></label>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <label><span className="label">Location</span><Input placeholder="Addis Ababa / Online" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})}/></label>
        <label><span className="label">Status</span><Select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}><option>UPCOMING</option><option>ONGOING</option><option>PAST</option><option>CANCELLED</option></Select></label>
      </div>
      <label><span className="label">Image URL</span><Input type="url" value={form.imageUrl} onChange={(e)=>setForm({...form,imageUrl:e.target.value})}/></label>
      <label><span className="label">Registration URL</span><Input type="url" value={form.registrationLink} onChange={(e)=>setForm({...form,registrationLink:e.target.value})}/></label>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        <label><span className="label">Category</span><Input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/></label>
        <label><span className="label">Maximum attendees</span><Input type="number" min="1" value={form.maxAttendees} onChange={(e)=>setForm({...form,maxAttendees:e.target.value})}/></label>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={form.published} onChange={(e)=>setForm({...form,published:e.target.checked})}/>
        <span className="label">Published</span>
      </label>
      {mutation.error && <p role="alert" style={{ color: 'var(--danger)' }}>{mutation.error.message}</p>}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="submit" disabled={mutation.isPending}>{event ? 'Save Changes' : 'Create Event'}</Button>
        {event && <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}
