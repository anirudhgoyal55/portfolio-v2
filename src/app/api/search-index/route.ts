/**
 * Search index — built from MDX content at request time, cached at build.
 * Returns a flat array of {type, slug, title, description, tags?, body?}
 * that the Cmd+K palette filters in the browser via simple includes()
 * matching on the lowercased query.
 */

import { NextResponse } from "next/server";
import { getAllWork, getAllWriting, getAllExperience } from "@/lib/content";

export const dynamic = "force-static";

type Entry = {
  type: "work" | "writing" | "experience" | "page";
  slug: string;
  title: string;
  description: string;
  url: string;
};

export async function GET() {
  const entries: Entry[] = [];

  for (const w of getAllWork()) {
    entries.push({
      type: "work",
      slug: w.slug,
      title: w.frontmatter.title,
      description: w.frontmatter.description,
      url: `/work/${w.slug}`,
    });
  }

  for (const p of getAllWriting()) {
    entries.push({
      type: "writing",
      slug: p.slug,
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      url: `/writing/${p.slug}`,
    });
  }

  for (const e of getAllExperience()) {
    entries.push({
      type: "experience",
      slug: e.slug,
      title: `${e.frontmatter.role} · ${e.frontmatter.company}`,
      description: e.frontmatter.location ?? "",
      url: `/experience#${e.slug}`,
    });
  }

  // Static pages
  for (const p of [
    { slug: "now", title: "Now", description: "Current focus" },
    { slug: "uses", title: "Uses", description: "Hardware + software" },
    { slug: "listening", title: "Listening", description: "Music, films, code" },
    { slug: "experience", title: "Experience", description: "Roles + timeline" },
    { slug: "work", title: "Work", description: "Selected projects" },
    { slug: "writing", title: "Writing", description: "Posts + essays" },
    { slug: "contact", title: "Contact", description: "Get in touch" },
  ]) {
    entries.push({
      type: "page",
      slug: p.slug,
      title: p.title,
      description: p.description,
      url: `/${p.slug}`,
    });
  }

  return NextResponse.json({ entries }, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
