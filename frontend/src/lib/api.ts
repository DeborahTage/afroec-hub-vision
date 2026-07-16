import type {
  AmbassadorApplicationData,
  ApiResponse,
  ContactFormData,
  EventItem,
  EventRegistrationData,
  EventStatus,
  HealthResponse,
  InternshipApplicationData,
  PartnerInquiryData,
  PublicStats,
  StudentApplicationData,
  SubmissionResponse,
  VolunteerApplicationData,
} from "@/types/api";
import { ApiError } from "@/types/api";

/** Vite uses VITE_* ; also accept NEXT_PUBLIC_* for Vercel dashboard compatibility. */
export const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8092/api/v1";

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError(`Invalid JSON response (HTTP ${response.status})`);
  }
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  const body = await parseJson<ApiResponse<T>>(response);

  if (!response.ok || body.success === false) {
    const message =
      body.message ||
      (body.errors ? Object.values(body.errors).join(", ") : null) ||
      `HTTP ${response.status}: ${response.statusText}`;
    throw new ApiError(message, body.errors);
  }

  return body.data as T;
}

export async function submitStudentApplication(data: StudentApplicationData) {
  return apiFetch<SubmissionResponse>("/applications/student", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitAmbassadorApplication(data: AmbassadorApplicationData) {
  return apiFetch<SubmissionResponse>("/applications/ambassador", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitInternshipApplication(data: InternshipApplicationData) {
  return apiFetch<SubmissionResponse>("/applications/internship", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getApplicationStatus(id: number, email: string) {
  return apiFetch<unknown>(`/applications/student/${id}?email=${encodeURIComponent(email)}`);
}

export async function submitPartnerInquiry(data: PartnerInquiryData) {
  return apiFetch<SubmissionResponse>("/partners/inquire", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitVolunteerApplication(data: VolunteerApplicationData) {
  return apiFetch<SubmissionResponse>("/volunteers/apply", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitContactForm(data: ContactFormData) {
  return apiFetch<SubmissionResponse>("/contact/submit", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function subscribeNewsletter(email: string) {
  return apiFetch<unknown>("/newsletter/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function unsubscribeNewsletter(token: string) {
  return apiFetch<unknown>("/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function getPublicStats() {
  return apiFetch<PublicStats>("/stats/public", { cache: "no-store" });
}

export async function checkApiHealth() {
  return apiFetch<HealthResponse>("/health", { cache: "no-store" });
}

export async function getEvents(params?: { status?: EventStatus; category?: string }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.category) query.set("category", params.category);
  const qs = query.toString();
  return apiFetch<EventItem[]>(`/events${qs ? `?${qs}` : ""}`, { cache: "no-store" });
}

export async function getEventBySlug(slug: string) {
  return apiFetch<EventItem>(`/events/${encodeURIComponent(slug)}`, { cache: "no-store" });
}

export async function registerForEvent(eventId: number, data: EventRegistrationData) {
  return apiFetch<SubmissionResponse>(`/events/${eventId}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function trackPageView(payload: {
  pageUrl: string;
  referrer?: string;
  userAgent?: string;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  sessionId?: string;
}) {
  return apiFetch<unknown>("/analytics/track", {
    method: "POST",
    body: JSON.stringify(payload),
    keepalive: true,
  });
}
