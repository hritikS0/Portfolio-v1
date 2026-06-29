"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/src/lib/utils"

export function LiveCodeView() {
  const [typedCode, setTypedCode] = useState("")
  const [isPlaying, setIsPlaying] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [runLogs, setRunLogs] = useState<string[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const codeIdxRef = useRef(0)
  const consoleRef = useRef<HTMLDivElement>(null)

  const sourceCode = `import { NextRequest, NextResponse } from "next/server"
import { pgPool } from "@/lib/db"
import { redis } from "@/lib/redis"

// Ingestion API router for vector embeddings
export async function POST(req: NextRequest) {
  try {
    const { documentId, text } = await req.json()
    
    // Check query cache
    const cacheHit = await redis.get(\`doc:\${documentId}\`)
    if (cacheHit) {
      return NextResponse.json({ status: "cached", data: JSON.parse(cacheHit) })
    }
    
    // Token chunking text limits
    const chunks = chunkText(text, 500)
    
    // Batch injection into PostgreSQL pgvector
    const client = await pgPool.connect()
    try {
      await client.query("BEGIN")
      for (const chunk of chunks) {
        const vec = await generateNIMEmbedding(chunk)
        await client.query(
          "INSERT INTO embeddings (doc_id, content, vec) VALUES ($1, $2, $3)",
          [documentId, chunk, vec]
        )
      }
      await client.query("COMMIT")
    } finally {
      client.release()
    }
    
    await redis.set(\`doc:\${documentId}\`, JSON.stringify({ status: "ready", chunks: chunks.length }), "EX", 3600)
    return NextResponse.json({ status: "indexed", total_chunks: chunks.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}`

  const typeCode = () => {
    if (codeIdxRef.current >= sourceCode.length) {
      setIsPlaying(false)
      return
    }

    setTypedCode(sourceCode.slice(0, codeIdxRef.current + 1))
    codeIdxRef.current += 1

    // Type faster for whitespace/newlines
    const nextChar = sourceCode[codeIdxRef.current]
    const delay = nextChar === "\n" ? 180 : nextChar === " " ? 20 : 45
    timerRef.current = setTimeout(typeCode, delay)
  }

  useEffect(() => {
    if (isPlaying) {
      typeCode()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying])

  const runScript = () => {
    setIsRunning(true)
    setRunLogs([])
    
    const logs = [
      "$ ts-node src/live_coding/demo.ts",
      "Parsing imports...",
      "✓ Loaded next/server modules.",
      "✓ Verified pgPool DB connection pool initialized.",
      "✓ Resolved Redis client handshake.",
      "Running TS compiler audit...",
      "✓ Compilation successful in 284ms. Zero syntax leaks detected.",
      "Benchmark testing ingestion wrapper with test harness...",
      "└─ Chunking payload: 12 chunks resolved.",
      "└─ Generating NIM embeddings: 12 batches...",
      "└─ PGVector batch write complete. Transaction committed.",
      "✓ Success: Ingestion pipeline execution complete.",
      "Latency: 3.1s // Status: 200 OK"
    ]

    let idx = 0
    const logTimer = setInterval(() => {
      if (idx >= logs.length) {
        clearInterval(logTimer)
        return
      }
      setRunLogs((prev) => [...prev, logs[idx]])
      idx++
      
      // Scroll console logs to bottom
      requestAnimationFrame(() => {
        if (consoleRef.current) {
          consoleRef.current.scrollTop = consoleRef.current.scrollHeight
        }
      })
    }, 450)
  }

  const restartTyping = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setTypedCode("")
    codeIdxRef.current = 0
    setIsPlaying(true)
    setIsRunning(false)
    setRunLogs([])
  }

  // Pre-compiled code highlighting logic using simple regex styling
  const highlightCode = (code: string) => {
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Keywords
      .replace(/\b(import|from|export|async|function|await|try|catch|const|let|return|try|finally|if)\b/g, '<span class="text-[#FF79C6]">$1</span>')
      // Strings
      .replace(/(["'`])(.*?)\1/g, '<span class="text-[#F1FA8C]">$1$2$1</span>')
      // Comments
      .replace(/(\/\/.*)/g, '<span class="text-[#6272A4]">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-[#BD93F9]">$1</span>')
      // Functions
      .replace(/\b(\w+)(?=\()/g, '<span class="text-[#50FA7B]">$1</span>')
  }

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-4 max-w-4xl h-full flex flex-col min-h-0">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-accent">
          <span>📄</span>
          <span className="font-bold">src/live_coding/demo.ts</span>
        </div>
        <div className="flex items-center gap-2">
          {isPlaying && <span className="text-amber-400 text-[10px] animate-pulse">● TYPING</span>}
          {!isPlaying && <span className="text-muted text-[10px]">STATIONARY</span>}
        </div>
      </div>

      {/* Control Tools */}
      <div className="flex flex-wrap gap-2 shrink-0 select-none">
        <button
          type="button"
          onClick={restartTyping}
          className="px-2.5 py-1 border border-border rounded bg-surface hover:bg-surface-hover text-[10px] text-foreground transition-colors cursor-pointer"
        >
          [⟳ Reset Typist]
        </button>
        <button
          type="button"
          onClick={runScript}
          disabled={isRunning}
          className="px-2.5 py-1 border border-accent/40 rounded bg-accent/10 hover:bg-accent/20 text-[10px] text-accent font-semibold transition-colors cursor-pointer disabled:opacity-50"
        >
          [▶ Run Script]
        </button>
      </div>

      {/* Workspace Editor */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Typist Editor Area */}
        <div className="lg:col-span-2 bg-[#030407] border border-border/80 rounded-lg p-4 overflow-y-auto font-mono text-[11px] leading-relaxed relative select-text">
          <pre
            className="whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightCode(typedCode) }}
          />
          {isPlaying && (
            <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 animate-pulse" />
          )}
        </div>

        {/* Script Console output log */}
        <div className="border border-border bg-[#07090e] rounded-lg p-4 flex flex-col justify-between min-h-[160px] select-none">
          <div className="space-y-2 flex-1 flex flex-col min-h-0">
            <span className="text-[10px] text-muted uppercase font-bold shrink-0">Terminal Console Output</span>
            <div
              ref={consoleRef}
              className="flex-1 bg-black/60 border border-border/40 rounded p-2.5 overflow-y-auto space-y-1.5 font-mono text-[10px] text-muted select-text"
            >
              {runLogs.length > 0 ? (
                runLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "break-words",
                      log.startsWith("✓") ? "text-green-400" : "",
                      log.startsWith("$") ? "text-foreground font-bold" : "",
                      log.includes("Error") ? "text-red-400" : ""
                    )}
                  >
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-muted/30 italic h-full flex items-center justify-center text-center">
                  Click [Run Script] to compile and execute the database transaction loops.
                </div>
              )}
            </div>
          </div>
          <div className="pt-3 border-t border-border/40 text-[9px] text-muted/40 font-mono mt-3 shrink-0">
            COMPILER: TS_NODE_V10
          </div>
        </div>
      </div>
    </div>
  )
}
