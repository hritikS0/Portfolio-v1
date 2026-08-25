export interface Project {
  id: string
  title: string
  /** One line for the index list. Keep it scannable — depth lives on the page. */
  tagline: string
  /** Where the work happened. Shown as the eyebrow on both list and detail. */
  context: string
  description: string
  problem: string
  solution: string
  technologies: string[]
  tradeoffs: string
  architecture: string
  performance: string
  lessons: string
  /** Source is under NDA — the detail page says so instead of showing no links. */
  confidential?: boolean
  /** Optional screen capture shown on the detail page. */
  media?: { src: string; caption: string }
  live?: string
  code?: string
}

export const projects: Project[] = [
  {
    id: "toolstack-ai",
    title: "ToolStackAI",
    tagline:
      "An AI developer workspace with response streaming, RAG document search, and a debugging assistant.",
    context: "Personal project",
    description:
      "AI-powered developer workspace integrating real-time streaming, local document analysis via RAG, and an automated code debugging assistant.",
    problem:
      "Developers struggle with fragmented tools when shifting between chatting with LLMs, doing semantic lookups over codebase PDFs, and debugging local scripts.",
    solution:
      "Engineered an integrated dashboard utilizing Server-Sent Events (SSE) for chunked response streaming, NVIDIA embeddings for document chunking, and isolated runner schemas for diagnostic execution.",
    technologies: ["React 19", "Next.js", "Express 5", "PostgreSQL", "Prisma", "NVIDIA NIM", "Tailwind CSS", "JWT", "Docker"],
    tradeoffs:
      "Chose Server-Sent Events (SSE) over WebSockets for chat response streams since communication is strictly unidirectional (server-to-client after prompt). This lowered connection overhead by 2x but introduced minor limits on simultaneous bidirectional data transfers.",
    architecture:
      "Micro-service design where client requests hit an API Gateway, routing heavy document indexing to a background queue worker. Embedding records are held in PostgreSQL (using PGVector) to leverage standard database transactions without adding dedicated vector database overhead.",
    performance:
      "Optimized document ingestion pipelines from 12.8s down to 3.1s via parallel batch promise pooling. SSE chunk delivery achieves an average time-to-first-token (TTFT) latency of < 85ms.",
    lessons:
      "Learned that database connection pools require aggressive limits when running inside serverless runtimes. Handled this by introducing cached Prisma instances and fine-tuning PgBouncer configurations.",
    live: "https://toolstack-ai.vercel.app",
    code: "https://github.com/hritikS0/ToolstackAi",
  },
  {
    id: "android-home-lab",
    title: "Android Home Lab Server",
    tagline:
      "A retired Android phone turned into a zero-cost, self-hosted Linux server running persistent Node services.",
    context: "Personal project",
    description:
      "Repurposed legacy Android hardware into an ultra-low-power, self-hosted Linux server environment using Termux to host persistent node services.",
    problem:
      "Hosting custom backend node services and automated CI/CD pipelines on traditional cloud platforms incurs recurring infrastructure costs and potential public firewall port exposure.",
    solution:
      "Established a strict zero-trust private network mesh utilizing Tailscale for secure SSH remote administration, and automated deployment workflows via custom GitHub Actions pipelines with PM2 runners.",
    technologies: [
      "Linux",
      "Termux",
      "Tailscale",
      "GitHub Actions",
      "PM2",
      "CI/CD",
      "Node.js",
      "Docker",
    ],
    tradeoffs:
      "Chose Termux on ARM Android hardware over standard cloud VPS hosting to eliminate recurring monthly server infrastructure costs, accepting lower peak CPU compute throughput for self-hosted microservices.",
    architecture:
      "Self-hosted ARM Linux node running inside Android hardware via Termux containerization. Private networking is routed through an encrypted zero-trust Tailscale mesh network without opening public firewall ports.",
    performance:
      "Drove localized infrastructure costs down to zero. Shifting code-to-production deployment execution speeds from minutes to under 45 seconds using PM2 runners.",
    lessons:
      "Learned that mobile hardware battery management systems can throttle CPU frequencies under persistent node server loads. Solved by configuring custom wake-locks and background battery optimization overrides in Android OS.",
    media: {
      src: "/media/homelab-preview.mov",
      caption: "Live telemetry from the running node.",
    },
    code: "https://github.com/hritikS0/homelab-music",
  },
  {
    id: "shailshuta-logistics",
    title: "Shailshuta Logistics",
    tagline:
      "A logistics platform handling shipment tracking, validation, and role-scoped admin operations.",
    context: "Client work · TechPlek Technologies",
    description:
      "Full-stack logistics management platform for administrators and customers, driving coordinate tracking, shipment validation, and administrative operations.",
    problem:
      "Operations teams faced delayed status synchronizations, manual courier dispatch phone checking, and lacked role-based security access on logistics dashboards.",
    solution:
      "Engineered an integrated tracking core using Express.js and Prisma, locking administrative controls under custom JWT validation loops and optimizing relational database querying pools.",
    technologies: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma", "React Query", "Material UI", "JWT"],
    tradeoffs:
      "Chose relational PostgreSQL with Prisma to execute robust ACID-compliant shipment status transactions, accepting slightly lower write throughput compared to non-relational MongoDB instances.",
    architecture:
      "Client requests validate JWT tokens at the router before hitting Express controller handlers. The database is isolated and managed through Prisma schemas with PgBouncer connection pooling.",
    performance:
      "Reduced average shipment coordinate synchronization delay to sub-200ms ranges. Decreased operations tracking overhead by 40% while securing critical endpoints.",
    lessons:
      "Learned that complex database joins slow down admin dashboards. Handled by writing optimized Prisma selects and caching static courier lookup profiles.",
    confidential: true,
  },
  {
    id: "pdooh-platform",
    title: "PDOOH Platform",
    tagline:
      "A digital signage network orchestrating media playlists across 50+ remote Raspberry Pi players.",
    context: "Client work · TechPlek Technologies",
    description:
      "Digital out-of-home advertising playout network orchestrating real-time media playlist streams and automated Raspberry Pi device provisioning.",
    problem:
      "Digital signage displays suffered from media playout memory leaks, startup loop crashes, and lacked centralized remote provisioning tools for field devices.",
    solution:
      "Developed Node.js and Prisma backend controllers to coordinate signage media schedules, optimized Pi playout performance, and implemented automated provisioning workflows.",
    technologies: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Raspberry Pi", "Linux"],
    tradeoffs:
      "Deploying schedule checks via polling instead of long-lived WebSockets to accommodate irregular mobile network connections of remote signs, accepting a 1.5s delay in playlist updates.",
    architecture:
      "Central API scheduler stores playlist actions in PostgreSQL. Remote Raspberry Pi devices fetch actions via cron scripts and buffer media files locally on internal drives.",
    performance:
      "Eliminated rendering stutters and layout leaks on signage playout loops. Achieved a 99.98% remote device startup reliability rate.",
    lessons:
      "Experienced memory bloating on low-memory Raspberry Pi players from continuous media looping. Resolved by scheduling automatic buffer clears and garbage collection.",
    confidential: true,
  },
]

export function getProject(id: string) {
  return projects.find((project) => project.id === id)
}
