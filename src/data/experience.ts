export interface Experience {
  title: string
  organization: string
  period: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    title: "Full-Stack Developer",
    organization: "Freelance / Contract",
    period: "Jan 2024 — Present",
    description: [
      "Built and shipped scalable full-stack applications using React (with TypeScript), Node.js, and PostgreSQL.",
      "Architected REST APIs and database schemas for multi-tenant SaaS platforms.",
    ],
  },
  {
    title: "Web Development Intern",
    organization: "TechPlek Technologies Pvt Ltd, New Delhi",
    period: "18 Dec 2025 — 18 June 2026",
    description: [
      "Built and integrated a comprehensive full-stack Role-Based Access Control (RBAC) system for the Shailshuta Logistics project.",
      "Engineered scalable RESTful APIs using Node.js, Express, and Mongoose, and seamlessly connected them to a React/TypeScript frontend.",
      "Developed the PDOOH (Digital Out-of-Home) ecosystem, building out a Node.js/Prisma backend and React administration frontends.",
      "Optimized the PDOOH Raspberry Pi device player, resolving layout bugs and implementing a custom booting UI and device setup sequence."
    ],
  },

  {
    title: "BCA in Computer Science",
    organization: "GNIOT IPS, New Delhi",
    period: "2022 — 2024",
    description: [
      "Graduated with focus on software engineering, data structures, and web technologies.",
    ],
  },
]
