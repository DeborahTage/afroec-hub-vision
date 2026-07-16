'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Download, Plus } from 'lucide-react'
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
  const { data = [] } = useQuery<Application[]>({ queryKey:['applications', type, status], queryFn: () => applicationsApi.getAll({ type, status }) })
  const rows = data.filter((item) => [item.fullName, item.email, item.type, item.status].join(' ').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="section-grid">
      <div className="page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-subtitle">Manage partnership, ambassador, volunteer and internship applications.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary"><Download size={16} />Export</Button>
          <Button><Plus size={16} />New</Button>
        </div>
      </div>
      <div className="filter-bar">
        <Select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter by application type">
          <option value="">All types</option>
          <option>PARTNER</option>
          <option>AMBASSADOR</option>
          <option>VOLUNTEER</option>
          <option>INTERNSHIP</option>
        </Select>
        <Select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          <option>PENDING</option>
          <option>REVIEWING</option>
          <option>INTERVIEW</option>
          <option>ACCEPTED</option>
          <option>REJECTED</option>
        </Select>
        <SearchInput value={search} onChange={setSearch} placeholder="Search name, email, type..." />
      </div>
      <ApplicationTable data={rows} />
    </div>
  )
}
