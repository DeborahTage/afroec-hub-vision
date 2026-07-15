import { trackPageView } from "@/lib/api";

const SESSION_KEY = "afh_session_id";

function getSessionId() {
  if (typeof window === "undefined") return undefined;
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/** Fire-and-forget page view beacon for admin analytics. */
export function trackVisit(pageUrl?: string) {
  if (typeof window === "undefined") return;
  const url = pageUrl || window.location.pathname + window.location.search;
  trackPageView({
    pageUrl: url,
    referrer: document.referrer || undefined,
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language,
    sessionId: getSessionId(),
  }).catch(() => {
    /* silent */
  });
}
