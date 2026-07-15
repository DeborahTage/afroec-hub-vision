import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    className?: string;
    align?: "center" | "left";
}

export function SectionHeader({
    eyebrow,
    title,
    subtitle,
    className,
    align = "center",
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                align === "center" ? "mx-auto text-center max-w-3xl" : "text-left max-w-2xl",
                className
            )}
        >
            {eyebrow && (
                <Reveal>
                    <span className="eyebrow block">{eyebrow}</span>
                </Reveal>
            )}
            <Reveal delay={1}>
                <h2 className="mt-3 font-display font-bold text-[32px] md:text-[42px] leading-[1.2] tracking-tight text-foreground">
                    {title}
                </h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={2}>
                    <p className={cn(
                        "mt-4 text-[16px] md:text-[18px] text-text-secondary leading-relaxed",
                        align === "center" ? "mx-auto max-w-2xl" : ""
                    )}>
                        {subtitle}
                    </p>
                </Reveal>
            )}
        </div>
    );
}
