import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { mdxComponents } from "@/lib/mdx";

export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "prepend",
                properties: { className: ["anchor-link"], "aria-label": "Anchor" },
                content: { type: "text", value: "#" },
              },
            ],
            [
              rehypeShiki,
              {
                themes: { light: "github-light", dark: "github-dark" },
              },
            ],
          ],
        },
      }}
    />
  );
}
