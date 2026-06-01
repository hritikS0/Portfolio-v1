"use client"

import { m as motion } from "motion/react"

type SectionHeaderProps = {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-muted text-sm">{subtitle}</p>
    </motion.div>
  )
}
