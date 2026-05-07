# Contributing

Thanks for considering a contribution. This is a personal portfolio template — most "contributions" will be forks where you swap in your own content and identity. The notes below cover both that workflow and pull requests against the upstream template.

## Forking for your own portfolio

This is the standard path. You should not need to touch anything in `src/`.

### 1. Identity (`site.config.ts`)

Single source of truth. Edit:

- `name`, `shortName`, `role`, `tagline`, `bio`
- `url`, `domain`, `email`
- `social.*` — fill the platforms you use, leave the rest as `null`
- `accent` — any hex color works (the default is warm orange `#E07A3C`)
- `nav` — order/labels of header navigation
- `featuredWork` — slugs of projects to feature on the home page
- `integrations.*` — toggle each integration on/off
- `seo.*`, `person.*` — defaults for `<head>` and JSON-LD

### 2. Content (`/content` folder)

Replace these MDX files with your own:

```
content/
├── work/                 ← your project case studies
├── writing/              ← your blog posts
├── now.mdx               ← what you're working on now
└── uses.mdx              ← hardware + software list
```

Frontmatter conventions live in [`src/lib/content.ts`](./src/lib/content.ts) — strict types so the build catches missing fields.

#### A new project case study

Create `content/work/<slug>.mdx`:

```mdx
---
title: "Pavilion"
description: "An IPL fan dashboard. Live scores, momentum, team intel."
year: 2026
role: "Solo build"
stack: ["FastAPI", "Vanilla JS", "Cloudflare Workers"]
url: "https://pavilion.example.com"
github: "https://github.com/you/pavilion"
status: "live"
featured: true
order: 1
---

Body content in MDX. Headings, links, lists, code blocks — Shiki-highlighted.
```

The slug becomes the URL: `/work/pavilion`. JSON-LD CreativeWork is auto-generated. The OG image is auto-generated. Sitemap auto-includes it.

#### A new blog post

Create `content/writing/<slug>.mdx`:

```mdx
---
title: "Hello, again."
description: "Notes on rebuilding a personal site."
publishedAt: "2026-05-07"
tags: ["meta", "personal"]
---

Body content in MDX.
```

If you tag a post `"music"` it also surfaces on `/listening` under "music essays."

### 3. Avatar

Drop a square JPG/PNG/WebP at `public/avatar.jpg` (or .png, or .webp). The home page picks it up. Without it, the brand monogram (italic 'a' in your accent color) renders at the same size.

### 4. Integrations (all optional)

Each integration enables itself when its env vars are present, and renders nothing if not.

Copy `.env.example` to `.env.local` and fill in what you want:

| Integration                                            | Env vars                                                              | Setup                                                                                                                                            |
| ------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Spotify (now playing, last played, top tracks/artists) | `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` | See README. **Requires a Spotify Premium account on the developer (Feb 2026 policy).** Use `http://127.0.0.1:8765/callback` as the redirect URI. |
| GitHub (recent commits, repo + star count)             | none — public REST                                                    | Set `siteConfig.integrations.github.username`                                                                                                    |
| Letterboxd (recently watched)                          | none — public RSS                                                     | Set `siteConfig.integrations.letterboxd.{enabled,username}`                                                                                      |
| Resend (contact form delivery)                         | `RESEND_API_KEY`, `CONTACT_EMAIL_TO`                                  | Free tier at resend.com                                                                                                                          |
| Visitor counter                                        | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                  | Free tier at console.upstash.com                                                                                                                 |

### 5. Deploy

Either hit the **Deploy with Vercel** button in the README, or:

```bash
npm i -g vercel
vercel             # first deploy
vercel --prod      # promote to prod
```

Add env vars in the Vercel dashboard (or `vercel env add`). DNS notes for custom domains are in the README's Deploy section.

## Pull requests against this template

Bug fixes and small improvements are welcome. Larger features should open an issue first so we can discuss scope.

### Local setup

```bash
git clone https://github.com/anirudhgoel1/minimal-folio.git
cd minimal-folio
npm install
npm run dev
```

Open http://localhost:3000.

### Conventions

- TypeScript strict mode is on. Don't relax it.
- Tailwind classes for styling. CSS Modules only when Tailwind genuinely doesn't fit.
- Inline SVG over icon dependencies. Adds zero runtime cost.
- Server Components by default. Add `"use client"` only when needed (interactivity, hooks, browser APIs).
- All integrations gracefully no-op without env vars. Never throw on missing config.
- New content frontmatter fields require an update to `src/lib/content.ts` types.

### Before opening a PR

```bash
npm run lint    # ESLint
npm run build   # Type check + production build
```

Both must pass.

### Commit style

Conventional commits, lowercase subject. Keep body wrapped at ~72 chars. Co-author lines welcome.

```
feat: add visitor counter via upstash REST

Edge route /api/visit increments + returns count. Client component
dedupes per-day via localStorage. Renders nothing without env vars.
```

### Reporting issues

Use [GitHub Issues](https://github.com/anirudhgoel1/minimal-folio/issues). Include:

- Browser + OS (where applicable)
- Reproduction steps
- Console errors / build output
- What you expected vs what happened

For security disclosures see [SECURITY.md](./SECURITY.md). Please email rather than file a public issue.

## License

MIT. By contributing you agree your contribution is licensed under the same terms.
