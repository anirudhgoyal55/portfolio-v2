import Link from "next/link";
import type { Writing } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Writing }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group block hairline-bottom py-7"
    >
      <div className="grid grid-cols-12 items-baseline gap-4">
        <div className="col-span-12 sm:col-span-3">
          <time
            dateTime={post.frontmatter.publishedAt}
            className="font-mono text-[11px] opacity-60"
          >
            {formatDate(post.frontmatter.publishedAt)}
          </time>
        </div>
        <div className="col-span-12 sm:col-span-9">
          <h3 className="font-serif text-xl sm:text-2xl leading-tight transition-colors group-hover:text-[color:var(--color-accent)]">
            {post.frontmatter.title}
          </h3>
          <p className="mt-1.5 text-sm opacity-70 max-w-prose">
            {post.frontmatter.description}
          </p>
          <p className="mt-2 font-mono text-[11px] opacity-50">
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
