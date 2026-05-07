/**
 * GitHub public REST client — no auth required for public events.
 * Returns recent push events for the configured username.
 *
 * Setup: edit `siteConfig.integrations.github.username` in site.config.ts.
 */

import "server-only";
import { siteConfig } from "../../site.config";

export type GhCommit = {
  repo: string;
  repoUrl: string;
  message: string;
  url: string;
  sha: string;
  date: string;
};

type RawEvent = {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ sha: string; message: string; url: string }>;
  };
  created_at: string;
};

export async function getRecentCommits(
  limit = 8,
  revalidateSeconds = 600,
): Promise<GhCommit[]> {
  const username = siteConfig.integrations.github.username;
  if (!username) return [];

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-v2",
      },
      next: { revalidate: revalidateSeconds, tags: ["github-events"] },
    });
    if (!res.ok) return [];
    const events = (await res.json()) as RawEvent[];

    const commits: GhCommit[] = [];
    for (const e of events) {
      if (e.type !== "PushEvent") continue;
      for (const c of e.payload.commits ?? []) {
        commits.push({
          repo: e.repo.name,
          repoUrl: `https://github.com/${e.repo.name}`,
          message: c.message.split("\n")[0], // first line only
          // The API URL points at the commit JSON; convert to the human URL.
          url: c.url
            .replace("api.github.com/repos", "github.com")
            .replace("/commits/", "/commit/"),
          sha: c.sha.slice(0, 7),
          date: e.created_at,
        });
        if (commits.length >= limit) return commits;
      }
    }
    return commits;
  } catch {
    return [];
  }
}
