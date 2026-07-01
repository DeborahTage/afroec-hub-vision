import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
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
          "Afroec Hub transforms Ethiopian youth, women, and students into world-class tech professionals through digital literacy, programming, and cybersecurity education.",
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
    <section className="pt-24 md:pt-28 pb-16 md:pb-24">
      <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <p className="eyebrow">Afroec Hub</p>
          <h1 className="mt-5 text-[40px] leading-[1.1] tracking-[-0.03em] font-bold md:text-[56px] lg:text-[64px]">
            Building Africa's Next Generation of Tech Talent
          </h1>
          <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-text-secondary max-w-[560px]">
            Free digital literacy, programming, and cybersecurity training for Ethiopian youth,
            women, and students in remote communities.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-[15px] font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Join the Program
            </a>
            <a
              href="#mission"
              className="inline-flex items-center rounded-full border border-primary text-primary px-6 py-3 text-[15px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Learn More
            </a>
          </div>
        </Reveal>

        <Reveal delay={2} className="lg:justify-self-end w-full">
          <div className="relative aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-xl border border-border">
            <img
              src={heroImg}
              alt="Ethiopian students learning to code together in a bright classroom"
              className="h-full w-full object-cover"
              width={1280}
              height={1280}
              fetchPriority="high"
            />
          </div>
        </Reveal>
      </div>

      <div className="container-page mt-16 md:mt-24 flex justify-center">
        <a href="#partners" className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-[11px] uppercase tracking-[0.15em] font-medium">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
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
  "UNDP",
  "Mastercard Foundation",
  "Safaricom",
];
function Partners() {
  return (
    <section id="partners" className="bg-bg-alt py-16">
      <div className="container-page">
        <p className="eyebrow text-center">Trusted By</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {partners.map((p) => (
            <div
              key={p}
              className="text-center text-[13px] font-semibold tracking-wide text-text-secondary/70 hover:text-foreground transition-colors"
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
  "Free digital literacy for underserved communities",
  "Intensive programming and cybersecurity bootcamps",
  "Paid apprenticeships on real client projects",
  "Job placement in Ethiopia and globally",
];
const pipeline = [
  { title: "Digital Literacy", desc: "Foundational tech skills for every learner." },
  { title: "Bootcamp", desc: "Intensive programming & cybersecurity training." },
  { title: "Apprenticeship", desc: "Paid work on real client projects." },
  { title: "Placement", desc: "Careers with local & global employers." },
];
function Mission() {
  return (
    <section id="mission" className="py-24 md:py-32">
      <div className="container-page grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <p className="eyebrow">Our Mission</p>
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
            Technology Education for Every Community
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-text-secondary">
            Afroec Hub is the social impact initiative of Afroec — a technology company committed to
            building Africa's digital future. We believe world-class tech talent exists everywhere,
            but opportunity does not. Our mission is to bridge that gap through structured education
            in digital literacy, programming, and cybersecurity.
          </p>
          <ul className="mt-8 space-y-4">
            {missionPoints.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} className="text-black" strokeWidth={2.5} />
                </span>
                <span className="text-[16px] text-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <a href="#programs" className="link-arrow mt-8">
            About Afroec <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal delay={2}>
          <div className="rounded-xl overflow-hidden border border-border mb-6">
            <img
              src={missionImg}
              alt="Instructor teaching programming to a small group"
              className="w-full h-auto object-cover"
              width={1024}
              height={1024}
              loading="lazy"
            />
          </div>
          <ol className="relative border-l border-border pl-6 space-y-6">
            {pipeline.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[35px] top-0 h-6 w-6 rounded-full bg-accent text-[12px] font-bold text-black flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="text-[15px] font-semibold">{s.title}</div>
                <div className="text-[14px] text-text-secondary">{s.desc}</div>
              </li>
            ))}
          </ol>
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
    desc: "Comprehensive tech training for unemployed youth aged 16–25. From zero background to job-ready in digital literacy, programming, and cybersecurity.",
    stats: [
      ["1,500+", "Youth Reached"],
      ["150", "Graduates/Year"],
      ["$400", "Avg Salary"],
    ],
  },
  {
    icon: Users,
    title: "SheSec Ethiopia",
    desc: "Women-only cohorts with dedicated support — childcare, safe transport, female mentors, and flexible scheduling. 50% of all our graduates are women.",
    stats: [
      ["50%", "Women"],
      ["250", "Graduates/Year"],
      ["200", "Placed"],
    ],
  },
  {
    icon: GraduationCap,
    title: "SchoolNet Tech",
    desc: "Partnering with public schools to bring digital literacy, programming, and tech awareness to grades 9–12. Mobile labs for schools without computers.",
    stats: [
      ["200", "Schools"],
      ["5,000", "Students"],
      ["100", "Scholarships"],
    ],
  },
  {
    icon: Truck,
    title: "DigiSec Ethiopia",
    desc: "Solar-powered mobile labs bringing tech education to remote villages. Starlink connectivity, rugged laptops, and local-language content.",
    stats: [
      ["4", "Trucks"],
      ["500", "Rural Students"],
      ["50", "Scholarships"],
    ],
  },
];
function Programs() {
  return (
    <section id="programs" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Our Programs</p>
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
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
              className="group bg-surface border border-border rounded-lg p-8 md:p-10 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground"
            >
              <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                <p.icon size={22} className="text-black" />
              </div>
              <h3 className="mt-6 text-[22px] md:text-[24px] font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{p.desc}</p>
              <div className="mt-6 flex divide-x divide-border border-y border-border py-4">
                {p.stats.map(([num, label]) => (
                  <div key={label} className="flex-1 text-center px-2 first:pl-0 last:pr-0">
                    <div className="text-[22px] font-bold tracking-tight">{num}</div>
                    <div className="text-[11px] uppercase tracking-wider text-text-secondary mt-1">
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
    title: "Community Outreach",
    duration: null,
    desc: "Reaching 10,000+ youth annually through schools, radio, and community leaders.",
  },
  {
    title: "Digital Literacy",
    duration: "3 Months",
    desc: "Free foundational program. Computing basics, internet safety, problem-solving.",
  },
  {
    title: "Bootcamp",
    duration: "9 Months",
    desc: "Full-time intensive. Programming, networking, Linux, Python, web development, security.",
  },
  {
    title: "Paid Apprenticeship",
    duration: "6 Months",
    desc: "Real client projects under senior engineers. Build portfolio, earn salary.",
  },
  {
    title: "Job Placement",
    duration: null,
    desc: "85% placement rate. Local enterprises, international remote work, or Afroec teams.",
  },
];
function Pipeline() {
  return (
    <section id="pipeline" className="bg-bg-alt py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">How It Works</p>
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
            From Literacy to Career
          </h2>
          <p className="mt-4 text-[17px] text-text-secondary">
            A structured 18-month journey to employment.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="relative bg-white border border-border rounded-lg p-6"
            >
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[14px] font-bold">
                {i + 1}
              </div>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <h3 className="text-[17px] font-semibold">{s.title}</h3>
                {s.duration && (
                  <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2 py-0.5 text-[11px] font-semibold">
                    {s.duration}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{s.desc}</p>
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
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
            Numbers That Matter
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="p-6 md:p-8 border border-border rounded-lg bg-white"
            >
              <div className="text-[44px] md:text-[52px] font-bold tracking-[-0.03em] leading-none">
                <CountUp end={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-4 h-[2px] w-10 bg-accent" />
              <div className="mt-5 text-[18px] font-semibold">{m.label}</div>
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
    <section id="stories" className="bg-bg-alt py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow">Success Stories</p>
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em]">
            Voices from Our Community
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
    desc: "Apply for our free digital literacy program and start your journey in programming or cybersecurity.",
    label: "Apply Now",
  },
  {
    icon: Building2,
    title: "For Employers",
    desc: "Access a pipeline of job-ready tech professionals trained on real-world projects.",
    label: "Partner With Us",
  },
  {
    icon: Heart,
    title: "For Supporters",
    desc: "Sponsor a cohort, fund a DigiSec Truck, or donate equipment.",
    label: "Donate or Sponsor",
  },
];
function CTASection() {
  return (
    <section id="cta" className="bg-bg-dark text-white py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            Get Involved
          </p>
          <h2 className="mt-4 text-[32px] md:text-[40px] leading-[1.2] font-semibold tracking-[-0.02em] text-white">
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
              className="bg-surface-dark border border-border-dark rounded-lg p-8 md:p-10 flex flex-col"
            >
              <c.icon size={28} className="text-accent" />
              <h3 className="mt-6 text-[22px] font-semibold text-white">{c.title}</h3>
              <p className="mt-3 text-[15px] text-text-muted flex-1">{c.desc}</p>
              <button
                type="button"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-5 py-3 text-[14px] font-semibold hover:bg-accent-hover transition-colors"
              >
                {c.label}
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 pt-12 border-t border-border-dark grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-[22px] font-semibold text-white">Stay Updated</h3>
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
              className="flex-1 rounded-full bg-surface-dark border border-border-dark px-5 py-3 text-[15px] text-white placeholder:text-text-muted focus:outline-none focus:border-accent"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full bg-accent text-accent-foreground px-6 py-3 text-[14px] font-semibold hover:bg-accent-hover transition-colors"
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
              className="hover:text-white transition-colors"
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
          <div className="text-[22px] font-bold tracking-tight">
            Afro<span className="text-accent">ec</span>
            <span className="ml-2 font-medium text-white/80 text-[16px]">Hub</span>
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-[0.12em] text-text-muted font-semibold">
            From Digital Literacy to Tech Workforce
          </p>
          <p className="mt-3 text-[14px] text-text-muted max-w-xs">
            Building Africa's next generation of tech professionals.
          </p>
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
          <div className="text-[15px] font-semibold text-white">Contact</div>
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
          <a
            href="#cta"
            className="mt-5 inline-flex items-center rounded-full bg-accent text-accent-foreground px-4 py-2 text-[13px] font-semibold hover:bg-accent-hover transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="container-page mt-16 pt-6 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-text-muted">
        <p>© 2026 Afroec Hub. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[15px] font-semibold text-white">{title}</div>
      <ul className="mt-4 space-y-3 text-[14px] text-text-muted">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-white transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
