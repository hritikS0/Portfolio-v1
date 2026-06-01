"use client"

import { useRef, useId } from "react"
import { m as motion, useInView } from "motion/react"

const orbits = [
  { rx: 70, ry: 28, duration: 15, direction: 1, opacity: 0.3 },
  { rx: 120, ry: 48, duration: 25, direction: -1, opacity: 0.2 },
  { rx: 165, ry: 66, duration: 35, direction: 1, opacity: 0.12 },
]

export function OrbitMap() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false })
  const baseId = useId()

  return (
    <div ref={ref} className="relative flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="max-w-[400px] h-auto select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {orbits.map((o, i) => (
            <linearGradient key={i} id={`${baseId}-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={o.opacity} />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity={o.opacity * 0.5} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={o.opacity * 0.3} />
            </linearGradient>
          ))}
        </defs>

        <circle cx="200" cy="200" r="2" fill="#3B82F6" opacity={0.6} />
        <circle cx="200" cy="200" r="7" fill="#3B82F6" opacity={0.08} />

        <line x1="35" y1="200" x2="365" y2="200" stroke="#1A1D24" strokeWidth="0.5" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="#1A1D24" strokeWidth="0.5" />

        {orbits.map((orbit, i) => (
          <motion.ellipse
            key={orbit.rx}
            cx="200"
            cy="200"
            rx={orbit.rx}
            ry={orbit.ry}
            stroke={`url(#${baseId}-${i})`}
            strokeWidth="0.5"
            initial={false}
            animate={isInView ? { rotate: orbit.direction * 360 } : { rotate: 0 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}
      </svg>
    </div>
  )
}
