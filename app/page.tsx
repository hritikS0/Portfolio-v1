import { Hero } from "@/src/components/sections/hero"
import { Projects } from "@/src/components/sections/projects"
import { Experience } from "@/src/components/sections/experience"
import { Stack } from "@/src/components/sections/stack"
import { Contact } from "@/src/components/sections/contact"
import { Stars } from "@/src/components/orbit/stars"

export default function Home() {
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
