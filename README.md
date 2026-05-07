# Portfolio V2

A template-grade personal portfolio. Next.js 16, Tailwind v4, MDX content, live data from Spotify / GitHub / Letterboxd, and SEO + AI-discovery as architecture, not afterthought.

Originally built as **[Anirudh Goel's](https://anirudhgoel.xyz) personal site**. Open-sourced because the gaps in other portfolio templates were avoidable and worth fixing once, properly.

## Features

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript 5**
- **Tailwind v4** via PostCSS (no config file, `@theme` tokens in CSS)
- **MDX content** (work + writing) with Shiki syntax highlighting and anchor links
- **Live integrations**, all optional, all gracefully degrading
  - Spotify now-playing + top tracks
  - GitHub recent commits (no auth needed for public profiles)
  - Letterboxd recently watched (RSS-based)
- **SEO architecture** — every page ships with proper `<head>`, JSON-LD, OG image, and structured data
  - Per-page metadata API
  - Schema.org `Person`, `WebSite`, `Article`, `CreativeWork`, `BreadcrumbList`
  - Dynamic `opengraph-image.tsx` per route
  - `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- **AI discovery** — `llms.txt` + `ai.txt` so the work gets cited by language models
- **Multi-format feeds** — RSS (`/feed.xml`), JSON Feed (`/feed.json`), Atom (`/atom.xml`)
- **Editorial typography** — Fraunces (variable axis), Cinzel for wordmarks, Geist Mono for technical labels
- **Cmd-K command palette** (cmdk) for navigation, theme switching, copy email
- **Dark / light / system theme** via `next-themes` with no FOUC
- **Lenis smooth scroll**, gentle Motion reveals — restrained, not decorative
- **Accessibility-aware** — skip-to-content, focus rings, `prefers-reduced-motion`, `forced-colors` support
- **Print stylesheet** so the portfolio prints cleanly (URLs appended after links)
- **Contact form** with React Hook Form + Zod, server actions, optional Resend delivery, honeypot anti-spam
- **Security headers** + `.well-known/security.txt`

All built to be **statically prerendered** wherever possible. Lighthouse-friendly out of the box.

## Demo

Live at [v2.anirudhgoel.xyz](https://v2.anirudhgoel.xyz) (the maintainer's personal site).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| MDX | `next-mdx-remote/rsc` + `gray-matter` + `remark-gfm` + `rehype-slug` + `rehype-autolink-headings` + `@shikijs/rehype` |
| Motion | `motion` (Framer Motion v12) + `lenis` |
| Theme | `next-themes` |
| Form | `react-hook-form` + `zod` |
| Toasts | `sonner` |
| Command palette | `cmdk` |
| Feeds | `feed` |
| RSS parsing (Letterboxd) | `rss-parser` |
| Email (contact form) | Resend (optional) |

## Quick start (forking this template)

```bash
# 1. clone and install
git clone https://github.com/your/portfolio-v2.git my-site
cd my-site
npm install

# 2. configure your identity
$EDITOR site.config.ts            # name, role, social, accent, integrations

# 3. replace content
$EDITOR content/now.mdx
$EDITOR content/uses.mdx
$EDITOR content/writing/*.mdx     # delete the example posts, add yours
$EDITOR content/work/*.mdx        # delete the example work, add yours

# 4. set env vars (all optional)
cp .env.example .env.local
$EDITOR .env.local

# 5. run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

**Everything user-editable lives in two places:**

1. `site.config.ts` — identity, social links, accent color, navigation, integration toggles, SEO defaults, schema.org Person details
2. `content/` — all MDX content (work case studies, writing posts, `/now`, `/uses`)

You should not need to touch anything in `src/` to deploy your own version.

### Integrations

Each integration enables itself when its env vars are present, and renders nothing if not. No config gymnastics.

#### Spotify

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Add redirect URI: `http://localhost:8765/callback`
3. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to `.env.local`
4. Run `node scripts/spotify-token.mjs` and follow the flow
5. Paste the printed refresh token into `.env.local` as `SPOTIFY_REFRESH_TOKEN`

#### GitHub

No env vars needed. Edit `siteConfig.integrations.github.username` in `site.config.ts`.

#### Letterboxd

No env vars needed. Set `siteConfig.integrations.letterboxd.enabled = true` and `username` in `site.config.ts`.

#### Resend (contact form delivery)

```env
RESEND_API_KEY=
CONTACT_EMAIL_TO=you@example.com
```

If unset, the contact form shows the user a friendly error and the `mailto:` fallback in the page header still works.

## File structure

```
portfolio-v2/
├── content/
│   ├── work/                    # project case studies (MDX)
│   ├── writing/                 # blog posts (MDX)
│   ├── now.mdx                  # /now page content
│   └── uses.mdx                 # /uses page content
├── public/
│   ├── humans.txt
│   └── .well-known/security.txt
├── scripts/
│   └── spotify-token.mjs        # one-time OAuth helper
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout, fonts, metadata, JSON-LD
│   │   ├── page.tsx             # /
│   │   ├── work/[slug]/         # /work/* case studies
│   │   ├── writing/[slug]/      # /writing/* blog posts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   ├── opengraph-image.tsx  # default OG image
│   │   ├── icon.tsx             # programmatic favicon
│   │   ├── llms.txt/route.ts    # AI discovery
│   │   ├── ai.txt/route.ts      # AI policy
│   │   ├── feed.xml/route.ts    # RSS
│   │   ├── feed.json/route.ts   # JSON Feed
│   │   └── atom.xml/route.ts    # Atom
│   ├── components/
│   │   ├── command/             # Cmd+K palette
│   │   ├── content/             # MDX renderer
│   │   ├── integrations/        # Spotify, GitHub, Letterboxd
│   │   ├── layout/              # Header, Footer, ThemeToggle, Skip-to-content
│   │   ├── motion/              # Lenis, Reveal
│   │   ├── work/                # ProjectCard
│   │   └── writing/             # PostCard
│   ├── lib/
│   │   ├── content.ts           # MDX loader (work + writing)
│   │   ├── seo.ts               # JSON-LD builders
│   │   ├── spotify.ts
│   │   ├── github.ts
│   │   ├── letterboxd.ts
│   │   ├── mdx.tsx              # MDX components (link, img)
│   │   └── utils.ts
│   └── app/globals.css          # Tailwind v4 + design tokens
├── site.config.ts               # the file you'll edit most
├── next.config.ts
└── package.json
```

## Deploy

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Set env vars in the Vercel dashboard (or via `vercel env`).

### Other hosts

Vercel-specific features used: `next/og` for image generation, edge image optimization. All also work on Netlify, Cloudflare Pages (with OpenNext), and self-hosted Node.

## Performance + SEO checklist

- [x] All key pages statically prerendered
- [x] Critical CSS inlined via Next.js
- [x] Self-hosted fonts (no Google Fonts CDN call at runtime)
- [x] AVIF + WebP via next/image where used
- [x] `<title>`, `<meta description>`, OG, Twitter Card on every page
- [x] Schema.org Person + Article + CreativeWork + BreadcrumbList JSON-LD
- [x] `sitemap.xml`, `robots.txt`, `humans.txt`, `security.txt`, `manifest.webmanifest`
- [x] `llms.txt` + `ai.txt` for AI assistant discovery
- [x] RSS, JSON Feed, Atom for blog
- [x] Reduced-motion respected (Lenis disabled, Motion variants skipped)
- [x] WCAG focus rings, skip-to-content, semantic HTML

## License

MIT. See [LICENSE](./LICENSE).

## Acknowledgements

Inspired by [ramx.in](https://ramx.in) and the [`sleek-portfolio`](https://github.com/ramxcodes/sleek-portfolio) template that started this rebuild, plus [leerob.io](https://leerob.io), [brittanychiang.com](https://brittanychiang.com), [rauno.me](https://rauno.me), [nownownow.com](https://nownownow.com), [uses.tech](https://uses.tech), and [llmstxt.org](https://llmstxt.org).
