import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  GraduationCap,
  Lightbulb,
  User,
  Building2,
  Heart,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Sparkles,
  BookOpen,
  Code2,
  Compass,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import missionImg from "@/assets/mission.jpg";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Testimonials } from "@/components/Testimonials";
import { OrganicShape } from "@/components/OrganicShape";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { usePublicStats } from "@/hooks/usePublicStats";
import { subscribeNewsletter } from "@/lib/api";
import { formatApiError } from "@/lib/form-mappers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afroec Hub | Building Africa's Tech Talent Factory" },
      {
        name: "description",
        content:
          "Free digital literacy, programming, and cybersecurity Awarness for Ethiopian youth, women, and students in remote communities.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <WhoWeAreSection />
        <ServicesSection />
        <InitiativesSection />
        <ImpactSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- SECTION 1: HERO ---------------- */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-white">
      <div className="container-page grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <div>
          <Reveal>
            <span className="eyebrow">AFROEC HUB</span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-6 font-display font-bold text-[44px] leading-[1.1] tracking-[-0.03em] sm:text-[56px] md:text-[64px] lg:text-[72px] text-black">
              Building Africa's
              <br />
              Next Generation
              <br />
              of{" "}
              <span className="relative inline-block">
                Tech Talent
                <span
                  aria-hidden
                  className="absolute bottom-2 left-0 right-0 h-4 bg-accent -z-10 blob-3 opacity-80"
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 text-[18px] md:text-[20px] leading-relaxed text-text-secondary max-w-[520px]">
              Free digital literacy, programming, and cybersecurity training for Ethiopian youth, women, and students in remote communities.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/initiatives"
                className="btn-pill bg-accent text-black hover:bg-accent-hover"
              >
                Explore Our Programs <ArrowRight size={18} />
              </Link>
              <Link
                to="/get-involved/partner"
                className="btn-pill bg-black text-white hover:bg-neutral-800"
              >
                Partner With Us
              </Link>
            </div>
          </Reveal>

          {/* Stats Row */}
          <Reveal delay={4}>
            <div className="mt-14 flex flex-wrap items-center gap-10 md:gap-16 border-t border-border pt-10">
              <div>
                <div className="font-display text-[44px] font-bold leading-none tracking-tight text-black flex items-center">
                  <CountUp end={1000} />+
                </div>
                <div className="mt-2 text-[14px] text-text-secondary font-medium">
                  Students Reached
                </div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-border" />
              <div>
                <div className="font-display text-[44px] font-bold leading-none tracking-tight text-black flex items-center">
                  <CountUp end={650} />+
                </div>
                <div className="mt-2 text-[14px] text-text-secondary font-medium">
                  Graduates
                </div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-border" />
              <div>
                <div className="font-display text-[44px] font-bold leading-none tracking-tight text-black flex items-center">
                  <CountUp end={85} />%
                </div>
                <div className="mt-2 text-[14px] text-text-secondary font-medium">
                  Placement Rate
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column */}
        <Reveal delay={2} className="lg:justify-self-end w-full relative">
          <div className="relative w-full max-w-[500px] mx-auto">
            {/* Organic yellow blob */}
            <OrganicShape variant={1} className="-inset-6 md:-inset-8 opacity-60" />

            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-border shadow-md">
              <img
                src={heroImg}
                alt="Young Ethiopian person smiling with laptop"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                width={1080}
                height={1350}
                fetchPriority="high"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-8 bg-accent text-black rounded-full px-5 py-2.5 text-[12px] font-semibold border-2 border-white shadow-lg animate-float">
              Digital Literacy • Programming • Cybersecurity
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-8 bg-white border border-border rounded-xl px-5 py-3 flex items-center gap-3 shadow-xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center">
                <BookOpen size={18} className="text-black" />
              </div>
              <div className="text-[13px]">
                <div className="font-bold leading-tight text-black">Interactive</div>
                <div className="text-text-secondary leading-tight">Learning</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SECTION 2: TRUSTED BY ---------------- */
const partners = [
  "Ministry of Education",
  "Ethio Telecom",
  "GIZ",
  "Ministry of Innovation & Technology (MInT)",
  "INSA",
  "Adwa CTF",
  "Threat X",
  "AI Institute",
];
function TrustedBySection() {
  return (
    <section className="bg-bg-cream py-16">
      <div className="container-page">
        <p className="eyebrow text-center text-text-secondary">TRUSTED BY LEADING ORGANIZATIONS</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-center">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-center font-display text-[14px] font-bold tracking-wide text-text-secondary/50 hover:text-black transition-colors cursor-default"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 3: WHO WE ARE (Brief) ---------------- */
const checks = [
  "Free digital literacy for underserved communities",
  "Programming & cybersecurity bootcamps",
  "Paid apprenticeships on real projects",
  "Job placement in Ethiopia and globally",
];
function WhoWeAreSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container-page grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Column */}
        <Reveal>
          <span className="eyebrow">WHO WE ARE</span>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.2] tracking-tight text-black">
            Empowering Communities Through Technology
          </h2>
          <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-text-secondary">
            Afroec Hub is the social impact initiative of Afroec — a technology company committed to building Africa's digital future. We believe world-class tech talent exists everywhere, but opportunity does not.
          </p>
          <ul className="mt-8 space-y-4">
            {checks.map((check) => (
              <li key={check} className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} className="text-black" strokeWidth={3} />
                </span>
                <span className="text-[16px] font-medium text-black">{check}</span>
              </li>
            ))}
          </ul>
          <Link to="/about" className="link-arrow mt-9">
            Learn More About Us <ArrowRight size={16} />
          </Link>
        </Reveal>

        {/* Right Column */}
        <Reveal delay={2} className="relative">
          <div className="relative w-full max-w-[500px] mx-auto">
            <OrganicShape variant={2} className="-inset-6 opacity-60" />
            <div className="relative aspect-square w-full overflow-hidden rounded-[24px] border border-border shadow-md">
              <img
                src={missionImg}
                alt="Diverse students learning in classrooms"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SECTION: WHAT WE DO (Afroec Services) ---------------- */
const services = [
  {
    icon: Code2,
    title: "Product Development",
    desc: "We build digital products that solve real problems — web, mobile, enterprise, and AI.",
    link: "/services/product-development" as const,
  },
  {
    icon: Compass,
    title: "Technology Consultancy",
    desc: "We help organizations apply technology strategically, from transformation to security.",
    link: "/services/consultancy" as const,
  },
  {
    icon: Heart,
    title: "Afroec Hub",
    desc: "Our social impact initiative building Africa's tech talent through free education.",
    link: "/initiatives" as const,
  },
];
function ServicesSection() {
  return (
    <section className="bg-bg-cream py-28 border-y border-border/40">
      <div className="container-page">
        <SectionHeader eyebrow="OUR SERVICES" title="Technology, Built Right" align="center" />
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <Reveal
                key={svc.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                className="group flex flex-col bg-white border border-border rounded-[16px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg"
              >
                <div className="h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mb-6 transition-transform group-hover:scale-110">
                  <Icon size={26} className="text-black" />
                </div>
                <h3 className="font-display text-[22px] font-bold text-black mb-3">{svc.title}</h3>
                <p className="text-[15px] leading-relaxed text-text-secondary mb-8 flex-1">{svc.desc}</p>
                <Link to={svc.link} className="link-arrow text-[15px] font-bold mt-auto self-start">
                  Learn More <ArrowRight size={16} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 4: OUR INITIATIVES (Preview Grid) ---------------- */
const initiativesList = [
  {
    icon: GraduationCap,
    title: "Afroec Academy",
    desc: "Intensive 2-4 month programs in Software Engineering, Cybersecurity, and Hardware Engineering. From fundamentals to job-ready skills.",
    stats: [
      { label: "Tracks", value: "3" },
      { label: "Months", value: "2-4" },
      { label: "Job-Ready", value: "Yes" },
    ],
    link: "/initiatives/academy",
  },
  {
    icon: Lightbulb,
    title: "Product Hub",
    desc: "2-month mentorship program taking you from idea to launched product. Build real solutions with expert guidance and resources.",
    stats: [
      { label: "Months", value: "2" },
      { label: "Idea to Product", value: "Focus" },
      { label: "Mentorship", value: "Expert" },
    ],
    link: "/initiatives/product-hub",
  },
  {
    icon: Users,
    title: "Community Programs",
    desc: "Reaching underserved communities through CyberGuard Youth, SheSec Ethiopia, SchoolNet Tech, and DigiSec mobile labs.",
    stats: [
      { label: "Programs", value: "4" },
      { label: "Reached", value: "5,000+" },
      { label: "Women", value: "50%" },
    ],
    link: "/initiatives",
  },
];
function InitiativesSection() {
  return (
    <section className="py-28 bg-white border-t border-border/60">
      <div className="container-page">
        <SectionHeader
          eyebrow="OUR INITIATIVES"
          title="Three Pillars of Impact"
          align="center"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {initiativesList.map((init, index) => {
            const Icon = init.icon;
            return (
              <Reveal
                key={init.title}
                delay={((index % 3) + 1) as 1 | 2 | 3}
                className="group flex flex-col bg-white border border-border rounded-[16px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg"
              >
                <div className="h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mb-8 transition-transform group-hover:scale-110">
                  <Icon size={32} className="text-black" />
                </div>
                <h3 className="font-display text-[24px] font-semibold text-black mb-4">
                  {init.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-text-secondary mb-8 flex-1">
                  {init.desc}
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-border pt-6 mb-6">
                  {init.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-[18px] md:text-[20px] font-bold text-black leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={init.link} className="link-arrow text-[15px] font-bold mt-auto self-start">
                  Learn More <ArrowRight size={16} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 5: IMPACT PREVIEW ---------------- */
function parsePercent(value?: string, fallback = 0) {
  if (!value) return fallback;
  const n = parseInt(value.replace("%", "").trim(), 10);
  return Number.isFinite(n) ? n : fallback;
}

function ImpactSection() {
  const { stats, loading } = usePublicStats();

  const impactMetrics = useMemo(
    () => [
      { value: 5000, suffix: "+", label: "Youth Reach", desc: "Annual target to reach" },
      { value: 55, suffix: "%", label: "Annual Graduates", desc: "Job-ready tech professionals" },
      { value: parsePercent(stats?.womenInTech, 50), suffix: "%", label: "Women in Tech", desc: "Gender parity target" },
      { value: parsePercent(stats?.placementRate, 85), suffix: "%", label: "Placement Rate", desc: "Employed within 6 months" },
    ],
    [stats],
  );

  return (
    <section className="bg-bg-cream py-28 border-y border-border/40">
      <div className="container-page">
        <SectionHeader
          eyebrow="OUR ANNUAL TARGET TO REACH"
          title="Numbers That Matter"
          align="center"
        />

        {loading && (
          <p className="text-center text-[13px] text-text-muted mb-6">Loading latest impact data…</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric, idx) => (
            <Reveal
              key={metric.label}
              delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
              className="bg-white border border-border rounded-[16px] p-8 hover:border-black transition-all duration-300"
            >
              <div className="font-display text-[48px] md:text-[56px] font-bold tracking-tight text-black leading-none">
                <CountUp end={metric.value} />{metric.suffix}
              </div>
              <div className="mt-4 h-[3px] w-10 bg-accent rounded-full" />
              <div className="mt-5 font-display text-[18px] font-bold text-black">{metric.label}</div>
              <div className="mt-1.5 text-[13px] text-text-secondary leading-snug">{metric.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6: TESTIMONIALS PREVIEW ---------------- */
function TestimonialsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="SUCCESS STORIES"
          title="What Our Graduates Say"
          align="center"
        />
        <Testimonials />
      </div>
    </section>
  );
}

/* ---------------- SECTION 7: GET INVOLVED CTA ---------------- */
const ctaOptions = [
  {
    icon: User,
    title: "Start Your Journey",
    desc: "Apply for our free programs and take the first step toward a tech career.",
    btnLabel: "Apply Now",
    link: "/get-involved/apply",
  },
  {
    icon: Building2,
    title: "Partner With Us",
    desc: "Organizations, companies, and institutions — collaborate with us to expand impact.",
    btnLabel: "Partner With Us",
    link: "/get-involved/partner",
  },
  {
    icon: Heart,
    title: "Volunteer With Us",
    desc: "Share your skills and time. Join our community of trainers, mentors, and changemakers.",
    btnLabel: "Volunteer Now",
    link: "/get-involved/volunteer",
  },
];
function CTASection() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMsg, setNewsletterMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterMsg(null);
    setNewsletterLoading(true);
    try {
      await subscribeNewsletter(newsletterEmail.trim());
      setNewsletterMsg({ type: "ok", text: "Thank you for subscribing!" });
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterMsg({ type: "err", text: formatApiError(err) });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <section id="cta" className="bg-bg-dark text-white py-28 relative overflow-hidden">
      <OrganicShape variant={3} className="-top-32 -right-32 w-[500px] h-[500px] opacity-10" />

      <div className="container-page relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-muted flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-accent" />
            GET INVOLVED
          </span>
          <h2 className="mt-4 font-display font-bold text-[36px] md:text-[44px] leading-tight text-white">
            Be Part of the Transformation
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] text-text-muted">
            Whether you're a student, partner, or volunteer — there's a place for you in the ecosystem.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {ctaOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <Reveal
                key={option.title}
                delay={((idx % 3) + 1) as 1 | 2 | 3}
                className="flex flex-col bg-surface-dark border border-border-dark rounded-[16px] p-8 md:p-10 hover:border-accent transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mb-6">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-[22px] font-bold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-muted mb-8 flex-1">
                  {option.desc}
                </p>
                <Link
                  to={option.link}
                  className="w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold"
                >
                  {option.btnLabel}
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Newsletter Sign Up */}
        <Reveal className="mt-24 pt-16 border-t border-border-dark grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display text-[26px] font-bold text-white">Stay Updated</h3>
            <p className="mt-2 text-[15px] text-text-muted leading-relaxed">
              Get quarterly updates on cohorts, student milestones, events, and impact reports.
            </p>
          </div>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-surface-dark border border-border-dark px-6 py-4 text-[15px] text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              className="btn-pill bg-accent text-black hover:bg-accent-hover font-semibold shrink-0 disabled:opacity-50"
            >
              {newsletterLoading ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          {newsletterMsg && (
            <p
              className={`mt-3 text-[13px] ${newsletterMsg.type === "ok" ? "text-accent" : "text-red-400"}`}
              role="status"
            >
              {newsletterMsg.text}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
