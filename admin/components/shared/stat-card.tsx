import type { LucideIcon } from 'lucide-react'
import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
}

export function StatCard({ title, value, change, changeLabel, icon: Icon, trend = 'neutral' }: StatCardProps) {
  const positive = trend === 'up' || (change ?? 0) > 0
  const negative = trend === 'down' || (change ?? 0) < 0

  return (
    <Card>
      <CardContent style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="avatar" aria-hidden="true">
            <Icon size={18} />
          </div>
          <button className="btn btn-ghost btn-icon" aria-label={`Open ${title} menu`}>
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.1 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <div style={{ marginTop: 6, color: 'var(--text-secondary)', fontSize: '.875rem' }}>{title}</div>
        </div>
        {change !== undefined && (
          <div
            className={cn(positive && 'badge-success', negative && 'badge-danger')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: '.75rem' }}
          >
            {positive ? <TrendingUp size={14} /> : negative ? <TrendingDown size={14} /> : null}
            <span>
              {change > 0 ? '+' : ''}
              {change}% {changeLabel}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
