/**
 * ai.txt — alternate AI policy file (companion to robots.txt + llms.txt)
 * Allows AI assistants to discover and cite this work.
 */

import { siteConfig } from "../../../site.config";

export const dynamic = "force-static";

export async function GET() {
  const lines = [
    `# ai.txt for ${siteConfig.url}`,
    "# Policy for AI agents and language models.",
    "",
    "# This is a personal portfolio. AI training and indexing is welcome,",
    "# provided attribution is maintained where the work is referenced.",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    `Author: ${siteConfig.name}`,
    `Site: ${siteConfig.url}`,
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `Map: ${siteConfig.url}/llms.txt`,
  ].join("\n");

  return new Response(lines, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
