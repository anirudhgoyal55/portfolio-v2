# Security Policy

## Supported Versions

This is a personal portfolio template. The `main` branch is the only supported version. Forks should keep dependencies current — `npm audit` regularly.

## Reporting a Vulnerability

If you discover a security issue in this template, please **do not file a public issue**. Email the maintainer directly:

- **Email:** hello@anirudhgoel.xyz

Please include:
- A description of the vulnerability
- Steps to reproduce
- Affected version (or commit SHA)
- Your proposed mitigation, if any

You can expect an acknowledgement within 7 days. If the issue is confirmed, a fix will land in `main` and the discloser credited (with permission) in the release notes.

## Known security considerations for forkers

When you fork this template, please verify:

1. **`.env.local` is never committed.** It is gitignored by default. Re-check `git status` before any push.
2. **The contact form** uses a server action with a honeypot. For production traffic, add a real rate-limit (e.g. `@upstash/ratelimit` middleware) and consider Cloudflare Turnstile.
3. **The Spotify integration** uses a long-lived refresh token. Treat it like a password — don't paste in chats, don't commit, rotate if exposed.
4. **External images** are allowed from a small allowlist in `next.config.ts`. Adding new sources is fine; whitelisting `*` is not.
5. **Security headers** are set in `next.config.ts` via the `headers()` async function. CSP is intentionally not set by default — opt in with a CSP that fits your fork.
