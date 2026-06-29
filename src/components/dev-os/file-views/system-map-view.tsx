"use client"

import { useState } from "react"
import { skillCategories } from "@/src/data/skills"
import { m as motion } from "motion/react"
import { cn } from "@/src/lib/utils"

export function SystemMapView() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-6 max-w-4xl">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-accent">
          <span>⚙</span>
          <span className="font-bold">src/stack/system_architecture.json</span>
        </div>
        <span className="text-[10px] text-muted/40 font-mono">JSON SPECIFICATION</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Layered System Map */}
        <div className="lg:col-span-3 space-y-4 select-none">
          <div className="text-[10px] text-muted uppercase font-bold tracking-wider mb-2">
            01_Layered_System_Topology
          </div>

          <div className="space-y-3">
            {skillCategories.map((category, index) => {
              const isHovered = hoveredLayer === index
              const isDependent = hoveredLayer !== null && index < hoveredLayer

              return (
                <motion.div
                  key={category.title}
                  onMouseEnter={() => setHoveredLayer(index)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  animate={{
                    scale: isHovered ? 1.01 : 1,
                    borderColor: isHovered
                      ? "var(--color-accent)"
                      : isDependent
                        ? "rgba(59, 130, 246, 0.25)"
                        : "var(--color-border)",
                  }}
                  className={cn(
                    "border rounded-lg bg-[#07090e] p-4 flex gap-4 items-start transition-all relative overflow-hidden",
                    isHovered && "shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)] bg-surface-hover"
                  )}
                >
                  {/* Flow Arrow Overlay on Dependency */}
                  {isDependent && (
                    <div className="absolute top-2 right-4 text-[9px] text-accent/50 animate-pulse">
                      ▲ Downstream Dependency
                    </div>
                  )}

                  {/* Layer badge */}
                  <div
                    className={cn(
                      "size-10 shrink-0 rounded border flex items-center justify-center text-xs font-mono font-bold select-none",
                      isHovered
                        ? "border-accent bg-accent/10 text-accent font-bold"
                        : "border-border bg-surface text-muted"
                    )}
                  >
                    L{skillCategories.length - index}
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-[10px] uppercase font-bold tracking-wider",
                          isHovered ? "text-accent" : "text-muted"
                        )}
                      >
                        {category.title} LAYER
                      </span>
                      {isHovered && (
                        <span className="text-[9px] text-accent font-mono">STATUS: HIGH_DENSITY</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-mono transition-colors",
                            isHovered
                              ? "border-accent/40 bg-accent/5 text-foreground"
                              : "border-border/60 bg-surface/50 text-muted/80 hover:border-accent/30 hover:text-foreground"
                          )}
                        >
                          <span>{skill.name}</span>
                          <span
                            className={cn(
                              "size-1.5 rounded-full shrink-0",
                              skill.level === "proficient"
                                ? "bg-green-400"
                                : "bg-green-400/50"
                            )}
                            title={skill.level === "proficient" ? "Proficient" : "Intermediate"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Legend / Info Panel */}
        <div className="border border-border bg-[#07090e] rounded-lg p-4 flex flex-col justify-between select-none">
          <div className="space-y-4">
            <span className="text-[10px] text-muted uppercase font-bold tracking-wider">
              System Topology Legend
            </span>
            <div className="space-y-3 font-sans text-[11px] text-muted leading-relaxed">
              <p>
                This layered block map defines Hritik&apos;s full-stack stack in terms of systems design.
              </p>
              <div className="space-y-2 font-mono text-[10px] border-t border-border/40 pt-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-400" />
                  <span>Proficient Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-400/50" />
                  <span>Intermediate Node</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded border border-accent/40 bg-accent/15" />
                  <span>Active Layer</span>
                </div>
              </div>
              <p className="border-t border-border/40 pt-3 font-sans">
                Layers are organized hierarchically: Infrastructure hosts database modules, powering backend services, serving client layers.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 text-[9px] text-muted/40 font-mono">
            ENGINE: TAILWIND_V4
          </div>
        </div>
      </div>
    </div>
  )
}
