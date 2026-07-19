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
  visitsChange?: number
  visitorsChange?: number
  viewsChange?: number
  avgSessionDuration?: string
  bounceRate?: number
  popularPages?: Record<string, number>
  trafficSources?: Record<string, number>
  geo?: Record<string, number>
  devices?: Record<string, number>
}

export type ApplicationType = 'PARTNER' | 'AMBASSADOR' | 'VOLUNTEER' | 'INTERNSHIP' | 'STUDENT'
export type ApplicationStatus =
  | 'NEW'
  | 'PENDING'
  | 'CONTACTED'
  | 'IN_DISCUSSION'
  | 'REVIEWING'
  | 'INTERVIEW'
  | 'ACTIVE'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'REJECTED'

export interface Application {
  id: number
  type: ApplicationType
  fullName: string
  email: string
  phone?: string
  secondary?: string
  status: ApplicationStatus
  createdAt: string
  updatedAt?: string
  dateOfBirth?: string
  gender?: string
  city?: string
  institutionName?: string
  institutionType?: string
  gradeLevel?: string
  fieldOfStudy?: string
  motivationLetter?: string
  leadershipExperience?: string
  techSkills?: string | string[]
  hoursPerWeek?: number
  proposedClubName?: string
  estimatedMembers?: number
  supportNeeded?: string | string[]
  department?: string
  duration?: string
  startDate?: string
  fullTime?: boolean
  skills?: string | string[]
  experience?: string
  githubUrl?: string
  motivationAfroec?: string
  learningGoals?: string
  primaryRole?: string
  availability?: string
  motivation?: string
  organizationName?: string
  organizationType?: string
  contactPerson?: string
  partnershipInterest?: string[]
  message?: string
  cvUrl?: string
  recommendationLetterUrl?: string
  portfolioUrl?: string
  coverLetterUrl?: string
  transcriptUrl?: string
  details?: Record<string, unknown>
  [key: string]: unknown
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
  tags?: string | string[]
  metaTitle?: string
  metaDescription?: string
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
  unsubscribedAt?: string
}
