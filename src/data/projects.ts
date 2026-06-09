export interface Project {
  title: string
  description: string
  problem: string
  solution: string
  technologies: string[]
  impact: string
  live?: string
  code?: string
}

export const projects: Project[] = [
  {
    title: "ToolStackAI",
    description:
      "AI-powered developer operating system with streaming chat, PDF RAG analysis, vision capabilities, code debugging, and a customizable theme system.",
    problem:
      "Developers lack a unified AI workspace that combines chat, document analysis, image understanding, and code debugging — forcing them to juggle fragmented tools.",
    solution:
      "Built a full-stack platform with Express 5 + React 19 featuring SSE streaming chat, PDF RAG with NVIDIA embeddings, vision chat, image analysis, and a code debugger — all backed by PostgreSQL and the NVIDIA NIM API.",
    technologies: ["Express 5", "TypeScript", "React 19", "Vite", "PostgreSQL", "Prisma", "Tailwind v4", "NVIDIA NIM"],
    impact: "",
    live: "https://toolstack-ai.vercel.app",
    code: "https://github.com/hritikS0/ToolstackAi",
  },
]
