import Link from "next/link"
import { projects } from "@/src/data/projects"
import { Reveal } from "@/src/components/ui/reveal"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <SectionHeader
        eyebrow="01 — Work"
        title="Selected projects"
        subtitle="Four systems, each with the reasoning written down."
      />

      <ul className="border-t border-line">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={Math.min(index, 3) * 0.05}>
              <Link
                href={`/projects/${project.id}`}
                className="group flex flex-col gap-3 border-b border-line py-7 transition-colors hover:border-accent/40 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="display text-2xl transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {project.tagline}
                  </p>
                  <p className="meta mt-4 text-muted/70">
                    {project.technologies.slice(0, 4).join(" · ")}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="meta shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent sm:pt-2"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
