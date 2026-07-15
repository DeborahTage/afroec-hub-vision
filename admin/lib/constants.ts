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
  { value: 'PARTNER', label: 'Partnership', color: 'blue' },
  { value: 'AMBASSADOR', label: 'Ambassador', color: 'yellow' },
  { value: 'VOLUNTEER', label: 'Volunteer', color: 'green' },
  { value: 'INTERNSHIP', label: 'Internship', color: 'purple' }
]

export const APPLICATION_STATUS = [
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'REVIEWING', label: 'Reviewing', color: 'blue' },
  { value: 'INTERVIEW', label: 'Interview', color: 'purple' },
  { value: 'ACCEPTED', label: 'Accepted', color: 'green' },
  { value: 'REJECTED', label: 'Rejected', color: 'red' }
]
