import { ImageResponse } from "next/og";
import { siteConfig } from "../../site.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: siteConfig.accent,
          color: "#F4ECDF",
          fontSize: 110,
          fontWeight: 500,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
        }}
      >
        a
      </div>
    ),
    size,
  );
}
