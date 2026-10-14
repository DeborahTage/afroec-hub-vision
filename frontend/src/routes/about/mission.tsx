import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { BookOpen, Zap, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about/mission")({
    component: MissionPage,
    head: () => ({
        meta: [
            { title: "Our Mission | Afroec Hub" },
            {
                name: "description",
                content: "To democratize technology education and create pathways to prosperity for every Ethiopian.",
            },
        ],
    }),
});

function MissionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO SECTION */}
                <section className="py-20 bg-white">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">OUR MISSION</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Democratizing Tech Education
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                To democratize technology education and create pathways to prosperity for every Ethiopian, regardless of background, gender, or geography.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* MISSION STATEMENT (Quote block) */}
                <section className="py-20 bg-bg-cream border-y border-border/40">
                    <div className="container-page max-w-3xl text-center">
                        <Reveal>
                            <span className="text-accent text-7xl font-display leading-[0] select-none block mb-4">“</span>
                            <blockquote className="font-display text-[22px] md:text-[26px] font-medium leading-relaxed text-black italic">
                                We exist to bridge the gap between potential and opportunity. Every young Ethiopian deserves access to world-class technology education, meaningful employment, and the chance to build the future.
                            </blockquote>
                            <div className="mt-6 h-[3px] w-12 bg-accent mx-auto rounded-full" />
                            <cite className="font-display text-[15px] font-bold text-black uppercase tracking-wider block mt-4 not-italic">
                                Afroec Hub Leadership
                            </cite>
                        </Reveal>
                    </div>
                </section>

                {/* THREE PILLARS */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="THREE PILLARS"
                            title="How We Execute Our Vision"
                            align="center"
                        />

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Educate */}
                            <Reveal delay={1} className="bg-white border border-border p-8 md:p-10 rounded-[16px] flex flex-col">
                                <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mb-6 shrink-0">
                                    <BookOpen size={22} className="text-black" />
                                </div>
                                <h3 className="font-display text-[22px] font-bold text-black mb-3">Educate</h3>
                                <p className="text-[15px] leading-relaxed text-text-secondary flex-1">
                                    Provide free and affordable technology education in digital literacy, programming, cybersecurity, and hardware engineering. Meet learners where they are — from absolute beginners to advanced practitioners.
                                </p>
                            </Reveal>

                            {/* Empower */}
                            <Reveal delay={2} className="bg-white border border-border p-8 md:p-10 rounded-[16px] flex flex-col">
                                <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mb-6 shrink-0">
                                    <Zap size={22} className="text-black" />
                                </div>
                                <h3 className="font-display text-[22px] font-bold text-black mb-3">Empower</h3>
                                <p className="text-[15px] leading-relaxed text-text-secondary flex-1">
                                    Equip graduates with job-ready skills, professional networks, and the confidence to compete in local and global tech markets. Through apprenticeships and mentorship, we turn knowledge into careers.
                                </p>
                            </Reveal>

                            {/* Elevate */}
                            <Reveal delay={3} className="bg-white border border-border p-8 md:p-10 rounded-[16px] flex flex-col">
                                <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mb-6 shrink-0">
                                    <TrendingUp size={22} className="text-black" />
                                </div>
                                <h3 className="font-display text-[22px] font-bold text-black mb-3">Elevate</h3>
                                <p className="text-[15px] leading-relaxed text-text-secondary flex-1">
                                    Lift entire communities by creating a self-sustaining ecosystem of tech talent. Our graduates become teachers, founders, and leaders who pay it forward.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* HOW WE MEASURE SUCCESS */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="METRICS"
                            title="How We Measure Success"
                            align="center"
                        />

                        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-center">
                            {[
                                {
                                    value: "490+",
                                    label: "Students Trained",
                                    desc: "Reached through practical technology training delivered with Arba Minch University and STEM Power.",
                                },
                                {
                                    value: "20",
                                    label: "Afroec Ambassadors",
                                    desc: "Selected ambassadors supporting technology awareness, community engagement, and youth participation.",
                                },
                            ].map((value, idx) => (
                                <Reveal key={value.label} delay={(idx + 1) as 1 | 2} className="bg-white border border-border/60 p-8 rounded-[16px]">
                                    <div className="font-display text-[40px] font-bold text-black leading-none">{value.value}</div>
                                    <div className="font-display text-[15px] font-bold text-black mt-4 mb-2">{value.label}</div>
                                    <p className="text-[13px] text-text-secondary leading-relaxed">{value.desc}</p>
                                </Reveal>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link to="/impact" className="btn-pill bg-black text-white hover:bg-neutral-800">
                                See Our Impact <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
