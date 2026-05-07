"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SpotifyIcon } from "./SpotifyIcon";

type Track = {
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  playedAt?: string;
};

/**
 * Tiny persistent Spotify card, fixed bottom-right on desktop. Polls
 * /api/spotify/now-playing every 30s. Hidden on mobile (the bottom nav
 * already occupies that area).
 */
export function PersistentSpotifyPlayer() {
  const [track, setTrack] = useState<Track | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchTrack = () => {
      fetch("/api/spotify/now-playing", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: Track) => {
          if (!cancelled) setTrack(d);
        })
        .catch(() => {});
    };
    fetchTrack();
    const interval = setInterval(fetchTrack, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (hidden || !track || !track.title) return null;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} by ${track.artist}`}
      className="hidden md:flex group fixed bottom-4 right-4 z-30 items-center gap-2 max-w-[18rem] px-2.5 py-2 rounded-full border bg-[color:var(--color-background)]/85 backdrop-blur-md shadow-sm hover:shadow-md transition-all"
    >
      {track.albumImageUrl ? (
        <Image
          src={track.albumImageUrl}
          alt=""
          width={28}
          height={28}
          className="rounded-full shrink-0"
          unoptimized
        />
      ) : null}
      <div className="flex flex-col min-w-0 leading-tight">
        <span className="flex items-center gap-1">
          <SpotifyIcon size={9} className="text-[#1DB954]" />
          <span className="font-mono text-[9px] lowercase tracking-wide opacity-65">
            {track.isPlaying ? (
              <span className="inline-flex items-end h-2.5 gap-[1.5px] mr-1">
                <span className="wave-bar" style={{ animationDelay: "-0.4s" }} />
                <span className="wave-bar" style={{ animationDelay: "-0.2s" }} />
                <span className="wave-bar" />
              </span>
            ) : null}
            {track.isPlaying ? "now playing" : "last played"}
          </span>
        </span>
        <span className="text-[12px] font-medium truncate">{track.title}</span>
      </div>
      <button
        type="button"
        aria-label="Hide player"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setHidden(true);
        }}
        className="ml-1 -mr-0.5 w-5 h-5 inline-flex items-center justify-center rounded-full opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity text-[10px]"
      >
        ✕
      </button>
    </a>
  );
}
