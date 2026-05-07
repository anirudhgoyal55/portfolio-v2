import Link from "next/link";
import type { Work } from "@/lib/content";
import { pad2 } from "@/lib/utils";

export function ProjectCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  const fm = work.frontmatter;
  return (
    <Link
      href={`/work/${work.slug}`}
      className="group block hairline-bottom py-7 transition-colors"
    >
      <div className="grid grid-cols-12 items-baseline gap-4">
        <div className="col-span-2 sm:col-span-1">
          <span className="font-mono text-[11px] opacity-50">
            {pad2(index + 1)}
          </span>
        </div>
        <div className="col-span-10 sm:col-span-7">
          <h3 className="font-serif text-2xl sm:text-3xl leading-tight transition-colors group-hover:text-[color:var(--color-accent)]">
            {fm.title}
          </h3>
          <p className="mt-1.5 text-sm opacity-70 max-w-prose">
            {fm.description}
          </p>
        </div>
        <div className="hidden sm:block col-span-3">
          <p className="font-mono text-[11px] opacity-60 lowercase">
            {fm.stack?.slice(0, 3).join(" · ")}
          </p>
        </div>
        <div className="hidden sm:block col-span-1 text-right">
          <p className="font-mono text-[11px] opacity-60">{fm.year}</p>
        </div>
      </div>
    </Link>
  );
}
