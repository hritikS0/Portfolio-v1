"use client"

import { useState } from "react"
import { projects, Project } from "@/src/data/projects"
import { m as motion, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"

interface ProjectViewProps {
  filePath: string
}

type TabType = "problem" | "tradeoffs" | "architecture" | "lessons"

interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  details: string
}

export function ProjectView({ filePath }: ProjectViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("problem")
  const [hoveredNode, setHoveredNode] = useState<DiagramNode | null>(null)

  const id = filePath.split("/").pop()?.replace(".md", "")
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="p-6 font-mono text-xs text-red-400">
        Error: Project descriptor `{id}` not found in index.
      </div>
    )
  }

  // Define architecture nodes based on project
  const getDiagramNodes = (projId: string): DiagramNode[] => {
    if (projId === "toolstack-ai") {
      return [
        { id: "client", label: "Client App (React)", x: 30, y: 80, w: 100, h: 40, details: "Next.js client interface rendering streaming text buffers, markdown sheets, and code syntax blocks." },
        { id: "gateway", label: "Express API", x: 180, y: 80, w: 100, h: 40, details: "Express 5 router executing session auth, parsing file buffers, and forwarding query request packets." },
        { id: "db", label: "PGVector DB", x: 330, y: 30, w: 100, h: 40, details: "PostgreSQL with PGVector holding system parameters, relational logs, and PDF chunk embedding indexes." },
        { id: "nim", label: "NVIDIA NIM", x: 330, y: 130, w: 100, h: 40, details: "Remote GPU cluster executing semantic inference and code generation prompts via low-latency API wrappers." },
      ]
    }
    if (projId === "shailshuta-logistics") {
      return [
        { id: "client", label: "Admin Console (React)", x: 30, y: 80, w: 110, h: 40, details: "React + Material UI logistics client dashboard executing shipment routing workflows." },
        { id: "gateway", label: "Logistics Core API", x: 180, y: 80, w: 110, h: 40, details: "Express.js API server running role-based controls (RBAC) and validation middleware." },
        { id: "db", label: "PostgreSQL DB", x: 330, y: 30, w: 100, h: 40, details: "Relational database housing shipment coordinate historical records and schemas." },
        { id: "nlp", label: "Prisma Layer", x: 330, y: 130, w: 100, h: 40, details: "Prisma ORM schema orchestrating connection pools and transaction management layers." },
      ]
    }
    // pdooh-platform
    return [
      { id: "client", label: "React Admin Panel", x: 30, y: 80, w: 100, h: 40, details: "Admin dashboard interface for centralized device playlist and media schedule configurations." },
      { id: "gateway", label: "Playout Signage API", x: 180, y: 80, w: 110, h: 40, details: "Node.js API router validating active playlist queues and device checkin handshakes." },
      { id: "db", label: "PostgreSQL Core", x: 330, y: 30, w: 100, h: 40, details: "Relational database storing digital screen schedule arrays and log streams." },
      { id: "dashboard", label: "Raspberry Pi Daemon", x: 330, y: 130, w: 110, h: 40, details: "Linux media player playout script fetching scheduled playlists and caching media files locally." },
    ]
  }

  const nodes = getDiagramNodes(project.id)

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-6 max-w-4xl w-full">
      {/* Project Header */}
      <div className="space-y-2 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2 text-accent">
          <span className="text-sm">📁</span>
          <span className="text-sm font-bold">src/projects/{project.id}.md</span>
        </div>
        <h1 className="text-xl font-bold text-foreground font-sans tracking-tight">{project.title}</h1>
        <p className="text-muted text-sm max-w-2xl font-sans leading-relaxed">{project.description}</p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border border-border bg-[#07090e] p-3.5 rounded-lg select-none">
        <div className="space-y-1">
          <div className="text-[10px] text-muted uppercase font-bold">TELEMETRY / METRIC</div>
          <div className="text-foreground text-sm font-bold font-sans">
            {project.id === "toolstack-ai" && "TTFT Latency: <85ms"}
            {project.id === "shipment-manager" && "Fleet Latency: 180ms"}
            {project.id === "ai-support" && "L1 Tickets Solved: 55%"}
          </div>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border pt-2 sm:pt-0 sm:pl-4">
          <div className="text-[10px] text-muted uppercase font-bold">OPTIMIZATION IMPACT</div>
          <div className="text-accent text-sm font-bold font-sans">
            {project.id === "toolstack-ai" && "Ingestion: 12.8s ➔ 3.1s"}
            {project.id === "shipment-manager" && "Fleet Coord: -40%"}
            {project.id === "ai-support" && "Resolution: 18h ➔ 2.5h"}
          </div>
        </div>
        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border pt-2 sm:pt-0 sm:pl-4">
          <div className="text-[10px] text-muted uppercase font-bold">INFRASTRUCTURE</div>
          <div className="text-foreground text-sm font-bold font-sans">
            {project.id === "toolstack-ai" && "PGVector Cluster"}
            {project.id === "shipment-manager" && "Redis Pub/Sub Sync"}
            {project.id === "ai-support" && "HuggingFace Local Queue"}
          </div>
        </div>
      </div>

      {/* Story-Driven Tabs Panel */}
      <div className="space-y-3">
        {/* Navigation buttons */}
        <div className="flex border-b border-border select-none">
          {(["problem", "tradeoffs", "architecture", "lessons"] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 border-b-2 font-semibold text-[11px] capitalize cursor-pointer transition-colors",
                activeTab === tab
                  ? "border-accent text-accent bg-accent/5"
                  : "border-transparent text-muted hover:text-foreground"
              )}
            >
              {tab === "problem" ? "01_Problem_Solved" : tab === "tradeoffs" ? "02_System_Tradeoffs" : tab === "architecture" ? "03_System_Architecture" : "04_Lessons_Learned"}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-[#07090e]/50 border border-border/40 p-4 rounded-lg min-h-[140px] leading-relaxed">
          {activeTab === "problem" && (
            <div className="space-y-3">
              <div>
                <span className="text-accent font-bold"># PROBLEM DEFINITION:</span>
                <p className="mt-1 font-sans text-sm text-muted/90">{project.problem}</p>
              </div>
              <div className="pt-2">
                <span className="text-accent font-bold"># ENGINEERED SOLUTION:</span>
                <p className="mt-1 font-sans text-sm text-muted/90">{project.solution}</p>
              </div>
            </div>
          )}
          {activeTab === "tradeoffs" && (
            <div>
              <span className="text-accent font-bold"># ARCHITECTURAL DECISIONS & TRADEOFFS:</span>
              <p className="mt-2 font-sans text-sm text-muted/90">{project.tradeoffs}</p>
            </div>
          )}
          {activeTab === "architecture" && (
            <div>
              <span className="text-accent font-bold"># SYSTEM TOPOLOGY DEFINITIONS:</span>
              <p className="mt-2 font-sans text-sm text-muted/90">{project.architecture}</p>
            </div>
          )}
          {activeTab === "lessons" && (
            <div>
              <span className="text-accent font-bold"># INCIDENT ANALYSIS & LESSONS:</span>
              <p className="mt-2 font-sans text-sm text-muted/90">{project.lessons}</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive System Topology Architecture Diagram */}
      <div className="space-y-3">
        <div className="text-[10px] text-muted uppercase font-bold tracking-wider select-none">
          05_Interactive_Topology_Diagram (Hover nodes to inspect details)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SVG Canvas Map */}
          <div className="md:col-span-2 border border-border bg-[#07090e] rounded-lg p-4 relative overflow-hidden flex items-center justify-center min-h-[220px]">
            <svg
              viewBox="0 0 460 200"
              width="100%"
              height="100%"
              className="font-mono text-[9px] text-[#DFE2E7]"
            >
              {/* Definitions for arrow markers */}
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border)" />
                </marker>
                <marker
                  id="arrow-accent"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-accent)" />
                </marker>
              </defs>

              {/* Connector Pathways */}
              <path
                d="M 130 100 H 180"
                stroke={hoveredNode?.id === "client" || hoveredNode?.id === "gateway" ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth="1.5"
                markerEnd={hoveredNode?.id === "client" || hoveredNode?.id === "gateway" ? "url(#arrow-accent)" : "url(#arrow)"}
                fill="none"
              />
              <path
                d="M 230 80 Q 230 50 330 50"
                stroke={hoveredNode?.id === "gateway" || hoveredNode?.id === "db" ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth="1.5"
                markerEnd={hoveredNode?.id === "gateway" || hoveredNode?.id === "db" ? "url(#arrow-accent)" : "url(#arrow)"}
                fill="none"
              />
              <path
                d="M 230 120 Q 230 150 330 150"
                stroke={hoveredNode?.id === "gateway" || hoveredNode?.id === "nim" || hoveredNode?.id === "nlp" || hoveredNode?.id === "dashboard" ? "var(--color-accent)" : "var(--color-border)"}
                strokeWidth="1.5"
                markerEnd={hoveredNode?.id === "gateway" || hoveredNode?.id === "nim" || hoveredNode?.id === "nlp" || hoveredNode?.id === "dashboard" ? "url(#arrow-accent)" : "url(#arrow)"}
                fill="none"
              />

              {/* Animated request pulse circle along path */}
              <circle r="3" fill="var(--color-accent)">
                <animateMotion
                  path="M 130 100 H 180"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="var(--color-accent)">
                <animateMotion
                  path="M 230 80 Q 230 50 330 50"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="var(--color-accent)">
                <animateMotion
                  path="M 230 120 Q 230 150 330 150"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Component Nodes */}
              {nodes.map((n) => {
                const isHovered = hoveredNode?.id === n.id
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHoveredNode(n)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-crosshair"
                  >
                    <rect
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={n.h}
                      rx="4"
                      fill={isHovered ? "var(--color-surface-hover)" : "var(--color-surface)"}
                      stroke={isHovered ? "var(--color-accent)" : "var(--color-border)"}
                      strokeWidth={isHovered ? "1.5" : "1"}
                      className="transition-all duration-150"
                    />
                    <text
                      x={n.x + n.w / 2}
                      y={n.y + n.h / 2 + 3}
                      textAnchor="middle"
                      fill={isHovered ? "var(--color-foreground)" : "var(--color-muted)"}
                      className={cn("font-mono text-[9px]", isHovered && "font-bold")}
                    >
                      {n.label}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Details Overlay Panel */}
          <div className="border border-border bg-[#07090e] rounded-lg p-4 flex flex-col justify-between select-none">
            <div className="space-y-2">
              <span className="text-[10px] text-muted uppercase font-bold">Node Inspector</span>
              <AnimatePresence mode="wait">
                {hoveredNode ? (
                  <motion.div
                    key={hoveredNode.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-1.5"
                  >
                    <div className="text-accent font-bold text-[11px] font-mono uppercase">{hoveredNode.label}</div>
                    <p className="text-[11px] text-muted font-sans leading-relaxed">{hoveredNode.details}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-muted/40 font-sans leading-relaxed"
                  >
                    Hover over any component node in the layout topology map (Client, API Router, Database, Cache, or Workers) to parse system interactions and audit logs.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="pt-4 border-t border-border/40 text-[9px] text-muted/40 font-mono">
              STATUS: CONNECTED // CLUSTER_UP
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
