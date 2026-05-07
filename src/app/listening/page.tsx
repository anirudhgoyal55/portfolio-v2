import type { Metadata } from "next";
import { Suspense } from "react";
import { SpotifyNowPlaying } from "@/components/integrations/SpotifyNowPlaying";
import { SpotifyTopTracks } from "@/components/integrations/SpotifyTopTracks";
import { LetterboxdFeed } from "@/components/integrations/LetterboxdFeed";
import { GitHubFeed } from "@/components/integrations/GitHubFeed";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: "Listening",
  description:
    "What I'm listening to, watching, and shipping. All live, all auto-updating.",
};

export default function ListeningPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10 py-20 md:py-28">
      <p className="eyebrow">live</p>
      <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
        Listening, watching, shipping
      </h1>
      <p className="mt-5 max-w-2xl text-lg opacity-80">
        Everything below is live. Pulled from Spotify, Letterboxd, and GitHub. Updated automatically.
      </p>

      {/* Now playing */}
      <section className="mt-16 hairline pt-8">
        <h2 className="eyebrow mb-4">on the speakers</h2>
        <Suspense fallback={null}>
          <SpotifyNowPlaying />
        </Suspense>
      </section>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {siteConfig.integrations.spotify.enabled && (
          <section>
            <h2 className="eyebrow mb-4">most-played, last 4 weeks</h2>
            <Suspense
              fallback={
                <p className="font-mono text-xs opacity-50">loading…</p>
              }
            >
              <SpotifyTopTracks />
            </Suspense>
          </section>
        )}

        {siteConfig.integrations.github.enabled && (
          <section>
            <h2 className="eyebrow mb-4">recent commits</h2>
            <Suspense
              fallback={
                <p className="font-mono text-xs opacity-50">loading…</p>
              }
            >
              <GitHubFeed />
            </Suspense>
          </section>
        )}
      </div>

      {siteConfig.integrations.letterboxd.enabled && (
        <section className="mt-16 hairline pt-8">
          <h2 className="eyebrow mb-4">recently watched</h2>
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
