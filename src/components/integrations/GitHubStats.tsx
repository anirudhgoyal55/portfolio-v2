import { getGitHubStats } from "@/lib/github-stats";
import { siteConfig } from "../../../site.config";

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

export async function GitHubStats() {
  if (!siteConfig.integrations.github.enabled) return null;
  const stats = await getGitHubStats();
  if (!stats) return null;

  return (
    <p className="font-mono text-[11px] opacity-60 lowercase">
      {stats.publicRepos} public repos · {stats.totalStars} stars
      {stats.lastPushedAt ? ` · last push ${timeAgo(stats.lastPushedAt)}` : ""}
    </p>
  );
}
