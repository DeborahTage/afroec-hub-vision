import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

interface NavLink {
  href: string;
  label: string;
}

interface NavGroup {
  label: string;
  children: NavLink[];
}

type MenuItem = NavLink | NavGroup;

const menuItems: MenuItem[] = [
  {
    label: "About",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/about/mission", label: "Our Mission" },
      { href: "/about/vision", label: "Our Vision" },
      { href: "/about/team", label: "Our Team" },
    ],
  },
  {
    label: "Initiatives",
    children: [
      { href: "/initiatives", label: "All Initiatives" },
      { href: "/initiatives/academy", label: "Afroec Academy" },
      { href: "/initiatives/product-hub", label: "Product Hub" },
      { href: "/programs", label: "Community Programs" },
    ],
  },
  {
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      { href: "/services/product-development", label: "Product Development" },
      { href: "/services/consultancy", label: "Technology Consultancy" },
    ],
  },
  { href: "/impact", label: "Impact" },
  {
    label: "Get Involved",
    children: [
      { href: "/get-involved", label: "Ways to Join" },
      { href: "/get-involved/apply", label: "Apply Now" },
      { href: "/get-involved/partner", label: "Partner" },
      { href: "/get-involved/volunteer", label: "Volunteer" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when path changes
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isGroup = (item: MenuItem): item is NavGroup => {
    return "children" in item;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] bg-white transition-all duration-300",
        scrolled ? "border-b border-border/80 shadow-sm" : "border-b border-transparent bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="container-page h-full flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0" aria-label="Afroec Hub home">
          <Logo variant="navbar" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 h-full" aria-label="Primary">
          {menuItems.map((item) => {
            if (isGroup(item)) {
              const isChildActive = item.children.some((child) => location.pathname === child.href);

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center group/dropdown"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 text-[14px] font-medium text-text-secondary hover:text-black transition-colors cursor-pointer py-5",
                      isChildActive && "text-black font-semibold"
                    )}
                  >
                    {item.label}
                    <ChevronDown size={14} className="transition-transform group-hover/dropdown:rotate-180" />
                  </button>
                  <div className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 w-52 opacity-0 invisible scale-95 pointer-events-none origin-top",
                    activeDropdown === item.label && "opacity-100 visible scale-100 pointer-events-auto"
                  )}>
                    <div className="bg-white border border-border shadow-xl rounded-2xl py-2 px-1 flex flex-col justify-start">
                      {item.children.map((child) => {
                        const active = location.pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "px-4 py-2.5 text-[14px] font-medium rounded-xl hover:bg-bg-cream transition-colors text-left",
                              active ? "bg-accent-light text-black font-semibold" : "text-text-secondary hover:text-black"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            } else {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-[14px] font-medium transition-colors py-5",
                    active ? "text-black font-semibold border-b-2 border-black" : "text-text-secondary hover:text-black"
                  )}
                >
                  {item.label}
                </Link>
              );
            }
          })}
        </nav>

        {/* CTA (Desktop) */}
        <div className="hidden lg:block">
          <Link
            to="/get-involved/apply"
            className="btn-pill bg-accent text-black hover:bg-accent-hover shadow-sm"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-black hover:text-accent-hover transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setOpen(false)} />
          {/* Content */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 flex flex-col shadow-2xl border-l border-border transform transition-transform animate-in slide-in-from-right duration-350">
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Afroec Hub home">
                <Logo variant="navbar" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-text-secondary hover:text-black"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6" aria-label="Mobile">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  if (isGroup(item)) {
                    return (
                      <div key={item.label} className="flex flex-col gap-1 py-2">
                        <div className="text-[12px] font-semibold tracking-wider text-text-muted uppercase px-3 mb-1">
                          {item.label}
                        </div>
                        {item.children.map((child) => {
                          const active = location.pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "px-3 py-2 text-[15px] font-medium rounded-xl transition-colors text-left",
                                active ? "bg-accent-light text-black font-semibold" : "text-text-secondary hover:bg-bg-cream hover:text-black"
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  } else {
                    const active = location.pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "px-3 py-3 text-[15px] font-medium rounded-xl transition-colors text-left border-b border-border/40",
                          active ? "bg-accent-light text-black font-semibold" : "text-text-secondary hover:bg-bg-cream hover:text-black"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  }
                })}
              </div>
            </nav>

            <Link
              to="/get-involved/apply"
              onClick={() => setOpen(false)}
              className="mt-auto w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
