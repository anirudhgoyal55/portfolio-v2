import { Feed } from "feed";
import { siteConfig } from "../../../site.config";
import { getAllWriting } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const base = siteConfig.url;
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.seo.defaultDescription,
    id: base,
    link: base,
    language: "en",
    favicon: `${base}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    author: { name: siteConfig.name, email: siteConfig.email, link: base },
  });
  for (const w of getAllWriting()) {
    feed.addItem({
      title: w.frontmatter.title,
      id: `${base}/writing/${w.slug}`,
      link: `${base}/writing/${w.slug}`,
      description: w.frontmatter.description,
      date: new Date(w.frontmatter.publishedAt),
    });
  }
  return new Response(feed.json1(), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
