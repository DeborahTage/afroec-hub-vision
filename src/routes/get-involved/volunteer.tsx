import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { CheckCircle2, ArrowLeft, Loader2, Heart } from "lucide-react";

export const Route = createFileRoute("/get-involved/volunteer")({
    component: VolunteerPage,
    head: () => ({
        meta: [
            { title: "Volunteer With Us | Afroec Hub" },
            {
                name: "description",
                content: "Join us as a mentor, trainer, or event facilitator. Share your knowledge with the next generation.",
            },
        ],
    }),
});

function VolunteerPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        expertise: "Software Engineering",
        hours: "1-5 hours",
        linkedinUrl: "",
        motivation: "",
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-bg-cream text-foreground flex flex-col">
                <Navbar />
                <main className="flex-1 container-page py-24 flex items-center justify-center">
                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 max-w-lg text-center shadow-lg w-full">
                        <div className="h-16 w-16 bg-accent-light rounded-full flex items-center justify-center mx-auto text-black mb-6 animate-bounce">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="font-display font-bold text-[28px] md:text-[32px] text-black">Volunteer Registered!</h1>
                        <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
                            Thank you, <strong className="text-black">{formData.name}</strong>. We appreciate you donating your tech skills. Our volunteer coordinator will contact you at <strong className="text-black">{formData.email}</strong> to arrange an introductory chat.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link to="/" className="btn-pill bg-black text-white hover:bg-neutral-800 text-[14px]">
                                Return to Home
                            </Link>
                        </div>
                    </Reveal>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 py-12 bg-bg-cream">
                <div className="container-page max-w-xl">
                    <Reveal>
                        <Link to="/get-involved" className="inline-flex items-center gap-1 text-[13px] text-text-secondary hover:text-black mb-6">
                            <ArrowLeft size={14} /> Back to Get Involved
                        </Link>
                    </Reveal>

                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-10 shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center mb-6 text-black">
                            <Heart size={20} />
                        </div>
                        <h1 className="font-display font-bold text-[30px] text-black mb-2">Volunteer With Us</h1>
                        <p className="text-[14px] text-text-secondary mb-8">
                            Join our community of developers, technical trainers, translators, and software mentors.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-[13px] font-bold text-black mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-[13px] font-bold text-black mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="text-[13px] font-bold text-black mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    placeholder="0911000000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Expertise */}
                                <div className="flex flex-col">
                                    <label htmlFor="expertise" className="text-[13px] font-bold text-black mb-2">Primary Skill *</label>
                                    <select
                                        id="expertise"
                                        name="expertise"
                                        value={formData.expertise}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 bg-white transition-colors"
                                    >
                                        <option value="Software Engineering">Software Mentoring</option>
                                        <option value="Cybersecurity">Cybersecurity Training</option>
                                        <option value="Hardware Labs">Hardware Labs Help</option>
                                        <option value="UI UX Design">UI/UX Design Mentoring</option>
                                        <option value="English Amharic Translations">Amharic Translations</option>
                                        <option value="General Admin">Event & Admin Support</option>
                                    </select>
                                </div>

                                {/* Hours per Week */}
                                <div className="flex flex-col">
                                    <label htmlFor="hours" className="text-[13px] font-bold text-black mb-2">Hours / Week *</label>
                                    <select
                                        id="hours"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 bg-white transition-colors"
                                    >
                                        <option value="1-5 hours">1 to 5 Hours</option>
                                        <option value="6-10 hours">6 to 10 Hours</option>
                                        <option value="10+ hours">10+ Hours</option>
                                    </select>
                                </div>
                            </div>

                            {/* LinkedIn URL */}
                            <div className="flex flex-col">
                                <label htmlFor="linkedinUrl" className="text-[13px] font-bold text-black mb-2">LinkedIn Profile URL</label>
                                <input
                                    type="url"
                                    id="linkedinUrl"
                                    name="linkedinUrl"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedinUrl}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Motivation */}
                            <div className="flex flex-col">
                                <label htmlFor="motivation" className="text-[13px] font-bold text-black mb-2">Tell us about your background *</label>
                                <textarea
                                    id="motivation"
                                    name="motivation"
                                    required
                                    rows={4}
                                    placeholder="Give a short summary of your professional engineering background and why you want to support students."
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors resize-y"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> Registering...
                                        </>
                                    ) : (
                                        "Register as Volunteer"
                                    )}
                                </button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}
