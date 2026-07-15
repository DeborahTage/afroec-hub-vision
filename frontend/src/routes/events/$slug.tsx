import { useEffect, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { getEventBySlug, registerForEvent } from "@/lib/api";
import type { EventItem } from "@/types/api";
import { formatApiError } from "@/lib/form-mappers";
import {
    ArrowLeft,
    Calendar,
    Clock,
    ExternalLink,
    Loader2,
    MapPin,
    Users,
    CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/events/$slug")({
    component: EventDetailPage,
    head: () => ({
        meta: [{ title: "Event details | Afroec Hub" }],
    }),
});

const FALLBACK_BY_SLUG: Record<string, EventItem> = {
    "intro-to-cybersecurity-workshop": {
        id: 1,
        title: "Intro to Cybersecurity Workshop",
        slug: "intro-to-cybersecurity-workshop",
        description: "A hands-on afternoon covering passwords, phishing awareness, and first Linux commands.",
        content:
            "Join mentors for a practical introduction to digital safety and cybersecurity foundations. Ideal for high school and first-year university students. Bring a laptop if you have one—loaner devices available on site.",
        eventDate: "2026-08-12",
        eventTime: "14:00:00",
        location: "Afroec Hub, Addis Ababa",
        category: "Workshops",
        status: "UPCOMING",
        maxAttendees: 40,
        registrationLink: "/get-involved/apply",
    },
    "shesec-summer-bootcamp": {
        id: 2,
        title: "SheSec Summer Bootcamp",
        slug: "shesec-summer-bootcamp",
        description: "Two-week intensive for women entering security pathways—labs, mentors, and portfolio projects.",
        content:
            "SheSec’s summer bootcamp pairs rigorous labs with mentorship from women in security. Hybrid seats available. Transit stipends and childcare support for eligible participants.",
        eventDate: "2026-09-01",
        eventTime: "09:00:00",
        location: "Hybrid · Addis + Online",
        category: "Bootcamps",
        status: "UPCOMING",
        maxAttendees: 60,
    },
    "national-student-hack-challenge": {
        id: 3,
        title: "National Student Hack Challenge",
        slug: "national-student-hack-challenge",
        description: "Teams from high schools and universities compete to ship solutions for local problems.",
        content:
            "Build with your team over a weekend, present to judges, and earn mentorship for your next MVP. Open to Tech Club members and open applicants.",
        eventDate: "2026-10-18",
        eventTime: "10:00:00",
        location: "Addis Ababa Science Expo Hall",
        category: "Competitions",
        status: "UPCOMING",
    },
    "ethiopian-tech-education-conference": {
        id: 4,
        title: "Ethiopian Tech Education Conference",
        slug: "ethiopian-tech-education-conference",
        description: "Educators, partners, and builders gather to shape the next decade of tech learning.",
        content:
            "Panels, partner showcases, and student demos focused on expanding technology education across Ethiopia.",
        eventDate: "2026-11-07",
        eventTime: "08:30:00",
        location: "Skylight Hotel, Addis Ababa",
        category: "Conferences",
        status: "UPCOMING",
    },
    "club-leaders-meetup": {
        id: 5,
        title: "Club Leaders Meetup",
        slug: "club-leaders-meetup",
        description: "Past gathering of Afroec Tech Club leads sharing playbooks and campus wins.",
        content: "A recap meetup for club presidents and founding ambassadors—sharing session formats and growth tactics.",
        eventDate: "2026-03-15",
        eventTime: "16:00:00",
        location: "Afroec Hub, Addis Ababa",
        category: "Workshops",
        status: "PAST",
    },
    "hardware-prototyping-weekend": {
        id: 6,
        title: "Hardware Prototyping Weekend",
        slug: "hardware-prototyping-weekend",
        description: "Arduino and Raspberry Pi sprint for Product Hub alumni and club makers.",
        content: "Sensors, circuits, and demos—participants left with working prototypes and project write-ups.",
        eventDate: "2026-01-24",
        eventTime: "09:00:00",
        location: "Hub Maker Lab",
        category: "Bootcamps",
        status: "PAST",
    },
};

function formatDate(date?: string) {
    if (!date) return "Date TBA";
    try {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return date;
    }
}

function formatTime(time?: string) {
    if (!time) return null;
    const [h, m] = time.split(":");
    if (h == null) return time;
    const hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m ?? "00"} ${ampm}`;
}

function EventDetailPage() {
    const { slug } = useParams({ from: "/events/$slug" });
    const [event, setEvent] = useState<EventItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const data = await getEventBySlug(slug);
                if (cancelled) return;
                setEvent(data);
            } catch {
                if (cancelled) return;
                const fallback = FALLBACK_BY_SLUG[slug];
                if (fallback) {
                    setEvent(fallback);
                } else {
                    setEvent(null);
                    setNotFound(true);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [slug]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 bg-bg-cream py-12">
                <div className="container-page max-w-3xl">
                    <Reveal>
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-black mb-8 font-semibold"
                        >
                            <ArrowLeft size={14} /> Back to Events
                        </Link>
                    </Reveal>

                    {loading ? (
                        <div className="flex justify-center py-24 text-text-secondary gap-2 items-center">
                            <Loader2 className="animate-spin" size={20} />
                            Loading event…
                        </div>
                    ) : notFound || !event ? (
                        <Reveal className="bg-white border border-border rounded-[24px] p-10 text-center shadow-sm">
                            <h1 className="font-display text-[28px] font-bold text-black mb-3">Event not found</h1>
                            <p className="text-[15px] text-text-secondary mb-8">
                                This event may have been unpublished or the link is incorrect.
                            </p>
                            <Link to="/events" className="btn-pill bg-black text-white hover:bg-neutral-800">
                                Browse all events
                            </Link>
                        </Reveal>
                    ) : (
                        <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-sm">
                            <div className="border-b border-border pb-6 mb-8">
                                <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                    {event.category || "Event"}
                                </span>
                                {event.status && (
                                    <span className="ml-2 text-[11px] font-bold uppercase tracking-wider bg-accent-light border border-accent/30 px-3 py-1 rounded-full text-black">
                                        {event.status}
                                    </span>
                                )}
                                <h1 className="font-display font-bold text-[32px] md:text-[42px] leading-tight text-black mt-4 mb-4">
                                    {event.title}
                                </h1>
                                {event.description && (
                                    <p className="text-[16px] text-text-secondary leading-relaxed">{event.description}</p>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                <MetaCard icon={Calendar} label="Date" value={formatDate(event.eventDate)} />
                                <MetaCard
                                    icon={Clock}
                                    label="Time"
                                    value={formatTime(event.eventTime) || "Time TBA"}
                                />
                                <MetaCard icon={MapPin} label="Location" value={event.location || "Location TBA"} />
                                {event.maxAttendees != null && (
                                    <MetaCard
                                        icon={Users}
                                        label="Capacity"
                                        value={`${event.maxAttendees} seats`}
                                    />
                                )}
                            </div>

                            {event.content && (
                                <div className="text-[15px] md:text-[16px] text-text-secondary leading-relaxed space-y-4 mb-10 whitespace-pre-line">
                                    {event.content}
                                </div>
                            )}

                            <div className="border-t border-border pt-8 flex flex-wrap gap-4 mb-10">
                                {event.registrationLink ? (
                                    event.registrationLink.startsWith("http") ? (
                                        <a
                                            href={event.registrationLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold inline-flex items-center gap-2"
                                        >
                                            Register <ExternalLink size={16} />
                                        </a>
                                    ) : (
                                        <Link
                                            to={event.registrationLink as "/get-involved/apply"}
                                            className="btn-pill bg-accent text-black hover:bg-accent-hover font-bold"
                                        >
                                            Register
                                        </Link>
                                    )
                                ) : null}
                                <Link
                                    to="/events"
                                    className="btn-pill bg-transparent border-2 border-black text-black hover:bg-black hover:text-white"
                                >
                                    All events
                                </Link>
                            </div>

                            {event.status !== "PAST" && event.status !== "CANCELLED" && (
                                <EventRegisterForm eventId={event.id} />
                            )}
                            {(event.status === "PAST" || event.status === "CANCELLED") && (
                                <div className="rounded-xl border border-border bg-bg-cream p-6 text-[14px] text-text-secondary">
                                    This event has ended. Registration is closed.
                                </div>
                            )}
                        </Reveal>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function EventRegisterForm({ eventId }: { eventId: number }) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        institution: "",
        dietaryRequirements: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await registerForEvent(eventId, form);
            setDone(true);
        } catch (err) {
            setError(formatApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (done) {
        return (
            <div className="rounded-2xl border border-border bg-white p-8 text-center">
                <CheckCircle2 className="mx-auto text-green-600 mb-3" size={36} />
                <h3 className="font-display font-bold text-[22px] text-black">You&apos;re registered!</h3>
                <p className="mt-2 text-[14px] text-text-secondary">We&apos;ll email event details soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-4">
            <h3 className="font-display font-bold text-[20px] text-black">Register for this event</h3>
            {error && <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
            <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Full name" className="rounded-xl border border-border px-4 py-3 text-[14px]" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                <input required type="email" placeholder="Email" className="rounded-xl border border-border px-4 py-3 text-[14px]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Phone" className="rounded-xl border border-border px-4 py-3 text-[14px]" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input placeholder="Institution" className="rounded-xl border border-border px-4 py-3 text-[14px]" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} />
            </div>
            <textarea placeholder="Dietary / accessibility needs (optional)" rows={3} className="w-full rounded-xl border border-border px-4 py-3 text-[14px]" value={form.dietaryRequirements} onChange={(e) => setForm({ ...form, dietaryRequirements: e.target.value })} />
            <button type="submit" disabled={loading} className="btn-pill bg-accent text-black font-bold disabled:opacity-50">
                {loading ? "Submitting…" : "Submit registration"}
            </button>
        </form>
    );
}

function MetaCard({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Calendar;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-bg-cream border border-border rounded-xl p-4 flex gap-3 items-start">
            <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-black">
                <Icon size={16} />
            </div>
            <div>
                <div className="text-[11px] uppercase tracking-wider text-text-muted font-bold">{label}</div>
                <div className="text-[14px] font-semibold text-black mt-0.5 leading-snug">{value}</div>
            </div>
        </div>
    );
}
