"use client"

import { useState, useEffect, useRef } from "react"

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
const ALPHAS = "abcdefghijklmnopqrstuvwxyz0123456789"
const POOL = CHARS + ALPHAS

export function useTextScramble(
  target: string,
  trigger: boolean,
  options?: { duration?: number; stagger?: number },
) {
  const { duration = 600, stagger = 40 } = options ?? {}
  const [display, setDisplay] = useState("")
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!trigger) return

    const targetChars = target.split("")
    const resolved = new Array(targetChars.length).fill(false)
    let startTime = Date.now()

    function tick() {
      const elapsed = Date.now() - startTime

      const result = targetChars
        .map((targetChar, i) => {
          const charStart = i * stagger
          if (elapsed >= charStart + duration) {
            resolved[i] = true
            return targetChar
          }
          if (elapsed >= charStart) {
            const progress = (elapsed - charStart) / duration
            if (Math.random() < progress * 1.3) return targetChar
          }
          if (targetChar === " ") return " "
          return POOL[Math.floor(Math.random() * POOL.length)]
        })
        .join("")

      setDisplay(result)

      if (resolved.every(Boolean)) return
      rafRef.current = setTimeout(tick, 30)
    }

    tick()

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current)
    }
  }, [target, trigger, duration, stagger])

  return display || target
}
