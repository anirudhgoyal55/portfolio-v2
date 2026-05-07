import type { MetadataRoute } from "next";
import { siteConfig } from "../../site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Most crawlers — full access
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Allow legitimate AI crawlers — they discover the LLMs.txt
      // and improve the work's discoverability in AI assistants.
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Claude-Web", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
