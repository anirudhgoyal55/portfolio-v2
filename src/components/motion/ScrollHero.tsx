"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle scroll-linked motion on the home hero.
 *
 * As the reader scrolls down, the wrapped block translates up slightly,
 * fades, and the avatar rotates a few degrees. Heavy in feel, lightweight
 * in cost — entirely transform/opacity, GPU-accelerated.
 */
export function ScrollHero({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Map scroll 0–600px to subtle effects
  const y = useTransform(scrollY, [0, 600], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400, 600], [1, 1, 0.55]);

  if (reduce) return <>{children}</>;

  return (
    <motion.div style={{ y, opacity }}>{children}</motion.div>
  );
}
