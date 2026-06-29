"use client"

import { useState } from "react"
import { useMode } from "@/src/components/providers/mode-provider"
import { FileExplorer } from "@/src/components/dev-os/file-explorer"
import { EditorWindow } from "@/src/components/dev-os/editor-window"
import { TerminalPanel } from "@/src/components/terminal/terminal-panel"
import { cn } from "@/src/lib/utils"

export function IdeContainer() {
  const { activeFile } = useMode()
  const [activeActivity, setActiveActivity] = useState<"explorer" | "git" | "search" | "extensions">("explorer")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [terminalTab, setTerminalTab] = useState<"terminal" | "problems" | "output" | "debug">("terminal")

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleTerminal = () => setTerminalOpen(!terminalOpen)

  return (
    <div className="fixed inset-x-0 bottom-0 top-10 flex flex-col bg-[#07090e] text-foreground font-sans overflow-hidden select-none">
      {/* Main Workspace Row */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* 1. Activity Bar (VS Code style) */}
        <div className="w-12 bg-[#0a0d14] border-r border-border flex flex-col items-center py-2 justify-between shrink-0 select-none">
          {/* Top Actions */}
          <div className="flex flex-col gap-4 w-full items-center">
            {/* Explorer Icon */}
            <button
              type="button"
              onClick={() => {
                if (activeActivity === "explorer") {
                  setSidebarOpen(!sidebarOpen)
                } else {
                  setActiveActivity("explorer")
                  setSidebarOpen(true)
                }
              }}
              className={cn(
                "p-2 rounded text-muted hover:text-foreground cursor-pointer transition-colors relative",
                activeActivity === "explorer" && sidebarOpen && "text-accent border-l-2 border-accent rounded-l-none pl-1.5"
              )}
              title="Explorer"
            >
              <span className="text-xl">📁</span>
            </button>

            {/* Search Icon */}
            <button
              type="button"
              onClick={() => {
                if (activeActivity === "search") {
                  setSidebarOpen(!sidebarOpen)
                } else {
                  setActiveActivity("search")
                  setSidebarOpen(true)
                }
              }}
              className={cn(
                "p-2 rounded text-muted hover:text-foreground cursor-pointer transition-colors relative",
                activeActivity === "search" && sidebarOpen && "text-accent border-l-2 border-accent rounded-l-none pl-1.5"
              )}
              title="Search"
            >
              <span className="text-xl">🔍</span>
            </button>

            {/* Git Icon */}
            <button
              type="button"
              onClick={() => {
                if (activeActivity === "git") {
                  setSidebarOpen(!sidebarOpen)
                } else {
                  setActiveActivity("git")
                  setSidebarOpen(true)
                }
              }}
              className={cn(
                "p-2 rounded text-muted hover:text-foreground cursor-pointer transition-colors relative",
                activeActivity === "git" && sidebarOpen && "text-accent border-l-2 border-accent rounded-l-none pl-1.5"
              )}
              title="Source Control"
            >
              <span className="text-xl"></span>
            </button>

            {/* Extensions Icon */}
            <button
              type="button"
              onClick={() => {
                if (activeActivity === "extensions") {
                  setSidebarOpen(!sidebarOpen)
                } else {
                  setActiveActivity("extensions")
                  setSidebarOpen(true)
                }
              }}
              className={cn(
                "p-2 rounded text-muted hover:text-foreground cursor-pointer transition-colors relative",
                activeActivity === "extensions" && sidebarOpen && "text-accent border-l-2 border-accent rounded-l-none pl-1.5"
              )}
              title="Extensions"
            >
              <span className="text-xl">🧩</span>
            </button>
          </div>

          {/* Bottom Settings Icons */}
          <div className="flex flex-col gap-3 w-full items-center text-muted">
            <button type="button" className="hover:text-foreground cursor-pointer text-lg">👤</button>
            <button type="button" className="hover:text-foreground cursor-pointer text-lg">⚙️</button>
          </div>
        </div>

        {/* 2. Sidebar Panel */}
        {sidebarOpen && (
          <div className="w-56 bg-[#07090e] border-r border-border flex flex-col shrink-0 min-w-0 select-none">
            {activeActivity === "explorer" && <FileExplorer />}
            {activeActivity === "git" && (
              <div className="p-4 flex-1 font-mono text-xs text-muted space-y-4">
                <span className="text-[10px] uppercase font-bold text-foreground">Source Control</span>
                <div className="space-y-2">
                  <div className="text-[#E2E8F0]">Changes</div>
                  <div className="pl-2 flex items-center justify-between hover:bg-surface-hover p-1 rounded text-red-400">
                    <span>M navbar.tsx</span>
                    <span className="text-[10px] bg-red-950/40 px-1 border border-red-900 rounded">Modified</span>
                  </div>
                  <div className="pl-2 flex items-center justify-between hover:bg-surface-hover p-1 rounded text-green-400">
                    <span>A ide-container.tsx</span>
                    <span className="text-[10px] bg-green-950/40 px-1 border border-green-900 rounded">Added</span>
                  </div>
                </div>
              </div>
            )}
            {activeActivity === "search" && (
              <div className="p-4 flex-1 font-mono text-xs text-muted space-y-4">
                <span className="text-[10px] uppercase font-bold text-foreground">Search files</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#0a0d14] border border-border rounded p-1.5 focus:outline-none focus:border-accent text-foreground text-[11px]"
                />
              </div>
            )}
            {activeActivity === "extensions" && (
              <div className="p-4 flex-1 font-mono text-xs text-muted space-y-3">
                <span className="text-[10px] uppercase font-bold text-foreground">Installed Extensions</span>
                <div className="border border-border bg-[#0a0d14] p-2 rounded flex flex-col gap-1">
                  <div className="text-foreground text-[11px] font-bold">Framer Motion DevTools</div>
                  <div className="text-muted/60 text-[10px]">Framer Motion inspector. v12.0</div>
                </div>
                <div className="border border-border bg-[#0a0d14] p-2 rounded flex flex-col gap-1">
                  <div className="text-foreground text-[11px] font-bold">Tailwind IntelliSense</div>
                  <div className="text-muted/60 text-[10px]">Autocomplete classes. v4.0</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Main Workspace Pane */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#05070a]">
          {/* Editor Area */}
          <div className="flex-1 relative min-h-0">
            <EditorWindow />
          </div>

          {/* Integrated Terminal Panel */}
          {terminalOpen && (
            <div className="h-64 bg-[#05070a] border-t border-border flex flex-col min-h-0 shrink-0 select-text">
              {/* Terminal Tabs Header */}
              <div className="h-8 bg-[#0a0d14] border-b border-border flex items-center justify-between px-4 text-xs font-mono shrink-0 select-none">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setTerminalTab("terminal")}
                    className={cn(
                      "pb-0.5 border-b border-transparent transition-colors hover:text-foreground cursor-pointer",
                      terminalTab === "terminal" ? "text-accent border-accent" : "text-muted"
                    )}
                  >
                    TERMINAL
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerminalTab("problems")}
                    className={cn(
                      "pb-0.5 border-b border-transparent transition-colors hover:text-foreground cursor-pointer",
                      terminalTab === "problems" ? "text-accent border-accent" : "text-muted"
                    )}
                  >
                    PROBLEMS <span className="bg-red-950/60 border border-red-900/60 text-red-400 px-1 rounded-full text-[9px]">0</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerminalTab("output")}
                    className={cn(
                      "pb-0.5 border-b border-transparent transition-colors hover:text-foreground cursor-pointer",
                      terminalTab === "output" ? "text-accent border-accent" : "text-muted"
                    )}
                  >
                    OUTPUT
                  </button>
                  <button
                    type="button"
                    onClick={() => setTerminalTab("debug")}
                    className={cn(
                      "pb-0.5 border-b border-transparent transition-colors hover:text-foreground cursor-pointer",
                      terminalTab === "debug" ? "text-accent border-accent" : "text-muted"
                    )}
                  >
                    DEBUG CONSOLE
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTerminal}
                    className="text-muted hover:text-foreground cursor-pointer text-xs"
                    title="Close panel"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 overflow-hidden relative font-mono">
                {terminalTab === "terminal" && (
                  <TerminalPanel />
                )}
                {terminalTab === "problems" && (
                  <div className="p-4 text-xs font-mono text-muted/60">
                    No problems have been detected in the workspace.
                  </div>
                )}
                {terminalTab === "output" && (
                  <div className="p-4 text-xs font-mono text-muted/60 space-y-1">
                    <div>[info] - [19:12:15] Ingesting Workspace Portfolio-v1</div>
                    <div>[info] - [19:12:16] Found 14 file descriptors</div>
                    <div>[info] - [19:12:16] Swapping client routing context</div>
                  </div>
                )}
                {terminalTab === "debug" && (
                  <div className="p-4 text-xs font-mono text-muted/60">
                    Debugging is inactive. Execute a task to trigger debugging.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. OS/IDE Status Bar (Bottom) */}
      <footer className="h-5 bg-accent text-white px-3 flex items-center justify-between text-[11px] font-mono shrink-0 select-none z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span></span>
            <span>main*</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-white/80">
            <span>⟳</span>
            <span>Sync Complete</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <span>Ln 1, Col 1</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span>Spaces: 2</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <span>TypeScript JSX</span>
          </div>
          <button
            type="button"
            onClick={toggleTerminal}
            className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer text-[10px]"
            title="Toggle Panel"
          >
            {terminalOpen ? "▼ Terminal" : "▲ Terminal"}
          </button>
        </div>
      </footer>
    </div>
  )
}
