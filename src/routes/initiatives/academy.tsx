import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import heroImg from "@/assets/hero.jpg";
import {
    FileText,
    CheckCircle,
    GraduationCap,
    Terminal,
    Shield,
    Layers,
    ArrowRight,
    BookOpen,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/initiatives/academy")({
    component: AcademyPage,
    head: () => ({
        meta: [
            { title: "Afroec Academy | Software, Cybersecurity & Hardware Engineering" },
            {
                name: "description",
                content: "Intensive 2-4 month programs in Software Engineering, Cybersecurity, and Hardware Engineering. Job-ready support.",
            },
        ],
    }),
});

function AcademyPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        { q: "Do I need prior experience?", a: "No. Most of our tracks are designed for absolute beginners. We start from coding and security fundamentals." },
        { q: "What is the time commitment?", a: "Full-time tracks require 40+ hours per week of classes and projects. Part-time tracks require 15-20 hours." },
        { q: "Is the program really free?", a: "Yes, thanks to corporate donors, community sponsorships, and optional income-share agreements (pay 0 upfront, pay 10% of salary for 24 months only after getting a job)." },
        { q: "Will I get a certificate?", a: "Yes, a certificate of completion is awarded to graduates who meet all module milestones and finish the capstone project." },
        { q: "What jobs can I get after?", a: "Junior Software Developer, SOC / Security Analyst, IoT Programmer, IT Support Specialist, or Systems Technician." },
        { q: "Can I apply from outside Addis Ababa?", a: "Yes! While our labs are physical, some cohorts offer structured online modes for remote students." },
    ];

    const tracks = [
        {
            icon: Terminal,
            title: "Software Engineering",
            duration: "4 Months",
            format: "Full-time, In-person + Online",
            desc: "Master full-stack web development with Python, JavaScript, React, Node.js, databases, and cloud deployment. Build real projects for your portfolio.",
            modules: [
                { name: "Month 1", title: "Programming Fundamentals", desc: "Python, JavaScript, Git control" },
                { name: "Month 2", title: "Frontend Development", desc: "HTML/CSS, React, custom UI/UX basics" },
                { name: "Month 3", title: "Backend Development", desc: "Node.js, Express, SQL, JWT authentication" },
                { name: "Month 4", title: "Capstone & Deployment", desc: "Full-stack portfolio project, AWS deployment" },
            ],
            careers: "Frontend Developer, Backend Developer, Full-Stack Engineer, Mobile Developer.",
        },
        {
            icon: Shield,
            title: "Cybersecurity",
            duration: "4 Months",
            format: "Full-time, In-person + Online",
            desc: "Learn to protect systems and networks. Covers security foundations, defensive operations, ethical hacking, and risk compliance.",
            modules: [
                { name: "Month 1", title: "Foundations & Linux", desc: "Networking, Linux command-line, risk management" },
                { name: "Month 2", title: "Defensive Operations", desc: "SOC operations, firewalls, threat detection (SIEM)" },
                { name: "Month 3", title: "Offensive Security", desc: "Penetration testing, web app vulnerability scanning" },
                { name: "Month 4", title: "Certification Preparation", desc: "Cloud safety, CompTIA Security+ preparation" },
            ],
            careers: "Security Analyst, SOC Analyst, Penetration Tester, Compliance Officer.",
        },
        {
            icon: Layers,
            title: "Hardware Engineering",
            duration: "2 Months",
            format: "Part-time, In-person (lab-based)",
            desc: "Hands-on training in computer hardware, networking equipment setup, IoT devices, and embedded systems.",
            modules: [
                { name: "Week 1-2", title: "PC Architecture & Repair", desc: "Motherboards, CPUs, RAM, storage, troubleshooting" },
                { name: "Week 3-4", title: "Network Hardware Equipment", desc: "Cables crimping, switches, routers configuration" },
                { name: "Week 5-6", title: "IoT & Embedded Coding", desc: "Arduino, Raspberry Pi, connecting sensors" },
                { name: "Week 7-8", title: "Hardware Project", desc: "Build & configure an automated smart device" },
            ],
            careers: "IT Support Specialist, Network Technician, Hardware Engineer, IoT Integrator.",
        },
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
                            <span className="eyebrow bg-accent-light text-black px-3 py-1 rounded-full border border-accent/30 inline-block">EDUCATION</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Afroec Academy
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-xl">
                                Intensive 2-4 month programs in Software Engineering, Cybersecurity, and Hardware Engineering. Job-ready skills, real projects, and dedicated placement support.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/get-involved/apply" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold shadow-sm">
                                    Apply Now
                                </Link>
                                <a
                                    href="#syllabus"
                                    className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white"
                                >
                                    <FileText size={16} /> Download Syllabus
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="relative hidden lg:block">
                            <OrganicShape variant={2} className="-inset-4 opacity-50" />
                            <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-md">
                                <img src={heroImg} alt="Students programming together" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ABOUT ACADEMY */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <span className="eyebrow">WHAT MAKES US DIFFERENT</span>
                            <h2 className="mt-4 font-display font-bold text-[32px] md:text-[40px] text-black">
                                A Curriculum Built by Industry Specialists
                            </h2>
                            <div className="mt-6 space-y-4 text-[16px] text-text-secondary leading-relaxed">
                                <p>
                                    Most computer science programs focus entirely on theory. At Afroec Academy, we do the opposite. Our curriculum is built around actual deliverables that companies look for when recruiting developers and analysts.
                                </p>
                                <p>
                                    No textbooks, no boring slides. Instead, you'll open a terminal on your first day. You'll build web backends, configure physical routers, configure defensive firewalls, and learn version control via Git.
                                </p>
                                <ul className="mt-8 space-y-3">
                                    {[
                                        "Daily 1:1 troubleshooting with senior software mentors",
                                        "A mandatory capstone project replicating industrial assignments",
                                        "Simulated job interviews and resume optimization support",
                                        "Access to co-working labs with power and backup fiber lines",
                                    ].map((item) => (
                                        <li key={item} className="flex gap-2 items-start text-black font-medium text-[15px]">
                                            <span className="mt-1 shrink-0 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                                                <CheckCircle size={10} className="text-black" />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        {/* Right: Steps */}
                        <Reveal delay={2} className="bg-white border border-border p-8 rounded-[16px] shadow-xs">
                            <h3 className="font-display text-[22px] font-bold text-black border-b border-border pb-4 mb-4">How It Works</h3>
                            <div className="space-y-6">
                                {[
                                    { n: "1", title: "Apply Online", text: "Submit details and take a basic computer logic & analytical aptitude assessment." },
                                    { n: "2", title: "Learn & Code", desc: "Interact live with mentors and peers daily in a fast-paced environment." },
                                    { n: "3", title: "Build Solutions", desc: "Write programs or configure labs. Add tangible projects to your GitHub." },
                                    { n: "4", title: "Launch Career", desc: "Work with our career placement service to secure internships or jobs." },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-accent text-black font-display font-bold text-[14px] flex items-center justify-center shrink-0">
                                            {item.n}
                                        </div>
                                        <div>
                                            <h4 className="font-display font-bold text-[16px] text-white/0 text-black leading-tight">{item.title}</h4>
                                            <p className="mt-1 text-[13px] text-text-secondary leading-snug">{item.desc || item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* TRACKS DETAIL */}
                <section id="syllabus" className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="ACADEMY SYLLABUS"
                            title="Three Specialized Tracks"
                            align="center"
                        />

                        <div className="space-y-16">
                            {tracks.map((track, idx) => {
                                const Icon = track.icon;
                                return (
                                    <Reveal key={track.title} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                                        <div className="bg-white border border-border rounded-[20px] p-8 md:p-12 hover:border-black transition-colors duration-300">
                                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-black">
                                                        <Icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-display text-[24px] font-bold text-black">{track.title}</h3>
                                                        <div className="text-[13px] text-text-secondary font-medium mt-0.5">{track.format}</div>
                                                    </div>
                                                </div>
                                                <span className="font-display text-[15px] font-bold uppercase tracking-wider bg-accent-light text-black px-4 py-1.5 rounded-full border border-accent/25">
                                                    {track.duration}
                                                </span>
                                            </div>

                                            <p className="text-[16px] text-text-secondary leading-relaxed mb-6">{track.desc}</p>

                                            <h4 className="font-display font-semibold text-[15px] text-black mb-3">Curriculum Breakdown</h4>
                                            <div className="grid md:grid-cols-4 gap-4 mb-8">
                                                {track.modules.map((m) => (
                                                    <div key={m.name} className="bg-bg-cream border border-border/80 rounded-xl p-4">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{m.name}</span>
                                                        <div className="font-display font-bold text-[14px] text-black mt-1 leading-snug">{m.title}</div>
                                                        <p className="text-[12px] text-text-secondary mt-1 leading-snug">{m.desc}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 mt-6">
                                                <div className="text-[14px] text-text-secondary leading-snug">
                                                    <strong className="text-black">Typical Careers:</strong> {track.careers}
                                                </div>
                                                <Link to="/get-involved/apply" className="btn-pill bg-black text-white hover:bg-neutral-800 text-[14px]">
                                                    Apply for {track.title}
                                                </Link>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TUITION & AID */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">FINANCIAL AID</span>
                            <h2 className="mt-4 font-display font-bold text-[32px] md:text-[40px] text-black">
                                Education Based on Progress, Not Payments
                            </h2>
                            <div className="mt-6 text-[16px] text-text-secondary space-y-4 max-w-2xl mx-auto leading-relaxed">
                                <p>
                                    Afroec Academy is built to remove financial barriers. All cohorts are fully sponsored or heavily subsidized. We operate on a pay-it-forward system of partnerships.
                                </p>
                                <p>
                                    For selected tracks, we offer Income-Share Agreements (ISAs). This allows you to enroll with <strong>zero upfront fee</strong>. You start paying back 10% of your salary only when you graduate and secure a job paying above the threshold.
                                </p>
                                <p>
                                    We also reserve 50% of our enrollment seats for female applicants. These scholarship seats include subsidies for public transit, childcare facilitation, and mentorship.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* FAQ ACCORDION COMPONENT */}
                <section className="py-24 bg-white">
                    <div className="container-page max-w-3xl">
                        <SectionHeader
                            eyebrow="FAQ"
                            title="Frequently Asked Questions"
                            align="center"
                        />

                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <Reveal key={faq.q} delay={((idx % 3) + 1) as 1 | 2 | 3}>
                                    <div className="border border-border rounded-xl bg-white overflow-hidden transition-all hover:border-black pointer-events-auto">
                                        <button
                                            className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-[16px] text-black cursor-pointer bg-white"
                                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        >
                                            <span>{faq.q}</span>
                                            <ChevronToggle isOpen={activeFaq === idx} />
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out ${activeFaq === idx ? "max-h-40 border-t border-border/60 py-4 px-5 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"}`}>
                                            <p className="text-[14px] text-text-secondary leading-relaxed">{faq.a}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* UPCOMING COHORTS TABLE */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page max-w-4xl">
                        <SectionHeader
                            eyebrow="NEXT COHORTS"
                            title="Upcoming Engineering Cohorts"
                            align="center"
                        />

                        <Reveal className="overflow-x-auto bg-white border border-border rounded-[16px] shadow-sm">
                            <table className="min-w-full text-left border-collapse text-[14px]">
                                <thead>
                                    <tr className="bg-bg-cream border-b border-border/80 font-display font-bold text-black">
                                        <th className="p-4">Cohort Name</th>
                                        <th className="p-4">Track Focus</th>
                                        <th className="p-4">Start Date</th>
                                        <th className="p-4">Deadline</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { name: "C9-SE-26", track: "Software Engineering", start: "Sep 15, 2026", deadline: "Sep 01, 2026", status: "Open" },
                                        { name: "C9-CS-26", track: "Cybersecurity Analyst", start: "Sep 20, 2026", deadline: "Sep 05, 2026", status: "Open" },
                                        { name: "C5-HW-26", track: "Hardware Equipment & IoT", start: "Oct 10, 2026", deadline: "Sep 25, 2026", status: "Waitlist" },
                                    ].map((cohort) => (
                                        <tr key={cohort.name} className="hover:bg-bg-cream transition-colors text-black font-medium">
                                            <td className="p-4">{cohort.name}</td>
                                            <td className="p-4">{cohort.track}</td>
                                            <td className="p-4">{cohort.start}</td>
                                            <td className="p-4">{cohort.deadline}</td>
                                            <td className="p-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${cohort.status === "Open" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-850"}`}>
                                                    {cohort.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Reveal>

                        <div className="mt-12 flex justify-center gap-4">
                            <Link to="/get-involved/apply" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                Apply Now
                            </Link>
                            <Link to="/contact" className="btn-pill bg-black text-white hover:bg-neutral-800">
                                Contact Admissions
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function ChevronToggle({ isOpen }: { isOpen: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-text-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}
