import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { GraduationCap, Lightbulb, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/initiatives/")({
    component: InitiativesOverviewPage,
    head: () => ({
        meta: [
            { title: "Our Initiatives | Afroec Hub" },
            {
                name: "description",
                content: "Three interconnected pillars driving technology education, innovation, and community impact across Ethiopia.",
            },
        ],
    }),
});

function InitiativesOverviewPage() {
    const initiatives = [
        {
            icon: GraduationCap,
            tag: "Education",
            title: "Afroec Academy",
            desc: "Intensive, hands-on training programs designed to take learners from fundamentals to job-ready professionals in 2-4 months.",
            preview: "Tracks in Software Engineering, Cybersecurity, and Hardware Engineering.",
            stats: [
                { value: "3", label: "Tracks" },
                { value: "2-4 Months", label: "Each" },
                { value: "Syllabus", label: "Included" },
            ],
            link: "/initiatives/academy",
            color: "bg-accent-light",
        },
        {
            icon: Lightbulb,
            tag: "Innovation",
            title: "Product Hub",
            desc: "A 2-month intensive mentorship program that guides aspiring founders and builders from raw idea to launched product.",
            preview: "Phases cover validation, UX layouts, MVP development, and demo pitch decks.",
            stats: [
                { value: "2 Months", label: "Duration" },
                { value: "Idea to Launch", label: "Method" },
                { value: "1:1", label: "Mentorship" },
            ],
            link: "/initiatives/product-hub",
            color: "bg-orange-100",
        },
        {
            icon: Users,
            tag: "Impact",
            title: "Community Programs",
            desc: "Reaching underserved communities through targeted programs for youth, women, public school students, and rural populations.",
            preview: "Includes CyberGuard Youth, SheSec Ethiopia, SchoolNet Tech, and DigiSec  labs.",
            stats: [
                { value: "4", label: "Programs" },
                { value: "Nationwide", label: "Reach" },
                { value: "100% Free", label: "Tuition" },
            ],
            link: "/programs",
            color: "bg-blue-50",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO */}
                <section className="py-20 bg-white">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">PILARS OF IMPACT</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Our Initiatives
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Three interconnected pillars driving technology education, innovation, and community impact across Ethiopia.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* INITIATIVES LIST */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page space-y-12">
                        {initiatives.map((init, idx) => {
                            const Icon = init.icon;
                            return (
                                <Reveal key={init.title} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                                    <div className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-xs grid lg:grid-cols-[1fr_260px] gap-8 items-center hover:border-black transition-colors duration-300">
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="h-12 w-12 rounded-full bg-accent/15 flex items-center justify-center">
                                                    <Icon size={22} className="text-black" />
                                                </div>
                                                <span className="text-[12px] font-bold uppercase tracking-wider bg-bg-cream px-3 py-1 rounded-full border border-border">
                                                    {init.tag}
                                                </span>
                                            </div>
                                            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-black mb-3">{init.title}</h2>
                                            <p className="text-[16px] text-text-secondary leading-relaxed mb-4 max-w-3xl">{init.desc}</p>
                                            <p className="text-[14px] text-text-muted font-medium mb-8 italic">{init.preview}</p>

                                            <div className="flex flex-wrap gap-8 border-t border-border pt-6">
                                                {init.stats.map((stat) => (
                                                    <div key={stat.label}>
                                                        <div className="font-display text-[20px] font-bold text-black">{stat.value}</div>
                                                        <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1 font-semibold">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:border-l lg:border-border lg:pl-8 flex flex-col justify-center h-full">
                                            <Link to={init.link} className="btn-pill bg-black text-white hover:bg-neutral-800 text-center w-full shadow-sm font-semibold">
                                                Explore Pillar <ArrowRight size={16} className="inline ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
