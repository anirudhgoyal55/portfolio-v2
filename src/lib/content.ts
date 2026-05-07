/**
 * MDX content loader.
 * Reads markdown files from /content/{work,writing} and content/now.mdx, content/uses.mdx.
 * Frontmatter is parsed via gray-matter; bodies are returned as raw MDX strings
 * for downstream rendering with next-mdx-remote.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./utils";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/* ---------- shared types ---------- */

export type WorkFrontmatter = {
  title: string;
  description: string;
  year: number;
  role: string;
  stack: string[];
  url?: string;
  github?: string;
  status?: "live" | "shipped" | "in-progress" | "concept" | "archived";
  cover?: string;
  featured?: boolean;
  order?: number;
};

export type Work = {
  slug: string;
  frontmatter: WorkFrontmatter;
  body: string;
};

export type WritingFrontmatter = {
  title: string;
  description: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  tags?: string[];
  draft?: boolean;
};

export type Writing = {
  slug: string;
  frontmatter: WritingFrontmatter;
  body: string;
  readingTimeMinutes: number;
};

/* ---------- generic reader ---------- */

function readFolder(folder: string): Array<{ slug: string; raw: string }> {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      raw: fs.readFileSync(path.join(dir, file), "utf8"),
    }));
}

/* ---------- work ---------- */

export function getAllWork(): Work[] {
  const items = readFolder("work").map((f) => {
    const { data, content } = matter(f.raw);
    return {
      slug: f.slug,
      frontmatter: data as WorkFrontmatter,
      body: content,
    };
  });
  // featured first, then by year desc, then by order
  return items.sort((a, b) => {
    if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
    if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
    if (a.frontmatter.year !== b.frontmatter.year)
      return b.frontmatter.year - a.frontmatter.year;
    return (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99);
  });
}

export function getWork(slug: string): Work | null {
  const all = getAllWork();
  return all.find((w) => w.slug === slug) ?? null;
}

export function getFeaturedWork(slugs: readonly string[]): Work[] {
  const all = getAllWork();
  return slugs
    .map((s) => all.find((w) => w.slug === s))
    .filter((w): w is Work => Boolean(w));
}

/* ---------- writing ---------- */

export function getAllWriting(): Writing[] {
  const items = readFolder("writing")
    .map((f) => {
      const { data, content } = matter(f.raw);
      const fm = data as WritingFrontmatter;
      return {
        slug: f.slug,
        frontmatter: fm,
        body: content,
        readingTimeMinutes: readingTime(content),
      };
    })
    .filter((w) => !w.frontmatter.draft);

  return items.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime(),
  );
}

export function getWriting(slug: string): Writing | null {
  return getAllWriting().find((w) => w.slug === slug) ?? null;
}

export function getWritingByTag(tag: string): Writing[] {
  return getAllWriting().filter((w) =>
    (w.frontmatter.tags ?? []).includes(tag),
  );
}

/* ---------- experience (timeline) ---------- */

export type ExperienceFrontmatter = {
  company: string;
  role: string;
  startDate: string; // ISO yyyy-mm or yyyy-mm-dd
  endDate: string; // ISO or "present"
  location?: string;
  url?: string;
  order?: number;
  draft?: boolean;
};

export type Experience = {
  slug: string;
  frontmatter: ExperienceFrontmatter;
  body: string;
};

export function getAllExperience(): Experience[] {
  const items = readFolder("experience")
    .map((f) => {
      const { data, content } = matter(f.raw);
      return {
        slug: f.slug,
        frontmatter: data as ExperienceFrontmatter,
        body: content,
      };
    })
    .filter((e) => !e.frontmatter.draft);

  return items.sort((a, b) => {
    const cmp =
      new Date(b.frontmatter.startDate).getTime() -
      new Date(a.frontmatter.startDate).getTime();
    if (cmp !== 0) return cmp;
    return (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99);
  });
}

/* ---------- single MDX (now, uses, about) ---------- */

export function getSingle(filename: string): {
  frontmatter: { title: string; updatedAt?: string; description?: string };
  body: string;
} | null {
  const filepath = path.join(CONTENT_ROOT, `${filename}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as { title: string; updatedAt?: string; description?: string },
    body: content,
  };
}
