import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { pageSeo, webPageSchema } from "@/lib/seo";

const title = "Afroec Solutions | Digital & Software Solutions for Africa";
const description =
  "Afroec Solutions builds custom software, web and mobile applications, business systems, digital platforms, and AI and automation for organizations in Africa.";

export const Route = createFileRoute("/solutions")({
  head: () => pageSeo({ title, description, path: "/solutions" }),
  component: SolutionsPage,
});

const offerings = [
  { title: "Custom Software", text: "Software written for a specific operation, not a generic template." },
  { title: "Web & Mobile Applications", text: "Applications people can open in a browser or on a phone." },
  { title: "Business Management Systems", text: "Tools for records, workflows, roles, and daily operations." },
  { title: "AI & Automation", text: "Applied AI and automation where they remove repetitive work." },
  { title: "Digital Platforms", text: "Shared systems that connect users, data, and services." },
  { title: "Technology Consulting", text: "Help choosing what to build, how to build it, and what to leave out." },
];

function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20">
        <JsonLd data={webPageSchema({ title, description, path: "/solutions" })} />
        <section className="container-page max-w-3xl">
          <span className="eyebrow">Afroec Solutions</span>
          <h1 className="mt-4 font-display font-bold text-[42px] md:text-[60px] leading-[1.08] text-black">
            Technology built around real problems
          </h1>
          <p className="mt-6 text-[18px] text-text-secondary leading-relaxed">
            Afroec Solutions is the commercial technology arm of Afroec. Organizations come to us with a problem. We design and build the software, systems, or platforms that address it.
          </p>
          <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover mt-8">
            Work With Us
          </Link>
        </section>
        <section className="container-page mt-20">
          <SectionHeader align="left" eyebrow="What we build" title="Practical technology for organizations" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offerings.map((item) => (
              <article key={item.title} className="border border-border rounded-[16px] p-6">
                <h3 className="font-display text-[20px] font-bold text-black">{item.title}</h3>
                <p className="mt-3 text-[15px] text-text-secondary leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
