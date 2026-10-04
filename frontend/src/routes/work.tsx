import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { workProjects } from "@/lib/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work | Afroec" },
      { name: "description", content: "Selected Afroec work, including Trust Agro ERP, School of Diamond, and company profile websites." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20">
        <section className="container-page max-w-3xl">
          <span className="eyebrow">Work</span>
          <h1 className="mt-4 font-display font-bold text-[42px] md:text-[60px] leading-[1.08] text-black">
            Selected work
          </h1>
          <p className="mt-6 text-[18px] text-text-secondary leading-relaxed">
            A sample of systems and websites Afroec has built. Each card names the project, the category, and what it is for.
          </p>
        </section>
        <section className="container-page mt-14 grid lg:grid-cols-3 gap-6">
          {workProjects.map((project) => (
            <article key={project.name} className="border border-border rounded-[18px] overflow-hidden bg-white flex flex-col">
              <div className="aspect-[16/10] bg-bg-alt">
                <img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">{project.category}</div>
                <h2 className="mt-2 font-display text-[24px] font-bold text-black">{project.name}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{project.description}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="container-page mt-16">
          <Link to="/contact" className="btn-pill bg-accent text-black hover:bg-accent-hover">
            Start a Conversation
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
