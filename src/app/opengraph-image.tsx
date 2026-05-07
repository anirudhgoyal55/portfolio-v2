import { ImageResponse } from "next/og";
import { siteConfig } from "../../site.config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(26,24,21,0.55)",
          }}
        >
          {siteConfig.shortName.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.05,
              fontStyle: "italic",
              letterSpacing: -0.5,
              maxWidth: 920,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "rgba(26,24,21,0.7)",
              marginTop: 18,
              maxWidth: 900,
            }}
          >
            {siteConfig.role}.
          </div>
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
          <div style={{ display: "flex" }}>{siteConfig.domain}</div>
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
