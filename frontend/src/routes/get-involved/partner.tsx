import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { CheckCircle2, ArrowLeft, Loader2, Building2 } from "lucide-react";
import { submitPartnerInquiry } from "@/lib/api";
import { formatApiError, mapPartnerForm } from "@/lib/form-mappers";

export const Route = createFileRoute("/get-involved/partner")({
    component: PartnerPage,
    head: () => ({
        meta: [
            { title: "Partner With Us | Afroec Hub" },
            {
                name: "description",
                content: "Collaborate with Afroec Hub to fund cohorts, donate tech equipment, or hire qualified students.",
            },
        ],
    }),
});

function PartnerPage() {
    const [formData, setFormData] = useState({
        orgName: "",
        contactName: "",
        email: "",
        phone: "",
        partnerStyle: "Cohorts Sponsorship",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        try {
            await submitPartnerInquiry(mapPartnerForm(formData));
            setSubmitted(true);
        } catch (err) {
            setErrorMsg(formatApiError(err));
        } finally {
            setLoading(false);
        }
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
                        <h1 className="font-display font-bold text-[28px] md:text-[32px] text-black">Inquiry Submitted</h1>
                        <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
                            Thank you, <strong className="text-black">{formData.contactName}</strong>. Our partnership team will review the details for <strong className="text-black">{formData.orgName}</strong> and follow up on <strong className="text-black">{formData.email}</strong> or <strong className="text-black">{formData.phone}</strong> within 2 business days.
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
                            <Building2 size={20} />
                        </div>
                        <h1 className="font-display font-bold text-[30px] text-black mb-2">Partner With Us</h1>
                        <p className="text-[14px] text-text-secondary mb-8">
                            Collaborate to sponsor physical computer terminals, fund engineering cohorts, or recruit verified graduates.
                        </p>

                        {errorMsg && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[14px] font-medium" role="alert">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Org Name */}
                            <div className="flex flex-col">
                                <label htmlFor="orgName" className="text-[13px] font-bold text-black mb-2">Company / Organization *</label>
                                <input
                                    type="text"
                                    id="orgName"
                                    name="orgName"
                                    required
                                    placeholder="Organization or initiative name"
                                    value={formData.orgName}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Contact Representative */}
                            <div className="flex flex-col">
                                <label htmlFor="contactName" className="text-[13px] font-bold text-black mb-2">Contact Person *</label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    required
                                    placeholder="Representative full name"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-[13px] font-bold text-black mb-2">Business Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="work@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label htmlFor="phone" className="text-[13px] font-bold text-black mb-2">Telephone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Optional connection phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors"
                                />
                            </div>

                            {/* Partnership Choice */}
                            <div className="flex flex-col">
                                <label htmlFor="partnerStyle" className="text-[13px] font-bold text-black mb-2">Partnership Focus *</label>
                                <select
                                    id="partnerStyle"
                                    name="partnerStyle"
                                    value={formData.partnerStyle}
                                    onChange={handleChange}
                                    className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 bg-white transition-colors"
                                >
                                    <option value="Cohorts Sponsorship">Sponsor Tech Cohorts / Labs</option>
                                    <option value="Hiring Graduates">Recruit & Hire Academy Graduates</option>
                                    <option value="Guest Masterclasses">Deliver Guest Technical Masterclasses</option>
                                    <option value="Technical Collaboration">Software & API Collaborations</option>
                                </select>
                            </div>

                            {/* Custom inquiry */}
                            <div className="flex flex-col">
                                <label htmlFor="message" className="text-[13px] font-bold text-black mb-2">How would you like to collaborate? *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Briefly outline your collaboration interests or suggestions."
                                    value={formData.message}
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
                                            <Loader2 size={16} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        "Send Partnership Inquiry"
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
