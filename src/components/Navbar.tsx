import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#mission", label: "Mission" },
  { href: "#programs", label: "Programs" },
  { href: "#pipeline", label: "How It Works" },
  { href: "#impact", label: "Impact" },
  { href: "#stories", label: "Stories" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] bg-white/95 backdrop-blur-sm border-b transition-colors",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container-page h-full flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2" aria-label="Afroec Hub home">
          <span className="text-[22px] font-display font-bold tracking-tight">
            Afro<span className="text-accent">ec</span>
            <span className="ml-1.5 text-text-secondary font-medium text-[15px]">Hub</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#cta"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[14px] font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Join the Program
          </a>
        </div>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[18px] font-bold">
                Afro<span className="text-accent">ec</span> Hub
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[16px] font-medium border-b border-border"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-[15px] font-medium"
            >
              Join the Program
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
