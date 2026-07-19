'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { eventsApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { EventForm } from '@/components/events/event-form'
import { EventCard } from '@/components/events/event-card'
import { EmptyState } from '@/components/shared/empty-state'
import type { Event } from '@/types'

export default function EventsPage() {
  const qc = useQueryClient()
  const [status, setStatus] = useState('ALL')
  const [editing, setEditing] = useState<Event | null>(null)
  const { data = [], isError, error, refetch } = useQuery<Event[]>({ queryKey:['events'], queryFn: eventsApi.getAll })
  const del = useMutation({ mutationFn: eventsApi.delete, onSuccess:()=>qc.invalidateQueries({ queryKey:['events'] }) })
  const filtered = status === 'ALL' ? data : data.filter((event) => event.status === status)

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Events</h1>
          <p className="page-subtitle">Create, publish, and manage public Afroec events.</p>
        </div>
        <Button onClick={() => setEditing(null)}><Plus size={16}/>Create</Button>
      </div>
      {isError && (
        <div role="alert" className="card" style={{ padding: 16, color: 'var(--danger)' }}>
          {error instanceof Error ? error.message : 'Unable to load events.'}
          <div style={{ marginTop: 8 }}><Button variant="secondary" onClick={() => refetch()}>Retry</Button></div>
        </div>
      )}
      <div className="filter-bar">
        {['ALL', 'UPCOMING', 'PAST', 'CANCELLED'].map((item) => (
          <button key={item} className={status === item ? 'page-pill page-pill-active' : 'page-pill'} onClick={() => setStatus(item)}>
            {item === 'ALL' ? 'All' : item[0] + item.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="two-column-grid">
        <div className="responsive-grid">
          {filtered.length === 0 ? (
            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <EmptyState icon={Plus} title="No events found" description="Create your first event or change the selected filter." />
            </div>
          ) : (
            filtered.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={setEditing}
                onDelete={(id) => del.mutate(id)}
              />
            ))
          )}
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">{editing ? 'Edit Event' : 'Create Event'}</h2></div>
          <div className="card-content">
            <EventForm
              key={editing?.id || 'new'}
              event={editing}
              onSuccess={() => setEditing(null)}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
