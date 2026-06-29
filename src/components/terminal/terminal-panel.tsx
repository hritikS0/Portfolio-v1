"use client"

import { useState, useRef, useEffect, useCallback, useReducer } from "react"
import { useMode } from "@/src/components/providers/mode-provider"
import { cn } from "@/src/lib/utils"

type Line = {
  id: number
  text: string
}

const COMMANDS = [
  "help",
  "about",
  "projects",
  "experience",
  "stack",
  "contact",
  "resume",
  "github",
  "linkedin",
  "clear",
  "recruiter",
  "developer",
  "matrix",
  "hack",
  "sudo",
  "theme",
  "cat README.md",
  "cat config/contact.env",
]

const RESPONSES: Record<string, string> = {
  help:
    "Available commands:\n\n" +
    "about       Learn who I am\n" +
    "projects    View software repositories\n" +
    "experience  Deployment timeline logs\n" +
    "stack       System architecture layers\n" +
    "contact     Inspect .env contact values\n" +
    "resume      Open résumé PDF\n" +
    "github      Open GitHub link\n" +
    "linkedin    Open LinkedIn link\n" +
    "recruiter   Switch page layout to Recruiter Mode\n" +
    "developer   Switch page layout to Developer Mode (IDE)\n" +
    "cat <file>  Open specified file in editor tabs\n" +
    "matrix      Stream green binary waterfalls\n" +
    "hack        Brute-force mainframe diagnostics\n" +
    "theme       Rotate terminal palette configurations\n" +
    "clear       Flush terminal history lines",
  about:
    "  /\\_/\\     hritik@portfolio\n" +
    " ( o.o )    ----------------\n" +
    "  > ^ <     Name       : Hritik Sharma\n" +
    "            Role       : Full Stack Engineer\n" +
    "            Experience : 1+ Years\n" +
    "            Projects   : 3+\n" +
    "            Location   : New Delhi, India\n" +
    "            Stack      : MERN & PERN Specialist\n" +
    "            Editor     : VS Code / Neovim\n" +
    "            Terminal   : Ghostty\n" +
    "            Status     : Ready for opportunities\n\n" +
    "Type 'help' to see all available commands.",
}

type TerminalTheme = "default" | "dracula" | "amber" | "matrix"

type TerminalState = {
  lines: Line[]
  input: string
  history: string[]
  historyIdx: number
  booting: boolean
}

interface TerminalPanelProps {
  onReady?: (inputEl: HTMLInputElement) => void
  onFocusChange?: (focused: boolean) => void
}

export function TerminalPanel({ onReady, onFocusChange }: TerminalPanelProps) {
  const { mode, setMode, openFile } = useMode()
  const [theme, setTheme] = useState<TerminalTheme>("default")
  const nextId = useRef(1)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentPrintId = useRef(0)

  const [state, setState] = useReducer(
    (s: TerminalState, a: Partial<TerminalState> | ((prev: TerminalState) => Partial<TerminalState>)) => {
      return { ...s, ...(typeof a === "function" ? a(s) : a) }
    },
    {
      lines: [],
      input: "",
      history: [],
      historyIdx: -1,
      booting: true,
    }
  )

  const { lines, input, history, historyIdx, booting } = state

  const setLines = useCallback((updater: Line[] | ((prev: Line[]) => Line[])) => {
    setState((prev) => ({ lines: typeof updater === "function" ? updater(prev.lines) : updater }))
  }, [])
  const setInput = (input: string) => setState({ input })
  const setHistory = (updater: string[] | ((prev: string[]) => string[])) => {
    setState((prev) => ({ history: typeof updater === "function" ? updater(prev.history) : updater }))
  }
  const setHistoryIdx = (historyIdx: number) => setState({ historyIdx })
  const setBooting = (booting: boolean) => setState({ booting })

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    })
  }, [])

  // Sequential boot sequence
  useEffect(() => {
    let active = true
    const boot = async () => {
      const hasBooted = typeof window !== "undefined" && sessionStorage.getItem("portfolio_has_booted")

      if (hasBooted) {
        setLines([
          { id: nextId.current++, text: "Initializing portfolio kernel..." },
          { id: nextId.current++, text: "Loading static assets..." },
          { id: nextId.current++, text: "Establishing secure DB connection..." },
          { id: nextId.current++, text: "Workspace initialized. Ready." },
          { id: nextId.current++, text: "hritik@portfolio:~$ fastfetch" },
          { id: nextId.current++, text: RESPONSES.about },
        ])
        setBooting(false)
        scrollToBottom()
        return
      }

      setBooting(true)
      const sequences = [
        "Initializing portfolio kernel...",
        "Loading static assets...",
        "Establishing secure DB connection...",
        "Workspace initialized. Ready.",
      ]

      for (let i = 0; i < sequences.length; i++) {
        await new Promise((r) => setTimeout(r, 100))
        if (!active) return
        setLines((prev) => [...prev, { id: nextId.current++, text: sequences[i] }])
        scrollToBottom()
      }

      await new Promise((r) => setTimeout(r, 200))
      if (!active) return

      const promptId = nextId.current++
      setLines((prev) => [...prev, { id: promptId, text: "hritik@portfolio:~$ " }])
      scrollToBottom()

      const text = "fastfetch"
      for (let i = 1; i <= text.length; i++) {
        await new Promise((r) => setTimeout(r, 40))
        if (!active) return
        setLines((prev) =>
          prev.map((l) => (l.id === promptId ? { ...l, text: "hritik@portfolio:~$ " + text.slice(0, i) } : l))
        )
        scrollToBottom()
      }

      await new Promise((r) => setTimeout(r, 200))
      if (!active) return

      setLines((prev) => [...prev, { id: nextId.current++, text: RESPONSES.about }])
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio_has_booted", "true")
      }
      setBooting(false)
      scrollToBottom()
    }

    boot()
    return () => {
      active = false
    }
  }, [scrollToBottom, setLines])

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
        setLines((prev) => [...prev, { id: lineId, text: "" }])

        const outputLines = text.split("\n")
        let currentText = ""
        for (let i = 0; i < outputLines.length; i++) {
          if (currentPrintId.current !== myPrintId) break
          await new Promise((r) => setTimeout(r, 20))
          currentText += (i > 0 ? "\n" : "") + outputLines[i]
          setLines((prev) => prev.map((l) => (l.id === lineId ? { ...l, text: currentText } : l)))
          scrollToBottom()
        }
      }

      // Cat command implementation
      if (lowerVal.startsWith("cat ")) {
        const fileParam = trimmed.substring(4).trim()
        const filesIndex: Record<string, string> = {
          "readme.md": "README.md",
          "config/contact.env": "config/contact.env",
          "contact.env": "config/contact.env",
          "src/experience/career_logs.log": "src/experience/career_logs.log",
          "career_logs.log": "src/experience/career_logs.log",
          "src/stack/system_architecture.json": "src/stack/system_architecture.json",
          "system_architecture.json": "src/stack/system_architecture.json",
          "src/api/test-endpoint.sh": "src/api/test-endpoint.sh",
          "test-endpoint.sh": "src/api/test-endpoint.sh",
          "src/live_coding/demo.ts": "src/live_coding/demo.ts",
          "demo.ts": "src/live_coding/demo.ts",
          "src/projects/toolstack-ai.md": "src/projects/toolstack-ai.md",
          "toolstack-ai.md": "src/projects/toolstack-ai.md",
          "src/projects/shipment-manager.md": "src/projects/shipment-manager.md",
          "shipment-manager.md": "src/projects/shipment-manager.md",
          "src/projects/ai-support.md": "src/projects/ai-support.md",
          "ai-support.md": "src/projects/ai-support.md",
        }

        const match = filesIndex[fileParam.toLowerCase()]
        if (match) {
          if (mode === "developer") {
            openFile(match)
            printLines(`Opening file \`${match}\` in editor tabs...`)
          } else {
            printLines(`cat: Unable to open \`${match}\`. Switch to Developer Mode to view files in the editor.`)
          }
        } else {
          printLines(`cat: ${fileParam}: No such file or directory in this workspace.`)
        }
        return
      }

      // Sudo rm -rf easter egg
      if (lowerVal === "sudo rm -rf /" || lowerVal === "sudo rm -rf") {
        printLines(
          "WARNING: CRITICAL SYSTEM OVERRIDE REQUESTED...\n" +
            "Wiping local workspace components...\n" +
            "[WIPING] ░░░░░░░░░░░░░░░░░░░░ 0%\n" +
            "[WIPING] ██████░░░░░░░░░░░░░░ 30%\n" +
            "[WIPING] ██████████████░░░░░░ 70%\n" +
            "[WIPING] ████████████████████ 100%\n" +
            "✓ Workspace cleared successfully.\n" +
            "[SYSTEM] Automatically rebuilding workspace node clusters...\n" +
            "Workspace successfully recovered. Type 'help' to audit components."
        )
        return
      }

      if (lowerVal.startsWith("sudo")) {
        printLines("Permission denied: You do not have root administrative permissions to execute this script.")
        return
      }

      // Matrix easter egg
      if (lowerVal === "matrix") {
        printLines(
          "01001101 01000001 01010100 01010010 01001001 01011000\n" +
            "10010110 01101001 11010101 00101011 01101010 11010110\n" +
            "00101011 11010101 01101010 11010110 10010110 01101001\n" +
            "11010101 00101011 01101010 11010110 00101011 11010101\n" +
            "✓ Binary stream analysis complete."
        )
        return
      }

      // Hack easter egg
      if (lowerVal === "hack") {
        printLines(
          "CONNECTING TO REMOTE DB CLUSTER...\n" +
            "[===                 ] 15% (scanning TCP interfaces)\n" +
            "[========            ] 40% (extracting authentication payload)\n" +
            "[=============       ] 65% (matching client salt tokens)\n" +
            "[====================] 100% (root access established)\n\n" +
            "Credentials Found:\n" +
            "HRITIK_SHARMA_IS_HIRED=true\n" +
            "INTERVIEW_REQUEST_CODE=200"
        )
        return
      }

      // Theme toggle
      if (lowerVal === "theme") {
        const themes: TerminalTheme[] = ["default", "dracula", "amber", "matrix"]
        const nextIdx = (themes.indexOf(theme) + 1) % themes.length
        const nextTheme = themes[nextIdx]
        setTheme(nextTheme)
        printLines(`Swapped terminal color scheme configuration context to \`${nextTheme}\`.`)
        return
      }

      // Modes commands
      if (lowerVal === "recruiter") {
        setMode("recruiter")
        printLines("Layout transformed to Recruiter Mode. Viewport adjusted.")
        return
      }
      if (lowerVal === "developer") {
        setMode("developer")
        printLines("Layout transformed to Developer Mode (IDE Shell). Viewport initialized.")
        return
      }

      // Contextual navigation
      const navActions: Record<string, () => void> = {
        resume: () => window.open("/resume.pdf", "_blank"),
        github: () => window.open("https://github.com/hritikS0", "_blank"),
        linkedin: () => window.open("https://linkedin.com/in/hritik-sharma-91336430b/", "_blank"),
        projects: () => {
          if (mode === "recruiter") {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          } else {
            openFile("src/projects/toolstack-ai.md")
          }
        },
        experience: () => {
          if (mode === "recruiter") {
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
          } else {
            openFile("src/experience/career_logs.log")
          }
        },
        stack: () => {
          if (mode === "recruiter") {
            document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" })
          } else {
            openFile("src/stack/system_architecture.json")
          }
        },
        contact: () => {
          if (mode === "recruiter") {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          } else {
            openFile("config/contact.env")
          }
        },
      }

      const action = navActions[lowerVal]
      if (action) {
        action()
        if (["resume", "github", "linkedin"].includes(lowerVal)) {
          printLines(`Opening remote target ${lowerVal}...`)
        } else {
          printLines(`Navigating workspace index to ${lowerVal}...`)
        }
        return
      }

      const response = RESPONSES[lowerVal]
      if (response) {
        printLines(response)
      } else if (lowerVal === "fastfetch") {
        printLines(RESPONSES.about)
      } else {
        printLines(`Command not found: \`${trimmed}\`. Type 'help' to audit available commands.`)
      }
    },
    [mode, setMode, openFile, theme, setLines, scrollToBottom]
  )

  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).executeTerminalCommand = (cmd: string) => {
        setLines((prev) => [...prev, { id: nextId.current++, text: `hritik@portfolio:~$ ${cmd}` }])
        execute(cmd)
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).executeTerminalCommand
      }
    }
  }, [execute, setLines])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = input.trim()
    if (!val) return

    setLines((prev) => [...prev, { id: nextId.current++, text: `hritik@portfolio:~$ ${input}` }])
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
      className={cn(
        "overflow-y-auto p-5 pb-6 space-y-3 flex-1 min-h-0 select-text cursor-text text-left h-full",
        theme === "dracula" && "bg-[#282a36] text-[#f8f8f2]",
        theme === "amber" && "bg-[#0c0600] text-amber-500",
        theme === "matrix" && "bg-black text-[#00ff00]"
      )}
      role="presentation"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {lines.map((line) => (
        <p
          key={line.id}
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap break-words font-mono",
            theme === "dracula" && "text-[#f8f8f2]",
            theme === "amber" && "text-amber-500 font-bold",
            theme === "matrix" && "text-emerald-400 font-bold"
          )}
        >
          {line.text}
        </p>
      ))}

      {/* Inline Terminal Prompter */}
      {!booting && (
        <form onSubmit={onSubmit} className="flex items-center gap-0 py-0.5 font-mono">
          <span
            className={cn(
              "font-semibold mr-2 select-none text-sm shrink-0 font-mono",
              theme === "default" && "text-accent",
              theme === "dracula" && "text-[#ff79c6]",
              theme === "amber" && "text-amber-500",
              theme === "matrix" && "text-emerald-500"
            )}
          >
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
            className={cn(
              "flex-1 bg-transparent text-sm focus:outline-none border-none p-0 font-mono",
              theme === "default" && "text-foreground caret-[#3B82F6]",
              theme === "dracula" && "text-[#50fa7b] caret-[#f8f8f2]",
              theme === "amber" && "text-amber-400 caret-amber-500 font-bold",
              theme === "matrix" && "text-emerald-400 caret-emerald-500 font-bold"
            )}
          />
        </form>
      )}
    </div>
  )
}
