import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/impact")({
    component: ImpactPage,
    head: () => ({
        meta: [
            { title: "Our Impact | Afroec Hub" },
            {
                name: "description",
                content:
                    "Afroec's documented progress: practical technology training with Arba Minch University and STEM Power, and a cohort of Afroec ambassadors.",
            },
        ],
    }),
});

function ImpactPage() {
    const metrics = [
        {
            value: "490+",
            label: "Students Trained",
            desc: "Students reached through practical technology training delivered with Arba Minch University and STEM Power.",
        },
        {
            value: "20",
            label: "Afroec Ambassadors",
            desc: "Selected ambassadors supporting technology awareness, community engagement, and youth participation.",
        },
    ];

    const journey = [
        {
            kicker: "Practical Technology Education",
            title: "Building Practical Skills",
            desc: "Afroec has worked with Arba Minch University and STEM Power to deliver introductory technology training to more than 90 boarding-school students, using computers arranged through the university.",
        },
        {
            kicker: "Afroec Ambassador Program",
            title: "Growing a Technology Community",
            desc: "Afroec's ambassador initiative brings together 20 selected participants to support technology awareness, share opportunities, and connect more young people with the technology ecosystem.",
        },
        {
            kicker: "Building Afroec",
            title: "From Ideas to Practical Solutions",
            desc: "Afroec is developing its technology services, exploring emerging technologies, and building community initiatives designed to expand access to practical technology skills.",
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
                            <span className="eyebrow">OUR PROGRESS</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Our Impact
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Practical technology training, a growing community of ambassadors, and the work of building Afroec.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="BY THE NUMBERS"
                            title="Progress we can account for"
                            subtitle="These figures reflect documented training and the current ambassador cohort."
                            align="center"
                        />

                        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {metrics.map((m, idx) => (
                                <Reveal
                                    key={m.label}
                                    delay={(idx + 1) as 1 | 2}
                                    className="bg-white border border-border rounded-[16px] p-8 md:p-10 shadow-xs hover:border-black transition-colors duration-300"
                                >
                                    <div className="font-display text-[44px] md:text-[52px] font-bold text-black leading-none">{m.value}</div>
                                    <div className="mt-4 h-[3px] w-8 bg-accent rounded-full" />
                                    <h3 className="font-display text-[18px] font-bold text-black mt-4 mb-2">{m.label}</h3>
                                    <p className="text-[14px] text-text-secondary leading-relaxed">{m.desc}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="AFROEC IN ACTION"
                            title="Our Journey"
                            subtitle="Practical training, community involvement, and the technology Afroec is building."
                            align="center"
                        />

                        <div className="grid lg:grid-cols-3 gap-8">
                            {journey.map((item, idx) => (
                                <Reveal
                                    key={item.title}
                                    delay={((idx % 3) + 1) as 1 | 2 | 3}
                                    className="bg-white border border-border rounded-[20px] p-8 md:p-10 hover:border-black transition-colors duration-300 flex flex-col h-full"
                                >
                                    <span className="h-1.5 w-10 rounded-full bg-accent" />
                                    <p className="mt-6 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                                        {item.kicker}
                                    </p>
                                    <h3 className="mt-2 font-display text-[22px] font-bold text-black leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 text-[15px] leading-relaxed text-text-secondary flex-1">
                                        {item.desc}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
