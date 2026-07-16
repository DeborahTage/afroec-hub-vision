import type { ReactNode, ElementType } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={cn("reveal", delay && `reveal-delay-${delay}`, inView && "in-view", className)}
    >
      {children}
    </Component>
  );
}
