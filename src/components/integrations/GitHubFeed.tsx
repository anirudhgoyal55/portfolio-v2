import { getRecentCommits } from "@/lib/github";
import { siteConfig } from "../../../site.config";
import { formatDate } from "@/lib/utils";

export async function GitHubFeed({ limit = 6 }: { limit?: number }) {
  if (!siteConfig.integrations.github.enabled) return null;
  const commits = await getRecentCommits(
    limit,
    siteConfig.integrations.github.revalidateSeconds,
  );
  if (!commits.length) return null;

  return (
    <ul className="space-y-3">
      {commits.map((c) => (
        <li key={c.sha + c.repo}>
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block hover:opacity-80 transition-opacity"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] opacity-60">
                {c.repo.split("/")[1]}
              </span>
              <time className="font-mono text-[10px] opacity-50">
                {formatDate(c.date)}
              </time>
            </div>
            <p className="text-sm leading-snug mt-0.5 line-clamp-2">
              {c.message}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
