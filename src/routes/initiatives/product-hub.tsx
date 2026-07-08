import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { OrganicShape } from "@/components/OrganicShape";
import heroImg from "@/assets/hero.jpg";
import {
    Sparkles,
    Award,
    Network,
    Users,
    Compass,
    Cpu,
    Bookmark,
    CheckCircle,
    ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/initiatives/product-hub")({
    component: ProductHubPage,
    head: () => ({
        meta: [
            { title: "Product Hub | From Idea to Product in 2 Months" },
            {
                name: "description",
                content: "2-month mentorship program taking you from idea to launched product with expert support.",
            },
        ],
    }),
});

function ProductHubPage() {
    const phases = [
        {
            n: "Phase 1",
            duration: "Weeks 1-2",
            title: "Ideation & Validation",
            desc: "Refine your tech idea through structured user surveys, market sizing, and competitive teardowns. Make sure you are solving a real pain point.",
            deliverable: "Validated problem statement and user persona blueprint.",
        },
        {
            n: "Phase 2",
            duration: "Weeks 3-4",
            title: "Design & Prototyping",
            desc: "Map out user flows and construct clickable Figma prototypes. Put mockups in front of potential clients to gather early interactions.",
            deliverable: "Clickable high-fidelity wireframe and user testing logs.",
        },
        {
            n: "Phase 3",
            duration: "Weeks 5-6",
            title: "Development & Building",
            desc: "Focus on scaffolding only the MVP features. Leverage templates and frameworks to bring the software structure alive quickly.",
            deliverable: "Functional MVP deployed and ready for sandbox beta testing.",
        },
        {
            n: "Phase 4",
            duration: "Weeks 7-8",
            title: "Launch & Pitch",
            desc: "Package your product, outline pricing or rollout paths, and write investor pitch decks. Showcase your work to stakeholders.",
            deliverable: "Launched project live link and investment pitch deck.",
        },
    ];

    const benefits = [
        { icon: Users, title: "Expert Mentorship", desc: "Weekly 1:1 sessions with industry founders, designers, and senior engineers." },
        { icon: Cpu, title: "Technical Resources", desc: "Free cloud credits (AWS/Azure), development API passes, and design premium licenses." },
        { icon: Compass, title: "Workspace Labs", desc: "24/7 access to our co-working office in Addis Ababa with stable fiber and power backups." },
        { icon: Network, title: "Industry Network", desc: "Direct introductions to startup accelerators, angel investors, and company hiring managers." },
        { icon: Award, title: "Funding Support", desc: "Assistance writing non-dilutive grant applications and pre-seed pitches." },
        { icon: Sparkles, title: "Demo Showcase Day", desc: "Present your launched MVP to public media, venture funds, and potential partners." },
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
                            <span className="eyebrow bg-accent-light text-black px-3 py-1 rounded-full border border-accent/25 inline-block">LAUNCHPAD</span>
                            <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                                Product Hub
                            </h1>
                            <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary leading-relaxed max-w-xl">
                                From idea to launched software in 2 months. Get expert mentorship, cloud capital, and a community of builders.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/get-involved/apply" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold shadow-sm">
                                    Apply with Your Idea
                                </Link>
                                <a
                                    href="#phases"
                                    className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white"
                                >
                                    Learn More
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="relative hidden lg:block">
                            <OrganicShape variant={3} className="-inset-4 opacity-50" />
                            <div className="aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-md">
                                <img src={heroImg} alt="Developers demonstrating startup app demo" className="w-full h-full object-cover" />
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* DETAILS */}
                <section className="py-24 bg-bg-cream border-y border-border/40">
                    <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <span className="eyebrow">WHAT IS PRODUCT HUB?</span>
                            <h2 className="mt-4 font-display font-bold text-[32px] md:text-[40px] text-black">
                                Bridge the Gap Between Idea and App
                            </h2>
                            <div className="mt-6 space-y-4 text-[16px] text-text-secondary leading-relaxed animate-fade-in">
                                <p>
                                    So many great ideas remain drafts in notebooks because of a lack of technical support or structural accountability. The Product Hub exists to make building inevitable.
                                </p>
                                <p>
                                    We don't teach programming logic here; we assume you or your team have basic coding skills. Instead, we teach the art of delivery. How do you slice features? How do you deploy securely? How do you query customer feedback?
                                </p>
                                <p>
                                    Whether you are building a fintech application, an agricultural IoT tracker, or a local language education game, the Product Hub surrounds you with the resources to ship it.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={2} className="bg-white border border-border p-8 rounded-[16px] shadow-xs">
                            <h3 className="font-display text-[22px] font-bold text-black border-b border-border pb-4 mb-6">Who Should Apply</h3>
                            <div className="space-y-4">
                                {[
                                    "Aspiring founders with a validated local tech idea",
                                    "Developers wanting to turn a side script into a product",
                                    "Diverse teams seeking cloud equipment and workspaces",
                                    "Recent graduates looking to bootstrap their capstone project",
                                ].map((item) => (
                                    <div key={item} className="flex gap-3 items-start font-medium text-black">
                                        <span className="mt-1 shrink-0 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
                                            <CheckCircle size={10} className="text-black" />
                                        </span>
                                        <span className="text-[14px] leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* 2-MONTH JOURNEY PHASES */}
                <section id="phases" className="py-24 bg-white">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="THE PROGRAM timeline"
                            title="The 2-Month Journey"
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {phases.map((p, idx) => (
                                <Reveal key={p.title} delay={((idx % 4) + 1) as 1 | 2 | 3 | 4} className="bg-white border border-border p-8 rounded-[16px] hover:border-black transition-all flex flex-col">
                                    <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                                        <span className="font-display text-[36px] font-bold text-accent leading-none">{p.n}</span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream px-2 py-1 rounded border border-border">{p.duration}</span>
                                    </div>
                                    <h3 className="font-display text-[18px] font-bold text-black mb-3 leading-snug">{p.title}</h3>
                                    <p className="text-[13px] text-text-secondary leading-relaxed flex-1 mb-6">{p.desc}</p>
                                    <div className="border-t border-border pt-4 mt-auto">
                                        <strong className="text-[11px] uppercase tracking-wider text-text-muted block">Deliverable:</strong>
                                        <span className="text-[12px] text-black font-semibold mt-1 block leading-snug">{p.deliverable}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* BENEFITS: WHAT YOU GET */}
                <section className="py-24 bg-bg-cream border-t border-border/40">
                    <div className="container-page">
                        <SectionHeader
                            eyebrow="RESOURCES"
                            title="What You Get"
                            align="center"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, idx) => {
                                const Icon = benefit.icon;
                                return (
                                    <Reveal key={benefit.title} delay={((idx % 3) + 1) as 1 | 2 | 3} className="bg-white border border-border p-8 rounded-[16px] flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center shrink-0 text-black">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[18px] font-bold text-black mb-2">{benefit.title}</h3>
                                            <p className="text-[13px] text-text-secondary leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* SUCCESS CASE STUDY */}
                <section className="py-24 bg-white border-t border-border/40">
                    <div className="container-page max-w-4xl">
                        <SectionHeader
                            eyebrow="SUCCESS STORIES"
                            title="Idea to MVP Success Case"
                            align="center"
                        />

                        <Reveal className="bg-bg-cream border border-border p-8 md:p-12 rounded-[24px] grid md:grid-cols-[1fr_200px] gap-8 items-center">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-accent border border-accent/40 bg-white px-3 py-1 rounded-full">AGRITECH</span>
                                <h3 className="font-display text-[26px] font-bold text-black mt-4 mb-3">GebeyaNet IoT Platform</h3>
                                <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
                                    Two hardware engineering trainees joined the Product Hub with a raw circuit blueprint. Over 8 weeks, they refined the backend modules, prototyped custom analytics, and deployed their sensor app on AWS.
                                </p>
                                <div className="flex gap-8">
                                    <div>
                                        <div className="text-[20px] font-bold text-black font-display">Week 4</div>
                                        <div className="text-[11px] text-text-muted uppercase tracking-wider mt-1">First Prototype</div>
                                    </div>
                                    <div>
                                        <div className="text-[20px] font-bold text-black font-display">150+ Clients</div>
                                        <div className="text-[11px] text-text-muted uppercase tracking-wider mt-1">Beta Signups</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center font-display border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
                                <span className="text-accent text-[44px] font-bold block leading-none">8</span>
                                <span className="text-[12px] font-bold text-black uppercase tracking-wider block mt-1">Weeks</span>
                                <span className="text-[11px] text-text-secondary block mt-1">to Play Store deployment</span>
                            </div>
                        </Reveal>

                        <div className="text-center mt-14">
                            <Link to="/get-involved/apply" className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                Apply with Your Idea <ArrowRight size={16} className="inline ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
