import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProject, projects } from "@/src/data/projects"
import { Reveal } from "@/src/components/ui/reveal"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Hritik Sharma`,
      description: project.tagline,
      type: "article",
    },
  }
}

/** Order matters — this is the narrative arc of the case study. */
const sectionOrder = [
  { label: "Problem", key: "problem" },
  { label: "Approach", key: "solution" },
  { label: "Architecture", key: "architecture" },
  { label: "Tradeoffs", key: "tradeoffs" },
  { label: "Results", key: "performance" },
  { label: "Learned", key: "lessons" },
] as const

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
      <Reveal>
        <Link
          href="/#work"
          className="meta text-muted transition-colors hover:text-foreground"
        >
          ← All work
        </Link>
      </Reveal>

      <header className="mt-10">
        <Reveal>
          <p className="meta text-muted">{project.context}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display mt-3 text-[clamp(2.25rem,6vw,3.25rem)]">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {project.description}
          </p>
        </Reveal>
      </header>

      {project.media && (
        <Reveal delay={0.18}>
          <figure className="mt-12">
            <video
              src={project.media.src}
              muted
              loop
              autoPlay
              playsInline
              className="w-full rounded-lg border border-line bg-surface"
            />
            <figcaption className="meta mt-3 text-muted">
              {project.media.caption}
            </figcaption>
          </figure>
        </Reveal>
      )}

      <div className="mt-16 space-y-10 border-t border-line pt-12">
        {sectionOrder.map(({ label, key }) => (
          <Reveal key={key}>
            <section className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h2 className="meta pt-[0.35rem] text-muted">{label}</h2>
              <p className="max-w-xl text-[0.9375rem] leading-relaxed">
                {project[key]}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <h2 className="meta pt-[0.35rem] text-muted">Stack</h2>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed">
              {project.technologies.join(", ")}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <h2 className="meta pt-[0.35rem] text-muted">Links</h2>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.9375rem]">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Live site
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Source
                </a>
              )}
              {project.confidential && (
                <p className="text-muted">Client work — source under NDA.</p>
              )}
            </div>
          </section>
        </Reveal>
      </div>
    </article>
  )
}
