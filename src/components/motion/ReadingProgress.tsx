"use client";

import { useEffect, useState } from "react";

/**
 * Subtle scroll progress bar — 2px sticky strip at the top of the viewport,
 * accent-colored, scaling from 0 → 1 as the reader scrolls a long post.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-[color:var(--color-accent)]"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: "0 0",
          transition: "transform 80ms linear",
        }}
      />
    </div>
  );
}
