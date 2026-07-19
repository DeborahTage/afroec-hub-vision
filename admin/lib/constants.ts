export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8092/api/v1'
export const APP_NAME = 'Afroec Admin'
export const APP_VERSION = '4.1.0'

export const NAV_ITEMS = [
  { title: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { title: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { title: 'Applications', href: '/applications', icon: 'Users' },
  { title: 'Events', href: '/events', icon: 'Calendar' },
  { title: 'CMS Pages', href: '/cms/pages', icon: 'FileText' },
  { title: 'CMS Blog', href: '/cms/blog', icon: 'BookOpen' },
  { title: 'Emails', href: '/emails', icon: 'Mail' },
  { title: 'Subscribers', href: '/subscribers', icon: 'Bell' },
  { title: 'Settings', href: '/settings', icon: 'Settings' }
]

export const APPLICATION_TYPES = [
  { value: 'STUDENT', label: 'Student', color: 'teal' },
  { value: 'PARTNER', label: 'Partnership', color: 'blue' },
  { value: 'AMBASSADOR', label: 'Ambassador', color: 'yellow' },
  { value: 'VOLUNTEER', label: 'Volunteer', color: 'green' },
  { value: 'INTERNSHIP', label: 'Internship', color: 'purple' }
]

export const APPLICATION_STATUS = [
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'NEW', label: 'New', color: 'yellow' },
  { value: 'REVIEWING', label: 'Reviewing', color: 'blue' },
  { value: 'INTERVIEW', label: 'Interview', color: 'purple' },
  { value: 'ACCEPTED', label: 'Accepted', color: 'green' },
  { value: 'REJECTED', label: 'Rejected', color: 'red' }
]

export const APPLICATION_TYPE_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  STUDENT: { label: 'Student', badgeClass: 'badge-info' },
  PARTNER: { label: 'Partnership', badgeClass: 'badge-info' },
  AMBASSADOR: { label: 'Ambassador', badgeClass: 'badge-warning' },
  VOLUNTEER: { label: 'Volunteer', badgeClass: 'badge-success' },
  INTERNSHIP: { label: 'Internship', badgeClass: 'badge-info' }
}

export const APPLICATION_STATUS_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  NEW: { label: 'New', badgeClass: 'badge-warning' },
  PENDING: { label: 'Pending', badgeClass: 'badge-warning' },
  CONTACTED: { label: 'Contacted', badgeClass: 'badge-info' },
  IN_DISCUSSION: { label: 'In discussion', badgeClass: 'badge-info' },
  REVIEWING: { label: 'Reviewing', badgeClass: 'badge-info' },
  INTERVIEW: { label: 'Interview', badgeClass: 'badge-info' },
  ACTIVE: { label: 'Active', badgeClass: 'badge-success' },
  ACCEPTED: { label: 'Accepted', badgeClass: 'badge-success' },
  DECLINED: { label: 'Declined', badgeClass: 'badge-danger' },
  REJECTED: { label: 'Rejected', badgeClass: 'badge-danger' }
}

export const EVENT_STATUS_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  UPCOMING: { label: 'Upcoming', badgeClass: 'badge-success' },
  ONGOING: { label: 'Ongoing', badgeClass: 'badge-info' },
  PAST: { label: 'Past', badgeClass: 'badge-default' },
  CANCELLED: { label: 'Cancelled', badgeClass: 'badge-danger' }
}
