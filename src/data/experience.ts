export interface Experience {
  title: string
  organization: string
  period: string
  description: string[]
}

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer Intern",
    organization: "TechPlek Technologies, New Delhi",
    period: "Dec 2025 — Jun 2026",
    description: [
      "Shailshuta Logistics: Architected and optimized 20+ robust RESTful API endpoints handling critical shipment tracking and customer operations, cutting server response times by 15%.",
      "Engineered end-to-end JWT authentication and granular Role-Based Access Control (RBAC), securing 15+ analytical dashboard views and shielding protected endpoints from unauthorized access.",
      "Configured, monitored, and maintained scalable Node.js deployments on Linux staging environments using PM2 with automated log rotation and error alerts to preserve 99.9% application uptime.",
      "Digital Signage Platform (PDOOH): Developed low-latency backend services and a centralized administration console to handle asset distribution and synchronization across 50+ remote digital signage units.",
      "Integrated Amazon S3 for cloud-based media asset handling with pre-signed URLs, accelerating asset rendering speeds by 25%.",
      "Resolved critical Raspberry Pi runtime failures by optimizing custom shell boot sequences and provisioning scripts, reducing media-player memory footprint by 30%.",
    ],
  },
  {
    title: "MERN Stack Development Certification",
    organization: "Ducat, Pitampura",
    period: "2025",
    description: [
      "Completed an intensive, hands-on syllabus centered around production-grade software development practices, architectural patterns, and full-stack integration strategies.",
      "Solved over 217+ algorithmic challenges focused heavily on JavaScript fundamentals, complex data structures, and optimal time/space complexity patterns.",
    ],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    organization: "GNIOT Institute of Professional Studies, Greater Noida",
    period: "2023 — 2025",
    description: [
      "Graduated with focus on software engineering, computer systems architecture, database management, and full-stack development methodologies.",
    ],
  },
]
