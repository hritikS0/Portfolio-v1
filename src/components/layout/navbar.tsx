"use client"

import Link from "next/link"
import { useState, useSyncExternalStore } from "react"
import { m as motion, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"
import { ThemeToggle } from "@/src/components/ui/theme-toggle"

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Contact", href: "/#contact" },
]

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

const getSnapshot = () =>
  typeof window !== "undefined" && window.scrollY > 24

const getServerSnapshot = () => false

export function Navbar() {
  const scrolled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300",
          scrolled && "border-b border-line bg-background/85 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="display text-lg transition-colors hover:text-accent"
          >
            HS
          </Link>

          <nav className="flex items-center gap-7">
            <div className="hidden items-center gap-7 sm:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-8 place-items-center text-muted transition-colors hover:text-foreground cursor-pointer sm:hidden"
              aria-label="Open menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[18px] fill-none stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Rendered outside the header so the fixed positioning can't be clipped. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm sm:hidden"
          />
        )}
        {menuOpen && (
          <motion.div
            key="menu-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-[101] border-b border-line bg-background px-6 pb-8 pt-5 sm:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="meta text-muted">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid size-8 place-items-center text-muted transition-colors hover:text-foreground cursor-pointer"
                aria-label="Close menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-[18px] fill-none stroke-current"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="display text-2xl transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
