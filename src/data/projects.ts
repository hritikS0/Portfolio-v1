export interface Project {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  technologies: string[]
  tradeoffs: string
  architecture: string
  performance: string
  lessons: string
  live?: string
  code?: string
}

export const projects: Project[] = [
  {
    id: "toolstack-ai",
    title: "ToolStackAI",
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
    id: "shailshuta-logistics",
    title: "Shailshuta Logistics",
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
  },
  {
    id: "pdooh-platform",
    title: "PDOOH Platform",
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
  },
]
