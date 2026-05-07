"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const NAV_KEYS: Record<string, { href: string; label: string }> = {
  h: { href: "/", label: "Home" },
  w: { href: "/work", label: "Work" },
  e: { href: "/experience", label: "Experience" },
  r: { href: "/writing", label: "Writing" },
  n: { href: "/now", label: "Now" },
  l: { href: "/listening", label: "Listening" },
  u: { href: "/uses", label: "Uses" },
  c: { href: "/contact", label: "Contact" },
};

const KEY_HINTS: Array<{ keys: string; label: string }> = [
  { keys: "⌘K", label: "open command palette" },
  { keys: "?", label: "show this help" },
  { keys: "T", label: "toggle theme" },
  { keys: "G H", label: "go home" },
  { keys: "G W", label: "go to work" },
  { keys: "G E", label: "go to experience" },
  { keys: "G R", label: "go to writing" },
  { keys: "G N", label: "go to now" },
  { keys: "G L", label: "go to listening" },
  { keys: "G U", label: "go to uses" },
  { keys: "G C", label: "go to contact" },
  { keys: "Esc", label: "close anything open" },
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  const [gArmedAt, setGArmedAt] = useState<number | null>(null);

  useEffect(() => {
    const isTypingTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const k = e.key;
      const isMeta = e.metaKey || e.ctrlKey;

      if (k === "Escape") {
        setHelpOpen(false);
        setGArmedAt(null);
        return;
      }

      if (k === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      if (!isMeta && k.toLowerCase() === "t") {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        return;
      }

      if (!isMeta && k.toLowerCase() === "g") {
        e.preventDefault();
        setGArmedAt(Date.now());
        return;
      }

      if (gArmedAt && Date.now() - gArmedAt < 1500) {
        const target = NAV_KEYS[k.toLowerCase()];
        if (target) {
          e.preventDefault();
          router.push(target.href);
          setGArmedAt(null);
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router, setTheme, resolvedTheme, gArmedAt]);

  if (!helpOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      onClick={() => setHelpOpen(false)}
    >
      <div className="absolute inset-0 bg-[color:var(--color-ink)]/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-md bg-[color:var(--color-background)] border rounded-sm shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow mb-3">keyboard shortcuts</p>
        <ul className="space-y-2">
          {KEY_HINTS.map((h) => (
            <li
              key={h.keys}
              className="flex items-center justify-between text-sm font-mono"
            >
              <span className="opacity-80 lowercase">{h.label}</span>
              <span className="flex items-center gap-1">
                {h.keys.split(" ").map((part, i) => (
                  <kbd
                    key={i}
                    className="px-1.5 py-0.5 border rounded-sm text-[11px] opacity-90"
                  >
                    {part}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 pt-3 hairline font-mono text-[11px] lowercase opacity-50">
          press <kbd className="px-1 border rounded-sm">esc</kbd> or click anywhere to close
        </p>
      </div>
    </div>
  );
}
