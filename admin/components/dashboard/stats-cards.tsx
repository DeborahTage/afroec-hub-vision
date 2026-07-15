import { Calendar, Eye, MousePointer, Users } from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'
import type { AnalyticsOverview } from '@/types'

export function StatsCards({ data }: { data?: AnalyticsOverview }) {
  const stats = [
    { title: 'Total Visits', value: data?.totalVisits ?? 0, icon: Users, change: data?.visitsChangePct ?? 12, trend: 'up' as const },
    { title: 'Unique Visitors', value: data?.uniqueVisitors ?? 0, icon: Eye, change: 8, trend: 'up' as const },
    { title: 'Page Views', value: data?.pageViews ?? 0, icon: MousePointer, change: 4, trend: 'up' as const },
    { title: 'Last 7 Days', value: data?.visitsLast7Days ?? 0, icon: Calendar, change: 2, trend: 'neutral' as const }
  ]
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} changeLabel="from last month" />
      ))}
    </div>
  )
}
