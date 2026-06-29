"use client"

import { useState } from "react"
import { cn } from "@/src/lib/utils"

type EndpointType = "POST /api/contact" | "GET /api/projects" | "GET /api/telemetry"

interface EndpointDetails {
  method: "GET" | "POST"
  url: string
  requestBody?: string
  responseBody: string
}

export function ApiClient() {
  const [activeEndpoint, setActiveEndpoint] = useState<EndpointType>("POST /api/contact")
  const [isSending, setIsSending] = useState(false)
  const [response, setResponse] = useState<EndpointDetails | null>(null)
  const [latency, setLatency] = useState(0)

  const endpoints: Record<EndpointType, EndpointDetails> = {
    "POST /api/contact": {
      method: "POST",
      url: "http://localhost:3000/api/contact",
      requestBody: JSON.stringify(
        {
          name: "Recruiter / Tech Manager",
          email: "guest@company.com",
          message: "Let's align for an interview regarding Full-Stack positions.",
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          status: "success",
          code: 201,
          message: "Contact webhook triggered. SMTP dispatcher scheduled.",
          telemetry: {
            delivered_at: new Date().toISOString(),
            queue_position: 1,
            worker_id: "smtp-pool-worker-04",
          },
        },
        null,
        2
      ),
    },
    "GET /api/projects": {
      method: "GET",
      url: "http://localhost:3000/api/projects",
      responseBody: JSON.stringify(
        [
          { id: "toolstack-ai", deployed: true, load_balancer: "vercel-edge" },
          { id: "shipment-manager", deployed: true, cluster_nodes: 3 },
          { id: "ai-support", deployed: true, queue_broker: "redis" },
        ],
        null,
        2
      ),
    },
    "GET /api/telemetry": {
      method: "GET",
      url: "http://localhost:3000/api/telemetry",
      responseBody: JSON.stringify(
        {
          uptime: "99.98%",
          active_connections: 42,
          github: {
            total_commits_ytd: 512,
            contribution_ratio: "96.4%",
            primary_language: "TypeScript",
          },
          memory_footprint: {
            heap_total: "62.4 MB",
            heap_used: "41.8 MB",
          },
        },
        null,
        2
      ),
    },
  }

  const handleSend = () => {
    setIsSending(true)
    setResponse(null)

    // Simulate network trip
    const start = performance.now()
    const simulatedLatency = Math.floor(Math.random() * 200) + 120 // 120ms to 320ms

    setTimeout(() => {
      setIsSending(false)
      setLatency(Math.floor(performance.now() - start))
      setResponse(endpoints[activeEndpoint])
    }, simulatedLatency)
  }

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-4 max-w-4xl h-full flex flex-col min-h-0">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-accent">
          <span>⚡</span>
          <span className="font-bold">src/api/test-endpoint.sh</span>
        </div>
        <span className="text-[10px] text-muted/40 font-mono">REST CLIENT PANEL</span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        {/* Request Pane */}
        <div className="flex-1 border border-border bg-[#07090e] rounded-lg p-4 flex flex-col gap-4 min-h-0 select-none">
          <span className="text-[10px] text-muted uppercase font-bold">1. Configure Request</span>
          
          {/* Endpoint controls */}
          <div className="flex gap-2">
            <select
              value={activeEndpoint}
              onChange={(e) => {
                setActiveEndpoint(e.target.value as EndpointType)
                setResponse(null)
              }}
              className="bg-[#0c0f17] border border-border rounded px-2.5 py-1.5 focus:outline-none focus:border-accent text-foreground text-[11px]"
            >
              <option value="POST /api/contact">POST /api/contact</option>
              <option value="GET /api/projects">GET /api/projects</option>
              <option value="GET /api/telemetry">GET /api/telemetry</option>
            </select>

            <input
              type="text"
              readOnly
              value={endpoints[activeEndpoint].url}
              className="flex-1 bg-[#0a0d14] border border-border rounded px-3 text-muted text-[11px] focus:outline-none"
            />

            <button
              type="button"
              disabled={isSending}
              onClick={handleSend}
              className={cn(
                "px-4 rounded bg-accent text-white hover:opacity-90 font-bold transition-opacity cursor-pointer disabled:opacity-50 select-none",
                isSending && "animate-pulse"
              )}
            >
              {isSending ? "SENDING..." : "SEND"}
            </button>
          </div>

          {/* Request payload details */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="h-6 border-b border-border/40 text-muted/80 text-[10px] font-bold">
              REQUEST BODY (JSON)
            </div>
            <div className="flex-1 bg-[#030407] border border-border/60 rounded p-3 overflow-y-auto mt-2 text-foreground/80 text-[11px] leading-relaxed select-text font-mono">
              {endpoints[activeEndpoint].requestBody ? (
                <pre>{endpoints[activeEndpoint].requestBody}</pre>
              ) : (
                <div className="text-muted/30 italic">No request payload body required for GET request.</div>
              )}
            </div>
          </div>
        </div>

        {/* Response Pane */}
        <div className="flex-1 border border-border bg-[#07090e] rounded-lg p-4 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between shrink-0 select-none">
            <span className="text-[10px] text-muted uppercase font-bold">2. Response Payload</span>
            {response && (
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="text-green-400 font-bold">STATUS: 200 OK</span>
                <span className="text-muted/60">•</span>
                <span className="text-muted">{latency}ms</span>
              </div>
            )}
          </div>

          {/* Response Payload Content */}
          <div className="flex-1 bg-[#030407] border border-border/80 rounded p-3 overflow-y-auto text-[11px] leading-relaxed font-mono relative">
            {isSending && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030407]/90 text-accent gap-2 select-none">
                <span className="animate-spin text-lg">⚙</span>
                <span className="animate-pulse text-[10px] font-bold tracking-wider">AWAITING RESPONSE...</span>
              </div>
            )}

            {!isSending && response ? (
              <pre className="text-emerald-400 select-text">{response.responseBody}</pre>
            ) : (
              !isSending && (
                <div className="flex flex-col items-center justify-center h-full text-muted/30 italic select-none">
                  Click [SEND] to submit the HTTP request payload and inspect server telemetry logs.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
