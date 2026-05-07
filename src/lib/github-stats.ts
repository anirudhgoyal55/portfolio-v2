/**
 * GitHub user stats — public REST, no auth.
 * Returns total public repo count + summed stargazer count + last push time.
 */

import "server-only";
import { siteConfig } from "../../site.config";

export type GhStats = {
  publicRepos: number;
  totalStars: number;
  lastPushedAt: string | null;
} | null;

type RawUser = { public_repos?: number };
type RawRepo = { stargazers_count?: number; pushed_at?: string };

export async function getGitHubStats(
  revalidateSeconds = 3600,
): Promise<GhStats> {
  const username = siteConfig.integrations.github.username;
  if (!username) return null;

  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-v2",
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
        next: { revalidate: revalidateSeconds, tags: ["github-stats"] },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
        {
          headers,
          next: { revalidate: revalidateSeconds, tags: ["github-stats"] },
        },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;
    const user = (await userRes.json()) as RawUser;
    const repos = (await reposRes.json()) as RawRepo[];

    const totalStars = repos.reduce(
      (sum, r) => sum + (r.stargazers_count ?? 0),
      0,
    );
    const lastPushedAt =
      repos
        .map((r) => r.pushed_at)
        .filter(Boolean)
        .sort()
        .reverse()[0] ?? null;

    return {
      publicRepos: user.public_repos ?? repos.length,
      totalStars,
      lastPushedAt: lastPushedAt ?? null,
    };
  } catch {
    return null;
  }
}
