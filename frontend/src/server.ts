import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { withSecurityHeaders } from "./lib/security-headers";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const PUBLIC_TEXT_FILES: Record<string, { body: string; type: string }> = {
  "/google70e938de8d130665.html": {
    body: "google-site-verification: google70e938de8d130665.html",
    type: "text/html; charset=utf-8",
  },
  "/robots.txt": {
    body: "User-agent: *\nAllow: /\n\nSitemap: https://afroec.com/sitemap.xml\n",
    type: "text/plain; charset=utf-8",
  },
  "/sitemap.xml": {
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://afroec.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://afroec.com/solutions</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://afroec.com/labs</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://afroec.com/hub</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://afroec.com/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://afroec.com/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>
`,
    type: "application/xml; charset=utf-8",
  },
};

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const pathname = new URL(request.url).pathname;
      const publicFile = PUBLIC_TEXT_FILES[pathname];
      if (publicFile) {
        return withSecurityHeaders(
          new Response(publicFile.body, {
            status: 200,
            headers: {
              "content-type": publicFile.type,
              "cache-control": "public, max-age=300",
            },
          }),
        );
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return withSecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
