import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white pt-20 pb-10 border-t border-border-dark">
      <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-block" aria-label="Afroec home">
            <Logo variant="footer" />
          </Link>
          <p className="mt-5 text-[14px] text-text-muted max-w-xs leading-relaxed">
            Afroec builds technology, develops talent, and explores what is next.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/afroec", label: "LinkedIn" },
              { Icon: Instagram, href: "https://www.instagram.com/afro_ec", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full border border-border-dark flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display text-[16px] font-bold mb-4">Company</div>
          <ul className="space-y-3 text-[14px] text-text-muted">
            <li><Link to="/solutions" className="hover:text-accent">Solutions</Link></li>
            <li><Link to="/labs" className="hover:text-accent">Labs</Link></li>
            <li><Link to="/hub" className="hover:text-accent">Hub</Link></li>
            <li><Link to="/work" className="hover:text-accent">Work</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-display text-[16px] font-bold mb-4">About</div>
          <ul className="space-y-3 text-[14px] text-text-muted">
            <li><Link to="/about" className="hover:text-accent">About Afroec</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-display text-[16px] font-bold mb-4">Contact</div>
          <ul className="space-y-3 text-[14px] text-text-muted">
            <li>
              <a href="mailto:support@afroec.com" className="inline-flex items-center gap-2 hover:text-accent">
                <Mail size={14} /> support@afroec.com
              </a>
            </li>
            <li>
              <a href="tel:+251786252617" className="inline-flex items-center gap-2 hover:text-accent">
                <Phone size={14} /> +251 786 252 617
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Addis Ababa, Bole Welo Sefer</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-16 pt-6 border-t border-border-dark text-[12px] text-text-muted">
        <p>© {new Date().getFullYear()} Afroec. All rights reserved.</p>
      </div>
    </footer>
  );
}
