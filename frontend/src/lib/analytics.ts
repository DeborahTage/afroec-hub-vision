import { API_BASE } from "@/lib/api";

const SESSION_KEY = "afh_session_id";

function getSessionId() {
  if (typeof window === "undefined") return undefined;
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Fire-and-forget page view beacon for admin analytics. */
export function trackVisit(pageUrl?: string) {
  if (typeof window === "undefined") return;
  const url = pageUrl || window.location.pathname + window.location.search;
  const payload = {
    pageUrl: url,
    referrer: document.referrer || "",
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    sessionId: getSessionId(),
  };

  fetch(`${API_BASE.replace(/\/$/, "")}/analytics/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    if (import.meta.env.DEV) {
      console.warn("[Analytics] page-view tracking failed", error);
    }
  });
}
