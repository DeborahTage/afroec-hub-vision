/** Period pills → number of days for analytics API queries. */
export type AnalyticsPeriod = '7d' | '30d' | '90d' | '1y'

export function periodToDays(period: AnalyticsPeriod): number {
  switch (period) {
    case '7d':
      return 7
    case '90d':
      return 90
    case '1y':
      return 365
    case '30d':
    default:
      return 30
  }
}

/** Human labels for tracked public routes (keeps apply ?type= meaningful). */
export function formatPageLabel(raw: string): string {
  if (!raw) return 'Unknown'
  const [pathnamePart, query = ''] = raw.split('?')
  const pathname = (pathnamePart || '/').replace(/\/$/, '') || '/'
  const params = new URLSearchParams(query)
  const type = (params.get('type') || '').toLowerCase()

  const typeLabel: Record<string, string> = {
    ambassador: 'Ambassador',
    internship: 'Internship',
    volunteer: 'Volunteer',
    partner: 'Partner',
    student: 'Student',
  }

  const paths: Record<string, string> = {
    '/': 'Home',
    '/get-involved': 'Get Involved',
    '/get-involved/apply': type ? `Apply · ${typeLabel[type] || capitalize(type)}` : 'Apply',
    '/initiatives': 'Initiatives',
    '/initiatives/founding-ambassadors': 'Founding Ambassadors',
    '/ambassadors': 'Ambassadors',
    '/impact': 'Impact',
    '/events': 'Events',
    '/about': 'About',
    '/contact': 'Contact',
    '/programs': 'Programs',
  }

  if (paths[pathname]) return paths[pathname]
  return pathname
    .split('/')
    .filter(Boolean)
    .map(capitalize)
    .join(' · ') || raw
}

function capitalize(value: string) {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ')
}
