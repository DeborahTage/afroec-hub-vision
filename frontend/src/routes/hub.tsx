import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Hub | Afroec" },
      {
        name: "description",
        content: "Afroec Hub develops programming, cybersecurity, AI, and digital skills for Africa's next technology talent.",
      },
    ],
  }),
  component: HubPage,
});

const focus = [
  { title: "Programming", text: "Practical software skills people can use to build products." },
  { title: "Cybersecurity", text: "Foundations for protecting systems and data." },
  { title: "AI", text: "How intelligent systems work, and how to apply them carefully." },
  { title: "Digital literacy", text: "The skills needed to participate in digital work." },
  { title: "Mentorship", text: "Guidance from people who build technology." },
  { title: "Youth and women in technology", text: "Opportunities for people who are often left out of technical work." },
];

function HubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20">
        <section className="container-page max-w-3xl">
          <span className="eyebrow">Afroec Hub</span>
          <h1 className="mt-4 font-display font-bold text-[42px] md:text-[56px] leading-[1.1] text-black">
            Technology is only as powerful as the people who build it.
          </h1>
          <p className="mt-6 text-[18px] text-text-secondary leading-relaxed">
            Hub is the talent arm of Afroec. It develops skills and creates opportunities so more people can build technology — alongside Solutions and Labs, not instead of them.
          </p>
        </section>
        <section className="container-page mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {focus.map((item) => (
            <article key={item.title} className="border border-border rounded-[16px] p-6 bg-bg-cream">
              <h2 className="font-display text-[20px] font-bold text-black">{item.title}</h2>
              <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>
        <section className="container-page mt-12">
          <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover">
            Ask about the Hub
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
