"use client"

import { useState, useEffect } from "react"
import { useMode } from "@/src/components/providers/mode-provider"
import { projects } from "@/src/data/projects"
import { m as motion, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"

interface CommitTile {
  level: number
  date: string
  message: string
}

export function SystemInspector() {
  const { activeFile } = useMode()
  const [gitContributions, setGitContributions] = useState({ total2026: 130, totalLastYear: 518 })

  const isProject = activeFile.startsWith("src/projects/") || activeFile.startsWith("src/work-projects/")

  // Pull real github counts if cached, or fallback
  useEffect(() => {
    const fetchGitStats = async () => {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/hritikS0")
        if (res.ok) {
          const data = await res.json()
          if (data.total) {
            setGitContributions({
              total2026: data.total["2026"] || 130,
              totalLastYear: Object.values(data.total).reduce((acc: number, val: any) => acc + (val || 0), 0) as number || 518
            })
          }
        }
      } catch (e) {
        console.warn("Failed to fetch GitHub stats for inspector:", e)
      }
    }
    fetchGitStats()
  }, [])

  const getInspectorContent = () => {
    // 1. README.md
    if (activeFile === "README.md") {
      return (
        <motion.div
          key="readme-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">● Profile Summary</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-2">
              <h4 className="text-xs font-bold text-foreground font-sans">Hritik Sharma</h4>
              <p className="text-[10px] text-muted leading-relaxed font-sans">
                Full-Stack Systems Specialist based in New Delhi, India. Focused on low-latency microservices, telemetry, and TypeScript configurations.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">📊 GitHub Activity</span>
            <div className="border border-border/40 bg-[#030407] p-3 rounded space-y-2 font-mono text-[10px] text-muted">
              <div className="flex justify-between">
                <span>Active Handle:</span>
                <span className="text-foreground font-bold">hritikS0</span>
              </div>
              <div className="flex justify-between">
                <span>2026 Contributions:</span>
                <span className="text-green-400 font-bold">{gitContributions.total2026}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Contributions:</span>
                <span className="text-green-400">{gitContributions.totalLastYear}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">⚡ Current Focus</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-2 text-[10px] text-muted font-sans leading-relaxed">
              <div>• Optimizing Postgres connection scaling.</div>
              <div>• Engineering real-time logging architectures.</div>
              <div>• Refactoring legacy modules to pure TS.</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border/40">
            <span className="text-[10px] text-muted font-mono uppercase font-bold">Contact Coordinates</span>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono select-none">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "mailto:hritiksharma374@gmail.com"
                  }
                }}
                className="p-2 border border-border/60 hover:bg-surface-hover rounded text-center cursor-pointer text-foreground"
              >
                Send Email
              </button>
              <a
                href="https://github.com/hritikS0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border/60 hover:bg-surface-hover rounded text-center cursor-pointer text-foreground block text-center"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </motion.div>
      )
    }

    // 2. projects/*.md (Show the project live preview browser mockup only)
    if (isProject) {
      const projectId = activeFile.split("/").pop()?.replace(".md", "")
      const project = projects.find((p) => p.id === projectId)

      if (!project) return null

      return (
        <motion.div
          key={`project-live-${projectId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full w-full"
        >
          {project.live ? (
            <div className="flex flex-col h-full w-full bg-[#07090e] border-none overflow-hidden">
              {/* Mock Browser Header */}
              <div className="bg-[#0A0D14] px-4 py-2 border-b border-border flex items-center gap-3 select-none shrink-0 text-xs text-muted">
                <div className="flex gap-1.5 shrink-0">
                  <span className="size-2 rounded-full bg-[#FF5F57]/50" />
                  <span className="size-2 rounded-full bg-[#FEBC2E]/50" />
                  <span className="size-2 rounded-full bg-[#28C840]/50" />
                </div>
                
                {/* Navigation controls */}
                <div className="flex gap-1.5 shrink-0 text-[10px] text-muted/40 font-bold">
                  <span className="hover:text-foreground cursor-pointer">◀</span>
                  <span className="hover:text-foreground cursor-pointer">▶</span>
                  <span className="hover:text-foreground cursor-pointer">⟳</span>
                </div>

                {/* Address bar */}
                <div className="flex items-center gap-1.5 bg-[#030407] border border-border/60 px-2 py-0.5 rounded text-[9px] w-full max-w-sm truncate select-all">
                  <span className="text-green-500 text-[8px]">🔒</span>
                  <span className="text-muted/80">{project.live}</span>
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-[10px] ml-auto shrink-0 font-bold font-mono"
                >
                  Open Tab ↗
                </a>
              </div>

              {/* Iframe Viewport */}
              <div className="flex-1 bg-white relative">
                <iframe
                  src={project.live}
                  title={`${project.title} Web Preview`}
                  className="w-full h-full border-none bg-white"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#0A0D14] h-full flex flex-col items-center justify-center p-6 text-center select-none font-mono text-xs text-muted/60 space-y-5 border-l border-border/20">
              <div className="size-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-2xl animate-pulse">
                🔒
              </div>

              <div className="space-y-2 max-w-sm">
                <h3 className="text-red-400 font-bold tracking-wider uppercase text-[11px]">
                  CONFIDENTIAL // NDA PROTECTED
                </h3>
                <p className="text-[10px] text-muted/80 leading-relaxed font-sans">
                  This deployment represents proprietary enterprise software engineered for TechPlek Technologies. Public endpoints and active code repositories are restricted under non-disclosure agreements to preserve commercial intellectual property.
                </p>
              </div>

              <div className="w-full border-t border-border/40 pt-4 max-w-xs space-y-1.5 text-left text-[9px] text-muted/40 font-mono">
                <div className="flex justify-between">
                  <span>SECURITY_STATUS:</span>
                  <span className="text-red-400">RESTRICTED</span>
                </div>
                <div className="flex justify-between">
                  <span>PROVIDER:</span>
                  <span className="text-foreground">TechPlek Inc.</span>
                </div>
                <div className="flex justify-between">
                  <span>CLEARANCE_LVL:</span>
                  <span className="text-foreground">L3_CONFIDENTIAL</span>
                </div>
                <div className="flex justify-between">
                  <span>CIPHER:</span>
                  <span className="text-foreground">AES-256-GCM</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )
    }

    // 3. career_logs.log
    if (activeFile === "src/experience/career_logs.log") {
      return (
        <motion.div
          key="experience-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">● Current Deployment</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-1.5">
              <h4 className="text-xs font-bold text-foreground font-sans">Web Development Intern</h4>
              <div className="text-[10px] text-accent font-mono font-bold">TechPlek Technologies</div>
              <p className="text-[10px] text-muted leading-relaxed font-sans">
                Refactoring dashboard components to strict TypeScript, configuring server-side RBAC models, and resolving hardware-level media playout memory leaks.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">🎓 Milestones</span>
            <div className="space-y-3 pt-1">
              <div className="border border-border/40 bg-[#030407] p-2.5 rounded font-mono text-[9px] text-muted leading-tight">
                <div className="text-accent font-bold">BCA Computer Science</div>
                <div>GNIOT IPS // 2022 - 2025</div>
              </div>
              <div className="border border-border/40 bg-[#030407] p-2.5 rounded font-mono text-[9px] text-muted leading-tight">
                <div className="text-accent font-bold">MERN stack training</div>
                <div>Ducat Specialization // 8 Months</div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">✓ Benchmarks Gained</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-2 text-[10px] text-muted font-sans leading-relaxed">
              <div>• Secure server-side RBAC routes.</div>
              <div>• Fixed playout loop memory leaks (PDOOH).</div>
              <div>• Structured transactional database pools.</div>
              <div>• Migrated 12 logistics screens to TS.</div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-4 grid grid-cols-2 gap-2 font-mono text-[10px] text-center">
            <div className="space-y-0.5">
              <div className="text-muted/60">DURATION</div>
              <div className="text-foreground font-bold">1+ Years</div>
            </div>
            <div className="space-y-0.5 border-l border-border/40">
              <div className="text-muted/60">STATUS</div>
              <div className="text-green-400 font-bold">Active</div>
            </div>
          </div>
        </motion.div>
      )
    }

    // 4. system_architecture.json
    if (activeFile === "src/stack/system_architecture.json") {
      return (
        <motion.div
          key="stack-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-3 gap-1 font-mono text-[9px] text-center select-none shrink-0">
            <div className="border border-border/40 bg-surface/30 p-1.5 rounded">
              <div className="text-muted/60 uppercase">STATUS</div>
              <div className="text-green-400 font-bold mt-0.5">● Ready</div>
            </div>
            <div className="border border-border/40 bg-surface/30 p-1.5 rounded">
              <div className="text-muted/60 uppercase">EXP</div>
              <div className="text-foreground font-bold mt-0.5">1.5+ Yrs</div>
            </div>
            <div className="border border-border/40 bg-surface/30 p-1.5 rounded">
              <div className="text-muted/60 uppercase">SHIPPED</div>
              <div className="text-foreground font-bold mt-0.5">6+ Proj</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">🖥 Backend Expertise</span>
              <div className="border border-border/40 bg-surface/30 p-3 rounded text-[10px] text-muted font-sans leading-relaxed space-y-1">
                <div>• 15+ Node/Express REST APIs</div>
                <div>• Role-Based Access Control</div>
                <div>• JWT authentication flows</div>
                <div>• WebSocket real-time sockets</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">🎨 Frontend Engineering</span>
              <div className="border border-border/40 bg-surface/30 p-3 rounded text-[10px] text-muted font-sans leading-relaxed space-y-1">
                <div>• 8 React Applications</div>
                <div>• Next.js layout configurations</div>
                <div>• Type-safe TypeScript compilation</div>
                <div>• Tailwind CSS responsive designs</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">💾 Database Scaling</span>
              <div className="border border-border/40 bg-surface/30 p-3 rounded text-[10px] text-muted font-sans leading-relaxed space-y-1">
                <div>• PostgreSQL indexes (PGVector)</div>
                <div>• MongoDB non-relational collections</div>
                <div>• Redis caching & pub/sub keys</div>
                <div>• Query pooling & optimizations</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">⚙ Infrastructure Setup</span>
              <div className="border border-border/40 bg-surface/30 p-3 rounded text-[10px] text-muted font-sans leading-relaxed space-y-1">
                <div>• Docker image containerization</div>
                <div>• Linux terminal scripting</div>
                <div>• Git commit branch management</div>
                <div>• GitHub Actions CI/CD workflows</div>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    // 5. contact.env
    if (activeFile === "config/contact.env") {
      return (
        <motion.div
          key="contact-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">● Config Loader</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-1.5 font-sans">
              <h4 className="text-xs font-bold text-foreground">contact.env Loaded</h4>
              <p className="text-[10px] text-muted leading-relaxed">
                Contact coordinates are structured as server environment variables. Click items on the left side to copy keys/values to clipboard.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">📁 Validation Status</span>
            <div className="border border-border/40 bg-[#030407] p-3 rounded space-y-2 font-mono text-[10px] text-muted">
              <div className="flex justify-between">
                <span>PORT:</span>
                <span className="text-green-400">8080 // OK</span>
              </div>
              <div className="flex justify-between">
                <span>TLS Connection:</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>Encryption Keys:</span>
                <span className="text-foreground">AES-256</span>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    // 6. demo.ts
    if (activeFile === "src/live_coding/demo.ts") {
      return (
        <motion.div
          key="demo-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">● Script Auditor</span>
            <div className="border border-border/40 bg-surface/30 p-3 rounded space-y-1.5 font-sans">
              <h4 className="text-xs font-bold text-foreground">demo.ts Overview</h4>
              <p className="text-[10px] text-muted leading-relaxed">
                Renders a live-typing transaction pipeline with PostgreSQL and Redis. Execute it via the terminal emulator tool at the bottom to check execution metrics.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-wider">📊 Telemetry Metrics</span>
            <div className="border border-border/40 bg-[#030407] p-3 rounded space-y-2 font-mono text-[10px] text-muted">
              <div className="flex justify-between">
                <span>Script Length:</span>
                <span className="text-foreground">54 Lines</span>
              </div>
              <div className="flex justify-between">
                <span>TS Compilation:</span>
                <span className="text-green-400">284ms // OK</span>
              </div>
              <div className="flex justify-between">
                <span>Ingress chunks:</span>
                <span className="text-foreground">12 Batches</span>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    // Default
    return (
      <div className="h-full flex items-center justify-center p-6 text-center text-muted/30 italic text-[10px] font-mono">
        Select a workspace resource item to audit telemetry profiles.
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border-l border-border bg-[#07090e] shrink-0 h-full overflow-y-auto hidden md:flex flex-col select-none transition-all duration-300",
        isProject ? "w-[500px] xl:w-[650px]" : "w-[300px]"
      )}
    >
      {/* Inspector Header */}
      <div className="h-8 bg-[#0a0d14]/80 px-4 flex items-center border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted font-bold shrink-0">
        {isProject ? "Live Browser Preview" : "System Inspector"}
      </div>

      {/* Inspector Body Content */}
      <div className={cn("flex-1 min-h-0", isProject ? "p-0" : "p-4")}>
        <AnimatePresence mode="wait">{getInspectorContent()}</AnimatePresence>
      </div>
    </div>
  )
}
