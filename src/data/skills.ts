export interface SkillCategory {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "MUI", "Zustand"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "JWT", "OAuth", "WebSockets"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Mongoose", "SQL", "Redis"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "Git", "CI/CD", "Vercel", "Render", "AWS S3", "Linux"],
  },
]
