"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { NavIcon, type NavIconName } from "./NavIcon";

type NavEntry = { href: string; label: string; icon: NavIconName };

const PRIMARY: NavEntry[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/work", label: "Work", icon: "work" },
  { href: "/listening", label: "Listening", icon: "listening" },
];

const SECONDARY: NavEntry[] = [
  { href: "/writing", label: "Writing", icon: "writing" },
  { href: "/experience", label: "Experience", icon: "experience" },
  { href: "/now", label: "Now", icon: "now" },
  { href: "/uses", label: "Uses", icon: "uses" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Mobile bottom navigation. Three primary destinations + a More sheet.
 * Listening icon pulses when Spotify is currently playing.
 * Hidden on md+ where the desktop top-nav lives.
 */
export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const moreActive = SECONDARY.some((e) => isActive(pathname, e.href));

  useEffect(() => {
    let cancelled = false;
    const fetchPlaying = () => {
      fetch("/api/spotify/now-playing", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { isPlaying?: boolean }) => {
          if (!cancelled) setSpotifyPlaying(Boolean(d.isPlaying));
        })
        .catch(() => {});
    };
    fetchPlaying();
    const interval = setInterval(fetchPlaying, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <nav
      aria-label="Mobile primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[color:var(--color-border)] bg-[color:var(--color-background)]/85 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4 items-center">
        {PRIMARY.map((item) => {
          const active = isActive(pathname, item.href);
          const showPulse = item.href === "/listening" && spotifyPlaying;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 transition-all active:scale-[0.94] ${
                  active
                    ? "text-[color:var(--color-accent)]"
                    : "text-[color:var(--color-foreground)] opacity-60 hover:opacity-100"
                }`}
              >
                <span className="relative inline-flex">
                  <NavIcon name={item.icon} size={20} />
                  {showPulse && (
                    <span
                      aria-hidden
                      className="absolute -top-0.5 -right-0.5 flex w-1.5 h-1.5"
                    >
                      <span className="absolute inline-flex w-full h-full rounded-full bg-[#1DB954] opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[#1DB954]" />
                    </span>
                  )}
                </span>
                <span className="font-mono text-[9px] lowercase tracking-wide">
                  {item.label.toLowerCase()}
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Dialog.Root open={moreOpen} onOpenChange={setMoreOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="More navigation"
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 w-full transition-all active:scale-[0.94] ${
                  moreActive
                    ? "text-[color:var(--color-accent)]"
                    : "text-[color:var(--color-foreground)] opacity-60 hover:opacity-100"
                }`}
              >
                <NavIcon name="more" size={20} />
                <span className="font-mono text-[9px] lowercase tracking-wide">
                  more
                </span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-[color:var(--color-ink)]/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed bottom-0 inset-x-0 z-50 rounded-t-lg border-t bg-[color:var(--color-background)] p-5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom duration-300"
                style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
              >
                <Dialog.Title className="eyebrow mb-4">more</Dialog.Title>
                <ul className="grid grid-cols-3 gap-2">
                  {SECONDARY.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMoreOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex flex-col items-center justify-center gap-1 py-4 rounded-sm border transition-all active:scale-[0.97] ${
                            active
                              ? "text-[color:var(--color-accent)] border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-wash)]"
                              : "border-[color:var(--color-border)] hover:bg-[color:var(--color-accent-wash)]"
                          }`}
                        >
                          <NavIcon name={item.icon} size={20} />
                          <span className="font-mono text-[10px] lowercase">
                            {item.label.toLowerCase()}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </li>
      </ul>
    </nav>
  );
}
