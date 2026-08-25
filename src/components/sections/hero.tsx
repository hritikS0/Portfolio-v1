import { Reveal } from "@/src/components/ui/reveal"

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <Reveal>
        <p className="meta text-muted">Full-stack engineer · New Delhi</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="display mt-6 text-[clamp(2.75rem,8vw,4.25rem)]">
          Hritik Sharma
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          I build production systems with TypeScript, React, Node.js and
          PostgreSQL — and I care about the parts nobody sees: connection pools,
          deploy pipelines, and the tradeoffs behind each one.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-10 flex items-center gap-8 text-[0.9375rem]">
          <a href="#work" className="link">
            View work
          </a>
          <a
            href="#contact"
            className="text-muted underline decoration-line decoration-1 underline-offset-[3px] transition-colors hover:text-foreground"
          >
            Get in touch
          </a>
        </div>
      </Reveal>
    </section>
  )
}
