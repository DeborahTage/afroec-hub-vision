import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Laptop, Award, ShieldAlert, Globe, Activity } from "lucide-react";

export const Route = createFileRoute("/about/vision")({
    component: VisionPage,
    head: () => ({
        meta: [
            { title: "Our Vision | Afroec Hub" },
            {
                name: "description",
                content: "An Africa where every young person has the skills, opportunity, and support to thrive in the digital economy.",
            },
        ],
    }),
});

function VisionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO SECTION */}
                <section className="py-20 bg-white">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">OUR VISION</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Mapping Africa's Digital Future
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                An Africa where every young person has the skills, opportunity, and support to thrive in the digital economy.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* 2030 VISION STATEMENT */}
                <section className="py-20 bg-bg-cream border-y border-border/40">
                    <div className="container-page max-w-3xl text-center">
                        <Reveal>
                            <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.2em] block mb-3">
                                VISION 2030 TARGET
                            </span>
                            <blockquote className="font-display text-[22px] md:text-[26px] font-medium leading-relaxed text-black italic">
                                “By 2030, Afroec Hub will be the leading technology talent factory in Africa, having trained 100,000 Ethiopians, achieved gender parity in tech, and created a replicable model for the continent.”
                            </blockquote>
                            <div className="mt-6 h-[3px] w-12 bg-accent mx-auto rounded-full" />
                        </Reveal>
                    </div>
                </section>

                {/* STRATEGIC OBJECTIVES */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="STRATEGY"
                            title="Strategic Objectives"
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                                { icon: Laptop, title: "1. Scale", desc: "Train 100,000 students by 2030 across Ethiopia and expand to 5 African countries." },
                                { icon: ShieldAlert, title: "2. Gender Parity", desc: "Achieve 50% women representation across all programs and leadership positions." },
                                { icon: Award, title: "3. Employment", desc: "90% job placement rate within 6 months of graduation." },
                                { icon: Globe, title: "4. Innovation", desc: "Launch 100 tech startups founded by Afroec Hub graduates." },
                                { icon: Activity, title: "5. Sustainability", desc: "Become fully self-sustaining through corporate partnerships, product revenue, and graduate income-share agreements." },
                            ].map((value, idx) => {
                                const Icon = value.icon;
                                return (
                                    <Reveal key={value.title} delay={((idx % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="bg-white border border-border p-6 rounded-[16px] shadow-xs flex flex-col">
                                        <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center shrink-0 mb-4">
                                            <Icon size={18} className="text-black" />
                                        </div>
                                        <h3 className="font-display text-[16px] font-bold text-black mb-2">{value.title}</h3>
                                        <p className="text-[12px] leading-relaxed text-text-secondary flex-1">{value.desc}</p>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ACTIVE ECOSYSTEM DIAGRAM */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="THE ECOSYSTEM"
                            title="How the Hub Operates"
                            subtitle="Our model connects raw talent to full-scale employment through a collaborative pipeline."
                            align="center"
                        />

                        <div className="max-w-4xl mx-auto bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-sm">
                            <div className="grid md:grid-cols-5 gap-8 items-center relative">
                                {/* Steps */}
                                {[
                                    { title: "Academy", desc: "Produces skilled engineering candidates." },
                                    { title: "Product Hub", desc: "Transforms student ideas into real-world applications." },
                                    { title: "Community", desc: "Provides outreach for females & remote districts." },
                                    { title: "Partners", desc: "Organizations fund cohorts and hire graduates." },
                                    { title: "Alumni", desc: "Graduates return to tutor, build houses, and manage jobs." },
                                ].map((item, idx) => (
                                    <div key={item.title} className="text-center relative z-10 flex flex-col items-center">
                                        <div className="h-12 w-12 rounded-full bg-accent border-2 border-white text-black font-display font-bold flex items-center justify-center shadow-md mb-4 text-[15px]">
                                            {idx + 1}
                                        </div>
                                        <h4 className="font-display font-bold text-[16px] text-black mb-1">{item.title}</h4>
                                        <p className="text-[11px] leading-relaxed text-text-secondary">{item.desc}</p>
                                    </div>
                                ))}

                                {/* Connecting Line (Desktop) */}
                                <div aria-hidden className="hidden md:block absolute left-6 right-6 top-[22px] h-[3px] bg-border-dark/15 -z-0" />
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Link to="/get-involved" className="btn-pill bg-accent text-black hover:bg-accent-hover">
                                Join the Journey <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
