import Link from "next/link";
import type { Writing } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Writing }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group block hairline-bottom py-5"
    >
      <div className="grid grid-cols-12 items-baseline gap-4">
        <time
          dateTime={post.frontmatter.publishedAt}
          className="col-span-12 sm:col-span-3 font-mono text-[11px] opacity-60"
        >
          {formatDate(post.frontmatter.publishedAt)}
        </time>
        <div className="col-span-12 sm:col-span-9">
          <h3 className="font-serif text-lg sm:text-xl leading-tight transition-colors group-hover:text-[color:var(--color-accent)]">
            {post.frontmatter.title}
          </h3>
          <p className="mt-1 text-sm opacity-70">
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
