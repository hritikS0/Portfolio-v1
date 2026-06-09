"use client"

import { m as motion } from "motion/react"
import { skillCategories } from "@/src/data/skills"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Stack() {
  return (
    <section id="stack" className="py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          title="Engineering System Map"
          subtitle="Core technology stack organized by architectural layers."
        />

        <div className="font-mono border border-border rounded-lg bg-[#07090e] overflow-hidden">
          {/* Mock YAML file header */}
          <div className="px-4 py-2 bg-[#0A0D14] border-b border-border flex items-center justify-between text-xs text-muted">
            <span>system_map.yaml</span>
            <span>v1.2.0</span>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {skillCategories.map((category, index) => (
              <div key={category.title} className="relative">
                {/* Flow lines between layers */}
                {index < skillCategories.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px border-l border-dashed border-border -mb-6" />
                )}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  {/* Layer badge */}
                  <div className="size-12 shrink-0 rounded border border-border bg-[#0A0D14] flex flex-col items-center justify-center text-xs font-semibold text-accent select-none">
                    0{index + 1}
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[11px] uppercase text-accent/80 font-bold tracking-wider">
                      {category.title} LAYER
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 rounded border border-border/60 bg-surface/50 px-2 py-0.5 text-xs text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                        >
                          {skill.name}
                          {skill.level && (
                            <span className={`size-1.5 rounded-full shrink-0 ${skill.level === "proficient" ? "bg-accent" : "bg-yellow-500/70"}`} />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
