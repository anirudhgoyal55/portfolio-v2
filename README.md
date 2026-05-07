# Minimal Folio · by Anirudh Goel

A modern, responsive personal portfolio with live Spotify now-playing, GitHub contribution heatmap, MDX writing, dynamic OG images, and editorial typography. Built with Next.js 16, React 19, Tailwind CSS v4. MIT licensed.

**Live:** [v2.anirudhgoel.xyz](https://v2.anirudhgoel.xyz)

![Minimal Folio Preview](./public/meta/hero.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fanirudhgoel1%2Fminimal-folio&project-name=portfolio&repository-name=portfolio&env=NEXT_PUBLIC_SITE_URL,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID,RESEND_API_KEY,CONTACT_EMAIL_TO&envDescription=All%20env%20vars%20are%20optional.%20Each%20integration%20gracefully%20disables%20when%20its%20vars%20are%20missing.&envLink=https%3A%2F%2Fgithub.com%2Fanirudhgoel1%2Fminimal-folio%2Fblob%2Fmain%2F.env.example) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/anirudhgoel1/minimal-folio)

Click a button. Authorize. Add env vars in the dashboard. Live in ninety seconds.

## Features

**Visible:**

- Live Spotify integration: now-playing, last-played fallback, top tracks and top artists from the last four weeks
- GitHub contribution heatmap, recent commits, repo and star count
- Letterboxd integration for recently watched films (optional)
- MDX content for work case studies, writing posts with Shiki syntax highlighting, an experience timeline, plus standard `/now` and `/uses` pages
- Cmd+K command palette for navigation, theme switching, copying email, jumping to social profiles
- Cursor halo with spring damping (off on touch and reduced-motion)
- Page transitions, reading-progress bar on long posts, animated visitor counter
- Dark, light, and system theme with no flash on load
- Editorial typography: Fraunces variable, Cinzel for the brand mark, Geist Mono for technical bits

**Under the hood:**

- Per-page Open Graph images, generated dynamically via `next/og`
- Full JSON-LD schema (Person, WebSite, Article, CreativeWork, BreadcrumbList)
- `llms.txt`, `llms-full.txt`, `ai.txt` for AI assistant discoverability
- Three feed formats: RSS, JSON Feed, Atom
- Sitemap, robots, manifest, security.txt, humans.txt
- Visitor counter wired to Upstash Redis (free tier, opt-in)
- Keyboard shortcuts: press `?` to see them, `T` to toggle theme, `G` then a letter to jump pages
- Husky and lint-staged pre-commit hooks running ESLint and Prettier
- GitHub Actions CI on every push and PR
- WCAG 2.2 awareness: focus rings, scroll padding, reduced motion, forced colors, print stylesheet
- Vercel Speed Insights integration for real INP, LCP, CLS

Statically prerendered wherever possible. Lighthouse-friendly out of the box.

## Prerequisites

- Node.js 22 or newer
- A Spotify Premium account (only if you want the music integration)
- A Telegram account (only if you want push notifications on contact form submissions)

## Environment variables

All optional. Each integration enables itself when its env vars are present and renders nothing if not. Copy `.env.example` to `.env.local` and fill in only what you want.

```env
# Spotify (live now-playing + top tracks/artists)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Telegram bot (instant phone push on contact form submit)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Resend (contact form email delivery, alternative or addition)
RESEND_API_KEY=
CONTACT_EMAIL_TO=

# Upstash Redis (visitor counter)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Public site URL (used for canonical, sitemap, OG)
NEXT_PUBLIC_SITE_URL=
```

## Setting up Telegram

The fastest contact-form path. Free, no infra, instant push notifications to your phone.

1. Open Telegram, message `@BotFather`, run `/newbot`, follow the prompts. Copy the bot token.
2. Message your new bot once. Anything works.
3. Visit `https://api.telegram.org/bot<TOKEN>/getUpdates` in your browser. Find `chat.id` in the JSON. Copy it.
4. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`.

That's it. Submit the contact form on your dev server. Your phone buzzes.

## Setting up Spotify

Heads up: as of February 2026, Spotify requires the developer account on the app side to be Premium. One-time setup:

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
2. Add redirect URI `http://127.0.0.1:8765/callback` (use the loopback IP, not `localhost`).
3. Set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env.local`.
4. Run `node scripts/spotify-token.mjs`. Authorize in the browser. Paste the printed refresh token back into `.env.local` as `SPOTIFY_REFRESH_TOKEN`.

## Getting started

```bash
git clone https://github.com/anirudhgoel1/minimal-folio.git my-site
cd my-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see the demo content.

## Configuration

Two surfaces to edit. You should not need to touch anything in `src/`.

**`site.config.ts`** is the only config file. Identity, social handles, accent color, navigation, integration toggles, SEO defaults, schema.org Person details. Open it, find your name, replace.

**`/content/`** is your content folder.

```
content/
├── work/                # project case studies
├── writing/             # blog posts
├── experience/          # job/role timeline
├── now.mdx              # what you're working on now
└── uses.mdx             # hardware and software list
```

## Adding content

### A blog post

Create `content/writing/<slug>.mdx`:

```mdx
---
title: "Hello, world."
description: "Notes on something I learned this week."
publishedAt: "2026-05-07"
tags: ["meta", "personal"]
---

Body content in MDX. Headings, links, lists, code blocks all work.
Tag a post with `"music"` and it surfaces on `/listening` as a music essay.
```

### A project case study

Create `content/work/<slug>.mdx`:

```mdx
---
title: "Project name"
description: "One-line summary."
year: 2026
role: "Solo build"
stack: ["Next.js", "Tailwind", "Cloudflare"]
url: "https://your-live-link"
github: "https://github.com/you/repo"
status: "live"
featured: true
order: 1
---

Body content. The slug becomes the URL. JSON-LD CreativeWork is auto-generated.
The Open Graph image is auto-generated. Sitemap auto-includes it.
```

### A role on the timeline

Create `content/experience/<slug>.mdx`:

```mdx
---
company: "Company Name"
role: "Senior Engineer"
startDate: "2024-01"
endDate: "present"
location: "Remote"
url: "https://company.com"
order: 1
---

What you did, what you owned, what shipped.
```

## Avatar

Drop a square JPG, PNG, or WebP at `public/avatar.jpg`. The home page picks it up automatically. Without it, the brand monogram (italic 'a' in your accent color) renders at the same size.

## Stack

Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, MDX (`next-mdx-remote/rsc` plus Shiki), Motion 12, Lenis, next-themes, cmdk, Radix UI (Tooltip, Dialog), feed, zod, react-hook-form, react-activity-calendar.

Slim by intent. Under thirty production dependencies. No Shadcn dump, no UI kit, no hidden bloat.

## Troubleshooting

| Symptom                                   | Likely cause                               | Fix                                                                                                                           |
| ----------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Spotify shows "awaiting auth" forever     | Missing or invalid `SPOTIFY_REFRESH_TOKEN` | Re-run `node scripts/spotify-token.mjs`. The redirect URI in your Spotify dashboard must be `http://127.0.0.1:8765/callback`. |
| Contact form succeeds but no notification | Telegram or Resend not configured          | Either set Telegram env vars or Resend env vars. Both fine in parallel.                                                       |
| Visitor counter doesn't appear            | Upstash env vars missing                   | Sign up at console.upstash.com (free) or skip it.                                                                             |
| GitHub stats are blank                    | Wrong username or rate limit               | Verify `siteConfig.integrations.github.username`.                                                                             |
| Hydration warning about `user-select`     | A browser extension is mutating spans      | Not a code bug. Test in incognito to confirm.                                                                                 |
| Tailwind classes look wrong               | Stale `.next` cache                        | `rm -rf .next && npm run build`                                                                                               |

## License

MIT. See [LICENSE](./LICENSE). Use it however you want. Commercial, personal, fork-and-sell, learning. The only requirement is keeping the LICENSE file when you redistribute.

If this template is useful to you, a star is appreciated but not required. A link in your footer is appreciated even more.

## Acknowledgements

Inspired by [ramx.in](https://ramx.in), [leerob.io](https://leerob.io), [brittanychiang.com](https://brittanychiang.com), [rauno.me](https://rauno.me), [nownownow.com](https://nownownow.com), [uses.tech](https://uses.tech), and [llmstxt.org](https://llmstxt.org).

If you ship something with this, drop a link in an issue or tag me on socials.

---

Built and maintained by **Anirudh Goel** ([@anirudhgoel1](https://github.com/anirudhgoel1) on GitHub, [@anirudh.nocode](https://instagram.com/anirudh.nocode) on Instagram, [LinkedIn](https://www.linkedin.com/in/anirudhgoel1/)).
