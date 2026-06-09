"use client"

import { useState, useRef, useEffect, useCallback, useReducer } from "react"

type Line = {
  id: number
  text: string
}

const COMMANDS = [
  "help",
  "about",
  "projects",
  "project 1",
  "project 2",
  "project 3",
  "experience",
  "stack",
  "contact",
  "resume",
  "github",
  "linkedin",
  "clear",
]

const RESPONSES: Record<string, string> = {
  help:
    "Available commands\n\n" +
    "about       Learn who I am\n" +
    "projects    View selected work\n" +
    "experience  Career timeline\n" +
    "stack       Technology stack\n" +
    "contact     Get in touch\n" +
    "resume      Open resume.pdf\n" +
    "github      Open GitHub\n" +
    "linkedin    Open LinkedIn\n" +
    "clear       Clear terminal",
  about:
    "  /\\_/\\     hritik@portfolio\n" +
    " ( o.o )    ----------------\n" +
    "  > ^ <     Name       : Hritik Sharma\n" +
    "            Role       : Full Stack Engineer\n" +
    "            Experience : 1+ Years\n" +
    "            Projects   : 5+\n" +
    "            Location   : New Delhi, India\n" +
    "            Stack      : MERN & PERN\n" +
    "            Editor     : VS Code / Neovim\n" +
    "            Terminal   : Ghostty / Warp\n" +
    "            Status     : Available for opportunities\n\n" +
    "Type 'help' to see all available commands.",
  stack:
    "Frontend\n" +
    "├─ Next.js\n" +
    "├─ React\n" +
    "└─ TypeScript\n" +
    "\n" +
    "Backend\n" +
    "├─ NestJS\n" +
    "├─ Node.js\n" +
    "└─ Express\n" +
    "\n" +
    "Database\n" +
    "├─ PostgreSQL\n" +
    "└─ Redis\n" +
    "\n" +
    "Infrastructure\n" +
    "├─ Docker\n" +
    "├─ AWS\n" +
    "└─ Linux",
  projects:
    "Featured Projects:\n" +
    "  01 Shipment Management System\n" +
    "  02 ToolstackAi\n" +
    "  03 AI Support Assistant\n\n" +
    "Type 'project 1', 'project 2', or 'project 3' to view full details.",
  "project 1":
    "Shipment Management System\n" +
    "├─ Description : Real-time shipment tracking and logistics management dashboard.\n" +
    "├─ Problem     : Logistics teams lacked a unified platform to track shipments.\n" +
    "├─ Solution    : Built full-stack dashboard with real-time status via Socket.io.\n" +
    "├─ Telemetry   : -40% average coordination time, 94% on-time delivery rate.\n" +
    "└─ Tech Stack  : React, Node.js, Express, MongoDB, Socket.io, Mapbox",
  "project 2":
    "ToolstackAi\n" +
    "├─ Description : AI-powered developer toolkit platform for discovering AI dev tools.\n" +
    "├─ Problem     : Developers struggle to navigate the rapidly growing AI tools ecosystem.\n" +
    "├─ Solution    : Built curated platform with comparisons, pricing, and integration guides.\n" +
    "├─ Telemetry   : Helped 500+ devs discover AI tools, cut research time by 65%.\n" +
    "└─ Tech Stack  : Next.js, TypeScript, Node.js, PostgreSQL, Prisma, Vercel",
  "project 3":
    "AI Support Assistant\n" +
    "├─ Description : Intelligent ticket management system with automated routing.\n" +
    "├─ Problem     : Support teams were spending 70% of time on repetitive L1 queries.\n" +
    "├─ Solution    : Developed NLP-based classification with automated response drafts.\n" +
    "├─ Telemetry   : Automated 55% of L1 queries, cut resolution time to 2.5 hours.\n" +
    "└─ Tech Stack  : React, TypeScript, Python, FastAPI, PostgreSQL, Redis",
  contact:
    "# CONFIG: ~/.config/hritik/contact.env\n" +
    "EMAIL=\"sharmahritik8077@gmail.com\"\n" +
    "GITHUB=\"https://github.com/hritikS0\"\n" +
    "LINKEDIN=\"https://linkedin.com/in/hritik-sharma\"\n" +
    "LOCATION=\"New Delhi, India\"",
  experience:
    "Experience History:\n" +
    "  • Full-Stack Developer @ Freelance/Contract (Jan 2024 — Present)\n" +
    "    └─ Shipped scalable full-stack applications with Next.js, Node.js, and PostgreSQL.\n" +
    "  • Web Development Intern @ TechPlek Technologies Pvt Ltd, New Delhi (Dec 2025 — June 2026)\n" +
    "    └─ Migrated internal dashboards from JavaScript to TypeScript.\n" +
    "  • BCA in Computer Science @ GNIOT IPS (2022 — 2024)\n" +
    "    └─ Graduated with focus on software engineering and systems design."
}

const MAX_LINES = 300

type TerminalPanelProps = {
  onReady?: (inputEl: HTMLInputElement) => void
  onFocusChange?: (focused: boolean) => void
}

type TerminalState = {
  lines: Line[]
  input: string
  history: string[]
  historyIdx: number
  booting: boolean
}

export function TerminalPanel({ onReady, onFocusChange }: TerminalPanelProps) {
  const [state, setState] = useReducer((s: TerminalState, a: Partial<TerminalState> | ((prev: TerminalState) => Partial<TerminalState>)) => {
    return { ...s, ...(typeof a === 'function' ? a(s) : a) }
  }, {
    lines: [],
    input: "",
    history: [],
    historyIdx: -1,
    booting: true
  })

  const { lines, input, history, historyIdx, booting } = state
  const setLines = useCallback((updater: Line[] | ((prev: Line[]) => Line[])) => {
    setState(prev => ({ lines: typeof updater === 'function' ? updater(prev.lines) : updater }))
  }, [])
  const setInput = (input: string) => setState({ input })
  const setHistory = (updater: string[] | ((prev: string[]) => string[])) => {
    setState(prev => ({ history: typeof updater === 'function' ? updater(prev.history) : updater }))
  }
  const setHistoryIdx = (historyIdx: number) => setState({ historyIdx })
  const setBooting = (booting: boolean) => setState({ booting })

  const nextId = useRef(1)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentPrintId = useRef(0)
  
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
  }, [])

  // Sequential boot loader sequence
  useEffect(() => {
    let active = true
    const boot = async () => {
      const hasBooted = typeof window !== "undefined" && sessionStorage.getItem("portfolio_has_booted")

      if (hasBooted) {
        setLines([
          { id: nextId.current++, text: "Initializing portfolio..." },
          { id: nextId.current++, text: "Loading projects..." },
          { id: nextId.current++, text: "Loading experience..." },
          { id: nextId.current++, text: "Loading stack..." },
          { id: nextId.current++, text: "Ready." },
          { id: nextId.current++, text: "hritik@portfolio:~$ fastfetch" },
          { id: nextId.current++, text: RESPONSES.about }
        ])
        setBooting(false)
        scrollToBottom()
        setTimeout(() => {
          if (inputRef.current) {
            onReadyRef.current?.(inputRef.current)
            inputRef.current.focus({ preventScroll: true })
          }
        }, 50)
        return
      }

      setBooting(true)
      
      const bootSequences = [
        "Initializing portfolio...",
        "Loading projects...",
        "Loading experience...",
        "Loading stack...",
        "Ready."
      ]

      for (let i = 0; i < bootSequences.length; i++) {
        await new Promise(r => setTimeout(r, 100))
        if (!active) return
        setLines(prev => [...prev, { id: nextId.current++, text: bootSequences[i] }])
        scrollToBottom()
      }

      await new Promise(r => setTimeout(r, 300))
      if (!active) return

      // Type "fastfetch"
      const promptFastfetchId = nextId.current++
      setLines(prev => [...prev, { id: promptFastfetchId, text: "hritik@portfolio:~$ " }])
      scrollToBottom()

      const fastfetchText = "fastfetch"
      for (let i = 1; i <= fastfetchText.length; i++) {
        await new Promise(r => setTimeout(r, 45))
        if (!active) return
        setLines(prev => prev.map(l => l.id === promptFastfetchId ? { ...l, text: "hritik@portfolio:~$ " + fastfetchText.slice(0, i) } : l))
        scrollToBottom()
      }

      await new Promise(r => setTimeout(r, 250))
      if (!active) return

      setLines(prev => [...prev, { id: nextId.current++, text: RESPONSES.about }])
      
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio_has_booted", "true")
      }
      
      setBooting(false)
      scrollToBottom()
      
      setTimeout(() => {
        if (inputRef.current) {
          onReadyRef.current?.(inputRef.current)
          inputRef.current.focus({ preventScroll: true })
        }
      }, 50)
    }

    boot()
    return () => {
      active = false
    }
  }, [scrollToBottom])

  const execute = useCallback(
    (raw: string) => {
      let trimmed = raw.trim()
      if (trimmed.startsWith("/")) trimmed = trimmed.slice(1)
      if (!trimmed) return

      const lowerVal = trimmed.toLowerCase()

      if (lowerVal === "clear") {
        currentPrintId.current++
        setLines([])
        return
      }

      const myPrintId = ++currentPrintId.current
      const printLines = async (text: string) => {
        const lineId = nextId.current++
        setLines(prev => [...prev, { id: lineId, text: "" }])
        
        const outputLines = text.split('\n')
        let currentText = ""
        for (let i = 0; i < outputLines.length; i++) {
          if (currentPrintId.current !== myPrintId) break
          await new Promise(r => setTimeout(r, 25))
          currentText += (i > 0 ? "\n" : "") + outputLines[i]
          
          const newText = currentText
          setLines(prev => prev.map(l => l.id === lineId ? { ...l, text: newText } : l))
          scrollToBottom()
        }
      }

      const navActions: Record<string, () => void> = {
        resume: () => window.open("/resume.pdf", "_blank"),
        github: () => window.open("https://github.com/hritikS0", "_blank"),
        linkedin: () => window.open("https://linkedin.com/in/hritik-sharma", "_blank"),
        projects: () =>
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
        experience: () =>
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
        stack: () =>
          document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" }),
        contact: () =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      }

      const navAction = navActions[lowerVal]
      if (navAction) {
        navAction()
        if (lowerVal === "resume" || lowerVal === "github" || lowerVal === "linkedin") {
          printLines(`Opening ${lowerVal}...`)
        } else {
          printLines(`Navigating to ${lowerVal} section...`)
        }
        return
      }

      // Exact or project selection matching
      const response = RESPONSES[lowerVal]
      if (response) {
        printLines(response)
      } else if (lowerVal === "fastfetch") {
        printLines(RESPONSES.about)
      } else {
        printLines(`Command not found: ${trimmed}. Type 'help' for available commands.`)
      }
      scrollToBottom()
    },
    [scrollToBottom]
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).executeTerminalCommand = (cmd: string) => {
        setLines(prev => [...prev, { id: nextId.current++, text: `hritik@portfolio:~$ ${cmd}` }])
        execute(cmd)
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).executeTerminalCommand
      }
    }
  }, [execute])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = input.trim()
    if (!val) return

    setLines(prev => [...prev, { id: nextId.current++, text: `hritik@portfolio:~$ ${input}` }])
    setHistory((prev) => [...prev, val])
    setHistoryIdx(-1)
    setInput("")
    execute(val)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length === 0) return
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
      setHistoryIdx(idx)
      setInput(history[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIdx === -1) return
      const idx = historyIdx + 1
      if (idx >= history.length) {
        setHistoryIdx(-1)
        setInput("")
      } else {
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      const norm = input.trim().toLowerCase()
      if (!norm) return
      const matches = COMMANDS.filter((c) => c.startsWith(norm) && c !== norm)
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <div
      ref={outputRef}
      className="overflow-y-auto p-5 pb-6 space-y-3 flex-1 min-h-0 select-text cursor-text text-left"
      role="presentation"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          inputRef.current?.focus({ preventScroll: true })
        }
      }}
    >
      {lines.map((line) => (
        <p
          key={line.id}
          className="text-sm leading-relaxed whitespace-pre-wrap break-words text-[#DFE2E7] font-mono"
        >
          {line.text}
        </p>
      ))}

      {/* Inline Terminal Prompter */}
      {!booting && (
        <form onSubmit={onSubmit} className="flex items-center gap-0 py-0.5">
          <span className="text-accent font-semibold mr-2 select-none text-sm shrink-0 font-mono">
            hritik@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => onFocusChange?.(true)}
            onBlur={() => onFocusChange?.(false)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input prompt"
            className="flex-1 bg-transparent text-sm text-foreground focus:outline-none border-none p-0 caret-[#3B82F6] font-mono"
          />
        </form>
      )}
    </div>
  )
}
