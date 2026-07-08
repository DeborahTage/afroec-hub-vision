import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-bg-dark text-white pt-20 pb-10 border-t border-border-dark">
            <div className="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div>
                    <Link to="/" className="inline-block" aria-label="Afroec Hub home">
                        <div className="font-display text-[24px] font-bold tracking-tight">
                            Afro<span className="text-accent">ec</span>
                            <span className="ml-2 font-medium text-white/80 text-[16px]">Hub</span>
                        </div>
                    </Link>
                    <p className="mt-4 text-[12px] uppercase tracking-[0.15em] text-text-muted font-semibold">
                        From Digital Literacy to Tech Workforce
                    </p>
                    <p className="mt-3 text-[14px] text-text-muted max-w-xs">
                        Building Africa's next generation of tech professionals.
                    </p>
                    <div className="mt-6 flex gap-3">
                        {[
                            { Icon: Linkedin, href: "https://www.linkedin.com/company/afroec", label: "LinkedIn" },
                            { Icon: Instagram, href: "https://www.instagram.com/afro_ec?igsh=anJxamZmOGg3OWJv", label: "Instagram" },
                            { Icon: Facebook, href: "#", label: "Facebook" },
                            { Icon: Twitter, href: "#", label: "X" },
                        ].map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 w-9 rounded-full border border-border-dark flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-colors"
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Initiatives */}
                <div>
                    <div className="font-display text-[16px] font-bold text-white mb-4">Initiatives</div>
                    <ul className="space-y-3 text-[14px] text-text-muted">
                        <li><Link to="/initiatives/academy" className="hover:text-accent transition-colors">Afroec Academy</Link></li>
                        <li><Link to="/initiatives/product-hub" className="hover:text-accent transition-colors">Product Hub</Link></li>
                        <li><Link to="/programs" className="hover:text-accent transition-colors">CyberGuard Youth</Link></li>
                        <li><Link to="/programs" className="hover:text-accent transition-colors">SheSec Ethiopia</Link></li>
                        <li><Link to="/programs" className="hover:text-accent transition-colors">SchoolNet Tech</Link></li>
                        <li><Link to="/programs" className="hover:text-accent transition-colors">DigiSec Ethiopia</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <div className="font-display text-[16px] font-bold text-white mb-4">Company</div>
                    <ul className="space-y-3 text-[14px] text-text-muted">
                        <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                        <li><Link to="/about/mission" className="hover:text-accent transition-colors">Our Mission</Link></li>
                        <li><Link to="/about/vision" className="hover:text-accent transition-colors">Our Vision</Link></li>
                        <li><Link to="/about/team" className="hover:text-accent transition-colors">Our Team</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition-colors">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-accent transition-colors">Blog & News</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <div className="font-display text-[16px] font-bold text-white mb-4">Contact</div>
                    <ul className="space-y-3 text-[14px] text-text-muted">
                        <li>
                            <a
                                href="mailto:hub@afroec.com"
                                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                            >
                                <Mail size={14} /> hub@afroec.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={14} className="shrink-0" /> +251 916416887
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin size={14} className="mt-0.5 shrink-0" />
                            <span>Addis Ababa, Ethiopia</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container-page mt-16 pt-6 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-text-muted">
                <p>© {new Date().getFullYear()} Afroec Hub. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}
