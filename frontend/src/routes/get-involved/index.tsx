import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { User, Building2, Heart, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/get-involved/")({
    component: GetInvolvedPage,
    head: () => ({
        meta: [
            { title: "Get Involved | Afroec Hub" },
            {
                name: "description",
                content:
                    "Choose your path: partner with us, become an ambassador, volunteer, or apply for an internship.",
            },
        ],
    }),
});

type ApplyLinkType = "partner" | "ambassador" | "volunteer" | "internship";

function GetInvolvedPage() {
    const options: {
        icon: typeof Building2;
        title: string;
        tag: string;
        desc: string;
        details: string[];
        btnLabel: string;
        type: ApplyLinkType;
    }[] = [
        {
            icon: Building2,
            title: "Partner",
            tag: "COLLABORATE",
            desc: "Organizations and institutions — sponsor cohorts, donate equipment, or hire verified graduates.",
            details: [
                "Sponsor student labs and training cohorts.",
                "Access a verified talent pipeline for hiring.",
                "Co-design curriculum and masterclasses.",
            ],
            btnLabel: "Partner With Us",
            type: "partner",
        },
        {
            icon: User,
            title: "Ambassador",
            tag: "LEAD ON CAMPUS",
            desc: "Build an Afroec Tech Club at your school or university and grow the next generation of builders.",
            details: [
                "Launch or strengthen a campus tech club.",
                "Host outreach sessions and peer mentorship.",
                "Get priority access to bootcamps and mentorship.",
            ],
            btnLabel: "Become an Ambassador",
            type: "ambassador",
        },
        {
            icon: Heart,
            title: "Volunteer",
            tag: "CONTRIBUTE",
            desc: "Share your technology skills as a trainer, mentor, designer, or program advocate.",
            details: [
                "Mentor students on projects and career paths.",
                "Deliver guest sessions and training modules.",
                "Support content, ops, and community programs.",
            ],
            btnLabel: "Volunteer With Us",
            type: "volunteer",
        },
        {
            icon: Briefcase,
            title: "Internship",
            tag: "GROW WITH US",
            desc: "Join a structured internship across software, cybersecurity, product, education, or operations.",
            details: [
                "Work on real Afroec programs and products.",
                "Flexible 3-, 6-, or 12-month durations.",
                "Build a portfolio with mentorship and feedback.",
            ],
            btnLabel: "Apply for Internship",
            type: "internship",
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
                            <span className="eyebrow">JOIN THE ECOSYSTEM</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Be Part of the Transformation
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Whether you&apos;re a partner, ambassador, volunteer, or intern — there&apos;s a place
                                for you in the ecosystem.
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <div className="grid md:grid-cols-2 gap-8">
                            {options.map((opt, idx) => {
                                const Icon = opt.icon;
                                return (
                                    <Reveal
                                        key={opt.title}
                                        delay={((idx % 3) + 1) as 1 | 2 | 3}
                                        className="bg-white border border-border rounded-[24px] p-8 md:p-12 hover:border-black transition-colors duration-300 flex flex-col justify-start h-full shadow-xs"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black shrink-0">
                                                <Icon size={22} />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-widest bg-bg-cream border border-border text-text-secondary px-3 py-1 rounded-full">
                                                {opt.tag}
                                            </span>
                                        </div>

                                        <h2 className="font-display text-[24px] font-bold text-black mb-4">
                                            {opt.title}
                                        </h2>
                                        <p className="text-[14px] leading-relaxed text-text-secondary mb-6 flex-1">
                                            {opt.desc}
                                        </p>

                                        <ul className="space-y-3 mb-8">
                                            {opt.details.map((d) => (
                                                <li
                                                    key={d}
                                                    className="flex gap-2 items-start text-[13px] text-black font-semibold"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            to="/get-involved/apply"
                                            search={{ type: opt.type }}
                                            className="w-full btn-pill bg-black text-white hover:bg-neutral-850 text-center font-semibold"
                                        >
                                            {opt.btnLabel} <ArrowRight size={16} className="inline ml-1" />
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
