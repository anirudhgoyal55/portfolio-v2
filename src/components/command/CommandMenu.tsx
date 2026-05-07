"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { siteConfig } from "../../../site.config";

/**
 * A tiny event bus so non-React code (like the trigger) can open the menu.
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

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const unsub = commandEvent.subscribe(() => setOpen(true));
    return () => {
      document.removeEventListener("keydown", onKey);
      unsub();
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
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
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full px-4 py-3 bg-transparent border-b font-mono text-sm focus:outline-none placeholder:opacity-50"
        />
        <Command.List className="max-h-80 overflow-y-auto p-1">
          <Command.Empty className="px-4 py-3 font-mono text-xs opacity-50">
            No results.
          </Command.Empty>

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
      </Command>
    </div>
  );
}
