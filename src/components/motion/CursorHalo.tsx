"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Linear-style cursor halo: a soft accent disc that follows the pointer
 * with spring damping. Subtle scale-up over interactive elements.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function CursorHalo() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 220, mass: 0.5 });
  const sy = useSpring(y, { damping: 28, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduceMotion) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      setHovering(Boolean(interactive));
    };
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer halo — soft, springy follow */}
      <motion.span
        aria-hidden
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        className="pointer-events-none fixed top-0 left-0 z-[60] block w-7 h-7 rounded-full bg-[color:var(--color-accent)] opacity-[0.18] blur-[0.5px]"
      />
      {/* Inner dot — exact follow, no spring */}
      <motion.span
        aria-hidden
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed top-0 left-0 z-[60] block w-[3px] h-[3px] rounded-full bg-[color:var(--color-accent)]"
      />
    </>
  );
}
