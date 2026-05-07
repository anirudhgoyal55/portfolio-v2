"use client";

import { useEffect, useState } from "react";

/**
 * Footer visitor count. Hits /api/visit at most once per browser per day
 * (deduped via localStorage). Renders nothing if Upstash isn't configured.
 */

const STORAGE_KEY = "portfolio:last-visit";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Private browsing or storage blocked — fall through to GET
    }

    const method = stored === today ? "GET" : "POST";

    fetch("/api/visit", { method })
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (typeof d.count === "number") {
          setCount(d.count);
          try {
            window.localStorage.setItem(STORAGE_KEY, today);
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="font-mono text-[11px] lowercase opacity-60">
      {count.toLocaleString()} visitors
    </span>
  );
}
