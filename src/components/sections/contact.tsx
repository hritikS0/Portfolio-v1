"use client"

import { useState } from "react"
import { Reveal } from "@/src/components/ui/reveal"
import { SectionHeader } from "@/src/components/ui/section-header"

const EMAIL = "sharmahritik8077@gmail.com"

const channels = [
  { label: "GitHub", value: "github.com/hritikS0", href: "https://github.com/hritikS0" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hritik-sharma",
    href: "https://linkedin.com/in/hritik-sharma-91336430b/",
  },
  { label: "Résumé", value: "resume-hritik.pdf", href: "/resume-hritik.pdf" },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the mailto
      // link beside it still works.
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <SectionHeader
        eyebrow="04 — Contact"
        title="Let's talk"
        subtitle="Open to full-stack roles and interesting problems."
      />

      <dl className="space-y-5">
        <Reveal>
          <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8">
            <dt className="meta text-muted">Email</dt>
            <dd className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <a href={`mailto:${EMAIL}`} className="link text-[0.9375rem]">
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="meta cursor-pointer text-muted transition-colors hover:text-foreground"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </dd>
          </div>
        </Reveal>

        {channels.map((channel, index) => (
          <Reveal key={channel.label} delay={Math.min(index + 1, 3) * 0.05}>
            <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8">
              <dt className="meta text-muted">{channel.label}</dt>
              <dd>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] underline decoration-line decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/40"
                >
                  {channel.value}
                </a>
              </dd>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.2}>
          <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-8">
            <dt className="meta text-muted">Location</dt>
            <dd className="text-[0.9375rem] text-muted">New Delhi, India</dd>
          </div>
        </Reveal>
      </dl>
    </section>
  )
}
