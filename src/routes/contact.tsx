import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    CheckCircle2,
    Loader2,
    Linkedin,
    Instagram,
} from "lucide-react";
import { submitContactForm } from "@/lib/api";
import { formatApiError, mapContactForm } from "@/lib/form-mappers";

export const Route = createFileRoute("/contact")({
    component: ContactPage,
    head: () => ({
        meta: [
            { title: "Contact Us | Afroec Hub" },
            {
                name: "description",
                content: "Have a question about admissions, partnerships, or volunteering? Get in touch with our team in Addis Ababa.",
            },
        ],
    }),
});

function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
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
            await submitContactForm(mapContactForm(formData));
            setSubmitted(true);
        } catch (err) {
            setErrorMsg(formatApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 bg-bg-cream py-16">
                <div className="container-page">
                    <Reveal className="text-center max-w-2xl mx-auto mb-16">
                        <span className="eyebrow">GET IN TOUCH</span>
                        <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                            Contact Us
                        </h1>
                        <p className="mt-6 text-[16px] md:text-[18px] text-text-secondary leading-relaxed">
                            Have a question about admissions, partnerships, or volunteering? Reach out and we will write you back.
                        </p>
                    </Reveal>

                    <div className="grid lg:grid-cols-[55fr_45fr] gap-12 max-w-5xl mx-auto items-start">
                        {/* Contact Form OR Success Page */}
                        <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-10 shadow-sm w-full">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="h-16 w-16 bg-accent-light rounded-full flex items-center justify-center mx-auto text-black mb-6">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h2 className="font-display font-bold text-[26px] text-black">Message Sent!</h2>
                                    <p className="mt-4 text-[14px] text-text-secondary leading-relaxed">
                                        Thank you, <strong className="text-black">{formData.name}</strong>. We have received your inquiry regarding <strong className="text-black">{formData.subject}</strong>. Our support team will write to <strong className="text-black">{formData.email}</strong> shortly.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                                        }}
                                        className="mt-8 btn-pill bg-black text-white hover:bg-neutral-800 text-[14px]"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h2 className="font-display text-[22px] font-bold text-black border-b border-border pb-4 mb-2">Send a Message</h2>

                                    {errorMsg && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[14px] font-medium" role="alert">
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Name */}
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-[13px] font-bold text-black mb-2">Your Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Enter your name"
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

                                    {/* Subject */}
                                    <div className="flex flex-col">
                                        <label htmlFor="subject" className="text-[13px] font-bold text-black mb-2">Subject *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 bg-white transition-colors"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Admissions">Academy Admissions & Cohorts</option>
                                            <option value="Corporate Partnership">Enterprise Sponsorships</option>
                                            <option value="Volunteer Programs">Volunteer Opportunities</option>
                                            <option value="Media Request">Media & Press</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col">
                                        <label htmlFor="message" className="text-[13px] font-bold text-black mb-2">Your Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Write your details or questions here..."
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
                                                    <Loader2 size={16} className="animate-spin" /> Sending Message...
                                                </>
                                            ) : (
                                                "Send Message"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Reveal>

                        {/* Info details */}
                        <Reveal delay={2} className="space-y-8 lg:pl-6">
                            <div className="bg-white border border-border rounded-[24px] p-8 md:p-10 shadow-sm">
                                <h2 className="font-display text-[22px] font-bold text-black border-b border-border pb-4 mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[15px] font-bold text-black">Our Headquarters</h3>
                                            <p className="text-[13px] text-text-secondary mt-1 leading-relaxed">
                                                Addis Ababa, Bole Welo Sefer,<br />
                                                Ethiopia
                                            </p>
                                        </div>
                                    </div>

                                    {/* Telephone */}
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[15px] font-bold text-black">Call Us</h3>
                                            <p className="text-[13px] text-text-secondary mt-1">
                                                <a href="tel:+251916416887" className="hover:text-black transition-colors">
                                                    +251 916 416 887
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[15px] font-bold text-black">Email Address</h3>
                                            <p className="text-[13px] text-text-secondary mt-1">
                                                support@afroec.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[15px] font-bold text-black">Operating Hours</h3>
                                            <p className="text-[13px] text-text-secondary mt-1">
                                                Monday – Friday: 8:30 AM – 5:30 PM<br />
                                                Saturday: 9:00 AM – 1:00 PM (Lab access ONLY)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Socials card */}
                            <div className="bg-bg-dark text-white rounded-[24px] p-8 shadow-md">
                                <h3 className="font-display font-bold text-[18px] text-white border-b border-border-dark pb-3 mb-4">Connect With Our Community</h3>
                                <div className="flex gap-3">
                                    {[
                                        { Icon: Linkedin, href: "https://www.linkedin.com/company/afroec", label: "LinkedIn" },
                                        { Icon: Instagram, href: "https://www.instagram.com/afro_ec", label: "Instagram" },
                                    ].map(({ Icon, href, label }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-10 w-10 rounded-full border border-border-dark flex items-center justify-center text-text-muted hover:text-white hover:border-accent transition-colors"
                                            aria-label={label}
                                        >
                                            <Icon size={16} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
