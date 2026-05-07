"use client";

import { useEffect, useState } from "react";

/**
 * Small floating "back to top" pill, only shown after scrolling past
 * half the page. Quietly mono, accent on hover.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const half =
        (document.documentElement.scrollHeight - window.innerHeight) / 2;
      setShow(window.scrollY > Math.max(half, 600));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] lowercase rounded-full bg-[color:var(--color-background)] border opacity-0 translate-y-2 pointer-events-none transition-all hover:text-[color:var(--color-accent)] ${
        show ? "!opacity-90 !translate-y-0 !pointer-events-auto" : ""
      }`}
    >
      <span aria-hidden>↑</span> top
    </button>
  );
}
