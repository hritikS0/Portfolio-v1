"use client"

import { useEffect, useRef } from "react"

export function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trail = trailRef.current
    if (!trail) return

    let x = -100
    let y = -100
    let tx = -100
    let ty = -100

    function onMove(e: MouseEvent) {
      tx = e.clientX
      ty = e.clientY
    }

    function animate() {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      trail!.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={trailRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-40 w-[400px] h-[400px] rounded-full opacity-30"
      style={{
        background:
          "radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 35%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
  )
}
