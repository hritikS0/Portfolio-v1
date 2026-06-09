export interface Experience {
  title: string
  organization: string
  period: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    title: "BCA in Computer Science",
    organization: "GNIOT IPS, New Delhi",
    period: "2022 — 2025",
    description: [
      "Graduated with focus on software engineering, data structures, and web technologies.",
    ],
  },
  {
    title: "MERN Stack Development",
    organization: "Ducat Pitampura, New Delhi",
    period: "12 Apr 2025 — 12 Dec 2025",
    description: [
      "Completed an intensive 8-month MERN stack training program covering MongoDB, Express.js, React, and Node.js.",
      "Built multiple full-stack projects including authentication systems, REST APIs, and real-time applications.",
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
]
