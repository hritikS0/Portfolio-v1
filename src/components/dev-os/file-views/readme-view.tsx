"use client"

import { useMode } from "@/src/components/providers/mode-provider"

export function ReadmeView() {
  const { setMode } = useMode()

  const runTerminalCommand = (cmd: string) => {
    if (typeof window !== "undefined" && (window as any).executeTerminalCommand) {
      ;(window as any).executeTerminalCommand(cmd)
    }
  }

  return (
    <div className="p-6 font-sans text-sm text-[#DFE2E7] space-y-6 max-w-4xl w-full leading-relaxed select-text">
      {/* File Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 shrink-0 select-none font-mono text-xs">
        <div className="flex items-center gap-2 text-accent">
          <span>📄</span>
          <span className="font-bold">README.md</span>
        </div>
        <button
          type="button"
          onClick={() => setMode("recruiter")}
          className="px-2.5 py-1 border border-accent/40 rounded bg-accent/15 hover:bg-accent/25 text-[10px] text-accent font-semibold transition-colors cursor-pointer select-none"
        >
          [View in Recruiter Mode]
        </button>
      </div>

      {/* Resume Markdown Body */}
      <div className="space-y-8">
        
        {/* Header Block */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Hritik Sharma</h1>
          <p className="text-base text-accent font-mono">Software Engineer | Full-Stack JavaScript</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5 text-xs text-muted font-mono select-all">
            <span>📧 sharmahritik8077@gmail.com</span>
            <span>🌐 hritiksharma.dev</span>
            <span> github.com/hritikS0</span>
            <span> linkedin.com/in/hritiksharma</span>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="border border-border bg-[#07090e] rounded-lg p-4 font-mono text-xs space-y-3 select-none">
          <span className="text-[10px] text-muted uppercase font-bold">Quick In-Terminal Actions</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => runTerminalCommand("fastfetch")}
              className="text-left p-2 rounded border border-border/60 hover:bg-surface-hover hover:border-accent/40 transition-all cursor-pointer text-foreground"
            >
              <div className="font-bold text-accent">./fastfetch</div>
              <div className="text-[10px] text-muted/60 mt-0.5">Parse developer specs</div>
            </button>
            <button
              type="button"
              onClick={() => runTerminalCommand("help")}
              className="text-left p-2 rounded border border-border/60 hover:bg-surface-hover hover:border-accent/40 transition-all cursor-pointer text-foreground"
            >
              <div className="font-bold text-accent">./help</div>
              <div className="text-[10px] text-muted/60 mt-0.5">List console endpoints</div>
            </button>
            <button
              type="button"
              onClick={() => runTerminalCommand("theme")}
              className="text-left p-2 rounded border border-border/60 hover:bg-surface-hover hover:border-accent/40 transition-all cursor-pointer text-foreground"
            >
              <div className="font-bold text-accent">./theme</div>
              <div className="text-[10px] text-muted/60 mt-0.5">Rotate workspace theme</div>
            </button>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Summary</h2>
          <p className="text-muted text-sm font-sans leading-relaxed">
            Full-Stack JavaScript Developer with experience building scalable web applications using React, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, Prisma, and TypeScript. Experienced in API development, authentication, AI integrations, database design, and cloud deployment with a focus on clean architecture and production-ready software.
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Experience</h2>
          
          <div className="space-y-6">
            {/* TechPlek Technologies */}
            <div className="space-y-3">
              <div className="flex justify-between items-start font-mono text-xs">
                <div>
                  <h3 className="text-sm font-bold text-foreground font-sans">TechPlek Technologies</h3>
                  <span className="text-accent">Full Stack Developer Intern</span>
                </div>
                <div className="text-right text-muted">
                  <div>New Delhi, India</div>
                  <div>Dec 2025 - June 2026</div>
                </div>
              </div>

              {/* Shailshuta Logistics */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-foreground font-mono">Project 1: Shailshuta Logistics</h4>
                <div className="text-[11px] text-muted font-mono">
                  <span className="text-foreground">Tech Stack:</span> React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, React Query, Material UI, JWT
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted/90 font-sans">
                  <li>Contributed to the development of a full-stack logistics management platform for administrators and customers.</li>
                  <li>Built and maintained scalable RESTful APIs using Node.js, Express.js, PostgreSQL, and Prisma.</li>
                  <li>Designed and implemented shipment lifecycle workflows, business logic, tracking, validation, and administrative operations.</li>
                  <li>Developed a comprehensive Role-Based Access Control (RBAC) system with JWT authentication and permission-based authorization.</li>
                  <li>Integrated backend services with a React + TypeScript frontend, implementing dashboards, shipment management, customer management, and project management modules.</li>
                  <li>Built responsive UI components using Material UI, React Query, Axios, React Router, and Context API.</li>
                  <li>Collaborated with senior developers to debug production issues, review APIs, and deliver production-ready features.</li>
                </ul>
              </div>

              {/* PDOOH */}
              <div className="space-y-2 pt-3">
                <h4 className="text-xs font-bold text-foreground font-mono">Project 2: PDOOH (Digital Out-of-Home) Platform</h4>
                <div className="text-[11px] text-muted font-mono">
                  <span className="text-foreground">Tech Stack:</span> React, TypeScript, Node.js, Prisma, PostgreSQL, Raspberry Pi, Linux
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted/90 font-sans">
                  <li>Developed backend services using Node.js and Prisma for the PDOOH ecosystem.</li>
                  <li>Built React-based administration panels for device and content management.</li>
                  <li>Optimized the Raspberry Pi media player by resolving rendering and layout issues.</li>
                  <li>Implemented a custom boot interface and automated device provisioning workflow.</li>
                  <li>Improved application stability, startup reliability, and overall device performance.</li>
                  <li>Contributed to backend APIs and frontend features supporting digital signage management.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Featured Projects</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <h3 className="text-sm font-bold text-foreground font-sans">ToolStackAI</h3>
              <a href="https://github.com/hritikS0/ToolstackAi" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">[Source Code]</a>
            </div>
            <div className="text-[11px] text-muted font-mono">
              <span className="text-foreground">Technologies:</span> React 19, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, Tailwind CSS, React Query, NVIDIA AI, JWT, Docker
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted/90 font-sans">
              <li>Built a full-stack AI-powered developer workspace combining AI chat, PDF analysis, image understanding, code debugging, and productivity tools into a unified platform.</li>
              <li>Implemented streaming AI chat with custom tool-calling, enabling the AI to create tasks, manage projects, and store persistent user memories directly from conversations.</li>
              <li>Developed a RAG-based PDF Q&A system using NVIDIA embeddings and a custom in-memory vector store with cosine similarity search for semantic document retrieval.</li>
              <li>Built multimodal AI features including image analysis, structured code debugging, and a persistent memory system that automatically extracts and stores user context.</li>
              <li>Designed a secure backend with JWT authentication, AES-256-GCM encrypted API key storage, Zod validation, modular service architecture, and usage tracking.</li>
              <li>Deployed the application on Vercel and Render with CI/CD, leveraging PostgreSQL (Prisma ORM) and React Query for scalable state management and production-ready performance.</li>
            </ul>
          </div>
        </div>

        {/* Technical Skills Matrix */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Technical Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1.5 border border-border/60 bg-surface/30 p-3 rounded">
              <div className="text-accent font-bold">Languages</div>
              <div className="text-muted">JavaScript, TypeScript, Python(Beginner)</div>
            </div>
            <div className="space-y-1.5 border border-border/60 bg-surface/30 p-3 rounded">
              <div className="text-accent font-bold">Frontend Engineering</div>
              <div className="text-muted">React.js, Next.js, Tailwind CSS, Material UI, React Query, Redux Toolkit, Context API, React Router, Axios, Responsive UI, Zustand</div>
            </div>
            <div className="space-y-1.5 border border-border/60 bg-surface/30 p-3 rounded">
              <div className="text-accent font-bold">Backend Architecture</div>
              <div className="text-muted">Node.js, Express.js, REST APIs, JWT Authentication, RBAC, Prisma ORM, Mongoose, Zod Validation, Middleware</div>
            </div>
            <div className="space-y-1.5 border border-border/60 bg-surface/30 p-3 rounded">
              <div className="text-accent font-bold">Databases</div>
              <div className="text-muted">PostgreSQL, MongoDB, Prisma ORM, Mongoose, MongoDB Atlas, Supabase, Neon</div>
            </div>
            <div className="space-y-1.5 border border-border/60 bg-surface/30 p-3 rounded sm:col-span-2">
              <div className="text-accent font-bold">DevOps & Tooling</div>
              <div className="text-muted">Git, GitHub, Docker, Postman, Vercel, Render, Netlify, Linux Shell scripting</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Certifications</h2>
          <div className="border border-border/40 bg-surface/30 p-4 rounded space-y-1.5 font-mono text-xs">
            <div className="flex justify-between">
              <span className="font-bold text-foreground font-sans">MERN Stack Development Specialization</span>
              <span className="text-muted">Ducat Pitampura</span>
            </div>
            <p className="text-xs text-muted/80 font-sans leading-relaxed">
              Learning the MERN stack at Ducat, working with MongoDB, Express.js, React.js, Node.js, JavaScript, HTML, CSS, and Tailwind to build full-stack web applications.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground border-b border-border/40 pb-1.5 font-sans">Education</h2>
          <div className="flex justify-between items-center font-mono text-xs">
            <div>
              <span className="font-bold text-foreground font-sans">Bachelor of Computer Application (BCA)</span>
              <div className="text-muted text-[11px]">GNIOT Institute of Professional Studies</div>
            </div>
            <span className="text-muted">2023 - 2025</span>
          </div>
        </div>

      </div>
    </div>
  )
}
