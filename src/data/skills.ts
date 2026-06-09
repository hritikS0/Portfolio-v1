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
      { name: "JavaScript", level: "proficient" },
      { name: "Python", level: "intermediate" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "MUI" },
      { name: "Zustand" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "JWT" },
      { name: "OAuth" },
      { name: "WebSockets" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
      { name: "Mongoose" },
      { name: "SQL" },
      { name: "Redis" },
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "CI/CD" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "AWS S3" },
      { name: "Linux" },
    ],
  },
]
