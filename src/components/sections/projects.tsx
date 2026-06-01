"use client"

import { m as motion } from "motion/react"
import { projects } from "@/src/data/projects"
import { SectionHeader } from "@/src/components/ui/section-header"

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          title="Featured Projects"
          subtitle="Production-grade systems and open-source contributions."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col rounded-lg border border-border bg-[#07090e] overflow-hidden"
            >
              {/* Mock Window Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#0A0D14] border-b border-border text-xs font-mono">
                <span className="text-muted flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                  hritikS0/{project.title.toLowerCase().replace(/\s+/g, "-")}
                </span>
                <span className="text-muted/40">main</span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-muted leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-3 border-t border-border/40 pt-4 text-xs font-mono">
                    <div>
                      <span className="text-accent/80 font-medium"># problem</span>
                      <p className="text-muted/90 mt-0.5 font-sans leading-relaxed text-[11px]">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-[#10B981]/80 font-medium"># telemetry</span>
                      <p className="text-muted/90 mt-0.5 font-sans leading-relaxed text-[11px]">{project.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded bg-surface border border-border/60 px-1.5 py-0.5 text-[10px] font-mono text-muted/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center justify-center rounded bg-accent px-3 text-xs font-mono font-medium text-white transition-opacity hover:opacity-90 w-full"
                      >
                        ./launch
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center justify-center rounded border border-border px-3 text-xs font-mono font-medium text-muted hover:text-foreground transition-colors bg-surface/50 w-full"
                      >
                        git-clone
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
