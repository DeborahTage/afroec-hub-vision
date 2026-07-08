import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import { Code2, Compass, GraduationCap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
    component: ServicesPage,
    head: () => ({
        meta: [
            { title: "Our Services | Afroec" },
            {
                name: "description",
                content:
                    "Afroec builds digital products and provides technology consultancy for organizations building the future — and funds the Afroec Hub social impact initiative.",
            },
        ],
    }),
});

const services = [
    {
        icon: Code2,
        tag: "Build",
        title: "Product Development",
        desc: "We build digital products that solve real problems — web and mobile apps, enterprise software, and AI solutions. From concept to launch.",
        to: "/services/product-development" as const,
        cta: "Explore Product Development",
    },
    {
        icon: Compass,
        tag: "Advise",
        title: "Technology Consultancy",
        desc: "We help organizations apply technology strategically — digital transformation, architecture, automation, and cybersecurity advisory.",
        to: "/services/consultancy" as const,
        cta: "Explore Consultancy",
    },
    {
        icon: GraduationCap,
        tag: "Impact",
        title: "Afroec Hub",
        desc: "Our social impact initiative building Africa's tech talent through free education, mentorship, and community programs.",
        to: "/initiatives" as const,
        cta: "Explore Afroec Hub",
    },
];

function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO */}
                <section className="py-20 md:py-24 bg-white relative overflow-hidden">
                    <OrganicShape variant={2} className="-top-24 -right-24 w-[420px] h-[420px] opacity-30" />
                    <div className="container-page relative z-10 max-w-3xl">
                        <Reveal>
                            <span className="eyebrow">OUR SERVICES</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-black">
                                Technology, Built Right
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed">
                                Afroec builds digital products and advises organizations on technology strategy. Our commercial work funds Afroec Hub — our social impact initiative training Africa's next generation of tech talent.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* SERVICES GRID */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page">
                        <SectionHeader eyebrow="WHAT WE DO" title="Three Ways We Create Value" align="center" />
                        <div className="grid md:grid-cols-3 gap-8">
                            {services.map((svc, idx) => {
                                const Icon = svc.icon;
                                return (
                                    <Reveal
                                        key={svc.title}
                                        delay={((idx % 3) + 1) as 1 | 2 | 3}
                                        className="group flex flex-col bg-white border border-border rounded-[16px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-lg"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                                <Icon size={30} className="text-black" />
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider bg-accent-light text-black px-3 py-1 rounded-full">
                                                {svc.tag}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-[24px] font-bold text-black mb-4">{svc.title}</h3>
                                        <p className="text-[15px] leading-relaxed text-text-secondary mb-8 flex-1">{svc.desc}</p>
                                        <Link to={svc.to} className="link-arrow text-[15px] font-bold mt-auto self-start">
                                            {svc.cta} <ArrowRight size={16} />
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-bg-dark text-white py-24 relative overflow-hidden">
                    <OrganicShape variant={3} className="-bottom-32 -right-32 w-[500px] h-[500px] opacity-10" />
                    <div className="container-page relative z-10 text-center max-w-2xl mx-auto">
                        <Reveal>
                            <h2 className="font-display font-bold text-[36px] md:text-[44px] leading-tight text-white">
                                Let's Build Something That Matters
                            </h2>
                            <p className="mt-4 text-[16px] md:text-[18px] text-text-muted">
                                Whether you need a product built or a strategy defined, we're ready to help.
                            </p>
                            <div className="mt-8">
                                <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                    Get in Touch <ArrowRight size={16} />
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
