import { MetadataRoute } from "next";
import { getJobs } from "@/lib/api/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://niyogdisha-frontend.onrender.com";
  const jobs = await getJobs();

  const staticRoutes = [
    "",
    "/jobs",
    "/admit-card",
    "/answer-key",
    "/results",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: job.published_at ? new Date(job.published_at) : new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...jobRoutes];
}
