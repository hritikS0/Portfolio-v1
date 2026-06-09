"use client"

import { m as motion } from "motion/react"
import { OrbitMap } from "@/src/components/orbit/orbit-map"
import { Terminal } from "@/src/components/terminal/terminal"
import { useEffect, useRef, useState } from "react"
import Typed from "typed.js"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Hero() {
  const el = useRef(null)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Full-Stack Developer",
        "MERN Stack Specialist",
        "PERN Stack Specialist",
        "Open-Source Contributor",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08] -z-10 scale-125">
        <OrbitMap />
      </div>

      <div className="mx-auto max-w-5xl px-6 w-full text-center space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.h1
            variants={itemVariants}
            onMouseEnter={() => setGlitch(true)}
            onMouseLeave={() => setGlitch(false)}
            className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight select-none ${glitch ? "animate-glitch" : ""}`}
            data-text="Hritik Sharma"
          >
            Hritik Sharma
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-accent font-mono h-7"
          >
            <span ref={el} />
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed"
          >
            MERN &amp; PERN Stack Developer building high-density,
            low-latency applications with TypeScript, React, Node.js, and
            PostgreSQL.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 pt-2"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-9 items-center justify-center rounded bg-accent px-5 text-xs font-mono font-medium text-white transition-opacity hover:opacity-90"
            >
              ./view-projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-9 items-center justify-center rounded border border-border px-5 text-xs font-mono font-medium text-muted hover:text-foreground transition-colors bg-[#0A0D14]/40"
            >
              ./get-in-touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto pt-4"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}
