"use client"

import { useMode } from "@/src/components/providers/mode-provider"
import { Hero } from "@/src/components/sections/hero"
import { Projects } from "@/src/components/sections/projects"
import { Experience } from "@/src/components/sections/experience"
import { Stack } from "@/src/components/sections/stack"
import { Contact } from "@/src/components/sections/contact"
import { Stars } from "@/src/components/orbit/stars"
import { IdeContainer } from "@/src/components/dev-os/ide-container"

export default function Home() {
  const { mode } = useMode()

  if (mode === "developer") {
    return <IdeContainer />
  }

  return (
    <>
      <Stars />
      <Hero />
      <Projects />
      <Experience />
      <Stack />
      <Contact />
    </>
  )
}
