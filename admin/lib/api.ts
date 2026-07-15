import { QueryClient } from '@tanstack/react-query'
import { API_BASE_URL } from './constants'
import type {
  AnalyticsOverview,
  Application,
  BlogPost,
  CmsPage,
  ContactMessage,
  Event,
  NewsletterSubscriber,
  User
} from '@/types'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } }
})

async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers
    }
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok || payload.success === false) {
    if (res.status === 401 && typeof window !== 'undefined') window.location.href = '/login'
    throw new Error(payload.message || `HTTP ${res.status}`)
  }
  return (payload.data ?? payload) as T
}

export const authApi = {
  login: (username: string, password: string) =>
    fetchWithAuth<{ username: string; role: string }>('/admin/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => fetch('/admin/logout', { credentials: 'include' }),
  me: () => fetchWithAuth<User>('/admin/me')
}

export const analyticsApi = {
  getOverview: () => fetchWithAuth<AnalyticsOverview>('/admin/analytics/overview'),
  getPages: () => fetchWithAuth<Record<string, number>>('/admin/analytics/pages'),
  getSources: () => fetchWithAuth<Record<string, number>>('/admin/analytics/sources'),
  getGeo: () => fetchWithAuth<Record<string, number>>('/admin/analytics/geo')
}

export const applicationsApi = {
  getAll: (params?: { type?: string; status?: string; page?: number; limit?: number }) => {
    const search = new URLSearchParams()
    if (params?.type) search.set('type', params.type)
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    if (params?.limit) search.set('limit', String(params.limit))
    return fetchWithAuth<Application[]>(`/admin/applications?${search}`)
  },
  updateStatus: (id: number, status: string) =>
    fetchWithAuth<Application>(`/admin/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) })
}

export const eventsApi = {
  getAll: () => fetchWithAuth<Event[]>('/admin/events'),
  create: (data: unknown) => fetchWithAuth<Event>('/admin/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: unknown) => fetchWithAuth<Event>(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchWithAuth<void>(`/admin/events/${id}`, { method: 'DELETE' })
}

export const cmsApi = {
  getPages: () => fetchWithAuth<CmsPage[]>('/admin/cms/pages'),
  updatePage: (key: string, data: unknown) => fetchWithAuth<CmsPage>(`/admin/cms/pages/${key}`, { method: 'PUT', body: JSON.stringify(data) }),
  getBlogPosts: () => fetchWithAuth<BlogPost[]>('/admin/cms/blog'),
  createBlogPost: (data: unknown) => fetchWithAuth<BlogPost>('/admin/cms/blog', { method: 'POST', body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => fetchWithAuth<void>(`/admin/cms/blog/${id}`, { method: 'DELETE' })
}

export const emailsApi = {
  getContacts: () => fetchWithAuth<ContactMessage[]>('/admin/emails/contacts'),
  updateContactStatus: (id: number, status: string) => fetchWithAuth<ContactMessage>(`/admin/emails/contacts/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getSubscribers: () => fetchWithAuth<NewsletterSubscriber[]>('/admin/newsletter/subscribers'),
  sendNewsletter: (data: unknown) => fetchWithAuth<void>('/admin/newsletter/send', { method: 'POST', body: JSON.stringify(data) })
}
