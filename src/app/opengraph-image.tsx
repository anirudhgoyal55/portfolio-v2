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
          background: "#F4ECDF",
          color: "#14110E",
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
            color: "rgba(20,17,14,0.55)",
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
              fontSize: 96,
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
              fontSize: 36,
              color: "rgba(20,17,14,0.7)",
              marginTop: 20,
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
            color: "rgba(20,17,14,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.domain}</div>
          <div
            style={{
              display: "flex",
              width: 60,
              height: 60,
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
