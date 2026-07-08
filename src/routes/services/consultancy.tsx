import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import missionImg from "@/assets/mission.jpg";
import {
    Compass,
    Layers,
    Workflow,
    Shield,
    Landmark,
    Banknote,
    HeartPulse,
    Sprout,
    School,
    Ear,
    ClipboardCheck,
    Lightbulb,
    Handshake,
    ArrowRight,
    Quote,
} from "lucide-react";

export const Route = createFileRoute("/services/consultancy")({
    component: ConsultancyPage,
    head: () => ({
        meta: [
            { title: "Technology Consultancy | Afroec" },
            {
                name: "description",
                content:
                    "We help organizations apply technology to solve meaningful problems. Strategy, implementation, and transformation — guided by deep technical expertise.",
            },
        ],
    }),
});

const whatWeDo = [
    {
        icon: Compass,
        title: "Digital Transformation Strategy",
        desc: "Assess your current state, define your digital vision, and build a roadmap that delivers measurable outcomes. We don't do buzzwords — we do plans that work.",
    },
    {
        icon: Layers,
        title: "Technology Architecture",
        desc: "Design robust, scalable, and secure systems. From cloud migration to microservices, we architect technology that grows with you.",
    },
    {
        icon: Workflow,
        title: "Process Automation",
        desc: "Identify repetitive tasks, design automated workflows, and free your people to focus on what matters. Efficiency without losing the human touch.",
    },
    {
        icon: Shield,
        title: "Cybersecurity Advisory",
        desc: "Assess risks, design defenses, and build security into your operations. Protect your data, your customers, and your reputation.",
    },
];

const clients = [
    { icon: Landmark, title: "Government Institutions", desc: "Digital transformation for public services. Secure, accessible, citizen-centered." },
    { icon: Banknote, title: "Financial Services", desc: "Fintech solutions, compliance, and digital banking transformation." },
    { icon: HeartPulse, title: "Healthcare Organizations", desc: "Patient systems, telemedicine, health data management." },
    { icon: Sprout, title: "Agricultural Enterprises", desc: "Supply chain digitization, farmer platforms, market access." },
    { icon: School, title: "Educational Institutions", desc: "Learning management, digital infrastructure, EdTech strategy." },
];

const approach = [
    { icon: Ear, title: "Listen & Understand", desc: "We start with your problem, not our solution. Deep interviews, process observation, and stakeholder mapping." },
    { icon: ClipboardCheck, title: "Assess & Analyze", desc: "Current state audit, gap analysis, and opportunity identification. Data-driven, honest, actionable." },
    { icon: Lightbulb, title: "Design & Recommend", desc: "Tailored solutions, not off-the-shelf packages. Technology recommendations, implementation roadmap, and risk assessment." },
    { icon: Handshake, title: "Implement & Transfer", desc: "We don't just advise — we implement. And we train your team to own the solution." },
];

const areas = [
    { title: "IT Strategy & Governance", desc: "Align technology investments with business goals. Build IT governance frameworks that enable innovation while managing risk." },
    { title: "Cloud Migration", desc: "Move from on-premise to cloud with minimal disruption. Cost optimization, security, and performance." },
    { title: "Data Strategy", desc: "Turn data into an asset. Data governance, analytics strategy, and AI readiness assessment." },
    { title: "Cybersecurity Assessment", desc: "Comprehensive security audits, vulnerability assessments, and remediation roadmaps. NIST and ISO 27001 aligned." },
    { title: "Agile Transformation", desc: "Help teams adopt agile ways of working. Not just ceremonies — real cultural change." },
    { title: "Vendor Selection", desc: "Independent evaluation of technology vendors. Requirements definition, RFP management, and contract negotiation support." },
];

const expertise = [
    "Software Architects",
    "Cloud Engineers",
    "Data Scientists",
    "Cybersecurity Specialists",
    "Agile Coaches",
    "Business Analysts",
];

const engagementModels = [
    { title: "Advisory Retainer", desc: "Ongoing strategic advice, monthly reviews, and on-call support. Best for organizations building internal capability." },
    { title: "Project-Based Consulting", desc: "Defined scope, clear deliverables, fixed timeline. Best for specific transformation initiatives." },
    { title: "Fractional CTO", desc: "Part-time technology leadership for organizations not ready for a full-time CTO. Strategy, team building, and vendor management." },
];

const testimonials = [
    { quote: "Afroec helped us see technology as an enabler, not a cost center. Our digital transformation is now ahead of schedule and under budget.", author: "Government Client" },
    { quote: "Their cybersecurity assessment revealed risks we didn't know we had. The remediation plan was practical and prioritized.", author: "Bank Client" },
];

function ConsultancyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO */}
                <section className="py-20 md:py-24 bg-bg-cream relative overflow-hidden">
                    <div className="container-page grid lg:grid-cols-[55fr_45fr] gap-12 items-center">
                        <Reveal>
                            <span className="eyebrow">OUR SERVICES</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-black">
                                Technology Consultancy
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-[600px]">
                                We help organizations apply technology to solve meaningful problems. Strategy, implementation, and transformation — guided by deep technical expertise.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold shadow-sm">
                                    Book a Consultation
                                </Link>
                                <a href="#approach" className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white">
                                    Our Approach
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="relative hidden lg:block">
                            <OrganicShape variant={2} className="-inset-6 opacity-50" />
                            <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-md">
                                <img src={missionImg} alt="Afroec consultants advising a client team" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* WHAT WE DO */}
                <section className="py-24 bg-white border-y border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="WHAT WE DO" title="Expertise That Delivers" align="center" />
                        <div className="grid md:grid-cols-2 gap-8">
                            {whatWeDo.map((card, idx) => {
                                const Icon = card.icon;
                                return (
                                    <Reveal
                                        key={card.title}
                                        delay={((idx % 2) + 1) as 1 | 2}
                                        className="group flex gap-5 bg-white border border-border rounded-[16px] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg"
                                    >
                                        <div className="h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                            <Icon size={24} className="text-black" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[20px] font-bold text-black mb-2">{card.title}</h3>
                                            <p className="text-[15px] leading-relaxed text-text-secondary">{card.desc}</p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* WHO WE SERVE */}
                <section className="py-24 bg-bg-cream border-b border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="WHO WE SERVE" title="Industries We Know" align="center" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {clients.map((client, idx) => {
                                const Icon = client.icon;
                                return (
                                    <Reveal
                                        key={client.title}
                                        delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                                        className="bg-white border border-border rounded-[16px] p-6 hover:border-black transition-all duration-300 flex flex-col"
                                    >
                                        <div className="h-11 w-11 rounded-full bg-accent-light flex items-center justify-center text-black mb-4">
                                            <Icon size={18} />
                                        </div>
                                        <h3 className="font-display text-[16px] font-bold text-black mb-2 leading-snug">{client.title}</h3>
                                        <p className="text-[13px] text-text-secondary leading-relaxed">{client.desc}</p>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* OUR APPROACH */}
                <section id="approach" className="py-24 bg-white scroll-mt-24">
                    <div className="container-page">
                        <SectionHeader eyebrow="HOW WE ENGAGE" title="Our Approach" align="center" />
                        <div className="max-w-3xl mx-auto space-y-5">
                            {approach.map((step, idx) => {
                                const Icon = step.icon;
                                return (
                                    <Reveal
                                        key={step.title}
                                        delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}
                                        className="flex gap-5 bg-white border border-border rounded-[16px] p-6 hover:border-black transition-all duration-300"
                                    >
                                        <div className="flex flex-col items-center shrink-0">
                                            <div className="h-11 w-11 rounded-full bg-accent flex items-center justify-center text-black">
                                                <Icon size={18} />
                                            </div>
                                            <span className="mt-2 font-display text-[13px] font-bold text-text-muted">0{idx + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[19px] font-bold text-black mb-1.5">{step.title}</h3>
                                            <p className="text-[15px] text-text-secondary leading-relaxed">{step.desc}</p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CONSULTANCY AREAS (Accordion) */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page max-w-3xl">
                        <SectionHeader eyebrow="AREAS OF FOCUS" title="Consultancy Areas" align="center" />
                        <Reveal className="bg-white border border-border rounded-[16px] px-6 md:px-8">
                            <Accordion type="single" collapsible className="w-full">
                                {areas.map((area) => (
                                    <AccordionItem key={area.title} value={area.title} className="border-border">
                                        <AccordionTrigger className="text-[16px] font-display font-bold text-black hover:no-underline py-5">
                                            {area.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[15px] text-text-secondary leading-relaxed">
                                            {area.desc}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Reveal>
                    </div>
                </section>

                {/* TEAM EXPERTISE */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader eyebrow="OUR TEAM" title="Team Expertise" align="center" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {expertise.map((role, idx) => (
                                <Reveal
                                    key={role}
                                    delay={((idx % 3) + 1) as 1 | 2 | 3}
                                    className="bg-white border border-border rounded-[16px] p-6 text-center hover:border-black hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className="font-display text-[16px] md:text-[18px] font-bold text-black">{role}</span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ENGAGEMENT MODELS */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
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

                {/* TESTIMONIALS */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader eyebrow="CLIENT VOICES" title="What Our Clients Say" align="center" />
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {testimonials.map((t, idx) => (
                                <Reveal
                                    key={t.author}
                                    delay={((idx % 2) + 1) as 1 | 2}
                                    className="bg-bg-cream border border-border rounded-[24px] p-8 md:p-10 flex flex-col"
                                >
                                    <Quote size={32} className="text-accent mb-4" />
                                    <p className="text-[17px] md:text-[18px] text-black leading-relaxed font-medium flex-1">
                                        "{t.quote}"
                                    </p>
                                    <span className="mt-6 text-[13px] font-bold uppercase tracking-wider text-text-muted">
                                        — {t.author}
                                    </span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-bg-dark text-white py-24 relative overflow-hidden">
                    <OrganicShape variant={1} className="-top-32 -left-32 w-[500px] h-[500px] opacity-10" />
                    <div className="container-page relative z-10 text-center max-w-2xl mx-auto">
                        <Reveal>
                            <h2 className="font-display font-bold text-[36px] md:text-[44px] leading-tight text-white">
                                Ready to Solve Problems with Technology?
                            </h2>
                            <p className="mt-4 text-[16px] md:text-[18px] text-text-muted">
                                Book a free 30-minute consultation to discuss your challenges.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                    Book a Consultation <ArrowRight size={16} />
                                </Link>
                                <Link
                                    to="/services/product-development"
                                    className="btn-pill bg-transparent border-2 border-white/30 text-white hover:border-accent hover:text-accent"
                                >
                                    Product Development
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
