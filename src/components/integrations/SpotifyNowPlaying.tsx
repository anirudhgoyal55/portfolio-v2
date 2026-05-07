import Image from "next/image";
import { getNowPlaying } from "@/lib/spotify";
import { siteConfig } from "../../../site.config";

export async function SpotifyNowPlaying() {
  if (!siteConfig.integrations.spotify.enabled) return null;
  const data = await getNowPlaying(
    siteConfig.integrations.spotify.revalidateSeconds,
  );
  if (!data) {
    // Misconfigured or unauthorized — render nothing.
    return null;
  }

  if (!data.isPlaying || !data.title) {
    return (
      <div className="flex items-center gap-3 font-mono text-[12px] opacity-70">
        <span
          aria-hidden
          className="block w-1.5 h-1.5 rounded-full bg-[color:var(--color-faint-text)]"
        />
        <span>not listening to anything right now</span>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
      aria-label={`Now playing: ${data.title} by ${data.artist}`}
    >
      {data.albumImageUrl && (
        <Image
          src={data.albumImageUrl}
          alt=""
          width={40}
          height={40}
          className="rounded-sm"
          unoptimized
        />
      )}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)]"
          />
          <span className="eyebrow">now playing</span>
        </div>
        <p className="text-sm font-medium truncate max-w-[18rem]">
          {data.title}
        </p>
        <p className="text-[12px] opacity-60 truncate max-w-[18rem]">
          {data.artist}
        </p>
      </div>
    </a>
  );
}
