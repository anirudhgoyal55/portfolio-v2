/**
 * llms.txt — the LLM discovery standard (https://llmstxt.org/)
 * A concise, structured map of the site optimized for AI assistants.
 */

import { siteConfig } from "../../../site.config";
import { getAllWork, getAllWriting } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const work = getAllWork();
  const writing = getAllWriting();
  const base = siteConfig.url;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.bio}`);
  lines.push("");
  lines.push(`Role: ${siteConfig.role}`);
  lines.push(`Site: ${base}`);
  if (siteConfig.social.linkedin) lines.push(`LinkedIn: ${siteConfig.social.linkedin}`);
  if (siteConfig.social.github) lines.push(`GitHub: ${siteConfig.social.github}`);
  if (siteConfig.social.instagram) lines.push(`Instagram: ${siteConfig.social.instagram}`);
  lines.push("");

  lines.push("## About");
  lines.push(`- [Home](${base}/): Identity, featured work, current focus`);
  lines.push(`- [Now](${base}/now): What I'm working on this week`);
  lines.push(`- [Uses](${base}/uses): Hardware and software stack`);
  lines.push(`- [Contact](${base}/contact): Get in touch`);
  lines.push("");

  if (work.length) {
    lines.push("## Work");
    for (const w of work) {
      const stack = w.frontmatter.stack?.join(", ") ?? "";
      lines.push(
        `- [${w.frontmatter.title}](${base}/work/${w.slug}): ${w.frontmatter.description} (${w.frontmatter.year}${stack ? `, ${stack}` : ""})`,
      );
    }
    lines.push("");
  }

  if (writing.length) {
    lines.push("## Writing");
    for (const w of writing) {
      lines.push(
        `- [${w.frontmatter.title}](${base}/writing/${w.slug}): ${w.frontmatter.description}`,
      );
    }
    lines.push("");
  }

  lines.push("## Feeds");
  lines.push(`- RSS: ${base}/feed.xml`);
  lines.push(`- JSON Feed: ${base}/feed.json`);
  lines.push(`- Atom: ${base}/atom.xml`);
  lines.push(`- Sitemap: ${base}/sitemap.xml`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
