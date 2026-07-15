import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  period?: '7d' | '30d' | '90d' | '1y'
  onPeriodChange?: (period: '7d' | '30d' | '90d' | '1y') => void
}

const periods = ['7d', '30d', '90d', '1y'] as const

export function ChartCard({ title, subtitle, children, period = '30d', onPeriodChange }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>
        <div style={{ display: 'flex', gap: 6 }} aria-label="Chart period">
          {periods.map((item) => (
            <button
              key={item}
              className={item === period ? 'page-pill page-pill-active' : 'page-pill'}
              onClick={() => onPeriodChange?.(item)}
              aria-pressed={item === period}
            >
              {item}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function BarPreview({ values }: { values: number[] }) {
  const max = Math.max(...values, 1)
  return (
    <div className="chart-placeholder" aria-label="Chart preview">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="chart-bar" style={{ height: `${Math.max((value / max) * 100, 8)}%` }} />
      ))}
    </div>
  )
}
