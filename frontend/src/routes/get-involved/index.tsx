import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { User, Building2, Heart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/get-involved/")({
    component: GetInvolvedPage,
    head: () => ({
        meta: [
            { title: "Get Involved | Afroec Hub" },
            {
                name: "description",
                content: "Choose your path to make a difference: Apply as a student, partner with us, or volunteer your skills.",
            },
        ],
    }),
});

function GetInvolvedPage() {
    const options = [
        {
            icon: User,
            title: "For Students",
            tag: "APPLY NOW",
            desc: "Enroll in our free software engineering, cybersecurity, or hardware training courses. Gain industry credentials and access job connections.",
            details: [
                "Fully sponsored tuition or income-share options.",
                "2-4 months of intensive daily modules.",
                "Requires logical reasoning & computer test.",
            ],
            btnLabel: "Apply as Student",
            link: "/get-involved/apply",
        },
        {
            icon: Building2,
            title: "For Partners",
            tag: "COLLABORATE",
            desc: "Organizations, technology companies, and government institutions — partner with us to sponsor specialized cohorts or recruit top graduates.",
            details: [
                "Sponsor student lab terminals and workstations.",
                "Access verified candidate registry for hiring.",
                "Co-design customized tech curriculum.",
            ],
            btnLabel: "Partner With Us",
            link: "/get-involved/partner",
        },
        {
            icon: Heart,
            title: "For Volunteers",
            tag: "CONTRIBUTE",
            desc: "Share your technology skills and operational experience. Join our community of instructors, mentors, and program advocates.",
            details: [
                "Mentor students 1-on-1 on code design.",
                "Deliver weekend guest masterclasses.",
                "Translate security materials into local languages.",
            ],
            btnLabel: "Volunteer With Us",
            link: "/get-involved/volunteer",
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
                            <span className="eyebrow">JOIN THE ECOSYSTEM</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Be Part of the Transformation
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Whether you're a student, partner, or volunteer — there's a place for you in the ecosystem.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* OPTIONS GRID */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {options.map((opt, idx) => {
                                const Icon = opt.icon;
                                return (
                                    <Reveal key={opt.title} delay={((idx % 3) + 1) as 1 | 2 | 3} className="bg-white border border-border rounded-[24px] p-8 md:p-12 hover:border-black transition-colors duration-300 flex flex-col justify-start h-full shadow-xs">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black shrink-0">
                                                <Icon size={22} />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-widest bg-bg-cream border border-border text-text-secondary px-3 py-1 rounded-full">{opt.tag}</span>
                                        </div>

                                        <h2 className="font-display text-[24px] font-bold text-black mb-4">{opt.title}</h2>
                                        <p className="text-[14px] leading-relaxed text-text-secondary mb-6 flex-1">{opt.desc}</p>

                                        <ul className="space-y-3 mb-8">
                                            {opt.details.map((d) => (
                                                <li key={d} className="flex gap-2 items-start text-[13px] text-black font-semibold">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link to={opt.link} className="w-full btn-pill bg-black text-white hover:bg-neutral-850 text-center font-semibold">
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
