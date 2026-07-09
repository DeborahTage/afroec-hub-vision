import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { OrganicShape } from "@/components/OrganicShape";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, BookOpen, Layers, Award, Shield } from "lucide-react";

export const Route = createFileRoute("/about/")({
    component: AboutPage,
    head: () => ({
        meta: [
            { title: "About Us | Afroec Hub" },
            {
                name: "description",
                content: "Learn about Afroec Hub's mission to democratize technology education in Ethiopia and across Africa.",
            },
        ],
    }),
});

function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO SECTION */}
                <section className="py-20 bg-white relative overflow-hidden">
                    <div className="container-page">
                        <Reveal className="max-w-3xl">
                            <span className="eyebrow">ABOUT US</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Building Africa's Digital Future, One Student at a Time
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed">
                                Afroec Hub is the social impact sector of Afroec, focusing on expanding free technology opportunities, literacy, and talent incubation across Ethiopia.
                            </p>
                        </Reveal>

                        {/* Hero Image Group */}
                        <Reveal delay={2} className="mt-12 relative">
                            <OrganicShape variant={1} className="-inset-4 opacity-50" />
                            <div className="aspect-[21/9] w-full overflow-hidden rounded-[24px] border border-border shadow-lg">
                                <img
                                    src={heroImg}
                                    alt="Students coding together in classrooms"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                                />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* OUR STORY */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <span className="eyebrow">OUR STORY</span>
                            <h2 className="mt-4 font-display font-bold text-[32px] md:text-[40px] text-black">
                                Democratizing Tech Opportunities
                            </h2>
                            <div className="mt-6 space-y-4 text-[16px] text-text-secondary leading-relaxed">
                                <p>
                                    Afroec Hub was founded as the philanthropic arm of Afroec Tech. While building enterprise applications and security software, our founders observed a critical paradox: a massive pool of ambitious, young Ethiopian talent, yet a severe scarcity of affordable, job-ready technology education.
                                </p>
                                <p>
                                    We established the Hub to close this gap. Starting with a single computer lab in Addis Ababa, we created free training programs centered around three values: high rigor, complete accessibility, and real industry alignment.
                                </p>
                                <p>
                                    Today, we support thousands of trainees annualy, expanding from basic digital literacy to advanced offensive cybersecurity, web development, and IoT hardware engineering.
                                </p>
                            </div>
                        </Reveal>

                        {/* Timeline */}
                        <Reveal delay={2} className="bg-white border border-border p-8 md:p-10 rounded-[16px] shadow-sm">
                            <h3 className="font-display text-[22px] font-bold text-black mb-8 border-b border-border pb-4">Key Milestones</h3>
                            <div className="relative border-l-2 border-accent pl-6 space-y-8">
                                {[
                                    { year: "2023", title: "Founded", desc: "Afroec Hub established with first physical digital center in Addis Ababa." },
                                    { year: "2024", title: "First Cohort", desc: "Graduated first 200 software developers with 80%+ job placements." },
                                    { year: "2025", title: "Regional Expansion", desc: "Launched Digital litracy programs  to reach schools in remote areas." },
                                    { year: "2026", title: "National Scale", desc: "Aimed to reach 1,000+ students annually and coordinate with national universities." },
                                ].map((item) => (
                                    <div key={item.year} className="relative">
                                        <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-accent border-2 border-white ring-2 ring-accent/30" />
                                        <div className="font-display text-[15px] font-bold text-black">{item.year} — {item.title}</div>
                                        <p className="mt-1 text-[13px] text-text-secondary">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* WHAT WE DO */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="WHAT WE DO"
                            title="Four Columns of Inclusivity"
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: BookOpen, title: "Education", desc: "From foundational digital literacy to high-end software engineering bootcamps." },
                                { icon: Layers, title: "Mentorship", desc: "1-on-1 industry mentorship to guide students from learners to tech professionals." },
                                { icon: Award, title: "Product Dev", desc: "Nurturing ideas in the Product Hub into launched apps and active startups." },
                                { icon: Shield, title: "Community", desc: "Targeted programs for girls, rural schools, and unemployed youth." },
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Reveal key={item.title} delay={((idx % 4) + 1) as 1 | 2 | 3 | 4} className="bg-white border border-border p-8 rounded-[16px] hover:border-black transition-colors duration-300">
                                        <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center mb-6">
                                            <Icon size={22} className="text-black" />
                                        </div>
                                        <h3 className="font-display text-[19px] font-bold text-black mb-3">{item.title}</h3>
                                        <p className="text-[14px] leading-relaxed text-text-secondary">{item.desc}</p>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* OUR VALUES */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="OUR VALUES"
                            title="Principles We Stand By"
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Accessibility", desc: "World-class digital instruction shouldn't depend on wealth, background, or location." },
                                { title: "Excellence", desc: "We deliver industry-aligned curricula modeled after top global standards." },
                                { title: "Inclusion", desc: "We enforce 50% gender representation across all cohorts, supporting rural schools." },
                                { title: "Innovation", desc: "Equipping youth with next-gen concepts: IoT, offensive security, and full-stack APIs." },
                                { title: "Community", desc: "Local roots, global success. Our students are prepared to raise up their neighbors." },
                                { title: "Integrity", desc: "Committed to transparent funding, student advocacy, and ethical tech principles." },
                            ].map((value, idx) => (
                                <Reveal key={value.title} delay={((idx % 3) + 1) as 1 | 2 | 3} className="bg-white border border-border p-8 rounded-[16px] shadow-xs">
                                    <h3 className="font-display text-[20px] font-bold text-black mb-3">{value.title}</h3>
                                    <p className="text-[14px] leading-relaxed text-text-secondary">{value.desc}</p>
                                </Reveal>
                            ))}
                        </div>

                        <div className="mt-16 flex flex-wrap justify-center gap-4">
                            <Link to="/about/team" className="btn-pill bg-black text-white hover:bg-neutral-800">
                                Meet Our Team
                            </Link>
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
