'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download, Plus, RefreshCw } from 'lucide-react'
import { applicationsApi } from '@/lib/api'
import { ApplicationTable } from '@/components/applications/application-table'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { SearchInput } from '@/components/shared/search-input'
import type { Application } from '@/types'

export default function ApplicationsPage() {
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const { data = [], isLoading, isError, error, refetch, isFetching } = useQuery<Application[]>({
    queryKey: ['applications', type, status],
    queryFn: () => applicationsApi.getAll({ type: type || undefined, status: status || undefined, limit: 200 })
  })

  const rows = data.filter((item) => {
    const haystack = [item.fullName, item.email, item.type, item.status].join(" ").toLowerCase()
    return haystack.includes(search.toLowerCase())
  })

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">
            Student, partnership, ambassador, volunteer, and internship applications.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Button variant="secondary"><Download size={16} />Export</Button>
          <Button><Plus size={16} />New</Button>
        </div>
      </div>

      {isError && (
        <div role="alert" style={{ color: 'var(--danger)', border: '1px solid rgba(239,68,68,.25)', padding: 14, borderRadius: 12 }}>
          {error instanceof Error ? error.message : 'Unable to load applications.'}
          <div style={{ marginTop: 8 }}>
            <Button variant="secondary" onClick={() => refetch()}>Try again</Button>
          </div>
        </div>
      )}

      <div className="filter-bar">
        <Select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter by application type">
          <option value="">All types</option>
          <option value="STUDENT">STUDENT</option>
          <option value="PARTNER">PARTNER</option>
          <option value="AMBASSADOR">AMBASSADOR</option>
          <option value="VOLUNTEER">VOLUNTEER</option>
          <option value="INTERNSHIP">INTERNSHIP</option>
        </Select>
        <Select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="NEW">NEW</option>
          <option value="REVIEWING">REVIEWING</option>
          <option value="INTERVIEW">INTERVIEW</option>
          <option value="ACCEPTED">ACCEPTED</option>
          <option value="REJECTED">REJECTED</option>
        </Select>
        <SearchInput value={search} onChange={setSearch} placeholder="Search name, email, type..." />
      </div>

      {isLoading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading applications…</p>
      ) : (
        <ApplicationTable data={rows} />
      )}
    </div>
  )
}
