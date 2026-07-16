import { Calendar, MapPin, Pencil, Trash2, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
  onDelete?: (id: number) => void
}

export function EventCard({ event, onDelete }: EventCardProps) {
  const statusVariant = event.status === 'PAST' ? 'default' : event.status === 'CANCELLED' ? 'danger' : 'success'

  return (
    <article className="card" style={{ overflow: 'hidden' }}>
      <div className="event-card-image">
        <Badge variant={statusVariant} style={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
          {event.status}
        </Badge>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>{event.title}</h3>
        <p style={{ minHeight: 44, color: 'var(--text-secondary)', fontSize: '.875rem' }}>{event.description || 'No description provided.'}</p>
        <div style={{ display: 'grid', gap: 8, color: 'var(--text-secondary)', fontSize: '.875rem' }}>
          <span style={{ display: 'flex', gap: 8 }}><Calendar size={16} /> {event.eventDate || 'Date TBA'}</span>
          <span style={{ display: 'flex', gap: 8 }}><MapPin size={16} /> {event.location || 'Location TBA'}</span>
          <span style={{ display: 'flex', gap: 8 }}><Users size={16} /> {event.registrationsCount ?? 0}{event.maxAttendees ? `/${event.maxAttendees}` : ''}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <Button variant="secondary"><Pencil size={15} />Edit</Button>
          <Button variant="danger" onClick={() => onDelete?.(event.id)}><Trash2 size={15} />Delete</Button>
        </div>
      </div>
    </article>
  )
}
