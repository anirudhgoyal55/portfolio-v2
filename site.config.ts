/**
 * Site Configuration — single source of truth
 *
 * Forking this template? Edit only this file and the `/content` directory.
 * Everything else is template machinery you should not need to touch.
 */

export type NavItem = { href: string; label: string };

export const siteConfig = {
  /* ---------- identity ---------- */
  name: "Anirudh Goel",
  shortName: "Anirudh",
  role: "Web Developer & Independent Builder",
  tagline:
    "Independent web developer. Ships fast, opinionated work across IPL dashboards, cinematic tributes, and editorial pitches.",
  bio: "Builds personal projects, editorial pitch sites, and live data dashboards. Open to collaborations and freelance work.",

  /* ---------- domain (canonical URL — change for your deploy) ---------- */
  url: "https://v2.anirudhgoel.xyz",
  domain: "v2.anirudhgoel.xyz",

  /* ---------- contact ---------- */
  email: "hello@anirudhgoel.xyz",

  /* ---------- social (null = hidden) ---------- */
  social: {
    linkedin: "https://www.linkedin.com/in/anirudhgoel1/",
    instagram: "https://instagram.com/anirudh.nocode",
    github: "https://github.com/anirudhgoel1",
    twitter: null as string | null,
    bluesky: null as string | null,
    threads: null as string | null,
    youtube: null as string | null,
    readcv: null as string | null,
    behance: null as string | null,
    dribbble: null as string | null,
    letterboxd: null as string | null,
    email: "hello@anirudhgoel.xyz",
  },

  /* ---------- theme ---------- */
  // Single accent color used throughout. Swap freely.
  accent: "#E07A3C", // warm orange — pumpkin
  accentName: "ember",

  /* ---------- navigation ---------- */
  nav: [
    { href: "/work", label: "Work" },
    { href: "/experience", label: "Experience" },
    { href: "/writing", label: "Writing" },
    { href: "/now", label: "Now" },
    { href: "/listening", label: "Listening" },
    { href: "/uses", label: "Uses" },
    { href: "/contact", label: "Contact" },
  ] satisfies NavItem[],

  /* ---------- featured project slugs (homepage) ---------- */
  featuredWork: ["pavilion", "sportsclaus", "royale", "buildcon-studio"],

  /* ---------- integrations (env vars enable each) ---------- */
  integrations: {
    spotify: {
      // Requires: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
      enabled: true,
      revalidateSeconds: 60,
    },
    github: {
      enabled: true,
      username: "anirudhgoel1",
      revalidateSeconds: 600,
    },
    letterboxd: {
      // Set to true and add username when ready
      enabled: false,
      username: null as string | null,
      revalidateSeconds: 3600,
    },
  },

  /* ---------- SEO defaults ---------- */
  seo: {
    defaultTitle: "Anirudh Goel — Web Developer",
    titleTemplate: "%s · Anirudh Goel",
    defaultDescription:
      "Independent web developer. Personal projects, editorial pitch sites, and live data dashboards.",
    keywords: [
      "Anirudh Goel",
      "web developer",
      "no-code builder",
      "Next.js portfolio",
      "freelance developer India",
      "Pavilion IPL",
      "SportsClaus",
      "Royale tribute",
      "BuildCon Studio",
      "Goel Studio",
      "vibe coding",
    ],
    locale: "en_US",
  },

  /* ---------- schema.org Person ---------- */
  person: {
    jobTitle: "Web Developer",
    description:
      "Independent web developer shipping personal projects and editorial sites. Builds in Next.js, React, and Tailwind. Past work includes Pavilion (IPL dashboard, ~70K Instagram views), SportsClaus, Royale, and the Goel Studio editorial system.",
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "No-Code Development",
      "User Interface Design",
      "Editorial Web Design",
      "Cricket Data Visualization",
      "Static Site Generation",
      "SEO",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
