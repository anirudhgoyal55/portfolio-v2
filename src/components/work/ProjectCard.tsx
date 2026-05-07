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
      className="group block hairline-bottom py-5 px-3 -mx-3 rounded-sm transition-colors hover:bg-[color:var(--color-accent-wash)]"
    >
      <div className="grid grid-cols-12 items-baseline gap-4">
        <span className="col-span-2 sm:col-span-1 font-mono text-[11px] opacity-50 group-hover:text-[color:var(--color-accent)] group-hover:opacity-100 transition-all">
          {pad2(index + 1)}
        </span>
        <div className="col-span-10 sm:col-span-9">
          <h3 className="font-serif text-xl sm:text-2xl leading-tight transition-all group-hover:text-[color:var(--color-accent)] group-hover:translate-x-0.5">
            {fm.title}
          </h3>
          <p className="mt-1 text-sm opacity-70 group-hover:opacity-90 transition-opacity">
            {fm.description}
          </p>
          {fm.stack?.length ? (
            <p className="mt-1.5 font-mono text-[11px] opacity-50 lowercase">
              {fm.stack.slice(0, 4).join(" · ")}
            </p>
          ) : null}
        </div>
        <span className="hidden sm:block col-span-2 text-right font-mono text-[11px] opacity-60 group-hover:opacity-90 transition-opacity">
          {fm.year}
        </span>
      </div>
    </Link>
  );
}
