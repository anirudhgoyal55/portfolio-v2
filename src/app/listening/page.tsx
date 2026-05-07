import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SpotifyNowPlaying } from "@/components/integrations/SpotifyNowPlaying";
import { SpotifyTopTracks } from "@/components/integrations/SpotifyTopTracks";
import { SpotifyTopArtists } from "@/components/integrations/SpotifyTopArtists";
import { LetterboxdFeed } from "@/components/integrations/LetterboxdFeed";
import { GitHubFeed } from "@/components/integrations/GitHubFeed";
import { GitHubStats } from "@/components/integrations/GitHubStats";
import { PostCard } from "@/components/writing/PostCard";
import { siteConfig } from "../../../site.config";
import { getWritingByTag } from "@/lib/content";

export const metadata: Metadata = {
  title: "Listening",
  description:
    "What I'm listening to, watching, and shipping. All live, all auto-updating. Plus the occasional essay on an artist or album.",
};

export default function ListeningPage() {
  const musicEssays = getWritingByTag("music");

  return (
    <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-20">
      <p className="eyebrow">live</p>
      <h1 className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.01em]">
        Listening, watching, shipping
      </h1>
      <p className="mt-4 max-w-xl text-base opacity-80">
        Everything below is live. Pulled from Spotify, Letterboxd, and GitHub. Updated automatically.
      </p>

      {/* Now playing */}
      <section className="mt-12 hairline pt-6">
        <h2 className="eyebrow mb-3">on the speakers</h2>
        <Suspense fallback={null}>
          <SpotifyNowPlaying />
        </Suspense>
      </section>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {siteConfig.integrations.spotify.enabled && (
          <>
            <section>
              <h2 className="eyebrow mb-3">most-played tracks · 4 weeks</h2>
              <Suspense
                fallback={
                  <p className="font-mono text-xs opacity-50">loading…</p>
                }
              >
                <SpotifyTopTracks />
              </Suspense>
            </section>

            <section>
              <h2 className="eyebrow mb-3">most-played artists · 4 weeks</h2>
              <Suspense
                fallback={
                  <p className="font-mono text-xs opacity-50">loading…</p>
                }
              >
                <SpotifyTopArtists />
              </Suspense>
            </section>
          </>
        )}

        {siteConfig.integrations.github.enabled && (
          <section>
            <h2 className="eyebrow mb-3">recent commits</h2>
            <Suspense fallback={null}>
              <GitHubStats />
            </Suspense>
            <div className="mt-4">
              <Suspense
                fallback={
                  <p className="font-mono text-xs opacity-50">loading…</p>
                }
              >
                <GitHubFeed />
              </Suspense>
            </div>
          </section>
        )}
      </div>

      {/* Music essays — auto-shows when posts tagged "music" exist */}
      {musicEssays.length > 0 && (
        <section className="mt-12 hairline pt-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="eyebrow">music essays</h2>
            <Link
              href="/writing"
              className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100"
            >
              all writing →
            </Link>
          </div>
          {musicEssays.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </section>
      )}

      {siteConfig.integrations.letterboxd.enabled && (
        <section className="mt-12 hairline pt-6">
          <h2 className="eyebrow mb-3">recently watched</h2>
          <Suspense
            fallback={<p className="font-mono text-xs opacity-50">loading…</p>}
          >
            <LetterboxdFeed />
          </Suspense>
        </section>
      )}
    </div>
  );
}
