import { ImageResponse } from "next/og";
import { siteConfig } from "../../site.config";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 22,
          fontWeight: 600,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          borderRadius: 4,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
