import { experiences } from "@/src/data/experience"
import { Reveal } from "@/src/components/ui/reveal"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <SectionHeader eyebrow="02 — Experience" title="Where I've worked" />

      <div className="space-y-14">
        {experiences.map((exp, index) => (
          <Reveal key={exp.title} delay={Math.min(index, 3) * 0.05}>
            <article>
              <p className="meta text-muted">{exp.period}</p>

              <h3 className="display mt-3 text-xl">{exp.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">
                {exp.organization}
              </p>

              <ul className="mt-5 space-y-3">
                {exp.description.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.72em] before:size-[3px] before:rounded-full before:bg-muted/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
