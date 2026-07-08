import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) return null;

    const formatSegment = (segment: string) => {
        return segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    return (
        <nav aria-label="Breadcrumb" className="py-4 border-b border-border bg-white mt-[72px]">
            <div className="container-page flex items-center gap-2 text-[13px] font-medium text-text-secondary">
                <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                    <Home size={14} />
                    <span>Home</span>
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <div key={to} className="flex items-center gap-2">
                            <ChevronRight size={14} className="text-text-muted shrink-0" />
                            {isLast ? (
                                <span className="text-foreground font-semibold truncate max-w-[200px]" aria-current="page">
                                    {formatSegment(value)}
                                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="hover:text-foreground transition-colors truncate max-w-[150px]"
                                >
                                    {formatSegment(value)}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
