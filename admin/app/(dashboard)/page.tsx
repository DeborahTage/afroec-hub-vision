'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { analyticsApi, applicationsApi } from '@/lib/api'
import { formatPageLabel, periodToDays, type AnalyticsPeriod } from '@/lib/analytics-format'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { Badge } from '@/components/ui/badge'
import { ChartCard } from '@/components/shared/chart-card'
import { DataTable } from '@/components/shared/data-table'
import { Button } from '@/components/ui/button'
import type { AnalyticsOverview, Application } from '@/types'

export default function DashboardPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('30d')
  const days = periodToDays(period)
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useQuery<AnalyticsOverview>({
    queryKey: ['analytics-overview', days],
    queryFn: () => analyticsApi.getOverview(days),
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  })
  const { data: applications = [] } = useQuery<Application[]>({
    queryKey: ['applications-recent'],
    queryFn: () => applicationsApi.getAll({ limit: 5 }),
  })
  const recent = applications.slice(0, 5)
  const topPages = Object.entries(analytics?.popularPages || {}).slice(0, 5)
  const maxViews = Math.max(...topPages.map(([, views]) => Number(views)), 1)
  const daily = (analytics?.daily || []).map((point) => ({
    ...point,
    label: new Date(`${point.date}T00:00:00`).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    }),
  }))

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of Afroec Hub activity, applications, and visitor behavior.</p>
        </div>
        <div className="pagination-actions">
          {(['7d', '30d', '90d', '1y'] as const).map((item) => (
            <button
              key={item}
              className={period === item ? 'page-pill page-pill-active' : 'page-pill'}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {analyticsError && (
        <div className="card" role="alert" style={{ padding: 16, borderColor: 'rgba(239,68,68,.35)' }}>
          <strong style={{ color: 'var(--danger)' }}>Failed to load analytics.</strong>
          <p className="page-subtitle">
            {analyticsError instanceof Error
              ? analyticsError.message
              : 'The admin analytics API did not return data.'}
          </p>
          <Button variant="secondary" onClick={() => refetchAnalytics()}>
            Retry
          </Button>
        </div>
      )}
      <StatsCards data={analytics} isLoading={analyticsLoading} />
      <div className="two-column-grid">
        <ChartCard
          title="Traffic Chart"
          subtitle="Visits over time"
          period={period}
          onPeriodChange={setPeriod}
        >
          {daily.length ? (
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <AreaChart data={daily} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashVisitsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="label" minTickGap={28} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                  <YAxis allowDecimals={false} width={36} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                  <Tooltip
                    labelFormatter={(_, payload) => {
                      const point = payload?.[0]?.payload as { date?: string } | undefined
                      return point?.date || ''
                    }}
                    formatter={(value) => [Number(value).toLocaleString(), 'Visits']}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--primary)"
                    fill="url(#dashVisitsFill)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>
              {analyticsLoading
                ? 'Loading visits…'
                : 'No daily series yet. Redeploy the backend to enable visits-over-time.'}
            </p>
          )}
        </ChartCard>
        <ChartCard title="Top Pages" subtitle="Most viewed public routes" period={period} onPeriodChange={setPeriod}>
          <div className="metric-list">
            {topPages.length ? (
              topPages.map(([page, views]) => (
                <div key={page} className="metric-row">
                  <div>
                    <div style={{ fontWeight: 600 }}>{formatPageLabel(String(page))}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{String(page)}</div>
                    <div className="metric-bar" style={{ marginTop: 8 }}>
                      <div
                        className="metric-fill"
                        style={{ width: `${Math.min((Number(views) / maxViews) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>{Number(views).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No page views recorded yet.</p>
            )}
          </div>
        </ChartCard>
      </div>
      <section>
        <div className="page-header" style={{ marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Recent Applications</h2>
            <p className="page-subtitle">Latest submissions across all application types.</p>
          </div>
          <Link href="/applications" className="btn btn-secondary">
            View all
          </Link>
        </div>
        <DataTable
          data={recent}
          emptyTitle="No recent applications"
          emptyDescription="New submissions will appear here as soon as applicants send them."
          getRowId={(row) => `${row.type}-${row.id}`}
          columns={[
            { key: 'fullName', header: 'Name', sortable: true },
            { key: 'type', header: 'Type', render: (row) => <Badge variant="info">{row.type}</Badge> },
            { key: 'email', header: 'Email' },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge
                  variant={
                    row.status === 'ACCEPTED' ? 'success' : row.status === 'REJECTED' ? 'danger' : 'warning'
                  }
                >
                  {row.status}
                </Badge>
              ),
            },
            {
              key: 'createdAt',
              header: 'Time',
              sortable: true,
              render: (row) => new Date(row.createdAt).toLocaleDateString(),
            },
          ]}
        />
      </section>
    </div>
  )
}
