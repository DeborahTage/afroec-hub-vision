'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsUpDown, Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/empty-state'

export interface DataColumn<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T extends { id?: string | number }> {
  data: T[]
  columns: DataColumn<T>[]
  emptyTitle: string
  emptyDescription: string
  getRowId?: (row: T, index: number) => string | number
  onRowClick?: (row: T) => void
  onExportSelected?: (ids: Array<string | number>) => void
  onDeleteSelected?: (ids: Array<string | number>) => void
}

const pageSize = 10

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  emptyTitle,
  emptyDescription,
  getRowId,
  onRowClick,
  onExportSelected,
  onDeleteSelected
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string | number>>(new Set())

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const av = String((a as Record<string, unknown>)[sortKey] ?? '')
      const bv = String((b as Record<string, unknown>)[sortKey] ?? '')
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [data, sortDir, sortKey])

  const pageCount = Math.max(Math.ceil(sorted.length / pageSize), 1)
  const rows = sorted.slice((page - 1) * pageSize, page * pageSize)

  function toggleSort(key: string) {
    setSortKey(key)
    setSortDir(sortKey === key && sortDir === 'asc' ? 'desc' : 'asc')
  }

  function rowId(row: T, index: number) {
    if (getRowId) return getRowId(row, index)
    return `${String(row.id ?? 'row')}-${index}`
  }

  if (data.length === 0) {
    return (
      <div className="table-wrap">
        <EmptyState icon={Inbox} title={emptyTitle} description={emptyDescription} />
      </div>
    )
  }

  const selectedIds = Array.from(selected)

  return (
    <div className="table-wrap">
      {selected.size > 0 && (
        <div className="filter-bar" style={{ borderRadius: 0, borderWidth: '0 0 1px' }}>
          <strong>{selected.size} selected</strong>
          <Button
            variant="secondary"
            onClick={() => onExportSelected?.(selectedIds)}
            disabled={!onExportSelected}
          >
            Export
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (!onDeleteSelected) return
              if (window.confirm(`Delete ${selected.size} selected item(s)?`)) {
                onDeleteSelected(selectedIds)
                setSelected(new Set())
              }
            }}
            disabled={!onDeleteSelected}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 44 }}>
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={rows.length > 0 && rows.every((row, index) => selected.has(rowId(row, (page - 1) * pageSize + index)))}
                  onChange={(event) => {
                    const next = new Set(selected)
                    rows.forEach((row, index) => {
                      const id = rowId(row, (page - 1) * pageSize + index)
                      if (event.target.checked) next.add(id)
                      else next.delete(id)
                    })
                    setSelected(next)
                  }}
                />
              </th>
              {columns.map((column) => {
                const key = String(column.key)
                return (
                  <th key={key}>
                    {column.sortable ? (
                      <button className="btn btn-ghost" onClick={() => toggleSort(key)}>
                        {column.header}
                        <ChevronsUpDown size={14} />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const absoluteIndex = (page - 1) * pageSize + index
              const id = rowId(row, absoluteIndex)
              return (
                <tr
                  key={String(id)}
                  tabIndex={onRowClick ? 0 : undefined}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                  onClick={(event) => {
                    if ((event.target as HTMLElement).closest('button, a, input, select, textarea')) return
                    onRowClick?.(row)
                  }}
                  onKeyDown={(event) => {
                    if (onRowClick && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault()
                      onRowClick(row)
                    }
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select row ${id}`}
                      checked={selected.has(id)}
                      onChange={(event) => {
                        const next = new Set(selected)
                        if (event.target.checked) next.add(id)
                        else next.delete(id)
                        setSelected(next)
                      }}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.render ? column.render(row) : String((row as Record<string, unknown>)[String(column.key)] ?? '-')}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <span>
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, sorted.length)} of {sorted.length}
        </span>
        <div className="pagination-actions">
          <Button variant="secondary" size="icon" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: pageCount }).slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={page === index + 1 ? 'page-pill page-pill-active' : 'page-pill'}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <Button variant="secondary" size="icon" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
