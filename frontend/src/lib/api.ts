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
const LOCAL_API = "http://localhost:8092/api/v1";
/** Direct Render API — must include /api/v1. */
const PRODUCTION_API = "https://afroec-backend.onrender.com/api/v1";

export const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.NEXT_PUBLIC_API_URL ||
  (import.meta.env.DEV ? LOCAL_API : PRODUCTION_API);

const USER_GENERIC_ERROR = "Something went wrong. Please try again later.";
const USER_NETWORK_ERROR = "Connection failed. Please check your internet and try again.";
const USER_UPLOAD_ERROR = "Unable to upload your document. Please try again.";

function isSafeUserMessage(message: string | undefined | null): message is string {
  if (!message || !message.trim()) return false;
  // Never surface URLs, hostnames, stack traces, or raw status dumps to users.
  if (/https?:\/\//i.test(message)) return false;
  if (/onrender\.com|localhost|\/api\/v1/i.test(message)) return false;
  if (/HTTP\s*\d{3}/i.test(message)) return false;
  if (/Exception|Stacktrace|SQL|jdbc:/i.test(message)) return false;
  return message.length <= 240;
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    console.error("API returned non-JSON response", response.status);
    throw new ApiError(USER_GENERIC_ERROR);
  }
}

function networkErrorMessage(err: unknown): never {
  if (err instanceof TypeError) {
    console.error("Network error contacting API", err);
    throw new ApiError(USER_NETWORK_ERROR);
  }
  throw err;
}

function userFacingApiMessage(
  body: ApiResponse<unknown>,
  fallback: string = USER_GENERIC_ERROR,
): string {
  if (isSafeUserMessage(body.message)) return body.message;
  if (body.errors) {
    const joined = Object.values(body.errors).filter(Boolean).join(", ");
    if (isSafeUserMessage(joined)) return joined;
  }
  return fallback;
}

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });
  } catch (err) {
    networkErrorMessage(err);
  }

  const body = await parseJson<ApiResponse<T>>(response);

  if (!response.ok || body.success === false) {
    console.error("API request failed", response.status, body.message);
    throw new ApiError(userFacingApiMessage(body), body.errors);
  }

  return body.data as T;
}

export async function uploadCvDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_BASE.replace(/\/$/, "")}/documents/cv`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
  } catch (err) {
    networkErrorMessage(err);
  }
  const body = await parseJson<ApiResponse<{ url: string }>>(response);

  if (!response.ok || body.success === false) {
    console.error("CV upload failed", response.status, body.message);
    throw new ApiError(userFacingApiMessage(body, USER_UPLOAD_ERROR), body.errors);
  }

  return body.data;
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
