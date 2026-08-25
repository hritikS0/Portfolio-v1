"use client"

import { m as motion } from "motion/react"

type RevealProps = {
  children: React.ReactNode
  /** Seconds. Use sparingly — staggering more than ~3 siblings reads as fussy. */
  delay?: number
  className?: string
}

/**
 * The entire motion budget for the site: an 8px rise and a fade, once.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
