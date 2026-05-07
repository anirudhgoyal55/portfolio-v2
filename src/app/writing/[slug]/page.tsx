import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getAllWriting, getWriting } from "@/lib/content";
import { MDXContent } from "@/components/content/MDXContent";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllWriting().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getWriting(slug);
  if (!p) return {};
  const fm = p.frontmatter;
  return {
    title: fm.title,
    description: fm.description,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      tags: fm.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
    alternates: { canonical: `/writing/${slug}` },
    keywords: fm.tags,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = getWriting(slug);
  if (!p) notFound();
  const fm = p.frontmatter;

  const ld = articleSchema({
    title: fm.title,
    description: fm.description,
    slug,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    tags: fm.tags,
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Writing", href: "/writing" },
    { name: fm.title, href: `/writing/${slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28">
      <Script
        id={`ld-post-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Script
        id={`ld-crumbs-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <Link href="/writing" className="eyebrow opacity-70 hover:opacity-100">
        ← writing
      </Link>

      <header className="mt-4">
        <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.01em]">
          {fm.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm">
          <time dateTime={fm.publishedAt} className="font-mono text-[12px] opacity-60">
            {formatDate(fm.publishedAt)}
          </time>
          <span className="opacity-30">·</span>
          <span className="font-mono text-[12px] opacity-60">
            {p.readingTimeMinutes} min read
          </span>
          {fm.tags?.length ? (
            <>
              <span className="opacity-30">·</span>
              <span className="font-mono text-[12px] opacity-60">
                {fm.tags.join(" · ")}
              </span>
            </>
          ) : null}
        </div>
      </header>

      <div className="prose mt-12">
        <MDXContent source={p.body} />
      </div>

      <nav className="mt-20 hairline pt-8 flex items-center justify-between">
        <Link href="/writing" className="link-underline text-sm opacity-80">
          ← All posts
        </Link>
        <Link href="/feed.xml" className="link-underline text-sm opacity-80">
          RSS →
        </Link>
      </nav>
    </article>
  );
}
