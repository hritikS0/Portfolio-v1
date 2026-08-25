import { skillCategories } from "@/src/data/skills"
import { Reveal } from "@/src/components/ui/reveal"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <SectionHeader eyebrow="03 — Stack" title="What I work with" />

      <dl className="space-y-8">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={Math.min(index, 3) * 0.04}>
            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="meta pt-[0.3rem] text-muted">{category.title}</dt>
              <dd className="text-[0.9375rem] leading-relaxed">
                {category.skills.map((skill) => skill.name).join(", ")}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
