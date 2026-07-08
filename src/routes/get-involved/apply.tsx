import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useState } from "react";
import { CheckCircle2, ArrowLeft, Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/get-involved/apply")({
    component: ApplyPage,
    head: () => ({
        meta: [
            { title: "Apply Now | Student Application | Afroec Hub" },
            {
                name: "description",
                content: "Apply for our free technology education programs in software, cybersecurity, and hardware engineering.",
            },
        ],
    }),
});

function ApplyPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        city: "Addis Ababa",
        track: "Software Engineering",
        background: "High School Student",
        motivation: "",
        puzzleAnswer: "",
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [confirmCode, setConfirmCode] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        // Validate logic puzzle
        if (formData.puzzleAnswer.trim() !== "38") {
            setErrorMsg("Analytical Puzzle Answer is incorrect. Please double check.");
            return;
        }

        setLoading(true);
        // Simulate API request
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setConfirmCode(`AHUB-${Math.floor(100000 + Math.random() * 900000)}`);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-bg-cream text-foreground flex flex-col">
                <Navbar />
                <main className="flex-1 container-page py-24 flex items-center justify-center">
                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 max-w-lg text-center shadow-lg w-full">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 animate-bounce">
                            <CheckCircle2 size={32} />
                        </div>

                        <h1 className="font-display font-bold text-[28px] md:text-[32px] text-black">Application Received!</h1>

                        <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
                            Thank you, <strong className="text-black">{formData.fullName}</strong>. Your application for the <strong className="text-black">{formData.track}</strong> track has been logged.
                        </p>

                        <div className="my-8 bg-bg-cream border border-border rounded-xl p-4">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted">Confirmation Code</div>
                            <div className="font-display text-[22px] font-bold text-black mt-1 tracking-wider">{confirmCode}</div>
                        </div>

                        <div className="text-left space-y-4 border-t border-border pt-6 text-[13px] text-text-secondary">
                            <div className="font-black text-black">NEXT STEPS:</div>
                            <p>1. Check email <strong className="text-black">{formData.email}</strong> for validation instructions within 24 hours.</p>
                            <p>2. We will send an SMS to <strong className="text-black">{formData.phone}</strong> with details on the logical test invitation date.</p>
                        </div>

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
                <div className="container-page max-w-3xl">
                    <Reveal>
                        <Link to="/get-involved" className="inline-flex items-center gap-1 text-[13px] text-text-secondary hover:text-black mb-6">
                            <ArrowLeft size={14} /> Back to Get Involved
                        </Link>
                    </Reveal>

                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-sm">
                        <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-[0.15em] flex items-center gap-1.5 mb-3">
                            <Sparkles size={12} className="text-accent" />
                            AFROEC ACADEMY
                        </span>
                        <h1 className="font-display font-bold text-[32px] md:text-[40px] text-black mb-2">Student Application Form</h1>
                        <p className="text-[14px] text-text-secondary mb-8">
                            Fill out this form to apply for our next upcoming cohorts. Tuition is completely sponsored for accepted candidates.
                        </p>

                        {errorMsg && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[14px] font-medium" role="alert">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="flex flex-col">
                                    <label htmlFor="fullName" className="text-[13px] font-bold text-black mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        placeholder="Enter your full name"
                                        value={formData.fullName}
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
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
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

                                {/* Age */}
                                <div className="flex flex-col">
                                    <label htmlFor="age" className="text-[13px] font-bold text-black mb-2">Age *</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        min="15"
                                        max="35"
                                        required
                                        placeholder="Eligible: 16-35"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                    />
                                </div>

                                {/* City */}
                                <div className="flex flex-col">
                                    <label htmlFor="city" className="text-[13px] font-bold text-black mb-2">Current Location *</label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors bg-white"
                                    >
                                        <option value="Addis Ababa">Addis Ababa</option>
                                        <option value="Hawassa">Hawassa</option>
                                        <option value="Adama">Adama</option>
                                        <option value="Bahir Dar">Bahir Dar</option>
                                        <option value="Mekelle">Mekelle</option>
                                        <option value="Jimma">Jimma</option>
                                        <option value="Other">Other Region</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Track choice */}
                                <div className="flex flex-col">
                                    <label htmlFor="track" className="text-[13px] font-bold text-black mb-2">Interest Track *</label>
                                    <select
                                        id="track"
                                        name="track"
                                        value={formData.track}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors bg-white"
                                    >
                                        <option value="Software Engineering">Software Engineering (4 Months)</option>
                                        <option value="Cybersecurity">Cybersecurity Analyst (4 Months)</option>
                                        <option value="Hardware Engineering">Hardware & IoT (2 Months)</option>
                                        <option value="Product Hub Mentorship">Product Hub Incubation (2 Months)</option>
                                    </select>
                                </div>

                                {/* Educational background */}
                                <div className="flex flex-col">
                                    <label htmlFor="background" className="text-[13px] font-bold text-black mb-2">Highest Education Level *</label>
                                    <select
                                        id="background"
                                        name="background"
                                        value={formData.background}
                                        onChange={handleChange}
                                        className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors bg-white"
                                    >
                                        <option value="High School Student">High School Graduate / Student</option>
                                        <option value="University Student">Current University Student</option>
                                        <option value="University Graduate">University Graduate (CS / Tech)</option>
                                        <option value="University Non-Tech">University Graduate (Non-Tech)</option>
                                        <option value="Self-Taught">Self-Taught / Unemployed Youth</option>
                                    </select>
                                </div>
                            </div>

                            {/* Motivation */}
                            <div className="flex flex-col">
                                <label htmlFor="motivation" className="text-[13px] font-bold text-black mb-2">Why do you want to join Afroec Hub? *</label>
                                <textarea
                                    id="motivation"
                                    name="motivation"
                                    required
                                    rows={4}
                                    placeholder="Outline your background, goals, and why you should be chosen for our limited cohort seats in 2-3 sentences."
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors resize-y"
                                />
                            </div>

                            {/* Math Analytical Puzzle */}
                            <div className="bg-bg-cream border border-border rounded-xl p-5 block">
                                <label htmlFor="puzzleAnswer" className="font-display font-bold text-[14px] text-black block mb-2">
                                    Analytical Logic Test: What is <span className="underline decoration-accent font-black">15 + 23</span>? *
                                </label>
                                <input
                                    type="text"
                                    id="puzzleAnswer"
                                    name="puzzleAnswer"
                                    required
                                    placeholder="Enter direct numeric double-digit value"
                                    value={formData.puzzleAnswer}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent w-full"
                                />
                                <span className="text-[11px] text-text-muted mt-2 block font-medium">To avoid automated spam submits.</span>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> Logging Application...
                                        </>
                                    ) : (
                                        "Submit Application"
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
