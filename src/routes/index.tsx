import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  GraduationCap,
  Truck,
  User,
  Building2,
  Heart,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  BookOpen,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import missionImg from "@/assets/mission.jpg";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afroec Hub | Building Africa's Tech Talent Factory" },
      {
        name: "description",
        content:
          "Afroec Hub transforms Ethiopian youth, women, and students into world-class tech professionals through free digital literacy, programming, and cybersecurity education.",
      },
      { property: "og:title", content: "Afroec Hub | Building Africa's Tech Talent Factory" },
      {
        property: "og:description",
        content:
          "Free digital literacy, programming, and cybersecurity training for Ethiopian youth, women, and students in remote communities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Afroec Hub" },
      {
        name: "twitter:description",
        content:
          "Building Africa's next generation of tech talent through digital literacy, programming, and cybersecurity.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Mission />
        <Programs />
        <Pipeline />
        <Impact />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
      <div className="container-page grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <Reveal>
            <p className="eyebrow">Afroec Hub</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 font-display font-bold text-[44px] leading-[1.05] tracking-[-0.03em] sm:text-[56px] md:text-[64px] lg:text-[72px]">
              Building Africa's
              <br />
              Next Generation
              <br />
              of <span className="relative inline-block">
                Tech Talent
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-accent -z-10 blob-3"
                />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 text-[17px] md:text-[19px] leading-relaxed text-text-secondary max-w-[540px]">
              Free digital literacy, programming, and cybersecurity training for Ethiopian
              youth, women, and students in remote communities.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="btn-pill bg-accent text-accent-foreground hover:bg-accent-hover"
              >
                Get Started <ArrowRight size={18} />
              </a>
              <a
                href="#mission"
                className="btn-pill bg-primary text-primary-foreground hover:bg-neutral-800"
              >
                Learn More
              </a>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-12 flex items-center gap-10">
              <div>
                <div className="font-display text-[36px] md:text-[44px] font-bold leading-none tracking-tight">
                  <CountUp end={99} suffix="k+" />
                </div>
                <div className="mt-2 text-[13px] text-text-secondary font-medium">
                  Students Reached
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="font-display text-[36px] md:text-[44px] font-bold leading-none tracking-tight">
                  <CountUp end={10} suffix="k+" />
                </div>
                <div className="mt-2 text-[13px] text-text-secondary font-medium">
                  Graduates
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right */}
        <Reveal delay={2} className="lg:justify-self-end w-full">
          <div className="relative w-full max-w-[520px] mx-auto">
            {/* Yellow blob */}
            <div
              aria-hidden
              className="absolute -inset-6 md:-inset-8 bg-accent/25 blob animate-blob"
            />
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px]">
              <img
                src={heroImg}
                alt="Ethiopian student smiling with a laptop"
                className="h-full w-full object-cover"
                width={1080}
                height={1350}
                fetchPriority="high"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-8 bg-accent text-accent-foreground rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-lg animate-float">
              Digital Literacy • Programming • Cybersecurity
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-8 bg-white border border-border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="h-9 w-9 rounded-full bg-accent-light flex items-center justify-center">
                <BookOpen size={18} className="text-black" />
              </div>
              <div className="text-[13px]">
                <div className="font-semibold leading-tight">Interactive</div>
                <div className="text-text-secondary leading-tight">Learning</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- PARTNERS ---------------- */
const partners = [
  "Ministry of Education",
  "CBE",
  "Ethio Telecom",
  "GIZ",
  "Google",
  "Cisco",
];
function Partners() {
  return (
    <section id="partners" className="bg-bg-cream py-16 md:py-20">
      <div className="container-page">
        <p className="eyebrow text-center">Trusted by leading organizations</p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((p) => (
            <div
              key={p}
              className="text-center text-[14px] font-semibold tracking-wide text-text-secondary/60 hover:text-foreground transition-colors"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MISSION ---------------- */
const missionPoints = [
  "Free digital literacy programs",
  "Programming & cybersecurity bootcamps",
  "Paid apprenticeships",
  "Job placement support",
];
function Mission() {
  return (
    <section id="mission" className="py-24 md:py-32">
      <div className="container-page grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal>
          <p className="eyebrow">Our Mission</p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em]">
            Technology Education for Every Community
          </h2>
          <p className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-text-secondary">
            Afroec Hub is the social impact initiative of Afroec — a technology company
            committed to building Africa's digital future. We believe world-class tech talent
            exists everywhere, but opportunity does not.
          </p>
          <ul className="mt-8 space-y-4">
            {missionPoints.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 h-6 w-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} className="text-black" strokeWidth={3} />
                </span>
                <span className="text-[16px] font-medium text-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <a href="#programs" className="link-arrow mt-9">
            About Afroec <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal delay={2}>
          <div className="relative w-full max-w-[520px] mx-auto">
            <div
              aria-hidden
              className="absolute -inset-6 bg-accent/20 blob-2 animate-blob"
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-[32px]">
              <img
                src={missionImg}
                alt="Instructor teaching a small group of students"
                className="h-full w-full object-cover"
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

/* ---------------- PROGRAMS ---------------- */
const programs = [
  {
    icon: Shield,
    title: "CyberGuard Youth",
    desc: "Comprehensive tech training for youth aged 16–25. From zero background to job-ready in digital literacy, programming, and cybersecurity.",
    stats: [
      ["1,500+", "Reached"],
      ["150", "Graduates/Year"],
    ],
  },
  {
    icon: Users,
    title: "SheSec Ethiopia",
    desc: "Women-only cohorts with childcare, safe transport, female mentors, and flexible scheduling. 50% of our graduates are women.",
    stats: [
      ["50%", "Women"],
      ["250", "Graduates/Year"],
    ],
  },
  {
    icon: GraduationCap,
    title: "SchoolNet Tech",
    desc: "Partnering with public schools for digital literacy and programming in grades 9–12. Mobile labs for schools without computers.",
    stats: [
      ["200", "Schools"],
      ["5,000", "Students"],
    ],
  },
  {
    icon: Truck,
    title: "DigiSec Ethiopia",
    desc: "Solar-powered mobile labs bringing tech education to remote villages with Starlink and local-language content.",
    stats: [
      ["4", "Trucks"],
      ["500", "Rural Students"],
    ],
  },
];
function Programs() {
  return (
    <section id="programs" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Our Programs</p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em]">
            Four Paths to Impact
          </h2>
          <p className="mt-4 text-[17px] text-text-secondary">
            Tailored programs for every community we serve.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <Reveal
              key={p.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="group bg-white border border-border rounded-2xl p-8 md:p-10 transition-all duration-200 hover:-translate-y-1 hover:border-foreground"
            >
              <div className="h-14 w-14 rounded-full bg-accent flex items-center justify-center">
                <p.icon size={24} className="text-black" />
              </div>
              <h3 className="mt-6 font-display text-[24px] md:text-[26px] font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{p.desc}</p>
              <div className="mt-6 flex gap-8 border-t border-border pt-5">
                {p.stats.map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-[24px] font-bold tracking-tight">{num}</div>
                    <div className="text-[12px] uppercase tracking-wider text-text-secondary mt-1 font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <a href="#cta" className="link-arrow mt-6">
                Learn More <ArrowRight size={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PIPELINE ---------------- */
const steps = [
  {
    n: "01",
    title: "Community Outreach",
    duration: null,
    desc: "Reaching 10,000+ youth annually through schools, radio, and community leaders.",
  },
  {
    n: "02",
    title: "Digital Literacy",
    duration: "3 Months",
    desc: "Free foundational program in computing basics and internet safety.",
  },
  {
    n: "03",
    title: "Programming & Security Bootcamp",
    duration: "9 Months",
    desc: "Full-time intensive in programming, Linux, Python, web dev, and security.",
  },
  {
    n: "04",
    title: "Paid Apprenticeship",
    duration: "6 Months",
    desc: "Real client projects under senior engineers. Build portfolio, earn salary.",
  },
  {
    n: "05",
    title: "Job Placement",
    duration: null,
    desc: "85% placement rate in local and international roles.",
  },
];
function Pipeline() {
  return (
    <section id="pipeline" className="bg-bg-cream py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em]">
            From Literacy to Career
          </h2>
          <p className="mt-4 text-[17px] text-text-secondary">
            A structured 18-month journey to employment.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="relative bg-white border border-border rounded-2xl p-6 hover:border-foreground transition-colors"
            >
              <div className="font-display text-[44px] font-bold text-accent leading-none tracking-tight">
                {s.n}
              </div>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-[17px] font-bold">{s.title}</h3>
              </div>
              {s.duration && (
                <span className="mt-2 inline-flex items-center rounded-full bg-accent-light text-accent-foreground px-3 py-1 text-[11px] font-semibold">
                  {s.duration}
                </span>
              )}
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- IMPACT ---------------- */
const metrics: {
  value: number;
  suffix?: string;
  label: string;
  desc: string;
}[] = [
  { value: 5000, suffix: "+", label: "Youth Reached", desc: "Through all programs combined" },
  { value: 400, label: "Annual Graduates", desc: "Job-ready tech professionals" },
  { value: 50, suffix: "%", label: "Women in Tech", desc: "Breaking gender barriers" },
  { value: 85, suffix: "%", label: "Placement Rate", desc: "Employed within 6 months" },
];
function Impact() {
  return (
    <section id="impact" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Our Impact</p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em]">
            Numbers That Matter
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="p-8 border border-border rounded-2xl bg-white hover:border-foreground transition-colors"
            >
              <div className="font-display text-[52px] md:text-[60px] font-bold tracking-[-0.03em] leading-none">
                <CountUp end={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-4 h-[3px] w-10 bg-accent rounded-full" />
              <div className="mt-5 font-display text-[18px] font-bold">{m.label}</div>
              <div className="mt-1 text-[14px] text-text-secondary">{m.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function TestimonialsSection() {
  return (
    <section id="stories" className="bg-bg-cream py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow">Success Stories</p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em]">
            What Our Graduates Say
          </h2>
        </Reveal>
        <Testimonials />
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
const ctaCards = [
  {
    icon: User,
    title: "For Students",
    desc: "Apply for free digital literacy and start your tech journey.",
    label: "Apply Now",
  },
  {
    icon: Building2,
    title: "For Employers",
    desc: "Access job-ready tech professionals trained on real projects.",
    label: "Partner With Us",
  },
  {
    icon: Heart,
    title: "For Supporters",
    desc: "Sponsor a cohort or fund a DigiSec Truck.",
    label: "Donate",
  },
];
function CTASection() {
  return (
    <section id="cta" className="bg-bg-dark text-white py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 blob animate-blob"
      />
      <div className="container-page relative">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            <Sparkles size={12} className="inline mr-1.5 -mt-1" />
            Get Involved
          </p>
          <h2 className="mt-5 font-display font-bold text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.02em] text-white">
            Be Part of the Transformation
          </h2>
          <p className="mt-4 text-[17px] text-text-muted">
            Whether you're a student, employer, donor, or partner — there's a place for you.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {ctaCards.map((c, i) => (
            <Reveal
              key={c.title}
              delay={((i % 4) + 1) as 1 | 2 | 3}
              className="bg-surface-dark border border-border-dark rounded-2xl p-8 md:p-10 flex flex-col hover:border-accent transition-colors"
            >
              <div className="h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center">
                <c.icon size={26} className="text-accent" />
              </div>
              <h3 className="mt-6 font-display text-[22px] font-bold text-white">{c.title}</h3>
              <p className="mt-3 text-[15px] text-text-muted flex-1">{c.desc}</p>
              <button
                type="button"
                className="mt-8 btn-pill bg-accent text-accent-foreground hover:bg-accent-hover w-full"
              >
                {c.label}
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 pt-12 border-t border-border-dark grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-display text-[24px] font-bold text-white">Stay Updated</h3>
            <p className="mt-2 text-[15px] text-text-muted">
              Get quarterly updates on cohorts, impact reports, and new programs.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-surface-dark border border-border-dark px-6 py-3.5 text-[15px] text-white placeholder:text-text-muted focus:outline-none focus:border-accent"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn-pill bg-accent text-accent-foreground hover:bg-accent-hover"
            >
              Subscribe
            </button>
          </form>
        </Reveal>

        <div className="mt-14 flex items-center justify-center gap-6 text-white/60">
          {[
            { Icon: Twitter, label: "Twitter" },
            { Icon: Linkedin, label: "LinkedIn" },
            { Icon: Youtube, label: "YouTube" },
            { Icon: Github, label: "GitHub" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="hover:text-accent transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-bg-dark text-white pt-20 pb-10 border-t border-border-dark">
      <div className="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-[24px] font-bold tracking-tight">
            Afro<span className="text-accent">ec</span>
            <span className="ml-2 font-medium text-white/80 text-[16px]">Hub</span>
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-[0.15em] text-text-muted font-semibold">
            From Digital Literacy to Tech Workforce
          </p>
          <p className="mt-3 text-[14px] text-text-muted max-w-xs">
            Building Africa's next generation of tech professionals.
          </p>
          <div className="mt-6 flex gap-3">
            {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-border-dark flex items-center justify-center text-white/60 hover:text-accent hover:border-accent transition-colors"
                aria-label="Social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Programs"
          links={["CyberGuard Youth", "SheSec Ethiopia", "SchoolNet Tech", "DigiSec Ethiopia"]}
        />
        <FooterCol
          title="Company"
          links={["About Afroec", "Our Team", "Careers", "Blog", "Press Kit"]}
        />

        <div>
          <div className="font-display text-[16px] font-bold text-white">Contact</div>
          <ul className="mt-4 space-y-3 text-[14px] text-text-muted">
            <li>
              <a
                href="mailto:hub@afroec.com"
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail size={14} /> hub@afroec.com
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone size={14} /> +251 911 000 000
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={14} /> Addis Ababa, Ethiopia
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-16 pt-6 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-text-muted">
        <p>© 2026 Afroec Hub. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-display text-[16px] font-bold text-white">{title}</div>
      <ul className="mt-4 space-y-3 text-[14px] text-text-muted">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-accent transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
