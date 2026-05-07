import Link from "next/link";
import { getAllWork } from "@/lib/content";

export function RelatedWork({ currentSlug }: { currentSlug: string }) {
  const all = getAllWork();
  const idx = all.findIndex((w) => w.slug === currentSlug);
  if (idx === -1 || all.length < 2) return null;

  const next = all[(idx + 1) % all.length];
  const prev = all[(idx - 1 + all.length) % all.length];
  const items = [next, prev].filter((w) => w.slug !== currentSlug);
  if (!items.length) return null;

  return (
    <nav aria-label="Related work" className="mt-16 hairline pt-8">
      <p className="eyebrow mb-4">more work</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.slice(0, 2).map((w) => (
          <li key={w.slug}>
            <Link
              href={`/work/${w.slug}`}
              className="group block hairline-bottom pb-4 hover:bg-[color:var(--color-accent-wash)] -mx-3 px-3 py-3 rounded-sm transition-colors"
            >
              <p className="font-mono text-[11px] opacity-50">
                {w.frontmatter.year}
              </p>
              <p className="mt-1 font-serif text-lg leading-tight group-hover:text-[color:var(--color-accent)] transition-colors">
                {w.frontmatter.title}
              </p>
              <p className="mt-1 text-[13px] opacity-70 line-clamp-2">
                {w.frontmatter.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
