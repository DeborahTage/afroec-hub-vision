import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import heroImg from "@/assets/hero.jpg";
import missionImg from "@/assets/mission.jpg";
import {
    Monitor,
    Smartphone,
    Building2,
    Brain,
    Search,
    Map,
    PenTool,
    Code2,
    Rocket,
    ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services/product-development")({
    component: ProductDevelopmentPage,
    head: () => ({
        meta: [
            { title: "Product Development | Afroec" },
            {
                name: "description",
                content:
                    "We build digital products that solve real problems. From concept to launch, we partner with organizations to create technology that matters.",
            },
        ],
    }),
});

const whatWeDo = [
    {
        icon: Monitor,
        secondaryIcon: Smartphone,
        title: "Web & Mobile Applications",
        desc: "Custom web platforms and mobile apps built with modern technologies. Scalable, secure, and user-centered.",
        tags: ["React", "Next.js", "Flutter", "Node.js", "PostgreSQL"],
    },
    {
        icon: Building2,
        title: "Enterprise Software",
        desc: "Internal tools, dashboards, and systems that streamline operations. We build software your team actually wants to use.",
        tags: ["ERP", "CRM", "Internal Tools", "Automation"],
    },
    {
        icon: Brain,
        title: "AI & Data Solutions",
        desc: "Machine learning models, data pipelines, and intelligent systems that turn your data into decisions.",
        tags: ["Python", "TensorFlow", "Data Engineering", "Analytics"],
    },
];

const process = [
    { icon: Search, title: "Discovery", desc: "We understand your problem, users, and constraints through research and workshops." },
    { icon: Map, title: "Strategy", desc: "We define the product vision, roadmap, and technical architecture." },
    { icon: PenTool, title: "Design", desc: "We create intuitive interfaces and user experiences through iterative prototyping." },
    { icon: Code2, title: "Development", desc: "We build with clean code, modern stacks, and rigorous testing." },
    { icon: Rocket, title: "Launch & Support", desc: "We deploy, monitor, and maintain — with continuous improvement based on real usage." },
];

const techStack = [
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"] },
    { group: "Backend", items: ["Node.js", "Python", "Java / Spring Boot", "PostgreSQL", "MongoDB"] },
    { group: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"] },
    { group: "AI / ML", items: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain"] },
    { group: "DevOps", items: ["GitHub Actions", "CI/CD", "Monitoring", "Logging"] },
];

const caseStudies = [
    {
        client: "Ethiopian Bank (Anonymous)",
        project: "Digital Banking Platform",
        desc: "Built a mobile-first banking platform serving 2M+ customers.",
        results: "40% increase in digital transactions, 60% reduction in branch visits.",
        tags: ["Fintech", "Mobile", "Security"],
    },
    {
        client: "Agricultural Cooperative",
        project: "Supply Chain Management System",
        desc: "End-to-end platform connecting farmers, cooperatives, and buyers.",
        results: "30% reduction in waste, 25% increase in farmer income.",
        tags: ["Agriculture", "Logistics", "Web"],
    },
    {
        client: "Healthcare NGO",
        project: "Patient Management System",
        desc: "Cloud-based system for clinics in rural Ethiopia.",
        results: "50% faster patient processing, 90% data accuracy.",
        tags: ["Healthcare", "Cloud", "Impact"],
    },
];

const engagementModels = [
    { title: "Fixed Price", desc: "Defined scope, defined budget, defined timeline. Best for well-specified projects." },
    { title: "Time & Materials", desc: "Flexible scope, transparent billing, adaptive timeline. Best for evolving products." },
    { title: "Dedicated Team", desc: "Your extended team, our expertise, shared goals. Best for long-term partnerships." },
];

function ProductDevelopmentPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO */}
                <section className="py-20 md:py-24 bg-white relative overflow-hidden">
                    <div className="container-page grid lg:grid-cols-[55fr_45fr] gap-12 items-center">
                        <Reveal>
                            <span className="eyebrow">OUR SERVICES</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-black">
                                Product Development
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[600px]">
                                We build digital products that solve real problems. From concept to launch, we partner with organizations to create technology that matters.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold shadow-sm">
                                    Start a Project
                                </Link>
                                <a href="#work" className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white">
                                    View Our Work
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="relative hidden lg:block">
                            <OrganicShape variant={1} className="-inset-6 opacity-50" />
                            <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-md">
                                <img
                                    src={missionImg}
                                    alt="Afroec engineering team collaborating on a digital product"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* WHAT WE DO */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="WHAT WE DO" title="Products Built for Impact" align="center" />
                        <div className="grid md:grid-cols-3 gap-8">
                            {whatWeDo.map((card, idx) => {
                                const Icon = card.icon;
                                const Secondary = card.secondaryIcon;
                                return (
                                    <Reveal
                                        key={card.title}
                                        delay={((idx % 3) + 1) as 1 | 2 | 3}
                                        className="group flex flex-col bg-white border border-border rounded-[16px] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg"
                                    >
                                        <div className="h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mb-6 gap-1 transition-transform group-hover:scale-110">
                                            <Icon size={26} className="text-black" />
                                            {Secondary && <Secondary size={20} className="text-black" />}
                                        </div>
                                        <h3 className="font-display text-[22px] font-bold text-black mb-3">{card.title}</h3>
                                        <p className="text-[15px] leading-relaxed text-text-secondary mb-6 flex-1">{card.desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {card.tags.map((tag) => (
                                                <span key={tag} className="text-[12px] font-semibold bg-accent-light text-black px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* OUR PROCESS */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader eyebrow="HOW WE WORK" title="Our Process" align="center" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {process.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <Reveal
                                        key={step.title}
                                        delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                                        className="relative bg-white border border-border rounded-[16px] p-6 hover:border-black transition-all duration-300 flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="h-11 w-11 rounded-full bg-accent-light flex items-center justify-center text-black">
                                                <Icon size={18} />
                                            </div>
                                            <span className="font-display text-[28px] font-bold text-accent leading-none">{idx + 1}</span>
                                        </div>
                                        <h3 className="font-display text-[17px] font-bold text-black mb-2">{step.title}</h3>
                                        <p className="text-[13px] text-text-secondary leading-relaxed">{step.desc}</p>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TECHNOLOGY STACK */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="TOOLS & TECHNOLOGY" title="Our Technology Stack" align="center" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {techStack.map((stack, idx) => (
                                <Reveal
                                    key={stack.group}
                                    delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                                    className="bg-white border border-border rounded-[16px] p-6"
                                >
                                    <div className="font-display text-[15px] font-bold text-black pb-3 mb-3 border-b border-border">
                                        {stack.group}
                                    </div>
                                    <ul className="space-y-2">
                                        {stack.items.map((item) => (
                                            <li key={item} className="text-[14px] text-text-secondary flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CASE STUDIES */}
                <section id="work" className="py-24 bg-white scroll-mt-24">
                    <div className="container-page">
                        <SectionHeader eyebrow="OUR WORK" title="Case Studies" align="center" />
                        <div className="grid md:grid-cols-3 gap-8">
                            {caseStudies.map((cs, idx) => (
                                <Reveal
                                    key={cs.project}
                                    delay={((idx % 3) + 1) as 1 | 2 | 3}
                                    className="flex flex-col bg-white border border-border rounded-[16px] overflow-hidden hover:border-black hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="aspect-[16/10] overflow-hidden border-b border-border">
                                        <img
                                            src={idx % 2 === 0 ? heroImg : missionImg}
                                            alt={cs.project}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{cs.client}</span>
                                    <h3 className="font-display text-[22px] font-bold text-black mt-2 mb-3">{cs.project}</h3>
                                    <p className="text-[14px] text-text-secondary leading-relaxed mb-5">{cs.desc}</p>
                                    <div className="bg-bg-cream border border-border rounded-[12px] p-4 mb-6">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent-hover block mb-1">Results</span>
                                        <p className="text-[13px] font-semibold text-black leading-snug">{cs.results}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {cs.tags.map((tag) => (
                                            <span key={tag} className="text-[12px] font-semibold bg-accent-light text-black px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ENGAGEMENT MODELS */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="WORKING TOGETHER" title="Engagement Models" align="center" />
                        <div className="grid md:grid-cols-3 gap-8">
                            {engagementModels.map((model, idx) => (
                                <Reveal
                                    key={model.title}
                                    delay={((idx % 3) + 1) as 1 | 2 | 3}
                                    className="bg-white border border-border rounded-[16px] p-8 hover:border-black transition-all duration-300"
                                >
                                    <div className="h-1.5 w-10 bg-accent rounded-full mb-5" />
                                    <h3 className="font-display text-[20px] font-bold text-black mb-3">{model.title}</h3>
                                    <p className="text-[14px] text-text-secondary leading-relaxed">{model.desc}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-bg-dark text-white py-24 relative overflow-hidden">
                    <OrganicShape variant={3} className="-top-32 -right-32 w-[500px] h-[500px] opacity-10" />
                    <div className="container-page relative z-10 text-center max-w-2xl mx-auto">
                        <Reveal>
                            <h2 className="font-display font-bold text-[36px] md:text-[44px] leading-tight text-white">
                                Have a Product Idea?
                            </h2>
                            <p className="mt-4 text-[16px] md:text-[18px] text-text-muted">
                                Let's talk about how we can build it together.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                    Start a Project <ArrowRight size={16} />
                                </Link>
                                <Link
                                    to="/services/consultancy"
                                    className="btn-pill bg-transparent border-2 border-white/30 text-white hover:border-accent hover:text-accent"
                                >
                                    Technology Consultancy
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
