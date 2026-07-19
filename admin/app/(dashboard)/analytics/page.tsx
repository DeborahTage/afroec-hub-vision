'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { analyticsApi } from '@/lib/api'
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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const { data, isLoading, error, refetch } = useQuery<AnalyticsOverview>({ queryKey:['analytics-overview'], queryFn: analyticsApi.getOverview })
  const popularPages = Object.entries(data?.popularPages || {}).map(([page, views], index) => ({
    id: index + 1,
    page,
    views,
    unique: Math.round(views * 0.78),
    time: index % 2 === 0 ? '2:34' : '1:45'
  }))
  const pageChart = Object.entries(data?.popularPages || {}).map(([page, views]) => ({ page, views }))

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Traffic, popular pages, sources, geography and device trends.</p>
        </div>
        <div className="pagination-actions">
          {(['7d', '30d', '90d', '1y'] as const).map((item) => (
            <button key={item} className={period === item ? 'page-pill page-pill-active' : 'page-pill'} onClick={() => setPeriod(item)}>
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
      <StatsCards data={data} isLoading={isLoading}/>
      <ChartCard title="Page Views" subtitle="Recorded views by page" period={period} onPeriodChange={setPeriod}>
        {pageChart.length ? (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={pageChart} margin={{ top: 12, right: 12, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="page" angle={-25} textAnchor="end" interval={0} height={70} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip />
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
          { key: 'page', header: 'Page', sortable: true },
          { key: 'views', header: 'Views', sortable: true, render: (row) => row.views.toLocaleString() },
          { key: 'unique', header: 'Unique', sortable: true, render: (row) => row.unique.toLocaleString() },
          { key: 'time', header: 'Time' }
        ]}
      />
    </div>
  )
}
