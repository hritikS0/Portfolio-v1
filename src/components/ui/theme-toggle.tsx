"use client"

import { useTheme } from "@/src/components/providers/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={(event) => {
        // The reveal circle grows from the button itself, so the wipe feels
        // like it's coming from the thing you pressed.
        const rect = event.currentTarget.getBoundingClientRect()
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="group grid size-8 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:text-foreground"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[18px] fill-none stroke-current transition-transform duration-300 ease-out group-hover:rotate-[18deg]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  )
}
