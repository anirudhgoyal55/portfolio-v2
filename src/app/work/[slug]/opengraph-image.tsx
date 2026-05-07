import { ImageResponse } from "next/og";
import { siteConfig } from "../../../../site.config";
import { getAllWork, getWork } from "@/lib/content";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = getWork(slug);
  const fm = w?.frontmatter;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBFBFA",
          color: "#1A1815",
          fontFamily: "Georgia, serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(26,24,21,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>
            {siteConfig.shortName.toUpperCase()} · WORK
          </div>
          {fm?.year && <div style={{ display: "flex" }}>{fm.year}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              lineHeight: 1.05,
              fontStyle: "italic",
              letterSpacing: -0.5,
              maxWidth: 1040,
            }}
          >
            {fm?.title ?? "Untitled"}
          </div>
          {fm?.description && (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "rgba(26,24,21,0.7)",
                marginTop: 22,
                maxWidth: 1040,
                lineHeight: 1.3,
              }}
            >
              {fm.description}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(26,24,21,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>
            {fm?.stack?.slice(0, 3).join("  ·  ") ?? siteConfig.domain}
          </div>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: siteConfig.accent,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
