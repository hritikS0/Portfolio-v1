import { Hero } from "@/src/components/sections/hero"
import { Work } from "@/src/components/sections/work"
import { Experience } from "@/src/components/sections/experience"
import { Stack } from "@/src/components/sections/stack"
import { Contact } from "@/src/components/sections/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Contact />
    </>
  )
}
