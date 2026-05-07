/**
 * Letterboxd RSS reader.
 * Letterboxd publishes a public RSS feed at /<username>/rss/ with ratings + posters.
 *
 * Setup: set `siteConfig.integrations.letterboxd.username` and `enabled = true`.
 */

import "server-only";
import Parser from "rss-parser";
import { siteConfig } from "../../site.config";

export type LetterboxdEntry = {
  title: string;
  filmTitle: string;
  filmYear: string;
  rating: string | null;
  rewatch: boolean;
  watchedDate: string | null;
  url: string;
  posterUrl: string | null;
};

type CustomItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  "letterboxd:filmTitle"?: string;
  "letterboxd:filmYear"?: string;
  "letterboxd:memberRating"?: string;
  "letterboxd:rewatch"?: string;
  "letterboxd:watchedDate"?: string;
  content?: string;
};

const parser = new Parser<unknown, CustomItem>({
  customFields: {
    item: [
      ["letterboxd:filmTitle", "letterboxd:filmTitle"],
      ["letterboxd:filmYear", "letterboxd:filmYear"],
      ["letterboxd:memberRating", "letterboxd:memberRating"],
      ["letterboxd:rewatch", "letterboxd:rewatch"],
      ["letterboxd:watchedDate", "letterboxd:watchedDate"],
    ],
  },
});

function extractPoster(html: string | undefined): string | null {
  if (!html) return null;
  const m = html.match(/<img[^>]+src="([^"]+)"/);
  return m?.[1] ?? null;
}

export async function getRecentFilms(
  limit = 8,
  revalidateSeconds = 3600,
): Promise<LetterboxdEntry[]> {
  const cfg = siteConfig.integrations.letterboxd;
  if (!cfg.enabled || !cfg.username) return [];

  const url = `https://letterboxd.com/${encodeURIComponent(cfg.username)}/rss/`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "portfolio-v2" },
      next: { revalidate: revalidateSeconds, tags: ["letterboxd"] },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? []).slice(0, limit).map((it) => ({
      title: it.title ?? "",
      filmTitle: it["letterboxd:filmTitle"] ?? it.title ?? "",
      filmYear: it["letterboxd:filmYear"] ?? "",
      rating: it["letterboxd:memberRating"] ?? null,
      rewatch: it["letterboxd:rewatch"] === "Yes",
      watchedDate: it["letterboxd:watchedDate"] ?? null,
      url: it.link ?? "",
      posterUrl: extractPoster(it.content),
    }));
  } catch {
    return [];
  }
}
