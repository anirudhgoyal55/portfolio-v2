import Image from "next/image";
import { getNowPlaying, getLastPlayed } from "@/lib/spotify";
import { siteConfig } from "../../../site.config";
import { SpotifyIcon } from "./SpotifyIcon";

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

/**
 * Always-on Spotify presence:
 * - playing: full now-playing with animated waveform
 * - not playing but configured: most recent track + "X ago"
 * - misconfigured / no token: quiet "awaiting auth" hint
 */
export async function SpotifyNowPlaying() {
  if (!siteConfig.integrations.spotify.enabled) return null;

  const live = await getNowPlaying(
    siteConfig.integrations.spotify.revalidateSeconds,
  );

  // Playing right now
  if (live && live.isPlaying && live.title) {
    return (
      <a
        href={live.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
        aria-label={`Now playing: ${live.title} by ${live.artist}`}
      >
        {live.albumImageUrl && (
          <Image
            src={live.albumImageUrl}
            alt=""
            width={36}
            height={36}
            className="rounded-sm shrink-0"
            unoptimized
          />
        )}
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
            {live.title}
          </span>
          <span className="text-[12px] opacity-60 truncate max-w-[20rem]">
            {live.artist}
          </span>
        </span>
      </a>
    );
  }

  // Configured but not playing — fall back to last-played
  const last = await getLastPlayed(60);
  if (last && last.title) {
    return (
      <a
        href={last.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
        aria-label={`Last played: ${last.title} by ${last.artist}`}
      >
        {last.albumImageUrl && (
          <Image
            src={last.albumImageUrl}
            alt=""
            width={36}
            height={36}
            className="rounded-sm shrink-0 opacity-90"
            unoptimized
          />
        )}
        <span className="flex flex-col min-w-0">
          <span className="flex items-center gap-1.5">
            <SpotifyIcon size={11} className="text-[#1DB954] opacity-80" />
            <span className="eyebrow">
              last played · {timeAgo(last.playedAt)}
            </span>
          </span>
          <span className="text-sm font-medium truncate max-w-[20rem]">
            {last.title}
          </span>
          <span className="text-[12px] opacity-60 truncate max-w-[20rem]">
            {last.artist}
          </span>
        </span>
      </a>
    );
  }

  // No token / misconfigured
  if (!live) {
    return (
      <span className="inline-flex items-center gap-2 text-[12px] opacity-50">
        <SpotifyIcon size={14} className="text-[#1DB954]" />
        <span className="font-mono lowercase">spotify · awaiting auth</span>
      </span>
    );
  }

  // Configured + token works but no recent activity
  return (
    <span className="inline-flex items-center gap-2 text-[12px] opacity-65">
      <SpotifyIcon size={14} className="text-[#1DB954]" />
      <span className="font-mono lowercase">no recent listening</span>
    </span>
  );
}
