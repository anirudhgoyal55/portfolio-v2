import Link from "next/link";
import { siteConfig } from "../../../site.config";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    siteConfig.social.linkedin && {
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
    },
    siteConfig.social.instagram && {
      href: siteConfig.social.instagram,
      label: "Instagram",
    },
    siteConfig.social.github && {
      href: siteConfig.social.github,
      label: "GitHub",
    },
    siteConfig.social.letterboxd && {
      href: siteConfig.social.letterboxd,
      label: "Letterboxd",
    },
  ].filter((x): x is { href: string; label: string } => Boolean(x));

  return (
    <footer className="hairline mt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow">colophon</p>
            <p className="mt-3 font-serif text-[15px] leading-relaxed max-w-md">
              Built with Next.js 16 and Tailwind v4. Type set in Fraunces and
              Geist Mono. Deployed on Vercel. Source on{" "}
              <a
                href={siteConfig.social.github ?? "#"}
                className="link-underline link-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">elsewhere</p>
            <ul className="mt-3 space-y-1.5">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline text-sm"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">subscribe</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link href="/feed.xml" className="link-underline text-sm">
                  RSS
                </Link>
              </li>
              <li>
                <Link href="/feed.json" className="link-underline text-sm">
                  JSON Feed
                </Link>
              </li>
              <li>
                <Link href="/atom.xml" className="link-underline text-sm">
                  Atom
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">site</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link href="/sitemap.xml" className="link-underline text-sm">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="link-underline text-sm">
                  llms.txt
                </Link>
              </li>
              <li>
                <Link
                  href="/.well-known/security.txt"
                  className="link-underline text-sm"
                >
                  security.txt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-baseline justify-between gap-3 hairline pt-6">
          <p className="font-mono text-[11px] lowercase opacity-60">
            © {year} {siteConfig.name}. all rights reserved.
          </p>
          <p className="font-mono text-[11px] lowercase opacity-60">
            press{" "}
            <kbd className="px-1.5 py-0.5 border rounded-sm">⌘</kbd>{" "}
            <kbd className="px-1.5 py-0.5 border rounded-sm">K</kbd> to navigate
          </p>
        </div>
      </div>
    </footer>
  );
}
