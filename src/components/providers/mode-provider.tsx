"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type ViewMode = "developer" | "recruiter"

export interface FileSystemNode {
  name: string
  path: string
  type: "file" | "directory"
  children?: FileSystemNode[]
}

export const virtualFileSystem: FileSystemNode[] = [
  { name: "README.md", path: "README.md", type: "file" },
  {
    name: "src",
    path: "src",
    type: "directory",
    children: [
      {
        name: "projects",
        path: "src/projects",
        type: "directory",
        children: [
          { name: "toolstack-ai.md", path: "src/projects/toolstack-ai.md", type: "file" },
        ],
      },
      {
        name: "work-projects",
        path: "src/work-projects",
        type: "directory",
        children: [
          { name: "shailshuta-logistics.md", path: "src/work-projects/shailshuta-logistics.md", type: "file" },
          { name: "pdooh-platform.md", path: "src/work-projects/pdooh-platform.md", type: "file" },
        ],
      },
      {
        name: "experience",
        path: "src/experience",
        type: "directory",
        children: [
          { name: "career_logs.log", path: "src/experience/career_logs.log", type: "file" },
        ],
      },
      {
        name: "stack",
        path: "src/stack",
        type: "directory",
        children: [
          { name: "system_architecture.json", path: "src/stack/system_architecture.json", type: "file" },
        ],
      },
      {
        name: "api",
        path: "src/api",
        type: "directory",
        children: [
          { name: "test-endpoint.sh", path: "src/api/test-endpoint.sh", type: "file" },
        ],
      },
      {
        name: "live_coding",
        path: "src/live_coding",
        type: "directory",
        children: [
          { name: "demo.ts", path: "src/live_coding/demo.ts", type: "file" },
        ],
      },
    ],
  },
  {
    name: "config",
    path: "config",
    type: "directory",
    children: [
      { name: "contact.env", path: "config/contact.env", type: "file" },
    ],
  },
]

interface ModeContextType {
  mode: ViewMode
  setMode: (mode: ViewMode) => void
  activeFile: string
  setActiveFile: (path: string) => void
  openTabs: string[]
  openFile: (path: string) => void
  closeFile: (path: string) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("developer")
  const [activeFile, setActiveFile] = useState<string>("README.md")
  const [openTabs, setOpenTabs] = useState<string[]>(["README.md"])

  // Sync mode with localStorage/sessionStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("portfolio-view-mode") as ViewMode
      if (savedMode === "recruiter" || savedMode === "developer") {
        setModeState(savedMode)
      }
    }
  }, [])

  // Listen for global Ctrl + / (or Cmd + /) shortcuts to toggle viewmodes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setModeState((prev) => {
          const next = prev === "developer" ? "recruiter" : "developer"
          if (typeof window !== "undefined") {
            localStorage.setItem("portfolio-view-mode", next)
          }
          return next
        })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const setMode = (newMode: ViewMode) => {
    setModeState(newMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-view-mode", newMode)
    }
  };

  const openFile = (path: string) => {
    if (!openTabs.includes(path)) {
      setOpenTabs((prev) => [...prev, path])
    }
    setActiveFile(path)
  }

  const closeFile = (path: string) => {
    const updatedTabs = openTabs.filter((t) => t !== path)
    setOpenTabs(updatedTabs)

    if (activeFile === path) {
      if (updatedTabs.length > 0) {
        // Switch to the last open tab
        setActiveFile(updatedTabs[updatedTabs.length - 1])
      } else {
        // Default back to README
        setActiveFile("README.md")
        setOpenTabs(["README.md"])
      }
    }
  }

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        activeFile,
        setActiveFile,
        openTabs,
        openFile,
        closeFile,
      }}
    >
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
