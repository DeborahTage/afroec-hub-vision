import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { mockPosts } from "./index";
import { ArrowLeft, Clock, Calendar, User, CornerDownRight } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
    component: BlogPostPage,
    head: () => ({
        meta: [
            { title: "Article details | Afroec Hub" },
        ],
    }),
});

function BlogPostPage() {
    const { slug } = useParams({ from: "/blog/$slug" });

    const post = mockPosts.find((p) => p.slug === slug) || {
        title: "Article Not Found",
        desc: "The requested blog article could not be resolved or was deleted.",
        date: "N/A",
        readTime: "N/A",
        author: "System",
        tag: "ERROR",
    };

    const detailedBody = {
        "digisec-deployment": (
            <>
                <p>
                    Geography should never dictate destiny. Yet, across rural Ethiopia, millions of high school students attend classrooms with completely empty computer laboratories—often lacking even electrical plug points, let alone basic software terminals or internet cables.
                </p>
                <p>
                    To break this digital isolation, we launched the <strong>DigiSec Solar Mobile Lab</strong> initiative. Our specialized solar trucks are fitted with 15 customer laptops, local-language programming manuals, and Starlink hardware antennas, enabling absolute digital access anywhere in the country.
                </p>
                <h3 className="text-xl font-bold text-black mt-8 mb-4">Reaching remote high schools</h3>
                <p>
                    Our trucks spend 2 weeks parked at rural high school campuses. Our technicians guide classes through operating system basics, typing exercises, internet research safety, and basic algorithmic flowcharts using Scratch.
                </p>
                <p>
                    Students who show high test aptitude are selected for our digital scholarships, funding their transit to Addis Ababa for advanced bootcamps at the main Academy.
                </p>
            </>
        ),
        "shesec-cybersecurity": (
            <>
                <p>
                    In cybersecurity, diversity of thought is a critical defensive asset. In Ethiopia, women represent less than 15% of technical security specialists. Our <strong>SheSec initiative</strong> is specifically engineered to bridge this gender divide.
                </p>
                <p>
                    We provide women-only pathways for software development and offensive network testing, complete with transit subsidies and on-site childcare to reduce parental hurdles.
                </p>
                <h3 className="text-xl font-bold text-black mt-8 mb-4">Syllabus rigor</h3>
                <p>
                    The SheSec cohorts cover the exact same rigorous laboratories as our traditional bootcamps, including Linux command-line, packet injection analysis (Wireshark), firewall rule scaffolding, and penetration scanning.
                </p>
                <p>
                    We are proud to announce that 25 senior female students graduated this June, with half already secure in entry-level analyst internships at telecom providers.
                </p>
            </>
        ),
        "first-academy-cohort": (
            <>
                <p>
                    Building a tech talent factory requires more than just compiling scripts. It requires modeling engineering discipline. When we launched Afroec Academy's first cohort, we set out to prove that intensive, free training could yield top-tier software engineers.
                </p>
                <p>
                    Over 4 months, our developers built full-stack CRM modules, integrated payment APIs, and studied database design under senior technology mentors.
                </p>
                <h3 className="text-xl font-bold text-black mt-8 mb-4 font-display">Securing employment</h3>
                <p>
                    The true test of an education program is placement. Within 6 months of graduation, 80%+ of our first cohort secured technical developer positions, and 12 graduates were immediately hired in-house at Afroec Tech.
                </p>
            </>
        ),
        "iot-soil-trackers": (
            <>
                <p>
                    The intersection of hardware chips and local agriculture holds immense promise for smallholder farmers in East Africa. In the Product Hub, our student teams construct micro-sensor devices designed to gauge soil metrics.
                </p>
                <p>
                    Utilizing Arduino, solar batteries, and low-frequency radio transmitters, students build simple devices that calculate soil moisture and transmit data to a mobile terminal.
                </p>
                <h3 className="text-xl font-bold text-black mt-8 mb-4">Testing on farms</h3>
                <p>
                    Students are testing early prototypes on cooperative farmlands outside Addis Ababa, gathering real-world data to refine calibration metrics. We aim to help smallholders double their crop yield by optimizing resource distribution.
                </p>
            </>
        ),
    }[slug] || <p>This post does not exist or has been compiled incorrectly.</p>;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 bg-bg-cream py-12">
                <div className="container-page max-w-3xl">
                    <Reveal>
                        <Link to="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-black mb-8 font-semibold">
                            <ArrowLeft size={14} /> Back to Blog
                        </Link>
                    </Reveal>

                    {/* ARTICLE CONTENT */}
                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-sm">
                        {/* Header info */}
                        <div className="border-b border-border pb-6 mb-8">
                            <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                {post.tag}
                            </span>
                            <h1 className="font-display font-bold text-[32px] md:text-[42px] leading-tight text-black mt-4 mb-6">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-[13px] text-text-secondary mt-4">
                                <span className="flex items-center gap-1.5 font-semibold text-black">
                                    <User size={14} className="text-accent" /> Written by {post.author}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} /> {post.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} /> {post.readTime}
                                </span>
                            </div>
                        </div>

                        {/* Body content */}
                        <div className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed space-y-6">
                            {detailedBody}
                        </div>

                        {/* Author box */}
                        <div className="border-t border-border pt-8 mt-12 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-accent text-black font-display font-bold flex items-center justify-center shrink-0">
                                {post.author.split(" ").map(w => w[0]).join("")}
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">About the author</span>
                                <h4 className="font-display font-bold text-[14px] text-black leading-none mt-1">{post.author}</h4>
                                <p className="text-[12px] text-text-secondary mt-1">Afroec Hub core operations curriculum specialist.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}
