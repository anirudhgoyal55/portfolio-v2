import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Allow remote images from common integration providers
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify album art
      { protocol: "https", hostname: "mosaic.scdn.co" }, // Spotify playlist mosaics
      { protocol: "https", hostname: "lineup-images.scdn.co" }, // Spotify lineup
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
      { protocol: "https", hostname: "raw.githubusercontent.com" }, // GitHub raw
      { protocol: "https", hostname: "a.ltrbxd.com" }, // Letterboxd posters
      { protocol: "https", hostname: "image.tmdb.org" }, // TMDB posters
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Slightly stricter security headers (Vercel + most hosts pass through)
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];
    return [{ source: "/(.*)", headers: securityHeaders }];
  },

  // Surface compile errors loudly, not silently
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
