#!/usr/bin/env node
/**
 * Injects a same-origin /api/v1 reverse-proxy route into Nitro's Vercel
 * Build Output config so the browser never needs cross-origin CORS.
 */
import fs from "node:fs";
import path from "node:path";

const arg = process.argv[2];
const candidates = [
  arg === "--frontend" ? path.resolve(process.cwd(), "frontend/.vercel/output/config.json") : null,
  path.resolve(process.cwd(), ".vercel/output/config.json"),
  path.resolve(process.cwd(), "frontend/.vercel/output/config.json"),
].filter(Boolean);

const configPath = candidates.find((p) => fs.existsSync(p));
if (!configPath) {
  console.error("[inject-api-proxy] Missing .vercel/output/config.json");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
const proxySrc = "/api/v1/(.*)";
const proxyDest = "https://afroec-backend.onrender.com/api/v1/$1";

const withoutOldProxy = routes.filter(
  (route) =>
    !(
      route &&
      route.src === proxySrc &&
      typeof route.dest === "string" &&
      (route.dest.includes("afroec-backend.onrender.com") ||
        route.dest.includes("afroec-hub-backend.onrender.com"))
    ),
);

const filesystemIdx = withoutOldProxy.findIndex((route) => route && route.handle === "filesystem");
const insertAt = filesystemIdx >= 0 ? filesystemIdx : 0;
withoutOldProxy.splice(insertAt, 0, {
  src: proxySrc,
  dest: proxyDest,
});

config.routes = withoutOldProxy;
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log(`[inject-api-proxy] Updated ${configPath}`);
console.log(`[inject-api-proxy] Proxied ${proxySrc} -> ${proxyDest}`);
