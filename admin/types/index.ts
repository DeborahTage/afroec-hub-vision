export interface ApiResponse<T> { success?: boolean; message?: string; data?: T; errors?: Record<string, string> }

export interface User {
  id: number
  username: string
  email: string
  role: 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string
}

export interface AnalyticsOverview {
  totalVisits: number
  uniqueVisitors: number
  pageViews: number
  visitsLast7Days?: number
  uniqueLast7Days?: number
  visitsChangePct?: number
  popularPages?: Record<string, number>
  trafficSources?: Record<string, number>
  geo?: Record<string, number>
  devices?: Record<string, number>
}

export interface Application {
  id: number
  type: 'PARTNER' | 'AMBASSADOR' | 'VOLUNTEER' | 'INTERNSHIP'
  fullName: string
  email: string
  phone?: string
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED' | string
  createdAt: string
  details?: Record<string, unknown>
}

export interface Event {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  eventDate?: string
  eventTime?: string
  location?: string
  imageUrl?: string
  registrationLink?: string
  maxAttendees?: number
  category?: string
  status: 'UPCOMING' | 'ONGOING' | 'PAST' | 'CANCELLED'
  published?: boolean
  isPublished?: boolean
  registrationsCount?: number
  createdAt?: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt?: string
  content?: string
  featuredImage?: string
  author?: string
  category?: string
  tags?: string[]
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  publishedAt?: string
  createdAt?: string
}

export interface CmsPage {
  id?: number
  pageKey: string
  title: string
  content?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
  updatedAt?: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'SPAM' | string
  createdAt: string
}

export interface NewsletterSubscriber {
  id: number
  email: string
  active?: boolean
  isActive?: boolean
  subscribedAt: string
}
