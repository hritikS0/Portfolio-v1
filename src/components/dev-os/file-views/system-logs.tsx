"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/src/lib/utils"

interface LogLine {
  timestamp: string
  type: "info" | "success" | "process" | "warning"
  message: string
}

export function SystemLogs() {
  const [logs, setLogs] = useState<LogLine[]>([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const logContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lineIdxRef = useRef(0)

  // System deployment log sequence definition
  const rawLogSequence: LogLine[] = [
    { timestamp: "19:12:15.102", type: "info", message: "SYSTEM: Initializing career_deployment_agent v2.4.0..." },
    { timestamp: "19:12:15.250", type: "info", message: "SYSTEM: Resolving dependencies for Hritik Sharma..." },
    { timestamp: "19:12:15.420", type: "info", message: "SYSTEM: Loaded 3 career nodes successfully." },
    
    // Node 1: BCA
    { timestamp: "19:12:15.600", type: "info", message: "DEPL: Spawning GNIOT IPS node (BCA in Computer Science)..." },
    { timestamp: "19:12:15.850", type: "process", message: "DEPL: Ingesting concepts: data structures, OS, database design, system metrics." },
    { timestamp: "19:12:16.200", type: "success", message: "DEPL: [SUCCESS] BCA degree finalized (2022 — 2025). Graduated with systems-level engineering foundation." },
    
    // Node 2: MERN Stack
    { timestamp: "19:12:16.450", type: "info", message: "DEPL: Spawning Ducat Pitampura Node (MERN Specialist Training)..." },
    { timestamp: "19:12:16.700", type: "process", message: "DEPL: Ingesting concepts: MongoDB connection pools, Express middlewares, React hooks, Node callback structures." },
    { timestamp: "19:12:17.100", type: "success", message: "DEPL: [SUCCESS] Shipped multiple authentication wrappers, REST endpoints, and WebSockets chat services." },
    
    // Node 3: TechPlek Web Dev Intern
    { timestamp: "19:12:17.350", type: "info", message: "DEPL: Spawning TechPlek Technologies Node (Web Development Intern)..." },
    { timestamp: "19:12:17.600", type: "process", message: "DEPL: Migrating internal logistics dashboard modules from JS to type-safe TypeScript configurations..." },
    { timestamp: "19:12:17.920", type: "success", message: "DEPL: [SUCCESS] Migrated 12 static panels, improving build-time safety and compiler checks." },
    { timestamp: "19:12:18.200", type: "process", message: "DEPL: Designing role-based access control (RBAC) schemas and REST endpoint controllers..." },
    { timestamp: "19:12:18.650", type: "success", message: "DEPL: [SUCCESS] Successfully deployed secure RBAC endpoints on logistics core server." },
    { timestamp: "19:12:18.900", type: "process", message: "DEPL: Benchmarking and fixing resource memory leaks in PDOOH Raspberry Pi device media players..." },
    { timestamp: "19:12:19.300", type: "success", message: "DEPL: [SUCCESS] Fixed setup device boot cycles and resolved memory leaks in playout threads." },
    
    // Complete
    { timestamp: "19:12:19.600", type: "info", message: "SYSTEM: Career deployment logs stream completed. All processes active." },
    { timestamp: "19:12:19.750", type: "success", message: "SYSTEM: [STATUS] Hritik Sharma is available for core engineering opportunities." },
  ]

  const triggerNextLine = () => {
    if (lineIdxRef.current >= rawLogSequence.length) {
      setIsComplete(true)
      setIsPlaying(false)
      return
    }

    const nextLine = rawLogSequence[lineIdxRef.current]
    setLogs((prev) => [...prev, nextLine])
    lineIdxRef.current += 1

    const nextDelay = nextLine.type === "success" ? 750 : nextLine.type === "process" ? 450 : 250
    timerRef.current = setTimeout(triggerNextLine, nextDelay)
  }

  useEffect(() => {
    if (isPlaying) {
      triggerNextLine()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying])

  // Scroll to bottom on append
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  const restartStream = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setLogs([])
    lineIdxRef.current = 0
    setIsComplete(false)
    setIsPlaying(true)
  }

  const pauseStream = () => {
    setIsPlaying(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const resumeStream = () => {
    setIsPlaying(true)
  }

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-4 max-w-4xl h-full flex flex-col min-h-0">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-accent">
          <span>📋</span>
          <span className="font-bold">src/experience/career_logs.log</span>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && <span className="text-green-400 text-[10px] animate-pulse">● ACTIVE</span>}
          {!isComplete && isPlaying && <span className="text-blue-400 text-[10px] animate-pulse">⚙ PROCESSING</span>}
          {!isPlaying && !isComplete && <span className="text-muted text-[10px]">|| PAUSED</span>}
        </div>
      </div>

      {/* Control Tools */}
      <div className="flex flex-wrap gap-2 shrink-0 select-none">
        <button
          type="button"
          onClick={restartStream}
          className="px-2.5 py-1 border border-border rounded bg-surface hover:bg-surface-hover text-[10px] text-foreground transition-colors cursor-pointer"
        >
          [⟳ Replay Logs]
        </button>
        {!isComplete && isPlaying && (
          <button
            type="button"
            onClick={pauseStream}
            className="px-2.5 py-1 border border-border rounded bg-surface hover:bg-surface-hover text-[10px] text-foreground transition-colors cursor-pointer"
          >
            [|| Pause Stream]
          </button>
        )}
        {!isComplete && !isPlaying && (
          <button
            type="button"
            onClick={resumeStream}
            className="px-2.5 py-1 border border-border rounded bg-surface hover:bg-surface-hover text-[10px] text-foreground transition-colors cursor-pointer"
          >
            [▶ Resume Stream]
          </button>
        )}
      </div>

      {/* Log Window Viewport */}
      <div
        ref={logContainerRef}
        className="flex-1 bg-[#030407] border border-border/80 rounded-lg p-4 overflow-y-auto space-y-2 select-text font-mono text-[11px] leading-relaxed min-h-[400px]"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2.5 hover:bg-white/5 py-0.5 rounded px-1 transition-colors">
            <span className="text-muted/40 select-none shrink-0">{log.timestamp}</span>
            <span
              className={cn(
                "font-bold select-none shrink-0",
                log.type === "info" && "text-blue-400",
                log.type === "process" && "text-amber-500",
                log.type === "success" && "text-green-400",
                log.type === "warning" && "text-red-400"
              )}
            >
              [{log.type.toUpperCase()}]
            </span>
            <span className="text-foreground/90 break-words">{log.message}</span>
          </div>
        ))}

        {/* Typing blinker */}
        {isPlaying && !isComplete && (
          <div className="flex gap-2 items-center px-1 text-muted/40 animate-pulse">
            <span>[info]</span>
            <span>...</span>
            <span className="w-1.5 h-3.5 bg-accent" />
          </div>
        )}
      </div>
    </div>
  )
}
