import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { Users, Lightbulb, HeartHandshake, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/initiatives/")({
    component: InitiativesOverviewPage,
    head: () => ({
        meta: [
            { title: "Our Initiatives | Afroec Hub" },
            {
                name: "description",
                content:
                    "Three interconnected pillars: Founding Ambassadors, Product Hub, and Community Programs across Ethiopia.",
            },
        ],
    }),
});

function InitiativesOverviewPage() {
    const initiatives = [
        {
            icon: Users,
            tag: "Leadership",
            title: "Founding Ambassadors",
            desc: "Recruit and equip campus leaders who launch Tech Clubs, host workshops, and grow the next generation of builders across high schools and universities.",
            preview: "Outreach, club building, mentorship, and a national founding cohort.",
            stats: [
                { value: "Campus", label: "Reach" },
                { value: "4–6 hrs", label: "Weekly" },
                { value: "Founding", label: "Cohort" },
            ],
            link: "/initiatives/founding-ambassadors" as const,
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
            link: "/initiatives/product-hub" as const,
            color: "bg-orange-100",
        },
        {
            icon: HeartHandshake,
            tag: "Impact",
            title: "Community Programs",
            desc: "SheSec Ethiopia, Afroec Tech Clubs, and the Founding Ambassador journey—pathways that open tech opportunity community-wide.",
            preview: "Women in cybersecurity, Learn · Build · Lead clubs, and student leadership.",
            stats: [
                { value: "3", label: "Programs" },
                { value: "Nationwide", label: "Reach" },
                { value: "100% Free", label: "Access" },
            ],
            link: "/programs" as const,
            color: "bg-blue-50",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                <section className="py-20 bg-white">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">PILLARS OF IMPACT</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Our Initiatives
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Three interconnected pillars driving leadership, innovation, and community impact across
                                Ethiopia.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page space-y-12">
                        {initiatives.map((init, idx) => {
                            const Icon = init.icon;
                            return (
                                <Reveal key={init.title} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                                    <div className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-xs grid lg:grid-cols-[1fr_260px] gap-8 items-center hover:border-black transition-colors duration-300">
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`h-12 w-12 rounded-full ${init.color} flex items-center justify-center`}>
                                                    <Icon size={22} className="text-black" />
                                                </div>
                                                <span className="text-[12px] font-bold uppercase tracking-wider bg-bg-cream px-3 py-1 rounded-full border border-border">
                                                    {init.tag}
                                                </span>
                                            </div>
                                            <h2 className="font-display text-[26px] md:text-[32px] font-bold text-black mb-3">
                                                {init.title}
                                            </h2>
                                            <p className="text-[16px] text-text-secondary leading-relaxed mb-4 max-w-3xl">
                                                {init.desc}
                                            </p>
                                            <p className="text-[14px] text-text-muted font-medium mb-8 italic">
                                                {init.preview}
                                            </p>

                                            <div className="flex flex-wrap gap-8 border-t border-border pt-6">
                                                {init.stats.map((stat) => (
                                                    <div key={stat.label}>
                                                        <div className="font-display text-[20px] font-bold text-black">
                                                            {stat.value}
                                                        </div>
                                                        <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1 font-semibold">
                                                            {stat.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:border-l lg:border-border lg:pl-8 flex flex-col justify-center h-full">
                                            <Link
                                                to={init.link}
                                                className="btn-pill bg-black text-white hover:bg-neutral-800 text-center w-full shadow-sm font-semibold"
                                            >
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
