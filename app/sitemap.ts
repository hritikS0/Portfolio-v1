import type { MetadataRoute } from "next"
import { projects } from "@/src/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hritiksharma.vercel.app"

  return [
    { url: base, priority: 1 },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.id}`,
      priority: 0.8,
    })),
  ]
}
