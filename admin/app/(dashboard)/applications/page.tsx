'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Download, RefreshCw, X } from 'lucide-react'
import { applicationsApi } from '@/lib/api'
import { ApplicationTable } from '@/components/applications/application-table'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/input'
import { SearchInput } from '@/components/shared/search-input'
import { Badge } from '@/components/ui/badge'
import type { Application } from '@/types'

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full name',
  secondary: 'Institution / role',
  dateOfBirth: 'Date of birth',
  institutionName: 'Institution',
  institutionType: 'Institution type',
  gradeLevel: 'Grade / level',
  fieldOfStudy: 'Field of study',
  motivationLetter: 'Motivation letter',
  leadershipExperience: 'Leadership experience',
  techSkills: 'Tech skills',
  proposedClubName: 'Proposed club name',
  hoursPerWeek: 'Hours per week',
  estimatedMembers: 'Estimated members',
  supportNeeded: 'Support needed',
  cvUrl: 'CV',
  recommendationLetterUrl: 'Recommendation letter',
  portfolioUrl: 'Portfolio',
  commitHours: 'Committed hours',
  commitClub: 'Committed to club',
  commitBootcamp: 'Committed to bootcamp',
  agreeConduct: 'Agreed to conduct',
  createdAt: 'Submitted',
  professionalBackground: 'Professional background',
  motivationAfroec: 'Motivation',
  learningGoals: 'Learning goals',
  resumeLink: 'Resume',
  linkedinUrl: 'LinkedIn',
  githubUrl: 'GitHub',
  partnershipInterest: 'Partnership interest',
  organizationType: 'Organization type',
  academyTrack: 'Academy track',
  educationLevel: 'Education level'
}

function fieldLabel(key: string) {
  return FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
}

function isUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

function downloadCsv(filename: string, rows: Application[]) {
  const preferred = ['id', 'type', 'fullName', 'email', 'phone', 'status', 'institutionName', 'city', 'createdAt']
  const discovered = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
    .filter((key) => !preferred.includes(key) && key !== 'details')
    .sort()
  const header = [...preferred, ...discovered]
  const escape = (value: unknown) => {
    const text = value == null
      ? ''
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value)
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const lines = [
    header.join(','),
    ...rows.map((row) => header.map((key) => escape(row[key])).join(','))
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

const STATUS_OPTIONS: Record<string, string[]> = {
  PARTNER: ['NEW', 'CONTACTED', 'IN_DISCUSSION', 'ACTIVE', 'DECLINED'],
  AMBASSADOR: ['PENDING', 'REVIEWING', 'INTERVIEW', 'ACCEPTED', 'REJECTED'],
  VOLUNTEER: ['PENDING', 'REVIEWING', 'INTERVIEW', 'ACCEPTED', 'REJECTED'],
  INTERNSHIP: ['PENDING', 'REVIEWING', 'INTERVIEW', 'ACCEPTED', 'REJECTED'],
  STUDENT: ['PENDING', 'REVIEWING', 'INTERVIEW', 'ACCEPTED', 'REJECTED']
}

export default function ApplicationsPage() {
  const queryClient = useQueryClient()
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Application | null>(null)
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null)
  const [actionError, setActionError] = useState('')

  const { data = [], isLoading, isError, error, refetch, isFetching } = useQuery<Application[]>({
    queryKey: ['applications', type, status],
    queryFn: () => applicationsApi.getAll({ type: type || undefined, status: status || undefined, limit: 200 })
  })

  const rows = data.filter((item) => {
    const haystack = [item.fullName, item.email, item.type, item.status].join(' ').toLowerCase()
    return haystack.includes(search.toLowerCase())
  })

  useEffect(() => {
    if (!selected) {
      setDetail(null)
      return
    }
    // Show everything already on the list row immediately (full profile once API is redeployed).
    setDetail({ ...(selected as unknown as Record<string, unknown>) })
    let cancelled = false
    applicationsApi
      .getOne(selected.type, selected.id)
      .then((payload) => {
        if (!cancelled) setDetail(payload as Record<string, unknown>)
      })
      .catch(() => {
        // Keep list fields if detail route is not on the live server yet.
      })
    return () => {
      cancelled = true
    }
  }, [selected])

  const deleteMutation = useMutation({
    mutationFn: (row: Application) => applicationsApi.remove(row.type, row.id),
    onSuccess: async () => {
      setSelected(null)
      setActionError('')
      await queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onError: (err) => setActionError(err instanceof Error ? err.message : 'Delete failed.')
  })

  const statusMutation = useMutation({
    mutationFn: ({ row, next }: { row: Application; next: string }) =>
      applicationsApi.updateStatus(row.type, row.id, next),
    onSuccess: async (payload) => {
      setDetail(payload as Record<string, unknown>)
      setActionError('')
      await queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onError: (err) => setActionError(err instanceof Error ? err.message : 'Status update failed.')
  })

  async function handleDelete(row: Application) {
    if (!window.confirm(`Delete ${row.type} application #${row.id} (${row.fullName})?`)) return
    deleteMutation.mutate(row)
  }

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
          <Button
            variant="secondary"
            onClick={() => downloadCsv('applications-export.csv', rows)}
            disabled={rows.length === 0}
          >
            <Download size={16} /> Export
          </Button>
        </div>
      </div>

      {(isError || actionError) && (
        <div role="alert" style={{ color: 'var(--danger)', border: '1px solid rgba(239,68,68,.25)', padding: 14, borderRadius: 12 }}>
          {actionError || (error instanceof Error ? error.message : 'Unable to load applications.')}
          {isError && (
            <div style={{ marginTop: 8 }}>
              <Button variant="secondary" onClick={() => refetch()}>Try again</Button>
            </div>
          )}
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
        <ApplicationTable
          data={rows}
          onView={setSelected}
          onDelete={handleDelete}
          onExportSelected={(selectedRows) => downloadCsv('applications-selected.csv', selectedRows)}
          onDeleteSelected={async (selectedRows) => {
            for (const row of selectedRows) {
              await applicationsApi.remove(row.type, row.id)
            }
            await queryClient.invalidateQueries({ queryKey: ['applications'] })
          }}
        />
      )}

      {selected && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Application details"
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 50,
            padding: 16
          }}
        >
          <div
            className="card"
            onClick={(event) => event.stopPropagation()}
            style={{ width: 'min(720px, 100%)', maxHeight: '85vh', overflow: 'auto', padding: 20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: 0 }}>{String(detail?.fullName || selected.fullName)}</h2>
                <p className="page-subtitle" style={{ marginTop: 4 }}>
                  {selected.type} #{selected.id}
                </p>
              </div>
              <Button variant="secondary" size="icon" onClick={() => setSelected(null)} aria-label="Close">
                <X size={16} />
              </Button>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <Badge variant="info">{selected.type}</Badge>
              <Select
                value={String(detail?.status || selected.status)}
                onChange={(event) =>
                  statusMutation.mutate({ row: selected, next: event.target.value })
                }
                aria-label="Update status"
                style={{ maxWidth: 220 }}
              >
                {(STATUS_OPTIONS[selected.type] || STATUS_OPTIONS.AMBASSADOR).map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </Select>
              <Button variant="danger" onClick={() => handleDelete(selected)} disabled={deleteMutation.isPending}>
                Delete
              </Button>
            </div>

            <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '12px 16px', margin: 0 }}>
              {Object.entries(detail || selected).map(([key, value]) => {
                if (value == null || value === '') return null
                if (key === 'id' || key === 'type' || key === 'details') return null
                const label = fieldLabel(key)
                if (typeof value === 'object') {
                  return (
                    <div key={key} style={{ display: 'contents' }}>
                      <dt style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</dt>
                      <dd style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {Array.isArray(value) ? value.join(', ') : JSON.stringify(value)}
                      </dd>
                    </div>
                  )
                }
                const text = String(value)
                return (
                  <div key={key} style={{ display: 'contents' }}>
                    <dt style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</dt>
                    <dd style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                      {isUrl(text) ? (
                        <a href={text} target="_blank" rel="noreferrer">
                          Open link
                        </a>
                      ) : (
                        text
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
