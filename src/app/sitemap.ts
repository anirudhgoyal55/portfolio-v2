import type { MetadataRoute } from "next";
import { siteConfig } from "../../site.config";
import { getAllWork, getAllWriting, getAllExperience } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/writing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/now`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/listening`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${base}/uses`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // experience entries don't have individual URLs (single timeline page),
  // but we increase the page priority by acknowledging them in sitemap.
  void getAllExperience();

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const writingRoutes: MetadataRoute.Sitemap = getAllWriting().map((w) => ({
    url: `${base}/writing/${w.slug}`,
    lastModified: w.frontmatter.updatedAt
      ? new Date(w.frontmatter.updatedAt)
      : new Date(w.frontmatter.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...writingRoutes];
}
