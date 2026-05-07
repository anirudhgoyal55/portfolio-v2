import { Feed } from "feed";
import { siteConfig } from "../../../site.config";
import { getAllWriting } from "@/lib/content";

export const dynamic = "force-static";

function buildFeed(): Feed {
  const base = siteConfig.url;
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.seo.defaultDescription,
    id: base,
    link: base,
    language: "en",
    image: `${base}/opengraph-image`,
    favicon: `${base}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: {
      json: `${base}/feed.json`,
      atom: `${base}/atom.xml`,
      rss: `${base}/feed.xml`,
    },
    author: {
      name: siteConfig.name,
      email: siteConfig.email,
      link: base,
    },
  });

  for (const w of getAllWriting()) {
    feed.addItem({
      title: w.frontmatter.title,
      id: `${base}/writing/${w.slug}`,
      link: `${base}/writing/${w.slug}`,
      description: w.frontmatter.description,
      content: w.frontmatter.description,
      author: [{ name: siteConfig.name, link: base }],
      date: new Date(w.frontmatter.publishedAt),
      category: (w.frontmatter.tags ?? []).map((t) => ({ name: t })),
    });
  }
  return feed;
}

export async function GET() {
  return new Response(buildFeed().rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
