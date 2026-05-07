/**
 * llms-full.txt — community-convention companion to llms.txt.
 * Same map but with full body text inlined, so LLMs can ingest the whole
 * site in one fetch.
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

  if (work.length) {
    lines.push("## Work");
    lines.push("");
    for (const w of work) {
      lines.push(`### ${w.frontmatter.title}`);
      lines.push("");
      lines.push(`${w.frontmatter.description}`);
      lines.push("");
      lines.push(`- URL: ${base}/work/${w.slug}`);
      lines.push(`- Year: ${w.frontmatter.year}`);
      lines.push(`- Role: ${w.frontmatter.role}`);
      if (w.frontmatter.stack?.length)
        lines.push(`- Stack: ${w.frontmatter.stack.join(", ")}`);
      if (w.frontmatter.url) lines.push(`- Live: ${w.frontmatter.url}`);
      if (w.frontmatter.github) lines.push(`- Source: ${w.frontmatter.github}`);
      if (w.frontmatter.status) lines.push(`- Status: ${w.frontmatter.status}`);
      lines.push("");
      lines.push(w.body);
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }

  if (writing.length) {
    lines.push("## Writing");
    lines.push("");
    for (const p of writing) {
      lines.push(`### ${p.frontmatter.title}`);
      lines.push("");
      lines.push(`${p.frontmatter.description}`);
      lines.push("");
      lines.push(`- URL: ${base}/writing/${p.slug}`);
      lines.push(`- Published: ${p.frontmatter.publishedAt}`);
      if (p.frontmatter.tags?.length)
        lines.push(`- Tags: ${p.frontmatter.tags.join(", ")}`);
      lines.push("");
      lines.push(p.body);
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
