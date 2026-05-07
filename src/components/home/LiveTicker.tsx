"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SpotifyIcon } from "@/components/integrations/SpotifyIcon";

type Signal = { label: string; href?: string; icon?: "spotify" | "github" | "visitors" };

function timeAgo(iso?: string | null): string {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

/**
 * Rotating live-stats ticker. Cycles every 4 seconds through:
 *   - now playing (if Spotify active) / last played
 *   - last commit time
 *   - visitor count
 *
 * Each signal links to the relevant page. Lightweight: three small fetches
 * on mount, then static rotation.
 */
export function LiveTicker() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const out: Signal[] = [];

    const tasks = [
      fetch("/api/spotify/now-playing", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { title?: string; artist?: string; isPlaying?: boolean }) => {
          if (d.title) {
            out.push({
              label: `${d.isPlaying ? "Now playing" : "Last played"}: ${d.title}${d.artist ? ` · ${d.artist}` : ""}`,
              href: "/listening",
              icon: "spotify",
            });
          }
        })
        .catch(() => {}),
      fetch("/api/visit", { method: "GET" })
        .then((r) => r.json())
        .then((d: { count?: number | null }) => {
          if (typeof d.count === "number") {
            out.push({
              label: `${d.count.toLocaleString()} visitors all-time`,
              icon: "visitors",
            });
          }
        })
        .catch(() => {}),
    ];

    Promise.all(tasks).then(() => {
      if (cancelled) return;
      // Always include a static signal so we have at least one
      if (!out.length) {
        out.push({ label: "Latest builds in /work", href: "/work" });
      }
      setSignals(out);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (signals.length < 2) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % signals.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [signals.length]);

  if (!signals.length) return null;
  const current = signals[index];

  return (
    <div className="inline-flex items-center gap-2 max-w-full">
      <span
        aria-hidden
        className="block w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse"
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={current.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 min-w-0"
        >
          {current.icon === "spotify" && (
            <SpotifyIcon size={11} className="text-[#1DB954] shrink-0" />
          )}
          {current.href ? (
            <Link
              href={current.href}
              className="font-mono text-[11px] lowercase opacity-70 truncate max-w-[28rem] hover:opacity-100 hover:text-[color:var(--color-accent)] transition-colors"
            >
              {current.label.toLowerCase()}
            </Link>
          ) : (
            <span className="font-mono text-[11px] lowercase opacity-70 truncate max-w-[28rem]">
              {current.label.toLowerCase()}
            </span>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
