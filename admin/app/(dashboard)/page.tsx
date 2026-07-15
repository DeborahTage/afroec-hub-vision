'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { analyticsApi, applicationsApi } from '@/lib/api'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { Badge } from '@/components/ui/badge'
import { ChartCard, BarPreview } from '@/components/shared/chart-card'
import { DataTable } from '@/components/shared/data-table'
import type { AnalyticsOverview, Application } from '@/types'

export default function DashboardPage() {
  const { data: analytics } = useQuery<AnalyticsOverview>({ queryKey: ['analytics-overview'], queryFn: analyticsApi.getOverview })
  const { data: applications = [] } = useQuery<Application[]>({ queryKey: ['applications-recent'], queryFn: () => applicationsApi.getAll({ limit: 5 }) })
  const recent = applications.slice(0, 5)
  const topPages = Object.entries(analytics?.popularPages || {}).slice(0, 5)
  const trafficValues = Object.values(analytics?.popularPages || { dashboard: 18, programs: 40, apply: 34, events: 26, about: 22, contact: 16 })

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of Afroec Hub activity, applications, and visitor behavior.</p>
        </div>
        <button className="btn btn-secondary">Last 30 days</button>
      </div>
      <StatsCards data={analytics} />
      <div className="two-column-grid">
        <ChartCard title="Traffic Chart" subtitle="Visits over time" period="30d">
          <BarPreview values={trafficValues.length ? trafficValues : [12, 18, 30, 24, 36, 46, 52]} />
        </ChartCard>
        <ChartCard title="Top Pages" subtitle="Most viewed public routes">
          <div className="metric-list">
            {(topPages.length ? topPages : [['/programs', 5234], ['/apply', 3876], ['/ambassadors', 3102], ['/events', 2567], ['/about', 1890]]).map(([page, views]) => (
              <div key={page} className="metric-row">
                <div>
                  <div style={{ fontWeight: 600 }}>{page}</div>
                  <div className="metric-bar" style={{ marginTop: 8 }}>
                    <div className="metric-fill" style={{ width: `${Math.min((Number(views) / 5234) * 100, 100)}%` }} />
                  </div>
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>{Number(views).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      <section>
        <div className="page-header" style={{ marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Recent Applications</h2>
            <p className="page-subtitle">Latest submissions across all application types.</p>
          </div>
          <Link href="/applications" className="btn btn-secondary">View all</Link>
        </div>
        <DataTable
          data={recent}
          emptyTitle="No recent applications"
          emptyDescription="New submissions will appear here as soon as applicants send them."
          columns={[
            { key: 'fullName', header: 'Name', sortable: true },
            { key: 'type', header: 'Type', render: (row) => <Badge variant="info">{row.type}</Badge> },
            { key: 'email', header: 'Email' },
            { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'ACCEPTED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'}>{row.status}</Badge> },
            { key: 'createdAt', header: 'Time', sortable: true, render: (row) => new Date(row.createdAt).toLocaleDateString() }
          ]}
        />
      </section>
    </div>
  )
}
