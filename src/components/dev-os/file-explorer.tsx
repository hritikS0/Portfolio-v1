"use client"

import { useState } from "react"
import { useMode, virtualFileSystem, FileSystemNode } from "@/src/components/providers/mode-provider"
import { cn } from "@/src/lib/utils"

export function FileExplorer() {
  const { activeFile, openFile } = useMode()
  const [expandedPaths, setExpandedPaths] = useState<string[]>(["src", "src/projects", "src/experience", "config"])

  const toggleDirectory = (path: string) => {
    setExpandedPaths((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    )
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".md")) return <span className="text-sky-400 font-bold mr-1.5 select-none text-[10px]">M↓</span>
    if (fileName.endsWith(".env")) return <span className="text-amber-500 font-bold mr-1.5 select-none text-[11px]">⚙</span>
    if (fileName.endsWith(".log")) return <span className="text-orange-400 font-bold mr-1.5 select-none text-[10px]">📋</span>
    if (fileName.endsWith(".json")) return <span className="text-yellow-400 font-bold mr-1.5 select-none text-[10px]">&#123;&#125;</span>
    if (fileName.endsWith(".sh")) return <span className="text-green-400 font-bold mr-1.5 select-none text-[10px]">&gt;_</span>
    if (fileName.endsWith(".ts")) return <span className="text-blue-400 font-bold mr-1.5 select-none text-[10px]">TS</span>
    return <span className="text-muted mr-1.5 select-none text-[11px]">📄</span>
  }

  const renderNode = (node: FileSystemNode, depth = 0) => {
    const isDirectory = node.type === "directory"
    const isExpanded = expandedPaths.includes(node.path)
    const isActive = activeFile === node.path

    if (isDirectory) {
      return (
        <div key={node.path} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggleDirectory(node.path)}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            className="flex items-center h-6 w-full text-left font-mono text-xs text-[#DFE2E7]/80 hover:bg-surface-hover cursor-pointer transition-colors"
          >
            <span className="text-[9px] text-muted/60 mr-1.5 select-none transition-transform duration-150 inline-block w-2.5 text-center">
              {isExpanded ? "▼" : "▶"}
            </span>
            <span className="text-amber-300/80 mr-1.5 select-none">📁</span>
            <span className="truncate">{node.name}</span>
          </button>
          {isExpanded && node.children?.map((child) => renderNode(child, depth + 1))}
        </div>
      )
    }

    return (
      <button
        key={node.path}
        type="button"
        onClick={() => openFile(node.path)}
        style={{ paddingLeft: `${depth * 12 + 20}px` }}
        className={cn(
          "flex items-center h-6 w-full text-left font-mono text-xs transition-colors hover:bg-surface-hover cursor-pointer",
          isActive
            ? "bg-[#1E222B] text-foreground border-l-2 border-accent pl-[18px]"
            : "text-[#DFE2E7]/60"
        )}
      >
        {getFileIcon(node.name)}
        <span className="truncate">{node.name}</span>
      </button>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 select-none bg-[#07090e]">
      {/* Title */}
      <div className="h-8 border-b border-border flex items-center px-4 justify-between shrink-0">
        <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-muted">
          WORKSPACE EXPLORER
        </span>
        <span className="text-[10px] text-muted/40 font-mono">PORTFOLIO</span>
      </div>

      {/* Directory structure scrolling wrapper */}
      <div className="flex-1 overflow-y-auto py-2">
        {virtualFileSystem.map((node) => renderNode(node, 0))}
      </div>
    </div>
  )
}
