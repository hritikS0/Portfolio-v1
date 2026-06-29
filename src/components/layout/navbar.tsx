"use client"

import { useSyncExternalStore, useState, useEffect } from "react"
import { m as motion, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"
import { useMode } from "@/src/components/providers/mode-provider"

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
  const scrolled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
  const { mode, setMode, activeFile } = useMode()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileWarning, setShowMobileWarning] = useState(false)

  // Guard Developer Mode on mobile viewports
  const handleModeChange = (targetMode: "developer" | "recruiter") => {
    if (targetMode === "developer") {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 1024
      if (isMobile) {
        setShowMobileWarning(true)
        return
      }
    }
    setMode(targetMode)
  }

  const renderModeToggle = () => (
    <div className="flex items-center bg-[#07090e] border border-border p-0.5 rounded-full text-[10px] font-mono relative select-none">
      <button
        type="button"
        onClick={() => handleModeChange("developer")}
        className={cn(
          "px-2.5 py-0.5 rounded-full relative z-10 transition-colors cursor-pointer text-[10px] font-mono",
          mode === "developer" ? "text-foreground" : "text-muted hover:text-foreground"
        )}
      >
        {mode === "developer" && (
          <motion.div
            layoutId="active-mode"
            className="absolute inset-0 bg-accent/25 border border-accent/40 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        )}
        dev_os
      </button>
      <button
        type="button"
        onClick={() => handleModeChange("recruiter")}
        className={cn(
          "px-2.5 py-0.5 rounded-full relative z-10 transition-colors cursor-pointer text-[10px] font-mono",
          mode === "recruiter" ? "text-foreground" : "text-muted hover:text-foreground"
        )}
      >
        {mode === "recruiter" && (
          <motion.div
            layoutId="active-mode"
            className="absolute inset-0 bg-accent/25 border border-accent/40 rounded-full -z-10"
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        )}
        recruiter
      </button>
    </div>
  )

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          mode === "developer"
            ? "bg-[#0A0D14] border-b border-border h-10 flex items-center text-[13px]"
            : scrolled
              ? "bg-background/80 backdrop-blur-sm border-b border-border h-16 flex items-center"
              : "bg-transparent h-16 flex items-center"
        )}
      >
        <div
          className={cn(
            "w-full px-4 flex items-center justify-between",
            mode !== "developer" && "mx-auto max-w-6xl px-6"
          )}
        >
          {mode === "developer" ? (
            <>
              {/* Developer Mode IDE Header */}
              <div className="flex items-center gap-6 font-mono text-muted text-xs select-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="size-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="hidden lg:flex items-center gap-4 text-[11px]">
                  <span className="hover:text-foreground cursor-pointer transition-colors">File</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Edit</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Selection</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">View</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Go</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Run</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Terminal</span>
                  <span className="hover:text-foreground cursor-pointer transition-colors">Help</span>
                </div>
                <div className="lg:hidden text-[11px] font-semibold text-accent/80 font-mono">
                  antigravity_os_v1.0
                </div>
              </div>

              {/* Middle: Active File Path */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted/50 font-mono select-none">
                <span>portfolio</span>
                <span>&gt;</span>
                <span className="text-muted font-medium text-[11px]">{activeFile}</span>
              </div>

              {/* Right: Git Branch & Switcher */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1.5 text-xs text-muted/70 font-mono select-none">
                  <span className="text-accent/60"></span>
                  <span>main*</span>
                </div>
                {/* Toggle control */}
                {renderModeToggle()}
              </div>
            </>
          ) : (
            <>
              {/* Recruiter Mode Navbar */}
              <a href="/" className="text-sm font-medium tracking-tight">
                HS
              </a>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    className="text-xs font-mono text-muted hover:text-accent transition-colors"
                  >
                    ./{link.label.toLowerCase()}
                  </motion.a>
                ))}

                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
                  {renderModeToggle()}
                  <motion.button
                    type="button"
                    onClick={() => handleModeChange("developer")}
                    animate={{
                      scale: [1, 1.05, 1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 10,
                      ease: "easeInOut",
                    }}
                    className="hidden sm:inline-flex h-6 items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 text-xs text-accent font-semibold hover:bg-accent/20 transition-colors cursor-pointer select-none shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                  >
                    <span>✨</span> Try Dev OS
                  </motion.button>
                </div>
              </nav>

              {/* Hamburger Button on Mobile viewports */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded transition-colors cursor-pointer"
                aria-label="Open Mobile Menu"
              >
                <svg className="size-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Collapsible Mobile Navigation Drawer (Rendered outside header to avoid viewport clipping) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-64 border-l border-border z-[101] flex flex-col p-6 justify-between select-none shadow-2xl"
            style={{ backgroundColor: "#0A0D14" }}
          >
            <div className="space-y-6">
              {/* Top closing controls */}
              <div className="flex justify-between items-center pb-4 border-b border-border/40">
                <span className="font-mono text-[10px] text-muted uppercase font-bold">Workspace Menu</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 hover:bg-surface-hover rounded text-muted hover:text-foreground transition-colors cursor-pointer text-xs font-sans"
                  aria-label="Close Mobile Menu"
                >
                  ✕
                </button>
              </div>

              {/* Links list */}
              <nav className="flex flex-col gap-4 font-mono text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-muted hover:text-accent transition-colors py-1"
                  >
                    ./{link.label.toLowerCase()}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom switcher and dynamic CTA actions */}
            <div className="space-y-4 pt-6 border-t border-border/40">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted font-mono uppercase font-bold">Active Mode:</span>
                {renderModeToggle()}
              </div>
              
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleModeChange("developer")
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 py-2 text-xs text-accent font-semibold hover:bg-accent/20 transition-colors cursor-pointer select-none"
              >
                <span>✨</span> Try Dev OS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Mobile Warning Modal Overlay (Rendered outside header to avoid viewport clipping) */}
      <AnimatePresence>
        {showMobileWarning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 select-none">
            {/* Backdrop overlay */}
            <motion.div
              key="warning-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileWarning(false)}
              className="fixed inset-0 z-[100]"
              style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
            />

            {/* Modal Card */}
            <motion.div
              key="warning-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative bg-[#0B0E14] border border-border rounded-xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl z-[101] font-sans"
            >
              <div className="flex justify-center">
                <div className="size-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-xl animate-pulse">
                  💻
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-foreground font-mono tracking-tight uppercase">
                  Desktop Browser Required
                </h3>
                <p className="text-[11px] text-muted leading-relaxed">
                  Dev OS runs a comprehensive VS Code mockup dashboard, command-line terminal scripts, and custom canvas architecture telemetry that require desktop width capabilities.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowMobileWarning(false)}
                  className="w-full py-2 bg-accent/15 border border-accent/40 text-accent text-xs font-mono font-semibold rounded hover:bg-accent/25 transition-colors cursor-pointer"
                >
                  [Close Diagnostic]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
