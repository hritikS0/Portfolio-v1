"use client"

import { useState, useRef, useEffect } from "react"
import { TerminalPanel } from "@/src/components/terminal/terminal-panel"

export function Terminal() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const onGlobal = (e: KeyboardEvent) => {
      const el = inputRef.current
      if (!el) return

      const focused = document.activeElement
      if (focused === el) return

      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
        el.focus({ preventScroll: true })
        return
      }

      if (e.key === "Escape") {
        el.blur()
        return
      }
    }
    window.addEventListener("keydown", onGlobal)
    return () => window.removeEventListener("keydown", onGlobal)
  }, [])

  return (
    <div
      className={`relative rounded-xl border bg-[#05070a] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden w-full flex flex-col transition-all duration-300 ${
        isFocused ? "border-accent/40 ring-1 ring-accent/20" : "border-border/80"
      }`}
      style={{
        height: "460px",
        maxHeight: "70vh",
        fontFamily: "var(--font-geist-mono), JetBrains Mono, monospace",
      }}
    >
      {/* Subtle Scanlines Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-30"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%)",
          backgroundSize: "100% 4px"
        }}
      />

      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#0a0d14]/80 shrink-0 z-10">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-xs text-muted/80 font-mono tracking-tight">
            hritik@portfolio: ~ (zsh)
          </span>
        </div>
        <span className="text-[10px] text-muted/40 font-mono">Ghostty</span>
      </div>
      <TerminalPanel 
        onReady={(el) => { inputRef.current = el }} 
        onFocusChange={setIsFocused}
      />
    </div>
  )
}
