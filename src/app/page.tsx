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
    <div className="mx-auto max-w-4xl px-6 md:px-10">
      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-20">
        <Reveal>
          <p className="eyebrow">portfolio · {new Date().getFullYear()}</p>
        </Reveal>
        <Reveal delay={0.05} as="header">
          <h1 className="mt-4 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em] max-w-3xl">
            {siteConfig.name}.
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-3 text-base opacity-70 max-w-xl">
            {siteConfig.role}.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base opacity-80 leading-relaxed">
            {siteConfig.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex items-center gap-5">
            <Link
              href="/work"
              className="link-underline link-accent text-sm"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="link-underline text-sm opacity-80"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        {/* Live now-playing strip */}
        <Reveal delay={0.24}>
          <div className="mt-12">
            <Suspense fallback={null}>
              <SpotifyNowPlaying />
            </Suspense>
          </div>
        </Reveal>
      </section>

      {/* FEATURED WORK */}
      {featured.length > 0 && (
        <section className="py-12 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-serif text-xl">Selected work</h2>
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
        <section className="py-12 hairline">
          <Reveal>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-serif text-xl">Recent writing</h2>
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
