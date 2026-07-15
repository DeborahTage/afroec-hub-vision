import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { getEvents } from "@/lib/api";
import type { EventItem } from "@/types/api";
import { ArrowRight, Calendar, Clock, Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/")({
    component: EventsIndexPage,
    head: () => ({
        meta: [
            { title: "Events | Afroec Hub" },
            {
                name: "description",
                content: "Upcoming workshops, bootcamps, competitions, and conferences from Afroec Hub.",
            },
        ],
    }),
});

const FILTERS = ["All", "Workshops", "Bootcamps", "Competitions", "Conferences"] as const;
type Filter = (typeof FILTERS)[number];

const SAMPLE_EVENTS: EventItem[] = [
    {
        id: 1,
        title: "Intro to Cybersecurity Workshop",
        slug: "intro-to-cybersecurity-workshop",
        description: "A hands-on afternoon covering passwords, phishing awareness, and first Linux commands.",
        eventDate: "2026-08-12",
        eventTime: "14:00:00",
        location: "Afroec Hub, Addis Ababa",
        category: "Workshops",
        status: "UPCOMING",
    },
    {
        id: 2,
        title: "SheSec Summer Bootcamp",
        slug: "shesec-summer-bootcamp",
        description: "Two-week intensive for women entering security pathways—labs, mentors, and portfolio projects.",
        eventDate: "2026-09-01",
        eventTime: "09:00:00",
        location: "Hybrid · Addis + Online",
        category: "Bootcamps",
        status: "UPCOMING",
    },
    {
        id: 3,
        title: "National Student Hack Challenge",
        slug: "national-student-hack-challenge",
        description: "Teams from high schools and universities compete to ship solutions for local problems.",
        eventDate: "2026-10-18",
        eventTime: "10:00:00",
        location: "Addis Ababa Science Expo Hall",
        category: "Competitions",
        status: "UPCOMING",
    },
    {
        id: 4,
        title: "Ethiopian Tech Education Conference",
        slug: "ethiopian-tech-education-conference",
        description: "Educators, partners, and builders gather to shape the next decade of tech learning.",
        eventDate: "2026-11-07",
        eventTime: "08:30:00",
        location: "Skylight Hotel, Addis Ababa",
        category: "Conferences",
        status: "UPCOMING",
    },
    {
        id: 5,
        title: "Club Leaders Meetup",
        slug: "club-leaders-meetup",
        description: "Past gathering of Afroec Tech Club leads sharing playbooks and campus wins.",
        eventDate: "2026-03-15",
        eventTime: "16:00:00",
        location: "Afroec Hub, Addis Ababa",
        category: "Workshops",
        status: "PAST",
    },
    {
        id: 6,
        title: "Hardware Prototyping Weekend",
        slug: "hardware-prototyping-weekend",
        description: "Arduino and Raspberry Pi sprint for Product Hub alumni and club makers.",
        eventDate: "2026-01-24",
        eventTime: "09:00:00",
        location: "Hub Maker Lab",
        category: "Bootcamps",
        status: "PAST",
    },
];

function normalizeCategory(category?: string) {
    if (!category) return "";
    const c = category.trim().toLowerCase();
    if (c.includes("workshop")) return "Workshops";
    if (c.includes("bootcamp")) return "Bootcamps";
    if (c.includes("competition") || c.includes("hack")) return "Competitions";
    if (c.includes("conference") || c.includes("summit")) return "Conferences";
    const titled = category.charAt(0).toUpperCase() + category.slice(1);
    return FILTERS.includes(titled as Filter) ? titled : category;
}

function formatDate(date?: string) {
    if (!date) return "Date TBA";
    try {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
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

function isPastEvent(event: EventItem) {
    if (event.status === "PAST" || event.status === "CANCELLED") return true;
    if (event.status === "UPCOMING" || event.status === "ONGOING") return false;
    if (!event.eventDate) return false;
    const endOfDay = new Date(event.eventDate);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.getTime() < Date.now();
}

function EventsIndexPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const [filter, setFilter] = useState<Filter>("All");
    const [emptyFromApi, setEmptyFromApi] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const data = await getEvents();
                if (cancelled) return;
                if (!data?.length) {
                    setEvents([]);
                    setEmptyFromApi(true);
                    setUsingFallback(false);
                } else {
                    setEvents(data);
                    setEmptyFromApi(false);
                    setUsingFallback(false);
                }
            } catch {
                if (cancelled) return;
                setEvents(SAMPLE_EVENTS);
                setUsingFallback(true);
                setEmptyFromApi(false);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        if (filter === "All") return events;
        return events.filter((e) => normalizeCategory(e.category) === filter);
    }, [events, filter]);

    const upcoming = filtered.filter((e) => !isPastEvent(e));
    const past = filtered.filter((e) => isPastEvent(e));

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 bg-bg-cream py-16">
                <div className="container-page">
                    <Reveal className="text-center max-w-2xl mx-auto mb-12">
                        <span className="eyebrow">GATHER & BUILD</span>
                        <h1 className="mt-4 font-display font-bold text-[44px] md:text-[56px] leading-[1.1] text-black">
                            Events
                        </h1>
                        <p className="mt-6 text-[16px] md:text-[18px] text-text-secondary leading-relaxed">
                            Workshops, bootcamps, competitions, and conferences open to students and community builders.
                        </p>
                    </Reveal>

                    <Reveal className="flex flex-wrap justify-center gap-2 mb-6">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-[13px] font-bold border transition-colors cursor-pointer",
                                    filter === f
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-text-secondary border-border hover:border-black hover:text-black",
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </Reveal>

                    {usingFallback && (
                        <p className="text-center text-[13px] text-text-muted mb-10">
                            Showing sample events while the live calendar is unavailable.
                        </p>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-24 text-text-secondary gap-2 items-center">
                            <Loader2 className="animate-spin" size={20} />
                            Loading events…
                        </div>
                    ) : emptyFromApi ? (
                        <Reveal className="max-w-xl mx-auto bg-white border border-border rounded-[24px] p-10 text-center shadow-xs">
                            <h2 className="font-display text-[22px] font-bold text-black mb-3">No events yet</h2>
                            <p className="text-[15px] text-text-secondary leading-relaxed">
                                There are no published events right now. Check back soon, or follow our blog for
                                announcements.
                            </p>
                            <Link to="/blog" className="mt-8 inline-flex btn-pill bg-accent text-black hover:bg-accent-hover font-bold">
                                Visit Blog
                            </Link>
                        </Reveal>
                    ) : (
                        <div className="space-y-16">
                            <EventSection title="Upcoming" events={upcoming} emptyLabel="No upcoming events in this filter." />
                            <EventSection title="Past" events={past} emptyLabel="No past events in this filter." />
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

function EventSection({
    title,
    events,
    emptyLabel,
}: {
    title: string;
    events: EventItem[];
    emptyLabel: string;
}) {
    return (
        <section>
            <h2 className="font-display text-[24px] md:text-[28px] font-bold text-black mb-6">{title}</h2>
            {events.length === 0 ? (
                <p className="text-[14px] text-text-muted bg-white border border-border rounded-xl px-5 py-6">{emptyLabel}</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {events.map((event, idx) => (
                        <Reveal
                            key={event.slug || event.id}
                            delay={((idx % 2) + 1) as 1 | 2}
                            className="bg-white border border-border rounded-[24px] p-7 md:p-8 hover:border-black transition-colors duration-300 flex flex-col shadow-xs"
                        >
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <span className="text-[11px] font-bold uppercase tracking-wider bg-bg-cream border border-border px-3 py-1 rounded-full text-text-secondary">
                                    {normalizeCategory(event.category) || "Event"}
                                </span>
                                {event.status === "ONGOING" && (
                                    <span className="text-[11px] font-bold text-green-800 bg-green-100 px-2.5 py-0.5 rounded-full">
                                        Ongoing
                                    </span>
                                )}
                            </div>

                            <h3 className="font-display text-[22px] font-bold text-black leading-snug mb-3">
                                <Link to="/events/$slug" params={{ slug: event.slug }} className="hover:text-accent-hover transition-colors">
                                    {event.title}
                                </Link>
                            </h3>

                            {event.description && (
                                <p className="text-[14px] text-text-secondary leading-relaxed mb-6 line-clamp-3 flex-1">
                                    {event.description}
                                </p>
                            )}

                            <div className="space-y-2 text-[13px] text-text-secondary border-t border-border pt-4 mt-auto">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-accent shrink-0" />
                                    {formatDate(event.eventDate)}
                                </div>
                                {formatTime(event.eventTime) && (
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-accent shrink-0" />
                                        {formatTime(event.eventTime)}
                                    </div>
                                )}
                                {event.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-accent shrink-0" />
                                        {event.location}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/events/$slug"
                                params={{ slug: event.slug }}
                                className="mt-5 link-arrow font-bold text-[14px]"
                            >
                                View details <ArrowRight size={14} />
                            </Link>
                        </Reveal>
                    ))}
                </div>
            )}
        </section>
    );
}
