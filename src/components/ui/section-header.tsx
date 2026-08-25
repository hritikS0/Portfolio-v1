import { Reveal } from "@/src/components/ui/reveal"

type SectionHeaderProps = {
  /** Mono eyebrow — the section's index or category, not a sentence. */
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal className="mb-12">
      <p className="meta text-muted">{eyebrow}</p>
      <h2 className="display mt-3 text-3xl sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-md text-[0.9375rem] text-muted">{subtitle}</p>
      )}
    </Reveal>
  )
}
