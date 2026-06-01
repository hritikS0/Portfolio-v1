"use client"

import { m as motion } from "motion/react"
import { experiences } from "@/src/data/experience"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          title="Experience"
          subtitle="Places I've contributed and grown."
        />

        <div className="space-y-8 font-mono">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative pl-6 border-l border-border"
            >
              {/* Node indicator */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 size-2 rounded-full bg-accent border border-[#04060B]" />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span className="text-accent font-semibold">{exp.period}</span>
                  <span className="text-muted/40">•</span>
                  <span className="text-foreground font-medium">{exp.title}</span>
                  <span className="text-muted/40">@</span>
                  <span className="text-muted font-sans font-medium">{exp.organization}</span>
                </div>

                <ul className="space-y-1.5 font-sans text-xs text-muted leading-relaxed">
                  {exp.description.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent/60 font-mono select-none">└─</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
