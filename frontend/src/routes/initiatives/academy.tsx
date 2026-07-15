import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/initiatives/academy")({
    component: AcademyRedirect,
    head: () => ({
        meta: [
            { title: "Redirecting… | Afroec Hub" },
            {
                name: "description",
                content: "Afroec Academy has moved to the Founding Ambassadors initiative.",
            },
            { name: "robots", content: "noindex" },
        ],
    }),
});

function AcademyRedirect() {
    return <Navigate to="/initiatives/founding-ambassadors" replace />;
}
