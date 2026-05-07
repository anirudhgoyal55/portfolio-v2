import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "../../site.config";
import { getFeaturedWork, getAllWriting } from "@/lib/content";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PostCard } from "@/components/writing/PostCard";
import { SpotifyNowPlaying } from "@/components/integrations/SpotifyNowPlaying";
import { Avatar } from "@/components/layout/Avatar";
import { SocialIcon, type SocialPlatform } from "@/components/layout/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollHero } from "@/components/motion/ScrollHero";
import { LiveTicker } from "@/components/home/LiveTicker";

const HERO_SOCIAL_ORDER: SocialPlatform[] = [
  "linkedin",
  "instagram",
  "github",
  "twitter",
  "bluesky",
  "letterboxd",
];

const HERO_SOCIAL_LABELS: Record<SocialPlatform, string> = {
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

export default function HomePage() {
  const featured = getFeaturedWork(siteConfig.featuredWork);
  const recentWriting = getAllWriting().slice(0, 3);

  const heroSocials = HERO_SOCIAL_ORDER.map((p) => {
    const value = siteConfig.social[p as keyof typeof siteConfig.social];
    return value ? { platform: p, href: value as string } : null;
  }).filter((x): x is { platform: SocialPlatform; href: string } => Boolean(x));

  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8">
      {/* HERO — tight, single-screen on most viewports */}
      <section className="pt-8 md:pt-12 pb-10">
        <ScrollHero>
          <Reveal>
            <header className="flex items-center gap-4">
              <Avatar
                size={72}
                alt={siteConfig.name}
                className="shrink-0 ring-1 ring-[color:var(--color-border)]"
              />
              <div className="min-w-0">
                <h1 className="font-serif text-[clamp(1.625rem,4vw,2.5rem)] leading-[1.05] tracking-[-0.01em]">
                  {siteConfig.name}.
                </h1>
                <p className="mt-0.5 text-sm opacity-70">{siteConfig.role}.</p>
              </div>
            </header>
          </Reveal>
        </ScrollHero>

        <Reveal delay={0.06}>
          <p className="mt-5 max-w-xl text-[15px] opacity-80 leading-relaxed">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/work"
              className="link-underline link-accent text-sm transition-transform active:scale-[0.97]"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="link-underline text-sm opacity-80 transition-transform active:scale-[0.97]"
            >
              Get in touch
            </Link>
            <span
              aria-hidden
              className="hidden sm:inline-block w-px h-3 bg-[color:var(--color-border)]"
            />
            <ul className="flex items-center gap-0.5 -mx-1">
              {heroSocials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={HERO_SOCIAL_LABELS[s.platform]}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-sm opacity-60 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all active:scale-[0.92]"
                  >
                    <SocialIcon platform={s.platform} size={14} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                  className="inline-flex items-center justify-center w-7 h-7 rounded-sm opacity-60 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all active:scale-[0.92]"
                >
                  <SocialIcon platform="email" size={14} />
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Live ticker — rotating live signal */}
        <Reveal delay={0.16}>
          <div className="mt-6 hairline pt-4">
            <LiveTicker />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-4">
            <Suspense fallback={null}>
              <SpotifyNowPlaying />
            </Suspense>
          </div>
        </Reveal>
      </section>

      {featured.length > 0 && (
        <section className="py-8 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-serif text-lg">Selected work</h2>
              <Link
                href="/work"
                className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100 transition-opacity"
              >
                all projects →
              </Link>
            </div>
          </Reveal>
          <div>
            {featured.map((w, i) => (
              <ProjectCard key={w.slug} work={w} index={i} />
            ))}
          </div>
        </section>
      )}

      {recentWriting.length > 0 && (
        <section className="py-8 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="font-serif text-lg">Recent writing</h2>
              <Link
                href="/writing"
                className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100 transition-opacity"
              >
                all posts →
              </Link>
            </div>
          </Reveal>
          <div>
            {recentWriting.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
