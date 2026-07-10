import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Calendar, Clock, ArrowRight, Rss } from "lucide-react";

export const Route = createFileRoute("/blog/")({
    component: BlogIndexPage,
    head: () => ({
        meta: [
            { title: "News & Stories | Afroec Hub" },
            {
                name: "description",
                content: "Stay updated on Afroec Hub cohorts, student milestones, events, and tech community insights.",
            },
        ],
    }),
});

export const mockPosts = [
    {
        slug: "digisec-deployment",
        title: "Empowering Rural Ethiopia: Our DigiSec Lab Deployment",
        date: "Jun 24, 2026",
        readTime: "5 min read",
        author: "Selamawit Abebe",
        tag: "OUTREACH",
    },
    {
        slug: "shesec-cybersecurity",
        title: "SheSec Graduates: Bridging the Gender Gap in Cybersecurity",
        desc: "Meet the graduates of our all-female SheSec cohort who are stepping into junior threat-hunting roles at local enterprise agencies.",
        date: "May 18, 2026",
        readTime: "4 min read",
        author: "Hanan Mohammed",
        tag: "CYBERSECURITY",
    },
    {
        slug: "first-academy-cohort",
        title: "From Code to Careers: Lessons from Afroec Academy's First Cohort",
        desc: "Reflecting on the challenges and milestones of training our first 200 software developers and securing 80%+ job placements.",
        date: "Apr 05, 2026",
        readTime: "7 min read",
        author: "Yonas Gebre",
        tag: "EDUCATION",
    },
    {
        slug: "iot-soil-trackers",
        title: "IoT & Agriculture: How Students are Building Automated Soil Trackers",
        desc: "A closer look at the Product Hub smart hardware projects aiming to assist smallholder farmers in monitoring soil moisture.",
        date: "Mar 12, 25",
        readTime: "6 min read",
        author: "Tewodros Solomon",
        tag: "HARDWARE",
    },
];

function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 bg-bg-cream py-16">
                <div className="container-page">
                    <Reveal className="text-center max-w-2xl mx-auto mb-16">
                        <span className="eyebrow">NEWS & STORIES</span>
                        <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                            Blog & Updates
                        </h1>
                        <p className="mt-6 text-[16px] md:text-[18px] text-text-secondary leading-relaxed">
                            Stay updated on Afroec Hub cohorts, student milestones, community events, and technical articles.
                        </p>
                    </Reveal>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {mockPosts.map((post, idx) => (
                            <Reveal key={post.slug} delay={((idx % 2) + 1) as 1 | 2} className="bg-white border border-border rounded-[24px] p-8 md:p-10 hover:border-black transition-colors duration-300 flex flex-col justify-start h-full shadow-xs">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                        {post.tag}
                                    </span>
                                    <div className="flex items-center gap-1 text-[12px] text-text-muted">
                                        <Clock size={12} /> {post.readTime}
                                    </div>
                                </div>

                                <h2 className="font-display text-[22px] font-bold text-black mb-3 leading-snug line-clamp-2 hover:text-accent-hover transition-colors">
                                    <Link to={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-[14px] leading-relaxed text-text-secondary mb-8 flex-1 line-clamp-3">
                                    {post.desc}
                                </p>

                                <div className="border-t border-border pt-4 flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-[11px] text-text-muted uppercase tracking-wider block">Written by</span>
                                        <span className="font-display text-[13px] font-bold text-black">{post.author}</span>
                                    </div>
                                    <Link to={`/blog/${post.slug}`} className="link-arrow font-bold text-[14px]">
                                        Read Post <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* RSS n
                    ewsletter block */}
                    <Reveal className="mt-16 bg-bg-dark text-white rounded-[24px] p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                                <Rss size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-[18px] font-bold text-white">Subscribe to RSS</h3>
                                <p className="text-[13px] text-text-muted mt-1">Get automatically notified whenever we publish a new cohort update.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => alert("RSS Feed URL: /feed.xml")}
                            className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold text-[14px] shrink-0"
                        >
                            RSS Feed
                        </button>
                    </Reveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}
