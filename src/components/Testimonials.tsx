import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type T = { quote: string; name: string; title: string; program: string; initials: string };

const items: T[] = [
  {
    quote:
      "I never touched a computer before Afroec Hub. Now I'm building software that protects Ethiopia's largest bank.",
    name: "Selam Tadesse",
    title: "Software Developer, Dashen Bank",
    program: "CyberGuard Youth",
    initials: "ST",
  },
  {
    quote:
      "The DigiSec Truck came to our village. I didn't know what programming was. Today, I work remotely for a European company.",
    name: "Mohammed Ali",
    title: "Remote Developer",
    program: "DigiSec Ethiopia",
    initials: "MA",
  },
  {
    quote:
      "As a woman in tech, I faced many barriers. SheSec didn't just teach me skills — they built my confidence to lead.",
    name: "Betelhem Girma",
    title: "Team Lead, Fintech Startup",
    program: "SheSec Ethiopia",
    initials: "BG",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Desktop: three cards */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {items.map((t) => (
          <Card key={t.name} t={t} />
        ))}
      </div>

      {/* Mobile: carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {items.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-1">
                <Card t={t} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center bg-white hover:border-foreground transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  idx === i ? "w-6 bg-foreground" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % items.length)}
            className="h-10 w-10 rounded-full border border-border flex items-center justify-center bg-white hover:border-foreground transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ t }: { t: T }) {
  return (
    <article className="bg-white border border-border rounded-lg p-8 md:p-10 h-full flex flex-col">
      <span className="text-accent text-5xl leading-none font-serif opacity-40" aria-hidden>
        &ldquo;
      </span>
      <p className="mt-2 text-[17px] md:text-[18px] leading-relaxed italic text-foreground flex-1">
        {t.quote}
      </p>
      <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-foreground text-white flex items-center justify-center text-[13px] font-semibold">
          {t.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold">{t.name}</div>
          <div className="text-[13px] text-text-secondary truncate">{t.title}</div>
        </div>
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[11px] font-semibold">
          {t.program}
        </span>
      </div>
    </article>
  );
}
