import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/labs", label: "Labs" },
  { href: "/hub", label: "Hub" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] bg-white transition-all duration-300",
        scrolled ? "border-b border-border shadow-sm" : "border-b border-transparent",
      )}
    >
      <div className="container-page h-full flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0" aria-label="Afroec home">
          <Logo variant="navbar" />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 h-full" aria-label="Primary">
          {links.map((item) => {
            const active = item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-[14px] font-medium transition-colors py-5",
                  active ? "text-black font-semibold" : "text-text-secondary hover:text-black",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover shadow-sm">
            Work With Us
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-black"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white p-6 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Afroec home">
                <Logo variant="navbar" />
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2 text-black">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 py-6 flex flex-col gap-1" aria-label="Mobile">
              {links.map((item) => {
                const active = item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-3.5 text-[17px] font-medium rounded-xl",
                      active ? "bg-accent-light text-black" : "text-black hover:bg-bg-cream",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold"
            >
              Work With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
