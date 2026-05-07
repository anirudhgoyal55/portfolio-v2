/**
 * Schema.org JSON-LD builders.
 * These get injected via <Script type="application/ld+json"> tags.
 *
 * The Person schema cross-links every project (knowsAbout) and social account
 * (sameAs) so search engines + LLMs build a complete graph.
 */

import { siteConfig } from "../../site.config";
import { absoluteUrl } from "./utils";

const baseUrl = siteConfig.url;

type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  const sameAs = Object.values(siteConfig.social).filter(
    (v): v is string => typeof v === "string" && v.startsWith("http"),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: baseUrl,
    image: absoluteUrl("/opengraph-image", baseUrl),
    jobTitle: siteConfig.person.jobTitle,
    description: siteConfig.person.description,
    knowsAbout: siteConfig.person.knowsAbout,
    sameAs,
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.seo.defaultDescription,
    publisher: { "@id": `${baseUrl}/#person` },
    inLanguage: "en",
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
}): JsonLd {
  const url = absoluteUrl(`/writing/${opts.slug}`, baseUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: absoluteUrl(`/writing/${opts.slug}/opengraph-image`, baseUrl),
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt ?? opts.publishedAt,
    author: { "@id": `${baseUrl}/#person` },
    publisher: { "@id": `${baseUrl}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: opts.tags?.join(", "),
    inLanguage: "en",
  };
}

export function creativeWorkSchema(opts: {
  title: string;
  description: string;
  slug: string;
  year?: number;
  url?: string;
  image?: string;
  keywords?: string[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.title,
    description: opts.description,
    url: absoluteUrl(`/work/${opts.slug}`, baseUrl),
    creator: { "@id": `${baseUrl}/#person` },
    dateCreated: opts.year ? String(opts.year) : undefined,
    image: opts.image
      ? absoluteUrl(opts.image, baseUrl)
      : absoluteUrl(`/work/${opts.slug}/opengraph-image`, baseUrl),
    sameAs: opts.url,
    keywords: opts.keywords?.join(", "),
  };
}

export function breadcrumbSchema(
  crumbs: Array<{ name: string; href: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href, baseUrl),
    })),
  };
}
