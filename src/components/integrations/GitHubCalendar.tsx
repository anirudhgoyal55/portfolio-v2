/**
 * GitHub contributions heatmap (last year).
 *
 * Data via the public jogruber proxy
 * (https://github.com/grubersjoe/github-contributions-api). Forks can
 * swap to a self-hosted copy of the same proxy or to GitHub's official
 * GraphQL API with a personal access token by editing the fetch URL.
 *
 * Cached 24h via revalidate.
 */

import "server-only";
import { siteConfig } from "../../../site.config";
import { GitHubCalendarClient } from "./GitHubCalendarClient";

type ApiDay = { date: string; count: number; level: number };
type ApiResponse = { total?: { lastYear?: number }; contributions?: ApiDay[] };

async function fetchContributions(username: string): Promise<ApiDay[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username,
      )}?y=last`,
      {
        next: { revalidate: 86400, tags: ["github-calendar"] },
        headers: { "User-Agent": "portfolio-v2" },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as ApiResponse;
    return data.contributions ?? null;
  } catch {
    return null;
  }
}

export async function GitHubCalendar() {
  if (!siteConfig.integrations.github.enabled) return null;
  const username = siteConfig.integrations.github.username;
  if (!username) return null;

  const contributions = await fetchContributions(username);
  if (!contributions?.length) return null;

  return (
    <div className="overflow-x-auto -mx-3 px-3">
      <GitHubCalendarClient data={contributions} />
    </div>
  );
}
