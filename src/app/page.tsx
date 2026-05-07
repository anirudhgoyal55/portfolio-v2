import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "../../site.config";
import { getFeaturedWork, getAllWriting } from "@/lib/content";
import { ProjectCard } from "@/components/work/ProjectCard";
import { PostCard } from "@/components/writing/PostCard";
import { SpotifyNowPlaying } from "@/components/integrations/SpotifyNowPlaying";
import { Reveal } from "@/components/motion/Reveal";

export default function HomePage() {
  const featured = getFeaturedWork(siteConfig.featuredWork);
  const recentWriting = getAllWriting().slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      {/* HERO */}
      <section className="pt-16 md:pt-28 pb-20 md:pb-28">
        <Reveal>
          <p className="eyebrow">portfolio · {new Date().getFullYear()}</p>
        </Reveal>
        <Reveal delay={0.05} as="header">
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.01em] max-w-5xl">
            {siteConfig.name}.{" "}
            <span className="opacity-60 italic">
              {siteConfig.role.toLowerCase()}.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg opacity-80 leading-relaxed">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/work"
              className="link-underline link-accent text-sm font-medium"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="link-underline text-sm font-medium opacity-80"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        {/* Live now-playing strip */}
        <Reveal delay={0.25}>
          <div className="mt-16">
            <Suspense fallback={null}>
              <SpotifyNowPlaying />
            </Suspense>
          </div>
        </Reveal>
      </section>

      {/* FEATURED WORK */}
      {featured.length > 0 && (
        <section className="py-16 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-serif text-2xl">Selected work</h2>
              <Link
                href="/work"
                className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100"
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

      {/* RECENT WRITING */}
      {recentWriting.length > 0 && (
        <section className="py-16 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-serif text-2xl">Recent writing</h2>
              <Link
                href="/writing"
                className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100"
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
