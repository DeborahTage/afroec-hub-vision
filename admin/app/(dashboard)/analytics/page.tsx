'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { analyticsApi } from '@/lib/api'
import { formatPageLabel, periodToDays, type AnalyticsPeriod } from '@/lib/analytics-format'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ChartCard } from '@/components/shared/chart-card'
import { DataTable } from '@/components/shared/data-table'
import { Button } from '@/components/ui/button'
import type { AnalyticsOverview } from '@/types'

function MetricBars({ data }: { data?: Record<string, number> }) {
  const entries = Object.entries(data || {}) as [string, number][]
  const max = Math.max(...entries.map(([, value]) => value), 1)
  if (entries.length === 0) {
    return <p style={{ color: 'var(--text-secondary)' }}>No analytics data recorded yet.</p>
  }
  return (
    <div className="metric-list">
      {entries.map(([key, value]) => (
        <div key={key} className="metric-row">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span>{key}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{value}</span>
            </div>
            <div className="metric-bar" style={{ marginTop: 8 }}>
              <div className="metric-fill" style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatTick(date: string, period: AnalyticsPeriod) {
  const d = new Date(`${date}T00:00:00`)
  if (Number.isNaN(d.getTime())) return date
  if (period === '7d') {
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  }
  if (period === '1y') {
    return d.toLocaleDateString(undefined, { month: 'short' })
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('30d')
  const days = periodToDays(period)
  const { data, isLoading, error, refetch } = useQuery<AnalyticsOverview>({
    queryKey: ['analytics-overview', days],
    queryFn: () => analyticsApi.getOverview(days),
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  })

  const daily = (data?.daily || []).map((point) => ({
    ...point,
    label: formatTick(point.date, period),
  }))

  const popularPages = Object.entries(data?.popularPages || {}).map(([page, views], index) => ({
    id: index + 1,
    page,
    label: formatPageLabel(page),
    views,
  }))

  const pageChart = popularPages.map((row) => ({
    page: row.label,
    views: row.views,
  }))

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Live traffic, popular pages, sources, geography and devices.</p>
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
      {error && (
        <div className="card" role="alert" style={{ padding: 16, borderColor: 'rgba(239,68,68,.35)' }}>
          <strong style={{ color: 'var(--danger)' }}>Failed to load analytics.</strong>
          <p className="page-subtitle">
            {error instanceof Error ? error.message : 'The admin analytics API did not return data.'}
          </p>
          <Button variant="secondary" onClick={() => refetch()}>Retry</Button>
        </div>
      )}
      <StatsCards data={data} isLoading={isLoading} />
      <ChartCard title="Traffic Chart" subtitle="Visits over time" period={period} onPeriodChange={setPeriod}>
        {daily.length ? (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <AreaChart data={daily} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
                <defs>
                  <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="label"
                  minTickGap={period === '7d' ? 8 : 24}
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
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
                  fill="url(#visitsFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLoading
              ? 'Loading visits…'
              : 'No daily visit series yet. Redeploy the backend so /admin/analytics includes daily counts.'}
          </p>
        )}
      </ChartCard>
      <ChartCard title="Top Pages" subtitle="Most viewed public routes" period={period} onPeriodChange={setPeriod}>
        {pageChart.length ? (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={pageChart} margin={{ top: 12, right: 12, left: 0, bottom: 48 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="page"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Views']} />
                <Bar dataKey="views" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>No page views have been recorded yet.</p>
        )}
      </ChartCard>
      <div className="two-column-grid">
        <ChartCard title="Traffic Sources" subtitle="Acquisition breakdown" period={period} onPeriodChange={setPeriod}>
          <MetricBars data={data?.trafficSources} />
        </ChartCard>
        <ChartCard title="Geographic Distribution" subtitle="Visitor location mix" period={period} onPeriodChange={setPeriod}>
          <MetricBars data={data?.geo} />
        </ChartCard>
      </div>
      <DataTable
        data={popularPages}
        emptyTitle="No page analytics yet"
        emptyDescription="Page analytics will populate as frontend visits are tracked."
        columns={[
          {
            key: 'label',
            header: 'Page',
            sortable: true,
            render: (row) => (
              <div>
                <div style={{ fontWeight: 600 }}>{row.label}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{row.page}</div>
              </div>
            ),
          },
          { key: 'views', header: 'Views', sortable: true, render: (row) => row.views.toLocaleString() },
        ]}
      />
    </div>
  )
}
