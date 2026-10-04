import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs | Afroec" },
      {
        name: "description",
        content: "Afroec Labs explores AI, robotics, hardware, and research that can become practical technology.",
      },
    ],
  }),
  component: LabsPage,
});

const areas = [
  { title: "AI", text: "Intelligent systems and applied artificial intelligence." },
  { title: "Robotics", text: "Robotics, automation, and intelligent machines." },
  { title: "Hardware", text: "Embedded systems and technology prototypes." },
  { title: "R&D", text: "Experimentation, prototyping, and emerging technology." },
];

function LabsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="bg-bg-dark text-white pt-32 md:pt-40 pb-20">
          <div className="container-page max-w-3xl">
            <span className="eyebrow text-accent">Afroec Labs</span>
            <h1 className="mt-4 font-display font-bold text-[42px] md:text-[60px] leading-[1.08]">
              Explore what is next
            </h1>
            <p className="mt-6 text-[18px] text-white/70 leading-relaxed">
              Labs is the innovation arm of Afroec. It is where we study, prototype, and test ideas in AI, robotics, hardware, and automation before they become products.
            </p>
          </div>
        </section>
        <section className="container-page py-20 grid md:grid-cols-2 gap-4">
          {areas.map((item) => (
            <article key={item.title} className="border border-border rounded-[16px] p-7 bg-white">
              <h2 className="font-display text-[28px] font-bold text-black">{item.title}</h2>
              <p className="mt-3 text-[16px] text-text-secondary leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>
        <section className="container-page pb-20">
          <Link to="/contact" className="btn-pill bg-black text-white hover:bg-neutral-800">
            Talk about a prototype
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
