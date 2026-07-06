export interface SkillItem {
  name: string
  level?: "proficient" | "intermediate"
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: "proficient" },
      { name: "JavaScript (ES6+)", level: "proficient" },
      { name: "Python", level: "intermediate" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frontend Architecture",
    skills: [
      { name: "React.js", level: "proficient" },
      { name: "Next.js", level: "proficient" },
      { name: "Tailwind CSS" },
      { name: "Material UI (MUI)" },
      { name: "TanStack Query" },
      { name: "Redux Toolkit" },
      { name: "Zustand" },
    ],
  },
  {
    title: "Backend Engineering",
    skills: [
      { name: "Node.js", level: "proficient" },
      { name: "Express.js", level: "proficient" },
      { name: "RESTful APIs" },
      { name: "JWT & RBAC" },
      { name: "Prisma ORM" },
      { name: "Mongoose" },
      { name: "Zod Validation" },
      { name: "Redis" },
    ],
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", level: "proficient" },
      { name: "MongoDB" },
      { name: "PostGIS" },
      { name: "Amazon S3" },
    ],
  },
  {
    title: "DevOps, Cloud & Tools",
    skills: [
      { name: "Linux/Unix" },
      { name: "PM2" },
      { name: "Docker & Compose" },
      { name: "Git & GitHub Actions" },
      { name: "CI/CD" },
      { name: "Vercel & Render" },
      { name: "Tailscale" },
    ],
  },
  {
    title: "Artificial Intelligence",
    skills: [
      { name: "LLM API Integration", level: "proficient" },
      { name: "RAG Pipelines", level: "proficient" },
      { name: "Vector Embeddings" },
      { name: "Semantic Search" },
      { name: "Server-Sent Events (SSE)" },
    ],
  },
]
