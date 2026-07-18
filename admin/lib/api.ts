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

const TOKEN_KEY = 'afh_admin_token'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } }
})

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(TOKEN_KEY)
}

function setToken(token: string | null) {
  if (typeof window === 'undefined') return
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

function safeErrorMessage(raw: unknown, status?: number, endpoint?: string): string {
  const message = typeof raw === 'string' ? raw : ''
  const isLogin = endpoint?.includes('/auth/login')
  if (
    !message ||
    /https?:\/\//i.test(message) ||
    /onrender\.com|localhost|\/api\/v1|HTTP\s*\d{3}|Exception|Stacktrace|SQL|jdbc:/i.test(message) ||
    /Forbidden|Access denied/i.test(message)
  ) {
    if (status === 401) return isLogin ? 'Invalid username or password.' : 'Invalid credentials or session expired.'
    if (status === 403) {
      return isLogin
        ? 'Admin login is locked on the server. In Render, set ADMIN_LOCALHOST_ONLY=false and redeploy.'
        : 'Access denied.'
    }
    if (status === 404) return 'Not found.'
    return 'Something went wrong. Please try again.'
  }
  return message.length > 240 ? 'Something went wrong. Please try again.' : message
}

async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers as Record<string, string> | undefined)
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers
    })
  } catch {
    throw new Error('Connection failed. Please check your internet and try again.')
  }

  const payload = await res.json().catch(() => ({} as { success?: boolean; message?: string; data?: T }))
  if (!res.ok || payload.success === false) {
    if (res.status === 401 && typeof window !== 'undefined' && !endpoint.includes('/auth/login')) {
      setToken(null)
      window.location.href = '/login'
    }
    throw new Error(safeErrorMessage(payload.message, res.status, endpoint))
  }
  return (payload.data ?? payload) as T
}

export const authApi = {
  login: async (username: string, password: string) => {
    const data = await fetchWithAuth<{ token?: string; username: string; role: string }>(
      '/admin/auth/login',
      { method: 'POST', body: JSON.stringify({ username, password }) }
    )
    if (!data.token) {
      throw new Error('Login succeeded but no session token was returned. Please try again.')
    }
    setToken(data.token)
    return data
  },
  logout: async () => {
    try {
      await fetchWithAuth<void>('/admin/auth/logout', { method: 'POST' })
    } catch {
      // clear local session even if remote logout fails
    }
    setToken(null)
  },
  me: () => fetchWithAuth<User>('/admin/auth/me')
}

export const analyticsApi = {
  getOverview: () => fetchWithAuth<AnalyticsOverview>('/admin/analytics/overview'),
  getPages: () => fetchWithAuth<Record<string, number>>('/admin/analytics/pages'),
  getSources: () => fetchWithAuth<Record<string, number>>('/admin/analytics/sources'),
  getGeo: () => fetchWithAuth<Record<string, number>>('/admin/analytics/geo'),
  getDevices: () => fetchWithAuth<Record<string, number>>('/admin/analytics/devices')
}

export const applicationsApi = {
  getAll: (params?: { type?: string; status?: string; page?: number; limit?: number }) => {
    const search = new URLSearchParams()
    if (params?.type) search.set('type', params.type)
    if (params?.status) search.set('status', params.status)
    if (params?.page) search.set('page', String(params.page))
    if (params?.limit) search.set('limit', String(params.limit))
    const qs = search.toString()
    return fetchWithAuth<Application[]>(`/admin/applications${qs ? `?${qs}` : ''}`)
  },
  getOne: (type: string, id: number) =>
    fetchWithAuth<Record<string, unknown>>(`/admin/applications/${encodeURIComponent(type)}/${id}`),
  updateStatus: (type: string, id: number, status: string) =>
    fetchWithAuth<Record<string, unknown>>(`/admin/applications/${encodeURIComponent(type)}/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
  remove: (type: string, id: number) =>
    fetchWithAuth<void>(`/admin/applications/${encodeURIComponent(type)}/${id}`, { method: 'DELETE' }),
  exportCsvUrl: (params?: { type?: string; status?: string }) => {
    const search = new URLSearchParams()
    if (params?.type) search.set('type', params.type)
    if (params?.status) search.set('status', params.status)
    const qs = search.toString()
    return `${API_BASE_URL}/admin/applications/export.csv${qs ? `?${qs}` : ''}`
  }
}

export const eventsApi = {
  getAll: () => fetchWithAuth<Event[]>('/admin/events'),
  create: (data: unknown) => fetchWithAuth<Event>('/admin/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: unknown) =>
    fetchWithAuth<Event>(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => fetchWithAuth<void>(`/admin/events/${id}`, { method: 'DELETE' })
}

export const cmsApi = {
  getPages: () => fetchWithAuth<CmsPage[]>('/admin/cms/pages'),
  updatePage: (key: string, data: unknown) =>
    fetchWithAuth<CmsPage>(`/admin/cms/pages/${key}`, { method: 'PUT', body: JSON.stringify(data) }),
  getBlogPosts: () => fetchWithAuth<BlogPost[]>('/admin/cms/blog'),
  createBlogPost: (data: unknown) =>
    fetchWithAuth<BlogPost>('/admin/cms/blog', { method: 'POST', body: JSON.stringify(data) }),
  deleteBlogPost: (id: number) => fetchWithAuth<void>(`/admin/cms/blog/${id}`, { method: 'DELETE' })
}

export const emailsApi = {
  getContacts: () => fetchWithAuth<ContactMessage[]>('/admin/emails/contacts'),
  updateContactStatus: (id: number, status: string) =>
    fetchWithAuth<ContactMessage>(`/admin/emails/contacts/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
  getSubscribers: () => fetchWithAuth<NewsletterSubscriber[]>('/admin/newsletter/subscribers'),
  sendNewsletter: (data: unknown) =>
    fetchWithAuth<void>('/admin/newsletter/send', { method: 'POST', body: JSON.stringify(data) })
}
