import logoImg from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type LogoVariant = "navbar" | "footer" | "login";

const heights: Record<LogoVariant, string> = {
  navbar: "h-12 md:h-14",
  footer: "h-14 md:h-16",
  login: "h-20",
};

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  alt?: string;
}

export function Logo({
  variant = "navbar",
  className,
  alt = "Afroec",
}: LogoProps) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={cn("w-auto object-contain", heights[variant], className)}
      width={220}
      height={56}
      decoding="async"
    />
  );
}
