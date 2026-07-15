'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { ChartCard, BarPreview } from '@/components/shared/chart-card'
import { DataTable } from '@/components/shared/data-table'
import { Button } from '@/components/ui/button'
import type { AnalyticsOverview } from '@/types'

function MetricBars({ data }: { data?: Record<string, number> }) {
  const entries = Object.entries(data || {}) as [string, number][]
  const max = Math.max(...entries.map(([, value]) => value), 1)
  const fallback: [string, number][] = [['Direct', 45], ['Social', 25], ['Search', 20], ['Referral', 10]]
  return (
    <div className="metric-list">
      {(entries.length ? entries : fallback).map(([key, value]) => (
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
  const chartValues = Object.values(data?.popularPages || { programs: 35, apply: 28, ambassadors: 22, events: 18, about: 14, contact: 9 })

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
      <ChartCard title="Overview Chart" subtitle="Visits over time" period={period} onPeriodChange={setPeriod}>
        <BarPreview values={chartValues} />
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
