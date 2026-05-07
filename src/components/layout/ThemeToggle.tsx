"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Reserve space, no flash
    return <span aria-hidden className="inline-block w-[1.5em] h-[1em]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-mono text-[11px] lowercase tracking-wide opacity-70 hover:opacity-100 hover:text-[color:var(--color-accent)] transition-all"
    >
      {isDark ? "light" : "dark"}
    </button>
  );
}
