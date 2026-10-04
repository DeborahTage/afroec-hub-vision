import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { workProjects } from "@/lib/work";
import { SITE_DESCRIPTION, SITE_TITLE, organizationSchema, pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageSeo({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  component: HomePage,
});

const areas = [
  {
    name: "Afroec Solutions",
    text: "Commercial technology and software solutions.",
    href: "/solutions" as const,
  },
  {
    name: "Afroec Labs",
    text: "AI, robotics, hardware, automation, research, and experimentation.",
    href: "/labs" as const,
  },
  {
    name: "Afroec Hub",
    text: "Technology education, mentorship, digital skills, and talent development.",
    href: "/hub" as const,
  },
];

const solutionItems = [
  { title: "Custom Software", text: "Software shaped around how an organization actually works." },
  { title: "Web & Mobile Applications", text: "Products people can use on the web and on their phones." },
  { title: "Business Management Systems", text: "Systems for operations, records, and day-to-day work." },
  { title: "AI & Automation", text: "Applied intelligence and automation where they reduce real work." },
  { title: "Digital Platforms", text: "Platforms that connect people, data, and services." },
  { title: "Technology Consulting", text: "Clear technical direction before and during a build." },
];

const labItems = [
  { title: "AI", text: "Intelligent systems and applied artificial intelligence." },
  { title: "Robotics", text: "Robotics, automation, and intelligent machines." },
  { title: "Hardware", text: "Embedded systems and technology prototypes." },
  { title: "R&D", text: "Experimentation, prototyping, and emerging technology." },
];

const hubItems = [
  "Programming",
  "Cybersecurity",
  "AI",
  "Digital literacy",
  "Mentorship",
  "Youth opportunities",
  "Women in technology",
];

const process = [
  { n: "01", title: "Discover", text: "Understand the problem and the organization's needs." },
  { n: "02", title: "Design", text: "Develop the right technical approach." },
  { n: "03", title: "Build", text: "Turn the solution into a working product." },
  { n: "04", title: "Deliver", text: "Launch, improve, and support the technology." },
];

const principles = [
  { title: "Problem First", text: "We start with the real problem, not the technology." },
  { title: "Built for Africa", text: "We design with African realities, constraints, and opportunities in mind." },
  { title: "Practical Innovation", text: "We focus on technology that can actually be used." },
  { title: "People + Technology", text: "We believe technology and human capability must grow together." },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <JsonLd data={organizationSchema()} />
        <Hero />
        <WhatWeDo />
        <Solutions />
        <Labs />
        <Hub />
        <HowWeWork />
        <Why />
        <Work />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-white">
      <div className="container-page max-w-4xl">
        <Reveal>
          <span className="eyebrow">AFROEC</span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-5 font-display font-bold text-[42px] leading-[1.08] tracking-[-0.03em] sm:text-[56px] md:text-[68px] text-black">
            Building Africa's Next Generation of{" "}
            <span className="relative inline-block">
              Technology
              <span aria-hidden className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-accent -z-10 opacity-90" />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 text-[18px] md:text-[20px] leading-relaxed text-text-secondary max-w-[640px]">
            Afroec is an African technology company. We build practical digital solutions, explore emerging technologies, and develop the next generation of African tech talent.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover">
              Work With Us <ArrowRight size={18} />
            </Link>
            <a href="#what-we-do" className="btn-pill bg-black text-white hover:bg-neutral-800">
              Explore Afroec
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-20 md:py-28 bg-bg-cream border-y border-border/60">
      <div className="container-page">
        <SectionHeader
          align="left"
          eyebrow="What we do"
          title="Three parts of one company"
          subtitle="Afroec builds technology, explores emerging technology, and develops technology talent."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <Reveal key={area.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Link
                to={area.href}
                className="group flex h-full flex-col bg-white border border-border rounded-[20px] p-7 hover:border-black transition-colors"
              >
                <span className="h-1.5 w-10 rounded-full bg-accent" />
                <h3 className="mt-6 font-display text-[26px] font-bold text-black">{area.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary flex-1">{area.text}</p>
                <span className="link-arrow mt-6 text-[14px]">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            align="left"
            className="mb-0"
            eyebrow="Afroec Solutions"
            title="Technology for real organizational problems"
            subtitle="Afroec Solutions is the commercial arm of this African technology company. We design and build custom software, digital platforms, and AI and automation organizations can use."
          />
          <Link to="/solutions" className="link-arrow shrink-0 mb-2">
            See Solutions <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutionItems.map((item) => (
            <article key={item.title} className="border border-border rounded-[16px] p-6 bg-white">
              <h3 className="font-display text-[18px] font-bold text-black">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Labs() {
  return (
    <section className="py-20 md:py-28 bg-bg-dark text-white">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow text-accent">Afroec Labs</span>
          <h2 className="mt-3 font-display font-bold text-[32px] md:text-[42px] leading-tight">
            Where Afroec explores what comes next
          </h2>
          <p className="mt-4 text-[16px] md:text-[18px] text-white/70 leading-relaxed">
            Afroec Labs is the innovation arm for AI, robotics, hardware, automation, and research — still grounded in work that can become real.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {labItems.map((item) => (
            <article key={item.title} className="border border-white/15 rounded-[16px] p-6 bg-white/5">
              <h3 className="font-display text-[20px] font-bold">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/65">{item.text}</p>
            </article>
          ))}
        </div>
        <Link to="/labs" className="inline-flex mt-10 text-[14px] font-semibold text-accent hover:text-accent-hover">
          Explore Labs <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}

function Hub() {
  return (
    <section className="py-20 md:py-28 bg-bg-cream">
      <div className="container-page grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div>
          <span className="eyebrow">Afroec Hub</span>
          <h2 className="mt-3 font-display font-bold text-[32px] md:text-[42px] leading-tight text-black">
            Technology is only as powerful as the people who build it.
          </h2>
          <p className="mt-5 text-[16px] md:text-[18px] text-text-secondary leading-relaxed max-w-xl">
            Afroec Hub develops technology education, mentorship, and digital skills for African tech talent. It is part of Afroec, not the whole company.
          </p>
          <Link to="/hub" className="link-arrow mt-8">
            Explore the Hub <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="grid sm:grid-cols-2 gap-3">
          {hubItems.map((item) => (
            <li key={item} className="bg-white border border-border rounded-[14px] px-5 py-4 font-medium text-black">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-page">
        <SectionHeader align="left" eyebrow="How we work" title="A clear path from problem to product" />
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((step) => (
            <li key={step.n} className="border-t-2 border-black pt-5">
              <div className="font-display text-[28px] font-bold text-accent">{step.n}</div>
              <h3 className="mt-3 font-display text-[20px] font-bold text-black">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="py-20 md:py-28 bg-bg-cream border-y border-border/60">
      <div className="container-page">
        <SectionHeader align="left" eyebrow="Why Afroec" title="How we choose what to build" />
        <div className="grid md:grid-cols-2 gap-5">
          {principles.map((item) => (
            <article key={item.title} className="bg-white border border-border rounded-[16px] p-7">
              <h3 className="font-display text-[22px] font-bold text-black">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader align="left" className="mb-0" eyebrow="Work" title="Selected work" subtitle="Systems and websites Afroec has built." />
          <Link to="/work" className="link-arrow shrink-0 mb-2">
            All work <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {workProjects.map((project) => (
            <article key={project.name} className="border border-border rounded-[18px] overflow-hidden bg-white">
              <div className="aspect-[16/10] bg-bg-alt">
                <img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">{project.category}</div>
                <h3 className="mt-2 font-display text-[22px] font-bold text-black">{project.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="py-20 md:py-28 bg-black text-white">
      <div className="container-page max-w-3xl">
        <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-[1.1]">
          Have a problem worth solving?
        </h2>
        <p className="mt-5 text-[18px] md:text-[20px] text-white/75">Let's build the technology for it.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover">
            Start a Conversation
          </Link>
          <Link to="/work" className="btn-pill border border-white/30 text-white hover:border-accent hover:text-accent">
            Explore Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
