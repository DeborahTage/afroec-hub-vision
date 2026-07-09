import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { FileText, ArrowRight, Download, Quote } from "lucide-react";

export const Route = createFileRoute("/impact")({
    component: ImpactPage,
    head: () => ({
        meta: [
            { title: "Our Impact | Afroec Hub" },
            {
                name: "description",
                content: "See how Afroec Hub is transforming lives through technology education, jobs, and community outreach.",
            },
        ],
    }),
});

function ImpactPage() {
    const metrics = [
        { value: "5,000+", label: "Youth Reached", desc: "Trained across cities, public classrooms, and digital modules." },
        { value: "400", label: "Annual Graduates", desc: "Equipped with intensive coding, security, and hardware skills." },
        { value: "50%", label: "Women in Tech", desc: "Consistent representation across SheSec and Academy cohorts." },
        { value: "85%", label: "Placement Rate", desc: "Graduates hired within 6 months in local and global positions." },
        { value: "$400", label: "Avg Starting Salary", desc: "First salary compared to national averages for junior specialists." },
        { value: "200", label: "Partner Schools", desc: "High schools integrated with SchoolNet basic computer labs." },
        { value: "4", label: "DigiSec Trucks", desc: "Solar trucks supplying Starlink connection to rural districts." },
        { value: "136", label: "Hired by Afroec", desc: "Our parent software agency absorbing top-tier graduates." },
    ];

    const stories = [
        {
            name: "Tigest Tesfaye",
            role: "Junior Security Engineer",
            hiredAt: "Ethio Telecom",
            program: "SheSec Ethiopia & Cybersecurity Track",
            quote: "Before discovering SheSec, I had a general degree in mathematics but no practical network defense experience. The intensive Linux labs and penetration testing modules at the Academy totally transformed my prospects.",
            initials: "TT",
        },
        {
            name: "Abel Kebede",
            role: "Full-Stack Developer",
            hiredAt: "Afroec Tech",
            program: "Software Engineering bootcamp",
            quote: "The 4-month software engineering bootcamp was grueling—10 hours a day of coding. But building an enterprise application during my apprenticeship gave me the portfolio required to land a role at Afroec.",
            initials: "AK",
        },
        {
            name: "Dawit Worku",
            role: "IT & Hardware Administrator",
            hiredAt: "Addis Logistics Agency",
            program: "DigiSec Rural lab & Hardware Track",
            quote: "I first touched an Arduino circuit board when Afroec team come to in my village. The hardware scholarship allowed me to travel to Addis Ababa and learn networking hardware.",
            initials: "DW",
        },
    ];

    const reports = [
        { title: "2024 Impact Report", size: "4.2 MB", desc: "A review of our first 1,000 graduates, placement rates, and early SheSec cohorts." },
        { title: "2025 Impact Report", size: "5.8 MB", desc: "Metrics including our DigiSec rural deployment, corporate partnerships, and software milestones." },
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
                            <span className="eyebrow">TRANSFORMATION REPORT</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Our Impact
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                Every number represents a life changed, a career launched, and a community transformed.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* KEY METRICS GRID */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="METRICS MATRIX"
                            title="Verified Milestone Counts"
                            align="center"
                        />

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {metrics.map((m, idx) => (
                                <Reveal key={m.label} delay={((idx % 4) + 1) as 1 | 2 | 3 | 4} className="bg-white border border-border rounded-[16px] p-6 shadow-xs hover:border-black transition-colors duration-300">
                                    <div className="font-display text-[40px] font-bold text-black leading-none">{m.value}</div>
                                    <div className="mt-3 h-[3px] w-8 bg-accent rounded-full" />
                                    <h3 className="font-display text-[16px] font-bold text-black mt-4 mb-2">{m.label}</h3>
                                    <p className="text-[12px] text-text-secondary leading-normal">{m.desc}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* IMPACT STORIES Case Studies */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="SUCCESS STORIES"
                            title="Stories Behind the Data"
                            align="center"
                        />

                        <div className="grid lg:grid-cols-3 gap-8">
                            {stories.map((story, idx) => (
                                <Reveal key={story.name} delay={((idx % 3) + 1) as 1 | 2 | 3} className="bg-white border border-border rounded-[20px] p-8 md:p-10 hover:border-black transition-colors duration-300 flex flex-col justify-start">
                                    <div className="h-10 w-10 bg-accent text-black font-display font-bold text-[14px] rounded-full flex items-center justify-center mb-6 shrink-0">
                                        {story.initials}
                                    </div>

                                    <blockquote className="relative flex-1">
                                        <Quote size={20} className="text-accent/40 absolute -top-2 -left-2 -z-10" />
                                        <p className="text-[14px] leading-relaxed italic text-text-secondary mb-8 pl-4">{story.quote}</p>
                                    </blockquote>

                                    <div className="border-t border-border pt-4 mt-auto">
                                        <h3 className="font-display text-[16px] font-bold text-black">{story.name}</h3>
                                        <div className="text-[12px] text-text-muted mt-0.5">{story.role} at <strong className="text-black">{story.hiredAt}</strong></div>
                                        <span className="inline-block mt-3 bg-accent-light text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{story.program}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ANNUAL REPORTS */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page max-w-4xl">
                        <SectionHeader
                            eyebrow="DOCUMENT LIBRARY"
                            title="Annual Impact Reports"
                            subtitle="Review and download our full operating financials, audit reports, and graduate registries."
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 gap-8">
                            {reports.map((rep) => (
                                <Reveal key={rep.title} className="bg-white border border-border rounded-[20px] p-8 flex items-center gap-6 shadow-xs hover:border-black transition-colors">
                                    <div className="h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                        <FileText size={26} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display text-[18px] font-bold text-black leading-tight flex items-center gap-2">
                                            {rep.title}
                                            <span className="text-[11px] font-bold text-text-muted bg-bg-cream border border-border px-2 py-0.5 rounded">{rep.size}</span>
                                        </h3>
                                        <p className="text-[12px] text-text-secondary mt-2 leading-relaxed">{rep.desc}</p>
                                        <button
                                            onClick={() => alert(`Starting download for ${rep.title}`)}
                                            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-black hover:text-accent-hover transition-colors mt-4 cursor-pointer"
                                        >
                                            <Download size={14} /> Download PDF
                                        </button>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DUMMY PARTNERS SECTION */}
                <section className="py-24 bg-white">
                    <div className="container-page">
                        <p className="eyebrow text-center mb-10">Supporting Partners & Funders</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                            {["Ministry of Education", "Ethio Telecom", "GIZ", "Ministry of Innovation & Tech", "INSA", "AI Institute"].map((logo) => (
                                <div key={logo} className="text-center font-display text-[14px] font-bold tracking-wide text-text-secondary hover:text-black transition-colors cursor-default">
                                    {logo}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
