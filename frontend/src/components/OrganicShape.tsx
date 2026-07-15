import { cn } from "@/lib/utils";

interface OrganicShapeProps {
    className?: string;
    variant?: 1 | 2 | 3;
}

export function OrganicShape({ className, variant = 1 }: OrganicShapeProps) {
    return (
        <div
            aria-hidden
            className={cn(
                "absolute bg-accent/20 transition-all duration-[6000ms] ease-in-out select-none pointer-events-none -z-10",
                variant === 1 && "blob animate-blob",
                variant === 2 && "blob-2 animate-blob",
                variant === 3 && "blob-3 animate-blob",
                className
            )}
        />
    );
}
