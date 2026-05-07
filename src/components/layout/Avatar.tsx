/**
 * Circular avatar with graceful fallback.
 * Drops `public/avatar.jpg` (or .png) and the image renders.
 * Without it, the brand monogram renders at the same size.
 */

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { MonogramMark } from "./MonogramMark";

const AVATAR_CANDIDATES = ["avatar.jpg", "avatar.png", "avatar.webp"];

function findAvatar(): string | null {
  for (const file of AVATAR_CANDIDATES) {
    const full = path.join(process.cwd(), "public", file);
    if (fs.existsSync(full)) return `/${file}`;
  }
  return null;
}

export function Avatar({
  size = 96,
  alt = "Avatar",
  className = "",
}: {
  size?: number;
  alt?: string;
  className?: string;
}) {
  const src = findAvatar();
  if (!src) {
    return <MonogramMark size={size} className={className} />;
  }
  return (
    <span
      className={`inline-block rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-cover"
        priority
      />
    </span>
  );
}
