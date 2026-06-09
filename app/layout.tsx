import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { AnimationProvider } from "@/src/components/providers/animation-provider"
import { Background } from "@/src/components/ui/background"
import { CursorTrail } from "@/src/components/ui/cursor-trail"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Hritik Sharma — Full-Stack Developer",
  description:
    "MERN & PERN Stack Developer passionate about building clean, modern, and scalable web applications with TypeScript, React, Node.js, and PostgreSQL.",
  openGraph: {
    title: "Hritik Sharma — Full-Stack Developer",
    description:
      "MERN & PERN Stack Developer passionate about building clean, modern, and scalable web applications with TypeScript, React, Node.js, and PostgreSQL.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-foreground antialiased">
        <AnimationProvider>
          <Background />
          <CursorTrail />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </AnimationProvider>
        <Analytics />
      </body>
    </html>
  )
}
