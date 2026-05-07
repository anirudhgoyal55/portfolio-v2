"use client";

import { useEffect } from "react";

/**
 * Sets --cursor-x / --cursor-y CSS variables on the root, used by a
 * `.cursor-spotlight` element in globals.css to draw a soft accent
 * radial gradient that tracks the mouse. Off on touch and reduced-motion.
 */
export function CursorSpotlight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduce) return;

    const root = document.documentElement;
    root.classList.add("has-cursor-spotlight");

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const apply = () => {
      root.style.setProperty("--cursor-x", `${pendingX}px`);
      root.style.setProperty("--cursor-y", `${pendingY}px`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      root.classList.remove("has-cursor-spotlight");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
