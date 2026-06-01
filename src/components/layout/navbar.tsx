"use client"

import { useSyncExternalStore, useState, useEffect } from "react"
import { cn } from "@/src/lib/utils"

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
]

const subscribe = (callback: () => void) => {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", callback, { passive: true })
    return () => window.removeEventListener("scroll", callback)
  }
  return () => {}
}

const getSnapshot = () => {
  if (typeof window !== "undefined") {
    return window.scrollY > 50
  }
  return false
}

const getServerSnapshot = () => false

export function Navbar() {
  const scrolled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [modifier, setModifier] = useState("⌘")

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("win")) {
      setModifier("Win+")
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-sm font-medium tracking-tight">
          HS
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <button
              type="button"
              onClick={() => {
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
                setTimeout(() => {
                  const terminalInput = document.querySelector('input[aria-label="Terminal input prompt"]') as HTMLInputElement | null
                  terminalInput?.focus({ preventScroll: true })
                }, 100)
              }}
              className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-surface px-2 text-xs text-muted font-mono hover:bg-surface-hover transition-colors cursor-pointer"
              aria-label="Focus terminal"
            >
              <span className="text-[10px]">{modifier}</span>K
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
