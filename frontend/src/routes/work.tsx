import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, follow" }],
    links: [{ rel: "canonical", href: "https://afroec.com/" }],
  }),
  component: function WorkRedirect() {
    return <Navigate to="/" replace />;
  },
});
