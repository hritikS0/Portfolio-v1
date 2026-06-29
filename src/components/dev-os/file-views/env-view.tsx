"use client"

import { useState } from "react"
import { cn } from "@/src/lib/utils"

interface EnvVar {
  key: string
  value: string
  comment: string
  actionLabel?: string
  actionUrl?: string
}

export function EnvView() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const envVariables: EnvVar[] = [
    {
      key: "DEVELOPER_EMAIL",
      value: "sharmahritik8077@gmail.com",
      comment: "# Secondary secure pipeline for professional SMTP handshakes.",
      actionLabel: "[send mail]",
      actionUrl: "mailto:sharmahritik8077@gmail.com",
    },
    {
      key: "DEVELOPER_GITHUB",
      value: "https://github.com/hritikS0",
      comment: "# Open-source hosting, commit indexes, and repository history.",
      actionLabel: "[open profile]",
      actionUrl: "https://github.com/hritikS0",
    },
    {
      key: "DEVELOPER_LINKEDIN",
      value: "https://linkedin.com/in/hritik-sharma-91336430b/",
      comment: "# Corporate networking, endorsements, and employment logs.",
      actionLabel: "[open profile]",
      actionUrl: "https://linkedin.com/in/hritik-sharma-91336430b/",
    },
    {
      key: "DEVELOPER_LOCATION",
      value: "New Delhi, India",
      comment: "# Current geographical timezone: UTC+5:30 (IST).",
    },
    {
      key: "DEVELOPER_STATUS",
      value: "ACTIVE_FOR_OPPORTUNITIES",
      comment: "# Availability flag for corporate roles, freelance pipelines, or contracts.",
    },
  ]

  const copyValue = (val: string, key: string) => {
    navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1800)
  }

  return (
    <div className="p-6 font-mono text-xs text-[#DFE2E7] space-y-6 max-w-3xl leading-relaxed">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none">
        <div className="flex items-center gap-2 text-accent">
          <span>⚙</span>
          <span className="font-bold">config/contact.env</span>
        </div>
        <span className="text-[10px] text-muted/40 font-mono">DOTENV CONFIG</span>
      </div>

      <div className="space-y-4">
        {/* Comment block */}
        <div className="text-muted/40 select-none leading-relaxed">
          # ENVIRONMENT VARIABLE DECLARATIONS<br />
          # CLICK KEY VALUE TO COPY TO SYSTEM CLIPBOARD<br />
          # HOVER VARIABLE TO PARSE DESCRIPTIVE COMMENTS
        </div>

        {/* Variables mapping */}
        <div className="space-y-4 pt-2">
          {envVariables.map((v) => {
            const isHovered = hoveredKey === v.key
            const isCopied = copiedKey === v.key

            return (
              <div
                key={v.key}
                className="flex flex-col gap-1 p-1.5 rounded transition-colors hover:bg-white/5"
                onMouseEnter={() => setExpandedComment(v.key)}
                onMouseLeave={() => setExpandedComment(null)}
              >
                {/* Visual Description Comment */}
                <div
                  className={cn(
                    "text-[10px] transition-opacity duration-150 select-none",
                    isHovered ? "text-accent/60 opacity-100" : "text-muted/30 opacity-50"
                  )}
                >
                  {v.comment}
                </div>

                {/* Variable block */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <button
                    type="button"
                    onClick={() => copyValue(v.value, v.key)}
                    className="text-[#FF79C6] font-bold text-left hover:underline cursor-pointer select-all"
                  >
                    {v.key}
                  </button>
                  <span className="text-muted/60 select-none">=</span>
                  <button
                    type="button"
                    onClick={() => copyValue(v.value, v.key)}
                    className="text-[#F1FA8C] text-left hover:underline cursor-pointer break-all select-all"
                  >
                    &quot;{v.value}&quot;
                  </button>

                  {/* Actions (SMTP / Profile Link) */}
                  {v.actionUrl && (
                    <a
                      href={v.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors ml-2 hover:underline text-[10px] select-none"
                    >
                      {v.actionLabel}
                    </a>
                  )}

                  {/* Copied indicator */}
                  {isCopied && (
                    <span className="text-green-400 font-bold ml-3 text-[10px] animate-pulse select-none">
                      ✓ value_copied!
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  function setExpandedComment(key: string | null) {
    setHoveredKey(key)
  }
}
