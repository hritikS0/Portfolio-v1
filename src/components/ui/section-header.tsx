"use client"

import { useRef } from "react"
import { m as motion, useInView } from "motion/react"
import { useTextScramble } from "@/src/hooks/use-text-scramble"

type SectionHeaderProps = {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const scrambledTitle = useTextScramble(title, isInView, {
    duration: 500,
    stagger: 35,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight font-mono">
        {scrambledTitle}
      </h2>
      <p className="mt-3 text-muted text-sm">{subtitle}</p>
    </motion.div>
  )
}
