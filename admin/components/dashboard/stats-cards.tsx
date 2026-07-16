import { Calendar, Eye, MousePointer, Users } from 'lucide-react'
import { StatCard } from '@/components/shared/stat-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { AnalyticsOverview } from '@/types'

export function StatsCards({ data, isLoading = false }: { data?: AnalyticsOverview; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="stats-grid" aria-label="Loading analytics stats">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} className="card" style={{ height: 158 }} />
        ))}
      </div>
    )
  }

  const stats = [
    { title: 'Total Visits', value: data?.totalVisits ?? 0, icon: Users, change: data?.visitsChange ?? data?.visitsChangePct ?? 0, trend: (data?.visitsChange ?? data?.visitsChangePct ?? 0) >= 0 ? 'up' as const : 'down' as const },
    { title: 'Unique Visitors', value: data?.uniqueVisitors ?? 0, icon: Eye, change: data?.visitorsChange ?? 0, trend: (data?.visitorsChange ?? 0) >= 0 ? 'up' as const : 'down' as const },
    { title: 'Page Views', value: data?.pageViews ?? 0, icon: MousePointer, change: data?.viewsChange ?? 0, trend: (data?.viewsChange ?? 0) >= 0 ? 'up' as const : 'down' as const },
    { title: 'Last 7 Days', value: data?.visitsLast7Days ?? 0, icon: Calendar, change: data?.visitsChangePct ?? 0, trend: 'neutral' as const }
  ]
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} changeLabel="from last month" />
      ))}
    </div>
  )
}
