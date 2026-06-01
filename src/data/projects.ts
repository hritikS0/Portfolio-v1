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
    title: "Shipment Management System",
    description:
      "Real-time shipment tracking and logistics management dashboard with role-based access control.",
    problem:
      "Logistics teams lacked a unified platform to track shipments, manage deliveries, and communicate across dispatch, drivers, and customers.",
    solution:
      "Built a full-stack dashboard with real-time shipment status updates, geolocation tracking, automated notifications, and an admin panel for fleet management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Mapbox"],
    impact:
      "Reduced average delivery coordination time by 40% and improved on-time delivery rate to 94% across the fleet.",
    code: "https://github.com/hritikS0/shipment-management",
  },
  {
    title: "Vendor Management Portal",
    description:
      "Centralized vendor onboarding, procurement, and compliance tracking platform for enterprise procurement teams.",
    problem:
      "Procurement teams were managing vendor data across spreadsheets and email, leading to inconsistent records, missed renewals, and compliance risks.",
    solution:
      "Designed a role-based portal with vendor registration, document upload, automated compliance checks, purchase order generation, and audit logging.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "AWS S3"],
    impact:
      "Consolidated 200+ vendor records into a single system, reduced onboarding time by 60%, and eliminated compliance lapses.",
    code: "https://github.com/hritikS0/vendor-portal",
  },
  {
    title: "AI-Powered Support Platform",
    description:
      "Intelligent ticket management system with automated classification, routing, and response suggestions.",
    problem:
      "Customer support teams were spending 70% of time on repetitive Level-1 queries, causing slow resolution times and high operational cost.",
    solution:
      "Developed a platform with NLP-based ticket classification, smart routing to the right team, and AI-generated response suggestions for common issues.",
    technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Redis"],
    impact:
      "Automated 55% of Level-1 responses, reduced average resolution time from 8 hours to 2.5 hours, and cut support costs by 30%.",
    code: "https://github.com/hritikS0/ai-support-platform",
  },
  {
    title: "PDOOH Digital Signage Platform",
    description:
      "Enterprise digital out-of-home advertising ecosystem with admin tools, client frontends, and Raspberry Pi hardware integration.",
    problem:
      "Managing digital signage across remote hardware devices required a unified solution for scheduling, overlay management, and offline-resilience.",
    solution:
      "Built a Node.js/Prisma backend paired with React admin frontends. Engineered a robust Raspberry Pi device player with custom booting UI, automated setup, and layout management.",
    technologies: ["React", "TypeScript", "Node.js", "Prisma", "Raspberry Pi", "AWS S3", "Redis"],
    impact:
      "Delivered a production-ready hardware-software ecosystem capable of resilient offline playback and remote content management.",
  },
]
