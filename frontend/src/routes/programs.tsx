import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import {
    Shield,
    Users,
    GraduationCap,
    Truck,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/programs")({
    component: CommunityProgramsPage,
    head: () => ({
        meta: [
            { title: "Community Programs | Afroec Hub" },
            {
                name: "description",
                content: "Reaching underserved communities with free technology education, mentorship, and opportunity.",
            },
        ],
    }),
});

function CommunityProgramsPage() {
    const programs = [
        {
            icon: Shield,
            title: "CyberGuard Youth",
            desc: "Comprehensive tech training for unemployed youth aged 16-25. From zero background to job-ready in digital literacy, programming, and cybersecurity.",
            stats: [
                { label: "Reached", value: "1,500+" },
                { label: "Graduates/Year", value: "150" },
                { label: "Avg Salary", value: "$400" },
            ],
            color: "border-accent",
        },
        {
            icon: Users,
            title: "SheSec Ethiopia",
            desc: "Women-only cohorts with childcare support, safe transit stipends, female instructors, and flexible hybrid scheduling. Helping women break into technical security roles.",
            stats: [
                { label: "Women Target", value: "50%" },
                { label: "Graduates/Year", value: "250" },
                { label: "Hired/Placed", value: "200" },
            ],
            color: "border-pink-300",
        },
        {
            icon: GraduationCap,
            title: "SchoolNet Tech",
            desc: "Partnering with public schools to integrate basic computational thinking and digital safety inside grades 9-12 classes. We set up physical computer labs in schools without ICT infrastructure.",
            stats: [
                { label: "Schools", value: "200" },
                { label: "Students", value: "5,000" },
                { label: "Scholarships", value: "100" },
            ],
            color: "border-blue-300",
        },
        {
            icon: Truck,
            title: "DigiSec Ethiopia",
            desc: "Digisec is cyberawarness program with local-language tech instruction, and Starlink internet connectivity directly to rural villages of Ethiopia.",
            stats: [
                { label: "Trucks Deployed", value: "4" },
                { label: "Rural Students", value: "500" },
                { label: "Scholarships", value: "50" },
            ],
            color: "border-green-300",
        },
    ];

    const pipelineSteps = [
        { num: "01", name: "Outreach & Admissions", desc: "Local campaigns, radio ads, and school presentations to recruit participants." },
        { num: "02", name: "Digital Literacy Foundations", desc: "A 3-month basic program introducing computers, security habits, and net navigation." },
        { num: "03", name: "Programming Bootcamps", desc: "For motivated students. Deeper JS/Python, operating systems, and networking labs." },
        { num: "04", name: "Real-world Apprenticeships", desc: "6 months working inside Afroec or partnering tech organizations on paid tasks." },
        { num: "05", name: "Placement & Support", desc: "Graduates obtain internships and entry-level positions." },
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
                            <span className="eyebrow">COMMUNITY OUTREACH</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Community Programs
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Reaching underserved communities with free technology education, mentorship, and opportunities.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* FOUR PROGRAM CARDS */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <div className="grid md:grid-cols-2 gap-8">
                            {programs.map((prog, idx) => {
                                const Icon = prog.icon;
                                return (
                                    <Reveal key={prog.title} delay={((idx % 2) + 1) as 1 | 2}>
                                        <div className={`bg-white border-2 ${prog.color} rounded-[24px] p-8 md:p-12 hover:border-black transition-colors duration-300 flex flex-col h-full shadow-xs`}>
                                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mb-6 text-black">
                                                <Icon size={22} />
                                            </div>
                                            <h2 className="font-display text-[24px] font-bold text-black mb-3">{prog.title}</h2>
                                            <p className="text-[15px] leading-relaxed text-text-secondary mb-8 flex-1">{prog.desc}</p>

                                            <div className="grid grid-cols-3 gap-3 border-t border-border pt-6 mt-auto">
                                                {prog.stats.map((s) => (
                                                    <div key={s.label}>
                                                        <div className="font-display text-[18px] font-bold text-black">{s.value}</div>
                                                        <div className="text-[11px] uppercase tracking-wider text-text-muted mt-0.5 font-bold leading-tight">{s.label}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 pt-4 border-t border-border/60">
                                                <Link to="/get-involved/apply" className="link-arrow font-bold text-[14px]">
                                                    Join Program <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS (Timeline Pipeline) */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="OUR PIPELINE"
                            title="From Digital Literacy to Tech Jobs"
                            subtitle="A structured 18-month roadmap guiding students through training to entry-level professional positions."
                            align="center"
                        />

                        <div className="relative border-l-2 md:border-l-0 md:border-t-2 border-accent pl-6 md:pl-0 md:pt-8 md:grid md:grid-cols-5 gap-6 max-w-5xl mx-auto space-y-8 md:space-y-0">
                            {pipelineSteps.map((step, idx) => (
                                <Reveal key={step.num} delay={((idx % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="relative">
                                    {/* dot container */}
                                    <span className="absolute -left-[35px] top-1.5 md:left-1/2 md:-translate-x-1/2 md:-top-[46px] h-6 w-6 rounded-full bg-accent border-4 border-white shadow-md ring-2 ring-accent/20" />
                                    <div className="text-left md:text-center mt-2">
                                        <span className="font-display text-[26px] font-bold text-accent leading-none block mb-1">{step.num}</span>
                                        <h3 className="font-display font-bold text-[16px] text-black mb-2 leading-snug">{step.name}</h3>
                                        <p className="text-[12px] text-text-secondary leading-relaxed max-w-[180px] md:mx-auto">{step.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* STATS OVERVIEW */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <div className="bg-bg-dark text-white rounded-[24px] p-8 md:p-16 relative overflow-hidden text-center shadow-lg">
                            <span className="text-[12px] font-semibold text-text-muted uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 mb-4">
                                <Sparkles size={12} className="text-accent" />
                                OVERALL METRICS
                            </span>
                            <h2 className="font-display font-bold text-[32px] md:text-[44px] leading-tight text-white mb-12">Empowering Underserved Youth</h2>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { value: "5,000+", label: "Youth Reached" },
                                    { value: "400", label: "Annual Graduates" },
                                    { value: "50%", label: "Women in Tech" },
                                    { value: "85%", label: "Placement Rate" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="font-display text-[44px] md:text-[56px] font-bold text-accent leading-none">{stat.value}</div>
                                        <div className="text-[13px] uppercase tracking-wider text-white/70 mt-2 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
