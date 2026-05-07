"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer visitor count. Hits /api/visit at most once per browser per day
 * (deduped via localStorage). Renders nothing if Upstash isn't configured.
 *
 * The number animates from 0 → target on first appearance. Respects
 * prefers-reduced-motion.
 */

const STORAGE_KEY = "portfolio:last-visit";

export function VisitorCounter() {
  const [target, setTarget] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode / storage blocked */
    }

    const method = stored === today ? "GET" : "POST";

    fetch("/api/visit", { method })
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (typeof d.count === "number") {
          setTarget(d.count);
          try {
            window.localStorage.setItem(STORAGE_KEY, today);
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {
        /* counter just stays hidden */
      });
  }, []);

  useEffect(() => {
    if (target === null || animatedRef.current) return;
    animatedRef.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }

    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  if (target === null) return null;

  return (
    <span className="font-mono text-[11px] lowercase opacity-60 tabular-nums">
      {display.toLocaleString()} visitors
    </span>
  );
}
