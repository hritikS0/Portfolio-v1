import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
// Self-hosted from the `geist` package rather than next/font/google — the font
// files ship in node_modules, so there's no build-time network fetch and no
// third-party request at runtime.
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { AnimationProvider } from "@/src/components/providers/animation-provider"
import {
  ThemeProvider,
  themeScript,
} from "@/src/components/providers/theme-provider"
import { Analytics } from "@vercel/analytics/react"

// One weight is all Instrument Serif ships, and all the display type needs.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
})

const description =
  "Full-stack engineer building scalable production systems with TypeScript, React, Node.js and PostgreSQL."

export const metadata: Metadata = {
  metadataBase: new URL("https://hritiksharma.vercel.app"),
  title: {
    default: "Hritik Sharma — Full-Stack Engineer",
    template: "%s — Hritik Sharma",
  },
  description,
  openGraph: {
    title: "Hritik Sharma — Full-Stack Engineer",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Sharma — Full-Stack Engineer",
    description,
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
      suppressHydrationWarning
      // globals.css sets `scroll-behavior: smooth`; this tells Next's router to
      // account for it instead of warning about a conflicting scroll restore.
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        {/* Must run before first paint, or dark-mode visitors get a white flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AnimationProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[200] focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </AnimationProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
