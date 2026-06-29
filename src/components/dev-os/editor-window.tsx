"use client"

import { useMode } from "@/src/components/providers/mode-provider"
import { ReadmeView } from "@/src/components/dev-os/file-views/readme-view"
import { ProjectView } from "@/src/components/dev-os/file-views/project-view"
import { SystemLogs } from "@/src/components/dev-os/file-views/system-logs"
import { SystemMapView } from "@/src/components/dev-os/file-views/system-map-view"
import { ApiClient } from "@/src/components/dev-os/file-views/api-client"
import { LiveCodeView } from "@/src/components/dev-os/file-views/live-code-view"
import { EnvView } from "@/src/components/dev-os/file-views/env-view"
import { cn } from "@/src/lib/utils"
import { SystemInspector } from "@/src/components/dev-os/system-inspector"

export function EditorWindow() {
  const { activeFile, setActiveFile, openTabs, closeFile } = useMode()

  const getBasename = (path: string) => path.split("/").pop() || path

  const getTabIcon = (fileName: string) => {
    if (fileName.endsWith(".md")) return <span className="text-sky-400 mr-1.5 text-[9px] font-mono">M↓</span>
    if (fileName.endsWith(".env")) return <span className="text-amber-500 mr-1.5 text-[10px] font-mono">⚙</span>
    if (fileName.endsWith(".log")) return <span className="text-orange-400 mr-1.5 text-[9px] font-mono">📋</span>
    if (fileName.endsWith(".json")) return <span className="text-yellow-400 mr-1.5 text-[9px] font-mono">&#123;&#125;</span>
    if (fileName.endsWith(".sh")) return <span className="text-green-400 mr-1.5 text-[9px] font-mono">&gt;_</span>
    if (fileName.endsWith(".ts")) return <span className="text-blue-400 mr-1.5 text-[9px] font-mono">TS</span>
    return <span className="text-muted mr-1.5 text-[10px]">📄</span>
  }

  const renderActiveFile = () => {
    if (activeFile === "README.md") {
      return <ReadmeView />
    }
    if (activeFile.startsWith("src/projects/") || activeFile.startsWith("src/work-projects/")) {
      return <ProjectView filePath={activeFile} />
    }
    if (activeFile === "src/experience/career_logs.log") {
      return <SystemLogs />
    }
    if (activeFile === "src/stack/system_architecture.json") {
      return <SystemMapView />
    }
    if (activeFile === "src/api/test-endpoint.sh") {
      return <ApiClient />
    }
    if (activeFile === "src/live_coding/demo.ts") {
      return <LiveCodeView />
    }
    if (activeFile === "config/contact.env") {
      return <EnvView />
    }
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-muted/40 font-mono text-xs">
        No active editor file. Select a file from the explorer.
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col min-h-0 bg-[#05070a]">
      {/* 1. Tabs bar */}
      <div className="h-8 bg-[#0a0d14] border-b border-border flex items-center overflow-x-auto select-none scrollbar-none shrink-0">
        {openTabs.map((path) => {
          const name = getBasename(path)
          const isActive = activeFile === path

          return (
            <div
              key={path}
              className={cn(
                "h-full flex items-center px-4 border-r border-border font-mono text-xs cursor-pointer transition-colors group relative",
                isActive
                  ? "bg-[#05070a] text-foreground border-t-2 border-t-accent"
                  : "bg-[#0c0f17] text-muted hover:bg-surface-hover hover:text-foreground"
              )}
              onClick={() => setActiveFile(path)}
            >
              <div className="flex items-center">
                {getTabIcon(name)}
                <span className="truncate max-w-[120px]">{name}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  closeFile(path)
                }}
                className="ml-3 text-[10px] text-muted/40 hover:text-foreground hover:bg-surface-hover w-3.5 h-3.5 flex items-center justify-center rounded transition-colors"
                title="Close Tab"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>

      {/* 2. Content Layout: Left Scrollable Main Pane, Right Inspector Pane */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto relative select-text">
          {renderActiveFile()}
        </div>
        <SystemInspector />
      </div>
    </div>
  )
}
