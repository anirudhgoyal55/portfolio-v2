import Image from "next/image";
import { getNowPlaying } from "@/lib/spotify";
import { siteConfig } from "../../../site.config";
import { SpotifyIcon } from "./SpotifyIcon";

/**
 * Always-on Spotify presence.
 * - If integration disabled: render nothing (template behavior for forks)
 * - If misconfigured / no token: render the icon as a quiet affordance
 * - If configured but nothing playing: icon + "not listening"
 * - If playing: full song + animated waveform
 */
export async function SpotifyNowPlaying() {
  if (!siteConfig.integrations.spotify.enabled) return null;

  const data = await getNowPlaying(
    siteConfig.integrations.spotify.revalidateSeconds,
  );

  // Misconfigured or unauthorized — quiet hint instead of nothing
  if (!data) {
    return (
      <span className="inline-flex items-center gap-2 text-[12px] opacity-50">
        <SpotifyIcon size={14} className="text-[#1DB954]" />
        <span className="font-mono lowercase">spotify · awaiting auth</span>
      </span>
    );
  }

  if (!data.isPlaying || !data.title) {
    return (
      <span className="inline-flex items-center gap-2 text-[12px] opacity-65">
        <SpotifyIcon size={14} className="text-[#1DB954]" />
        <span className="font-mono lowercase">not listening right now</span>
      </span>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
      aria-label={`Now playing: ${data.title} by ${data.artist}`}
    >
      {data.albumImageUrl ? (
        <Image
          src={data.albumImageUrl}
          alt=""
          width={36}
          height={36}
          className="rounded-sm shrink-0"
          unoptimized
        />
      ) : null}
      <span className="flex flex-col min-w-0">
        <span className="flex items-center gap-1.5">
          <SpotifyIcon size={11} className="text-[#1DB954]" />
          <span className="eyebrow flex items-center gap-1">
            now playing
            <span aria-hidden className="inline-flex items-end h-3 gap-[2px] ml-1">
              <span className="wave-bar" style={{ animationDelay: "-0.4s" }} />
              <span className="wave-bar" style={{ animationDelay: "-0.2s" }} />
              <span className="wave-bar" />
            </span>
          </span>
        </span>
        <span className="text-sm font-medium truncate max-w-[20rem]">
          {data.title}
        </span>
        <span className="text-[12px] opacity-60 truncate max-w-[20rem]">
          {data.artist}
        </span>
      </span>
    </a>
  );
}
