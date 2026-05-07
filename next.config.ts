import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Static export for Cloudflare Pages deploy
  output: "export",

  images: {
    unoptimized: true, // required by static export
    remotePatterns: [
      { protocol: "https", hostname: "i.scdn.co" }, // Spotify album art
      { protocol: "https", hostname: "mosaic.scdn.co" },
      { protocol: "https", hostname: "lineup-images.scdn.co" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "a.ltrbxd.com" },
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },

  // Surface compile errors loudly
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
