"use client"

import { createContext, useCallback, useContext, useSyncExternalStore } from "react"
import { playSnap } from "@/src/lib/snap"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

/**
 * Runs before first paint via a blocking script in the root layout, so a
 * dark-mode visitor never sees a flash of the wrong theme. Kept as a string
 * because it has to be inlined into the document head, not hydrated.
 *
 * Light is the default when nothing is stored — the OS preference is
 * deliberately not consulted, so first-time visitors always land on the light
 * design. Swap in a matchMedia check here if you'd rather follow the system.
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.style.colorScheme = "light";
    }
  } catch (e) {}
})();
`

/**
 * The class on <html> is the single source of truth — themeScript has already
 * set it correctly before React exists. So React subscribes to that class
 * rather than keeping a duplicate copy in state that could drift out of sync.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

// The server can't know the visitor's stored preference. React renders this
// during hydration to match the HTML, then re-renders if the real value differs.
function getServerSnapshot(): Theme {
  return "light"
}

/** Not in TS's DOM lib across all versions we build against. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/** Where the reveal circle should originate — the toggle button's center. */
export type Origin = { x: number; y: number }

function applyTheme(next: Theme) {
  const root = document.documentElement
  // Mutating the class notifies the MutationObserver, which re-renders React.
  root.classList.toggle("dark", next === "dark")
  root.style.colorScheme = next

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Storage blocked (private browsing) — the toggle still works for this
    // session, it just won't persist.
  }
}

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: Origin) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback((origin?: Origin) => {
    const root = document.documentElement
    const next: Theme = root.classList.contains("dark") ? "light" : "dark"

    playSnap()

    const doc = document as ViewTransitionDocument
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!doc.startViewTransition || reduceMotion) {
      // Firefox, or a visitor who asked for less motion. The @supports
      // fallback in globals.css crossfades the color tokens instead.
      root.classList.add("theme-switching")
      applyTheme(next)
      window.setTimeout(() => root.classList.remove("theme-switching"), 400)
      return
    }

    // Anchor the reveal circle on the button, and size it to reach the furthest
    // corner of the viewport so the wipe always finishes covering the screen.
    const x = origin?.x ?? window.innerWidth - 48
    const y = origin?.y ?? 32
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    root.style.setProperty("--theme-origin-x", `${x}px`)
    root.style.setProperty("--theme-origin-y", `${y}px`)
    root.style.setProperty("--theme-origin-r", `${radius}px`)

    const transition = doc.startViewTransition(() => applyTheme(next))

    // Rapid clicking makes the browser skip the in-flight transition, which
    // rejects `finished`. Swallow it — the theme still applied.
    transition.finished.catch(() => {})
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
