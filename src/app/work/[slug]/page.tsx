import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { getAllWork, getWork } from "@/lib/content";
import { MDXContent } from "@/components/content/MDXContent";
import { creativeWorkSchema, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  const fm = w.frontmatter;
  return {
    title: fm.title,
    description: fm.description,
    openGraph: {
      title: fm.title,
      description: fm.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
    },
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const fm = w.frontmatter;
  const ld = creativeWorkSchema({
    title: fm.title,
    description: fm.description,
    slug,
    year: fm.year,
    url: fm.url,
    keywords: fm.stack,
  });
  const crumbs = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: fm.title, href: `/work/${slug}` },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28">
      <Script
        id={`ld-work-${slug}`}
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

      <Reveal>
        <div className="flex items-center gap-4">
          <Link href="/work" className="eyebrow opacity-70 hover:opacity-100">
            ← work
          </Link>
          <span className="eyebrow opacity-50">{fm.year}</span>
          {fm.status && (
            <span className="eyebrow opacity-50">· {fm.status}</span>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05} as="header">
        <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.01em]">
          {fm.title}
        </h1>
        <p className="mt-4 text-xl opacity-80 max-w-2xl">{fm.description}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-10 hairline pt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6">
          <div>
            <dt className="eyebrow">role</dt>
            <dd className="mt-1 text-sm">{fm.role}</dd>
          </div>
          <div>
            <dt className="eyebrow">year</dt>
            <dd className="mt-1 text-sm">{fm.year}</dd>
          </div>
          {fm.stack?.length ? (
            <div className="col-span-2">
              <dt className="eyebrow">stack</dt>
              <dd className="mt-1 text-sm">{fm.stack.join(", ")}</dd>
            </div>
          ) : null}
          {fm.url && (
            <div className="col-span-2 sm:col-span-4">
              <dt className="eyebrow">live</dt>
              <dd className="mt-1 text-sm">
                <a
                  href={fm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline link-accent"
                >
                  {fm.url.replace(/^https?:\/\//, "")} ↗
                </a>
              </dd>
            </div>
          )}
          {fm.github && (
            <div className="col-span-2 sm:col-span-4">
              <dt className="eyebrow">source</dt>
              <dd className="mt-1 text-sm">
                <a
                  href={fm.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {fm.github.replace(/^https?:\/\//, "")} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </Reveal>

      <div className="prose mt-14">
        <MDXContent source={w.body} />
      </div>

      <nav className="mt-20 hairline pt-8 flex items-center justify-between">
        <Link href="/work" className="link-underline text-sm opacity-80">
          ← All work
        </Link>
        <Link
          href="/contact"
          className="link-underline link-accent text-sm font-medium"
        >
          Discuss a project →
        </Link>
      </nav>
    </article>
  );
}
