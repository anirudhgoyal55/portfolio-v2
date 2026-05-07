import Link from "next/link";
import { getAllWriting } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function RelatedPosts({
  currentSlug,
  tags = [],
}: {
  currentSlug: string;
  tags?: string[];
}) {
  const all = getAllWriting().filter((p) => p.slug !== currentSlug);
  if (!all.length) return null;

  // Prefer posts that share at least one tag; fall back to most recent
  const tagged = tags.length
    ? all.filter((p) => p.frontmatter.tags?.some((t) => tags.includes(t)))
    : [];
  const items = (tagged.length ? tagged : all).slice(0, 2);
  if (!items.length) return null;

  return (
    <nav aria-label="Related writing" className="mt-16 hairline pt-8">
      <p className="eyebrow mb-4">more writing</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/writing/${p.slug}`}
              className="group block hairline-bottom pb-4 hover:bg-[color:var(--color-accent-wash)] -mx-3 px-3 py-3 rounded-sm transition-colors"
            >
              <p className="font-mono text-[11px] opacity-50">
                {formatDate(p.frontmatter.publishedAt)}
              </p>
              <p className="mt-1 font-serif text-lg leading-tight group-hover:text-[color:var(--color-accent)] transition-colors">
                {p.frontmatter.title}
              </p>
              <p className="mt-1 text-[13px] opacity-70 line-clamp-2">
                {p.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
