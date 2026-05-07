"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { siteConfig } from "../../../site.config";
import { ACCENT_PRESETS, setAccent } from "@/components/layout/AccentProvider";

/**
 * Tiny event bus so non-React code (like the trigger) can open the menu.
 */
type Listener = () => void;
const listeners = new Set<Listener>();
export const commandEvent = {
  dispatch() {
    listeners.forEach((fn) => fn());
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

type SearchEntry = {
  type: "work" | "writing" | "experience" | "page";
  slug: string;
  title: string;
  description: string;
  url: string;
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"root" | "accent">("root");
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") {
        if (view !== "root") setView("root");
        else setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const unsub = commandEvent.subscribe(() => {
      setOpen(true);
      setView("root");
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      unsub();
    };
  }, [view]);

  // Lazy-load the search index the first time the menu opens
  useEffect(() => {
    if (!open || entries.length) return;
    fetch("/api/search-index")
      .then((r) => r.json())
      .then((d: { entries: SearchEntry[] }) => setEntries(d.entries ?? []))
      .catch(() => {});
  }, [open, entries.length]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const copyEmail = async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      toast.success("email copied");
    } catch {
      toast.error("could not copy");
    }
  };

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const matches = q
    ? entries
        .filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q),
        )
        .slice(0, 8)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <div
        className="absolute inset-0 bg-[color:var(--color-ink)]/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command
        loop
        className="relative z-10 w-full max-w-lg bg-[color:var(--color-background)] border rounded-sm shadow-2xl overflow-hidden"
      >
        {view === "root" && (
          <>
            <Command.Input
              placeholder="Search work, posts, or run a command…"
              value={query}
              onValueChange={setQuery}
              className="w-full px-4 py-3 bg-transparent border-b font-mono text-sm focus:outline-none placeholder:opacity-50"
            />
            <Command.List className="max-h-[60vh] overflow-y-auto p-1">
              <Command.Empty className="px-4 py-3 font-mono text-xs opacity-50">
                Nothing matches.
              </Command.Empty>

              {matches.length > 0 && (
                <Command.Group
                  heading="search"
                  className="text-[10px] uppercase tracking-wider opacity-50 px-3 pt-3 pb-1 font-mono"
                >
                  {matches.map((m) => (
                    <Command.Item
                      key={`${m.type}-${m.slug}`}
                      value={`${m.type}:${m.title}:${m.description}`}
                      onSelect={() => go(m.url)}
                      className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                    >
                      <span className="truncate">{m.title}</span>
                      <span className="font-mono text-[10px] opacity-50 lowercase shrink-0">
                        {m.type}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              <Command.Group
                heading="navigate"
                className="text-[10px] uppercase tracking-wider opacity-50 px-3 pt-3 pb-1 font-mono"
              >
                <Command.Item
                  onSelect={() => go("/")}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  Home
                </Command.Item>
                {siteConfig.nav.map((item) => (
                  <Command.Item
                    key={item.href}
                    onSelect={() => go(item.href)}
                    className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                  >
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="actions"
                className="text-[10px] uppercase tracking-wider opacity-50 px-3 pt-3 pb-1 font-mono"
              >
                <Command.Item
                  onSelect={copyEmail}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  Copy email
                </Command.Item>
                <Command.Item
                  onSelect={() => setView("accent")}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  Change accent color →
                </Command.Item>
                <Command.Item
                  onSelect={() => {
                    setOpen(false);
                    setTheme("light");
                  }}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  Light mode
                </Command.Item>
                <Command.Item
                  onSelect={() => {
                    setOpen(false);
                    setTheme("dark");
                  }}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  Dark mode
                </Command.Item>
                <Command.Item
                  onSelect={() => {
                    setOpen(false);
                    setTheme("system");
                  }}
                  className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                >
                  System theme
                </Command.Item>
              </Command.Group>

              <Command.Group
                heading="elsewhere"
                className="text-[10px] uppercase tracking-wider opacity-50 px-3 pt-3 pb-1 font-mono"
              >
                {siteConfig.social.linkedin && (
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      window.open(siteConfig.social.linkedin!, "_blank");
                    }}
                    className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                  >
                    LinkedIn ↗
                  </Command.Item>
                )}
                {siteConfig.social.instagram && (
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      window.open(siteConfig.social.instagram!, "_blank");
                    }}
                    className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                  >
                    Instagram ↗
                  </Command.Item>
                )}
                {siteConfig.social.github && (
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      window.open(siteConfig.social.github!, "_blank");
                    }}
                    className="px-3 py-2 text-sm rounded-sm cursor-pointer aria-selected:bg-[color:var(--color-accent-soft)] aria-selected:text-[color:var(--color-accent)]"
                  >
                    GitHub ↗
                  </Command.Item>
                )}
              </Command.Group>
            </Command.List>
          </>
        )}

        {view === "accent" && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="eyebrow">choose accent</p>
              <button
                type="button"
                onClick={() => setView("root")}
                className="font-mono text-[11px] lowercase opacity-60 hover:opacity-100"
              >
                ← back
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setAccent(p.hex);
                    toast.success(`accent: ${p.name.toLowerCase()}`);
                    setOpen(false);
                    setView("root");
                  }}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-sm border hover:bg-[color:var(--color-accent-wash)] transition-colors"
                >
                  <span
                    aria-hidden
                    className="block w-8 h-8 rounded-full"
                    style={{ background: p.hex }}
                  />
                  <span className="font-mono text-[10px] lowercase opacity-70">
                    {p.name.toLowerCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Command>
    </div>
  );
}
