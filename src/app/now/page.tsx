import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSingle } from "@/lib/content";
import { MDXContent } from "@/components/content/MDXContent";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on this week.",
};

export default function NowPage() {
  const single = getSingle("now");
  if (!single) notFound();
  const { frontmatter, body } = single;

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28">
      <p className="eyebrow">now</p>
      <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
        {frontmatter.title}
      </h1>
      {frontmatter.updatedAt && (
        <p className="mt-3 font-mono text-[12px] opacity-60">
          updated {formatDate(frontmatter.updatedAt)}
        </p>
      )}
      <div className="prose mt-12">
        <MDXContent source={body} />
      </div>
    </div>
  );
}
