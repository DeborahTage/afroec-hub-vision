import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import {
    Shield,
    Users,
    ArrowRight,
    Sparkles,
    Code2,
    Rocket,
    HeartHandshake,
} from "lucide-react";

export const Route = createFileRoute("/programs")({
    component: CommunityProgramsPage,
    head: () => ({
        meta: [
            { title: "Community Programs | Afroec Hub" },
            {
                name: "description",
                content:
                    "SheSec Ethiopia, Afroec Tech Club, and the Founding Ambassador Program—community pathways into tech leadership.",
            },
        ],
    }),
});

function CommunityProgramsPage() {
    const clubActivities = [
        { activity: "Learn nights", detail: "Weekly peer sessions on coding, cybersecurity basics, and digital skills." },
        { activity: "Build sprints", detail: "Small team projects—apps, bots, hardware demos—shipped on a cadence." },
        { activity: "Lead circles", detail: "Member roles for outreach, curriculum, and event ops inside each club." },
        { activity: "Showcase days", detail: "End-of-term demos that connect clubs with mentors and partners." },
    ];

    const clubSteps = [
        { num: "01", name: "Start or join a club", desc: "Find an existing Afroec Tech Club or apply to launch one on your campus." },
        { num: "02", name: "Train with a playbook", desc: "Ambassadors and mentors share session plans, toolkits, and first-month goals." },
        { num: "03", name: "Meet weekly & build", desc: "Learn nights plus build sprints keep members shipping real artifacts." },
        { num: "04", name: "Connect nationally", desc: "Join inter-school challenges, remote talks, and partner workshop days." },
    ];

    const ambassadorPhases = [
        { phase: "Phase 1", title: "Onboard", duration: "Weeks 1–2", detail: "Orientation, brand kit, campus mapping, and first outreach plan." },
        { phase: "Phase 2", title: "Activate", duration: "Months 1–2", detail: "Launch or strengthen a club; host your first workshop or info session." },
        { phase: "Phase 3", title: "Grow", duration: "Months 3–5", detail: "Recruit members, run recurring sessions, track local impact metrics." },
        { phase: "Phase 4", title: "Lead", duration: "Month 6+", detail: "Mentor newer ambassadors, co-host regional events, and join national leadership." },
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
                                Three pathways that open tech opportunity—for women in security, campus clubs, and
                                student leaders who multiply the mission.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* SHESEC */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <Reveal className="bg-white border-2 border-pink-300 rounded-[24px] p-8 md:p-12 shadow-xs">
                            <div className="flex flex-wrap items-start gap-6 mb-8">
                                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                    <Shield size={22} />
                                </div>
                                <div className="flex-1 min-w-[220px]">
                                    <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                        Women in cybersecurity
                                    </span>
                                    <h2 className="mt-4 font-display text-[28px] md:text-[36px] font-bold text-black">
                                        SheSec Ethiopia
                                    </h2>
                                    <p className="mt-4 text-[16px] text-text-secondary leading-relaxed max-w-3xl">
                                        Women-focused cohorts with childcare support, safe transit stipends, female
                                        instructors, and flexible hybrid scheduling—helping women break into technical
                                        security roles with the same rigor as our open tracks.
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4 border-t border-border pt-8">
                                {[
                                    { label: "Women Target", value: "50%" },
                                    { label: "Graduates / Year", value: "250" },
                                    { label: "Hired / Placed", value: "200" },
                                ].map((s) => (
                                    <div key={s.label} className="bg-bg-cream border border-border rounded-xl p-5">
                                        <div className="font-display text-[24px] font-bold text-black">{s.value}</div>
                                        <div className="text-[11px] uppercase tracking-wider text-text-muted mt-1 font-bold">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <ul className="mt-8 grid md:grid-cols-2 gap-3 text-[14px] text-text-secondary">
                                {[
                                    "Safe, women-led learning spaces and mentorship circles",
                                    "Labs covering Linux, SOC basics, and ethical hacking foundations",
                                    "Transit and childcare support to reduce drop-off barriers",
                                    "Placement support into analyst and junior security roles",
                                ].map((item) => (
                                    <li key={item} className="flex gap-2 items-start">
                                        <HeartHandshake size={16} className="mt-0.5 shrink-0 text-black" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </section>

                {/* AFROEC TECH CLUB */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page">
                        <Reveal className="mb-12 max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black">
                                    <Code2 size={22} />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                    Campus network
                                </span>
                            </div>
                            <h2 className="font-display text-[28px] md:text-[40px] font-bold text-black">
                                Afroec Tech Club
                            </h2>
                            <p className="mt-2 font-display text-[20px] md:text-[24px] text-black/80 font-semibold">
                                Learn. Build. Lead.
                            </p>
                            <p className="mt-4 text-[16px] text-text-secondary leading-relaxed">
                                Student-run clubs that turn curiosity into shipped projects—and leaders who keep the
                                flame going after the first workshop ends.
                            </p>
                        </Reveal>

                        <div className="grid lg:grid-cols-2 gap-10 items-start">
                            <Reveal>
                                <SectionHeader
                                    eyebrow="ACTIVITIES"
                                    title="What clubs actually do"
                                    align="left"
                                />
                                <div className="overflow-x-auto bg-bg-cream border border-border rounded-[16px]">
                                    <table className="min-w-full text-left text-[14px]">
                                        <thead>
                                            <tr className="bg-white border-b border-border font-display font-bold text-black">
                                                <th className="p-4">Activity</th>
                                                <th className="p-4">Focus</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {clubActivities.map((row) => (
                                                <tr key={row.activity} className="hover:bg-white/80 transition-colors">
                                                    <td className="p-4 font-display font-bold text-black whitespace-nowrap">
                                                        {row.activity}
                                                    </td>
                                                    <td className="p-4 text-text-secondary leading-relaxed">{row.detail}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Reveal>

                            <Reveal delay={2}>
                                <SectionHeader
                                    eyebrow="HOW IT WORKS"
                                    title="From first meeting to national network"
                                    align="left"
                                />
                                <div className="space-y-5">
                                    {clubSteps.map((step) => (
                                        <div key={step.num} className="flex gap-4 items-start">
                                            <div className="h-10 w-10 rounded-full bg-accent text-black font-display font-bold text-[14px] flex items-center justify-center shrink-0">
                                                {step.num}
                                            </div>
                                            <div>
                                                <h3 className="font-display font-bold text-[16px] text-black">{step.name}</h3>
                                                <p className="mt-1 text-[13px] text-text-secondary leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        <Reveal className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { value: "50+", label: "Clubs" },
                                { value: "1000+", label: "Members" },
                                { value: "20+", label: "Schools" },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-bg-cream border border-border rounded-[20px] p-8 text-center hover:border-black transition-colors"
                                >
                                    <div className="font-display text-[40px] md:text-[48px] font-bold text-black leading-none">
                                        {stat.value}
                                    </div>
                                    <div className="text-[12px] uppercase tracking-wider text-text-muted mt-3 font-bold">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </section>

                {/* FOUNDING AMBASSADOR PROGRAM */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <Reveal className="mb-12 max-w-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black">
                                    <Users size={22} />
                                </div>
                                <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                    Student leadership
                                </span>
                            </div>
                            <h2 className="font-display text-[28px] md:text-[40px] font-bold text-black">
                                Founding Ambassador Program
                            </h2>
                            <p className="mt-4 text-[16px] text-text-secondary leading-relaxed">
                                Recruit and develop campus leaders who spark Tech Clubs, host events, and carry Afroec’s
                                mission into high schools and universities across Ethiopia.
                            </p>
                            <Link
                                to="/initiatives/founding-ambassadors"
                                className="mt-6 inline-flex link-arrow font-bold text-[14px]"
                            >
                                Explore the initiative <ArrowRight size={14} />
                            </Link>
                        </Reveal>

                        <Reveal className="overflow-x-auto bg-white border border-border rounded-[16px] shadow-sm">
                            <table className="min-w-full text-left border-collapse text-[14px]">
                                <thead>
                                    <tr className="bg-bg-cream border-b border-border/80 font-display font-bold text-black">
                                        <th className="p-4">Journey</th>
                                        <th className="p-4">Stage</th>
                                        <th className="p-4">Timing</th>
                                        <th className="p-4">Focus</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {ambassadorPhases.map((row) => (
                                        <tr key={row.phase} className="hover:bg-bg-cream/60 transition-colors">
                                            <td className="p-4 font-display font-bold text-accent whitespace-nowrap">
                                                {row.phase}
                                            </td>
                                            <td className="p-4 font-display font-bold text-black">{row.title}</td>
                                            <td className="p-4 text-text-muted font-medium whitespace-nowrap">
                                                {row.duration}
                                            </td>
                                            <td className="p-4 text-text-secondary leading-relaxed">{row.detail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Reveal>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page">
                        <div className="bg-bg-dark text-white rounded-[24px] p-8 md:p-16 relative overflow-hidden text-center shadow-lg">
                            <span className="text-[12px] font-semibold text-text-muted uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 mb-4">
                                <Sparkles size={12} className="text-accent" />
                                GET STARTED
                            </span>
                            <h2 className="font-display font-bold text-[32px] md:text-[44px] leading-tight text-white mb-4">
                                Lead the next wave on your campus
                            </h2>
                            <p className="text-[16px] text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
                                Apply as a Founding Ambassador—or join SheSec and Tech Clubs through the same apply flow.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/get-involved/apply"
                                    search={{ type: "ambassador" } as never}
                                    className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold inline-flex items-center gap-2"
                                >
                                    Apply as Ambassador <Rocket size={16} />
                                </Link>
                                <Link
                                    to="/initiatives/founding-ambassadors"
                                    className="btn-pill bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-black"
                                >
                                    Program details
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
