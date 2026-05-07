# Minimal Folio

A minimal, opinionated personal portfolio template. Next.js 16, Tailwind v4, MDX content, live data from Spotify and GitHub. MIT licensed. Fork it, make it yours, ship.

**Live demo:** [v2.anirudhgoel.xyz](https://v2.anirudhgoel.xyz)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react)
![Tailwind v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fanirudhgoel1%2Fminimal-folio&project-name=portfolio&repository-name=portfolio&env=NEXT_PUBLIC_SITE_URL,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,RESEND_API_KEY,CONTACT_EMAIL_TO&envDescription=All%20env%20vars%20are%20optional.%20Each%20integration%20gracefully%20disables%20when%20its%20vars%20are%20missing.&envLink=https%3A%2F%2Fgithub.com%2Fanirudhgoel1%2Fminimal-folio%2Fblob%2Fmain%2F.env.example) [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/anirudhgoel1/minimal-folio)

## Why this exists

I was on a Framer template. It worked, but every portfolio I actually liked had things mine didn't. Live data. Real personality. AI-discoverability. Most open-source templates I looked at were either too heavy (full Shadcn dump, dead code, plugins for plugins) or too thin (no SEO, no integrations, no taste). This is what I wanted to find but couldn't, so I built it.

If you fork this and make it yours, that's the whole point.

## What's in it

**The visible stuff:**

- **Live Spotify** showing what's playing right now, last-played fallback when nothing is, top tracks plus top artists from the last four weeks
- **GitHub contribution heatmap**, recent commits, repo and star count
- **Letterboxd** integration for recently watched films (optional)
- **MDX content system** for work case studies, a writing section with Shiki syntax highlighting, an experience timeline, and the standard `/now` and `/uses` pages
- **Editorial typography**: Fraunces variable, Cinzel for the brand mark, Geist Mono for technical bits
- **Cmd-K palette** for nav, theme switching, copying your email, jumping to social profiles
- **Cursor halo** that follows the pointer with spring damping (off on touch and reduced-motion)
- **Smooth page transitions** plus a 2px reading-progress bar on long posts
- **Dark, light, and system theme** with no flash on load

**The stuff developers notice:**

- Per-page Open Graph images. Every project and post gets its own social card with title and description rendered into a 1200×630
- Full JSON-LD schema across the site (Person, WebSite, Article, CreativeWork, BreadcrumbList)
- `llms.txt`, `llms-full.txt`, `ai.txt` so AI assistants can find and cite your work
- Three feed formats. RSS, JSON Feed, Atom
- Sitemap, robots, manifest, security.txt, humans.txt. All the small files
- Visitor counter wired to Upstash Redis (free tier, opt-in)
- Keyboard shortcuts. Press `?` to see them, `T` to toggle theme, `G` then a letter to jump pages
- Husky and lint-staged pre-commit hooks running ESLint and Prettier
- GitHub Actions CI running lint and build on every push and PR
- WCAG 2.2 awareness. Focus rings, scroll padding, reduced motion, forced colors, print stylesheet
- @vercel/speed-insights wired in for real INP, LCP, CLS data when deployed

Statically prerendered wherever possible. Lighthouse-friendly out of the box.

## Make it yours in five minutes

```bash
# 1. clone and install
git clone https://github.com/anirudhgoel1/minimal-folio.git my-site
cd my-site
npm install
npm run dev
```

Open http://localhost:3000. You'll see the demo content.

```bash
# 2. become yourself
$EDITOR site.config.ts        # name, role, email, social, accent color
cp ~/Pictures/me.jpg public/avatar.jpg
```

`site.config.ts` is the only config file you should need to touch. Leave any social platform as `null` and it hides automatically.

```mdx
---
title: "Project name"
description: "One line description."
year: 2026
role: "Solo build"
stack: ["Next.js", "Tailwind"]
url: "https://your-live-link"
---

Body content in MDX. Headings, links, lists, code blocks all work.
```

Drop that into `content/work/<slug>.mdx`. Same frontmatter pattern for `content/writing/*.mdx` and `content/experience/*.mdx`. The site picks them up automatically. No rebuild config to touch.

When you're happy locally, hit the **Deploy with Vercel** button at the top of this README and add your env vars in the dashboard. About ninety seconds to live.

## Integrations

Each one enables itself when its env vars are present. Skip any you don't want. The components return null and the layout stays clean.

**Spotify.** Heads up, Spotify changed their developer policy in February 2026, so the developer account on the Spotify app side now needs to be Premium. One-time setup: create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard), add redirect URI `http://127.0.0.1:8765/callback` (loopback IP, not `localhost`), drop your client ID and secret in `.env.local`, run `node scripts/spotify-token.mjs`, paste the printed refresh token back in. Done.

**GitHub.** No env vars. Set `siteConfig.integrations.github.username` in `site.config.ts` and the heatmap, stats, and recent commits all wire up. Public REST, 60 requests per hour, plenty for a 1-hour-cached portfolio.

**Letterboxd.** No env vars. Set `siteConfig.integrations.letterboxd.{username, enabled}` and recent films appear on `/listening`.

**Resend.** For contact form delivery. Set `RESEND_API_KEY` and `CONTACT_EMAIL_TO`. Without these, the form's mailto fallback still works.

**Upstash Redis.** For the visitor counter. Free tier at [console.upstash.com](https://console.upstash.com). Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` and the footer counter goes live.

## Folder structure

```
minimal-folio/
├── content/                # all MDX — replace with yours
│   ├── work/               # project case studies
│   ├── writing/            # blog posts
│   ├── experience/         # job/role timeline
│   ├── now.mdx             # what you're working on now
│   └── uses.mdx            # hardware + software
├── public/                 # avatar, favicons, .well-known/
├── site.config.ts          # the file you'll edit most
├── src/                    # template machinery, mostly hands-off
└── scripts/                # Spotify OAuth helper
```

## Stack

Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4, MDX (`next-mdx-remote/rsc` plus Shiki), Motion 12, Lenis, next-themes, cmdk, feed, zod, react-hook-form.

Slim by intent. Under 25 production dependencies. No Shadcn dump, no UI kit, no hidden bloat.

## Troubleshooting

| Symptom                                                      | Likely cause                               | Fix                                                                                                                                |
| ------------------------------------------------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Spotify shows "awaiting auth" forever                        | Missing or invalid `SPOTIFY_REFRESH_TOKEN` | Re-run `node scripts/spotify-token.mjs`. Make sure the redirect URI in your Spotify dashboard is `http://127.0.0.1:8765/callback`. |
| OAuth errors with "redirect_uri: Not matching configuration" | Dashboard URI doesn't match the script     | Use `http://127.0.0.1:8765/callback` in both.                                                                                      |
| Visitor counter doesn't appear                               | Upstash env vars missing                   | Sign up at console.upstash.com (free) or just skip it. The rest works.                                                             |
| GitHub stats are blank                                       | Wrong username or rate limit               | Verify `siteConfig.integrations.github.username`.                                                                                  |
| Hydration warning about `user-select`                        | A browser extension is mutating your spans | Not a code bug. Test in incognito to confirm.                                                                                      |
| Tailwind classes look wrong                                  | Stale `.next` cache                        | `rm -rf .next && npm run build`                                                                                                    |

## License

MIT. See [LICENSE](./LICENSE). Use it however you want. Commercial, personal, fork-and-sell, learning. The only requirement is keeping the LICENSE file when you redistribute.

If this template is useful to you, a star is appreciated but not required. A link in your footer is appreciated even more.

## Acknowledgements

- [ramx.in](https://ramx.in). The kick that started this rebuild.
- [leerob.io](https://leerob.io). For showing what live portfolio data could look like.
- [brittanychiang.com](https://brittanychiang.com). Editorial restraint at scale.
- [rauno.me](https://rauno.me). Interaction design at the millimeter.
- [nownownow.com](https://nownownow.com) and [uses.tech](https://uses.tech). The page conventions.
- [llmstxt.org](https://llmstxt.org). Discoverability for AI assistants.

If you ship something with this, I'd love to see it. Drop a link in an issue or tag me on socials.
