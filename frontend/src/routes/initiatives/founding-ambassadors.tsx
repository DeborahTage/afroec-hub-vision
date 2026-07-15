import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import heroImg from "@/assets/hero.jpg";
import {
    ArrowRight,
    CheckCircle,
    Megaphone,
    Network,
    School,
    Sparkles,
    Users,
    Award,
    Compass,
} from "lucide-react";

export const Route = createFileRoute("/initiatives/founding-ambassadors")({
    component: FoundingAmbassadorsPage,
    head: () => ({
        meta: [
            { title: "Founding Ambassadors | Afroec Hub" },
            {
                name: "description",
                content:
                    "Recruit founding ambassadors to build the next generation of tech leaders across Ethiopian high schools and universities.",
            },
        ],
    }),
});

function FoundingAmbassadorsPage() {
    const responsibilities = [
        {
            role: "Campus Outreach",
            detail: "Host info sessions, club kickoffs, and tech talks that introduce peers to Afroec programs.",
        },
        {
            role: "Club Building",
            detail: "Launch or strengthen Afroec Tech Clubs—recruit members, set a cadence, and keep momentum.",
        },
        {
            role: "Peer Mentorship",
            detail: "Guide newer students through first projects, applications, and learning paths.",
        },
        {
            role: "Event Activation",
            detail: "Help run workshops, hackathons, and competitions on your campus or in your city.",
        },
        {
            role: "Feedback Loop",
            detail: "Share what’s working locally so Afroec can improve programs for students nationwide.",
        },
        {
            role: "Community Voice",
            detail: "Represent Afroec values—curiosity, inclusion, and builders-first energy—on campus.",
        },
    ];

    const benefits = [
        {
            icon: Award,
            title: "Founding Cohort Badge",
            desc: "Official recognition as a founding ambassador with certificate and profile highlight.",
        },
        {
            icon: Network,
            title: "National Peer Network",
            desc: "Connect with ambassadors across high schools and universities in Ethiopia.",
        },
        {
            icon: Compass,
            title: "Leadership Mentorship",
            desc: "Monthly coaching, playbooks, and direct access to Afroec program leads.",
        },
        {
            icon: Sparkles,
            title: "Priority Access",
            desc: "Early invites to bootcamps, Product Hub seats, and partner internship pipelines.",
        },
        {
            icon: Megaphone,
            title: "Visibility & Stipends",
            desc: "Featured stories, campus merch kits, and activity stipends for approved outreach.",
        },
        {
            icon: School,
            title: "Career Edge",
            desc: "Real leadership experience you can put on applications, CVs, and portfolios.",
        },
    ];

    const requirements = [
        "Enrolled in an Ethiopian high school or university (or a recent graduate within 12 months)",
        "Passion for technology, community building, or student leadership",
        "Ability to commit roughly 4–6 hours per week during the school term",
        "Clear communication skills in Amharic and/or English",
        "Willingness to host at least one campus activity per month",
        "Aligned with Afroec’s mission of accessible tech education for all",
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO */}
                <section className="py-20 bg-white relative overflow-hidden">
                    <div className="container-page grid lg:grid-cols-[60fr_40fr] gap-12 items-center">
                        <Reveal>
                            <span className="eyebrow bg-accent-light text-black px-3 py-1 rounded-full border border-accent/30 inline-block">
                                LEADERSHIP
                            </span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Recruit Founding Ambassadors
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-xl">
                                Building the next generation of tech leaders across Ethiopian high schools and universities
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to="/get-involved/apply"
                                    search={{ type: "ambassador" } as never}
                                    className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold shadow-sm"
                                >
                                    Become an Ambassador <ArrowRight size={16} className="inline ml-1" />
                                </Link>
                                <a
                                    href="#what-ambassadors-do"
                                    className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white"
                                >
                                    See the Role
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="relative hidden lg:block">
                            <OrganicShape variant={2} className="-inset-4 opacity-50" />
                            <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-md">
                                <img
                                    src={heroImg}
                                    alt="Students collaborating as campus ambassadors"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* PROGRAM DESCRIPTION */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <span className="eyebrow">THE PROGRAM</span>
                            <h2 className="mt-4 font-display font-bold text-[32px] md:text-[40px] text-black">
                                Campus leaders who spark tech communities
                            </h2>
                            <div className="mt-6 space-y-4 text-[16px] text-text-secondary leading-relaxed">
                                <p>
                                    Founding Ambassadors are the first wave of student leaders who bring Afroec Hub’s
                                    mission into high schools and universities—club by club, campus by campus.
                                </p>
                                <p>
                                    You don’t need to be a senior engineer. You need energy, reliability, and a drive to
                                    help peers learn, build, and lead. Ambassadors get training, a clear playbook, and a
                                    national community backing every launch.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="bg-white border border-border p-8 rounded-[16px] shadow-xs">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black">
                                    <Users size={22} />
                                </div>
                                <h3 className="font-display text-[22px] font-bold text-black">Who thrives here</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Club presidents and student union organizers",
                                    "Self-taught builders looking for a platform",
                                    "Educators-in-training who love peer coaching",
                                    "Anyone ready to start something lasting on campus",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 items-start text-black font-medium text-[15px]">
                                        <span className="mt-1 shrink-0 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                                            <CheckCircle size={10} className="text-black" />
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </section>

                {/* WHAT AMBASSADORS DO */}
                <section id="what-ambassadors-do" className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="ROLE SNAPSHOT"
                            title="What Ambassadors Do"
                            subtitle="A clear set of activities—flexible enough for your campus, structured enough to scale."
                            align="center"
                        />

                        <Reveal className="overflow-x-auto bg-bg-cream border border-border rounded-[16px] shadow-sm">
                            <table className="min-w-full text-left border-collapse text-[14px]">
                                <thead>
                                    <tr className="bg-white border-b border-border/80 font-display font-bold text-black">
                                        <th className="p-4 md:p-5 w-[240px]">Activity</th>
                                        <th className="p-4 md:p-5">What it looks like</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {responsibilities.map((row) => (
                                        <tr key={row.role} className="hover:bg-white/70 transition-colors">
                                            <td className="p-4 md:p-5 font-display font-bold text-black">{row.role}</td>
                                            <td className="p-4 md:p-5 text-text-secondary leading-relaxed">{row.detail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Reveal>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="WHY JOIN"
                            title="Benefits"
                            subtitle="Recognition, mentorship, and real runway to grow as a leader."
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, idx) => {
                                const Icon = benefit.icon;
                                return (
                                    <Reveal
                                        key={benefit.title}
                                        delay={((idx % 3) + 1) as 1 | 2 | 3}
                                        className="bg-white border border-border p-8 rounded-[16px] flex gap-4 hover:border-black transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center shrink-0 text-black">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[18px] font-bold text-black mb-2">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-[13px] text-text-secondary leading-relaxed">
                                                {benefit.desc}
                                            </p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* REQUIREMENTS */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page max-w-3xl">
                        <SectionHeader
                            eyebrow="FIT CHECK"
                            title="Requirements"
                            align="center"
                        />

                        <Reveal className="bg-bg-cream border border-border rounded-[20px] p-8 md:p-10 space-y-4">
                            {requirements.map((item) => (
                                <div key={item} className="flex gap-3 items-start font-medium text-black">
                                    <span className="mt-1 shrink-0 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                                        <CheckCircle size={10} className="text-black" />
                                    </span>
                                    <span className="text-[15px] leading-snug text-text-secondary">
                                        <span className="text-black">{item}</span>
                                    </span>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>

                {/* APPLY CTA */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <Reveal className="bg-bg-dark text-white rounded-[24px] p-8 md:p-16 text-center shadow-lg relative overflow-hidden">
                            <span className="text-[12px] font-semibold text-text-muted uppercase tracking-[0.2em] mb-4 block">
                                Applications open
                            </span>
                            <h2 className="font-display font-bold text-[32px] md:text-[44px] leading-tight text-white mb-4">
                                Ready to lead on your campus?
                            </h2>
                            <p className="text-[16px] text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
                                Join the founding cohort. We’ll equip you with training, a starter kit, and a network
                                that grows with every club you help launch.
                            </p>
                            <Link
                                to="/get-involved/apply"
                                search={{ type: "ambassador" } as never}
                                className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold inline-flex items-center gap-2"
                            >
                                Become an Ambassador <ArrowRight size={16} />
                            </Link>
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
