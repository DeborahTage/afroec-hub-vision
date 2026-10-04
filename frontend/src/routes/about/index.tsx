import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About | Afroec" },
      {
        name: "description",
        content: "Afroec builds technology, explores emerging ideas, and develops the people who will shape Africa's digital future.",
      },
    ],
  }),
});

const pillars = [
  { title: "Build", text: "We build technology that solves real problems." },
  { title: "Explore", text: "We experiment with emerging technologies and new ideas." },
  { title: "Develop", text: "We help develop the people and capabilities needed for Africa's technological future." },
];

const arms = [
  {
    title: "Afroec Solutions",
    text: "The commercial arm. We build software, systems, and platforms for organizations.",
    href: "/solutions" as const,
  },
  {
    title: "Afroec Labs",
    text: "The innovation arm. We research and prototype AI, robotics, hardware, and automation.",
    href: "/labs" as const,
  },
  {
    title: "Afroec Hub",
    text: "The talent arm. We develop skills and opportunities so more people can build technology.",
    href: "/hub" as const,
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 md:pt-36 pb-20">
        <section className="container-page max-w-3xl">
          <span className="eyebrow">About</span>
          <h1 className="mt-4 font-display font-bold text-[42px] md:text-[60px] leading-[1.08] text-black">
            A technology company with a long view
          </h1>
          <p className="mt-6 text-[18px] text-text-secondary leading-relaxed">
            Afroec builds practical technology for organizations, explores emerging ideas, and develops the people who will shape Africa's digital future.
          </p>
        </section>

        <section className="container-page mt-16 grid md:grid-cols-3 gap-4">
          {pillars.map((item) => (
            <article key={item.title} className="border border-border rounded-[16px] p-7 bg-bg-cream">
              <h2 className="font-display text-[26px] font-bold text-black">{item.title}</h2>
              <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="container-page mt-20 max-w-3xl">
          <h2 className="font-display font-bold text-[32px] md:text-[40px] text-black">How the company fits together</h2>
          <p className="mt-4 text-[16px] text-text-secondary leading-relaxed">
            Solutions, Labs, and Hub are connected. Organizations get technology they can use. Labs keeps the company looking ahead. Hub grows the people who will build what comes next.
          </p>
        </section>

        <section className="container-page mt-10 grid lg:grid-cols-3 gap-4">
          {arms.map((item) => (
            <Link key={item.title} to={item.href} className="border border-border rounded-[16px] p-7 hover:border-black transition-colors">
              <h3 className="font-display text-[22px] font-bold text-black">{item.title}</h3>
              <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{item.text}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
