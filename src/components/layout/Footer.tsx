import Link from "next/link";
import { siteConfig } from "../../../site.config";
import { VisitorCounter } from "./VisitorCounter";
import { SocialIcon, type SocialPlatform } from "./SocialIcon";
import { Tooltip } from "@/components/ui/Tooltip";

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  github: "GitHub",
  twitter: "X",
  bluesky: "Bluesky",
  threads: "Threads",
  youtube: "YouTube",
  readcv: "Read.cv",
  behance: "Behance",
  dribbble: "Dribbble",
  letterboxd: "Letterboxd",
  email: "Email",
  rss: "RSS",
};

export function Footer() {
  const year = new Date().getFullYear();

  // Build the visible socials in display order
  const socialOrder: SocialPlatform[] = [
    "linkedin",
    "instagram",
    "github",
    "twitter",
    "bluesky",
    "threads",
    "youtube",
    "readcv",
    "behance",
    "dribbble",
    "letterboxd",
  ];

  const socials = socialOrder
    .map((platform) => {
      const value = siteConfig.social[platform as keyof typeof siteConfig.social];
      return value ? { platform, href: value as string } : null;
    })
    .filter((x): x is { platform: SocialPlatform; href: string } => Boolean(x));

  return (
    <footer className="hairline mt-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
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

            {/* Social icons with tooltips on hover */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
              {socials.map((s) => (
                <li key={s.platform}>
                  <Tooltip label={PLATFORM_LABELS[s.platform]}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={PLATFORM_LABELS[s.platform]}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-sm opacity-60 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all"
                    >
                      <SocialIcon platform={s.platform} size={15} />
                    </a>
                  </Tooltip>
                </li>
              ))}
              <li>
                <Tooltip label="Email">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    aria-label="Email"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-sm opacity-60 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all"
                  >
                    <SocialIcon platform="email" size={15} />
                  </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip label="RSS feed">
                  <Link
                    href="/feed.xml"
                    aria-label="RSS feed"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-sm opacity-60 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all"
                  >
                    <SocialIcon platform="rss" size={15} />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
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

          <div className="md:col-span-3">
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

        <div className="mt-12 flex flex-col md:flex-row items-baseline justify-between gap-3 hairline pt-6">
          <p className="font-mono text-[11px] lowercase opacity-60">
            © {year} {siteConfig.name}. all rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <VisitorCounter />
            <p className="font-mono text-[11px] lowercase opacity-60">
              press{" "}
              <kbd className="px-1.5 py-0.5 border rounded-sm">⌘</kbd>{" "}
              <kbd className="px-1.5 py-0.5 border rounded-sm">K</kbd> to navigate
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
