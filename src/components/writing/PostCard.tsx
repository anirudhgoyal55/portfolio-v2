import Link from "next/link";
import type { Writing } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Writing }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group block hairline-bottom py-5 px-3 -mx-3 rounded-sm transition-colors hover:bg-[color:var(--color-accent-wash)]"
    >
      <div className="grid grid-cols-12 items-baseline gap-4">
        <time
          dateTime={post.frontmatter.publishedAt}
          className="col-span-12 sm:col-span-3 font-mono text-[11px] opacity-60 group-hover:text-[color:var(--color-accent)] group-hover:opacity-100 transition-all"
        >
          {formatDate(post.frontmatter.publishedAt)}
        </time>
        <div className="col-span-12 sm:col-span-9">
          <h3 className="font-serif text-lg sm:text-xl leading-tight transition-all group-hover:text-[color:var(--color-accent)] group-hover:translate-x-0.5">
            {post.frontmatter.title}
          </h3>
          <p className="mt-1 text-sm opacity-70 group-hover:opacity-90 transition-opacity">
            {post.frontmatter.description}
          </p>
          <p className="mt-1.5 font-mono text-[11px] opacity-50">
            {post.readingTimeMinutes} min read
            {post.frontmatter.tags?.length
              ? ` · ${post.frontmatter.tags.join(" · ")}`
              : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
