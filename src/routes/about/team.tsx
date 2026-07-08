import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Github, Linkedin, Twitter, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about/team")({
    component: TeamPage,
    head: () => ({
        meta: [
            { title: "Our Team | Afroec Hub" },
            {
                name: "description",
                content: "Meet the directors, teachers, and technical mentors driving technology education in Ethiopia.",
            },
        ],
    }),
});

const teamMembers = [
    {
        name: "Yonas Gebre",
        role: "Managing Director",
        bio: "Ex-INSA Lead Engineer. Passionate about deploying computer networking and scalable curriculum to remote schools.",
        initials: "YG",
    },
    {
        name: "Hanan Mohammed",
        role: "Head of Afroec Academy",
        bio: "Systems architect and technical lead. Championing gender representation by coordinating SheSec software bootcamps.",
        initials: "HM",
    },
    {
        name: "Fitsum Kidane",
        role: "Lead Support Specialist & IT Trainer",
        bio: "Certified Network Specialist. Manages hardware infrastructure, routers, and IoT laboratories.",
        initials: "FK",
    },
    {
        name: "Tewodros Solomon",
        role: "Senior Full-Stack Mentor",
        bio: "Ex-software engineer in Fintech. Supports Product Hub trainees in building functional MVPs.",
        initials: "TS",
    },
    {
        name: "Selamawit Abebe",
        role: "Education Coordinator",
        bio: "Focuses on public school partnerships. Oversees SchoolNet curriculum integration and scholarships.",
        initials: "SA",
    },
    {
        name: "Michael Yohannes",
        role: "Cybersecurity Analyst & Trainer",
        bio: "Security pentester. Instructs SOC defense, risk assessment, and prep for Security+ certificates.",
        initials: "MY",
    },
];

function TeamPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1">
                {/* HERO SECTION */}
                <section className="py-20 bg-white">
                    <div className="container-page max-w-4xl text-center">
                        <Reveal>
                            <span className="eyebrow">OUR TEAM</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Meet the Innovators
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-2xl mx-auto">
                                A diverse group of technologists, educators, and leaders dedicated to building Africa's next tech talent factory.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* TEAM GRID */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teamMembers.map((member, idx) => (
                                <Reveal key={member.name} delay={((idx % 3) + 1) as 1 | 2 | 3} className="bg-white border border-border rounded-[16px] p-8 hover:border-black transition-colors duration-300 flex flex-col">
                                    {/* Photo Placeholder */}
                                    <div className="h-16 w-16 rounded-full bg-accent text-black font-display font-bold flex items-center justify-center text-[18px] mb-6">
                                        {member.initials}
                                    </div>
                                    <h3 className="font-display text-[22px] font-bold text-black mb-1">{member.name}</h3>
                                    <div className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-4">{member.role}</div>
                                    <p className="text-[14px] leading-relaxed text-text-secondary flex-1 mb-8">{member.bio}</p>

                                    {/* Socials */}
                                    <div className="flex gap-3 border-t border-border pt-4 mt-auto">
                                        {[
                                            { Icon: Linkedin, href: "#", label: "LinkedIn" },
                                            { Icon: Twitter, href: "#", label: "X" },
                                            { Icon: Github, href: "#", label: "GitHub" },
                                        ].map(({ Icon, href, label }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-black hover:border-black transition-colors"
                                                aria-label={`${member.name}'s ${label}`}
                                            >
                                                <Icon size={14} />
                                            </a>
                                        ))}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page text-center max-w-2xl">
                        <Reveal>
                            <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 mb-3">
                                <Sparkles size={12} className="text-accent" />
                                JOIN US
                            </span>
                            <h2 className="font-display font-bold text-[32px] md:text-[40px] text-black mb-4">Want to Join Our Team?</h2>
                            <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                                We are always looking for passionate trainers, curriculum builders, and volunteers who want to make a tangible social footprint in tech education.
                            </p>
                            <Link to="/get-involved/volunteer" className="btn-pill bg-accent text-black hover:bg-accent-hover">
                                Become a Volunteer
                            </Link>
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
