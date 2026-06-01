"use client"

import { motion } from "motion/react"
import { useState, type FormEvent } from "react"
import { SectionHeader } from "@/src/components/ui/section-header"

const contacts = [
  { label: "email", value: "sharmahritik8077@gmail.com", href: "mailto:sharmahritik8077@gmail.com", copyable: true },
  { label: "github", value: "github.com/hritikS0", href: "https://github.com/hritikS0", copyable: false },
  { label: "linkedin", value: "linkedin.com/in/hritik-sharma-91336430b/", href: "https://linkedin.com/in/hritik-sharma-91336430b/", copyable: false },
  { label: "location", value: "New Delhi, India", copyable: false }
]

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="contact" className="py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          title="Contact"
          subtitle="Get in touch via direct developer channels."
        />

        <div className="font-mono border border-border rounded-lg bg-[#07090e] overflow-hidden max-w-xl">
          {/* Mock config file header */}
          <div className="px-4 py-2 bg-[#0A0D14] border-b border-border flex items-center justify-between text-xs text-muted">
            <span>~/.config/hritik/contact.env</span>
            <span>UTF-8</span>
          </div>

          <div className="p-5 space-y-4">
            <div className="text-[11px] text-muted/50 select-none">
              # Click a link to open, or click [copy] for the address
            </div>

            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.label} className="flex flex-wrap items-center text-xs">
                  <span className="text-accent/90 font-bold w-20">{c.label.toUpperCase()}</span>
                  <span className="text-muted/60 mr-2 select-none">=</span>
                  
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors underline decoration-border underline-offset-4 flex-1 min-w-0 break-all"
                    >
                      &quot;{c.value}&quot;
                    </a>
                  ) : (
                    <span className="text-foreground flex-1 min-w-0 break-all">
                      &quot;{c.value}&quot;
                    </span>
                  )}

                  {c.copyable && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(c.value, c.label)}
                      className="ml-3 px-2 py-0.5 rounded border border-border bg-surface text-[10px] text-muted hover:text-foreground hover:border-accent/40 transition-colors shrink-0"
                    >
                      {copied === c.label ? "copied!" : "[copy]"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
