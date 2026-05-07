import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSingle } from "@/lib/content";
import { MDXContent } from "@/components/content/MDXContent";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and the dev environment I work in.",
};

export default function UsesPage() {
  const single = getSingle("uses");
  if (!single) notFound();
  const { frontmatter, body } = single;

  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <p className="eyebrow">uses</p>
      <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1]">
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
