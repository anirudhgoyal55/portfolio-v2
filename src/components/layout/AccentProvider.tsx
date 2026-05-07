"use client";

import { useEffect } from "react";

/**
 * Reads a saved accent from localStorage and applies it as the CSS
 * --color-accent (+ derived alpha tokens) on the root. Companion to
 * AccentPicker which writes to localStorage. No flash on load because
 * we read synchronously in a layout-level provider.
 */

export type AccentPreset = {
  id: string;
  name: string;
  hex: string;
};

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "pumpkin", name: "Pumpkin", hex: "#E07A3C" },
  { id: "ember", name: "Ember", hex: "#B85945" },
  { id: "olive", name: "Olive", hex: "#6B7F3A" },
  { id: "forest", name: "Forest", hex: "#2C4A3E" },
  { id: "cobalt", name: "Cobalt", hex: "#3B5C8A" },
  { id: "steel", name: "Steel", hex: "#2A3245" },
  { id: "berry", name: "Berry", hex: "#7E2B3F" },
];

const STORAGE_KEY = "portfolio:accent";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

export function applyAccent(hex: string) {
  if (typeof document === "undefined") return;
  const [r, g, b] = hexToRgb(hex);
  const root = document.documentElement;
  root.style.setProperty("--color-accent", hex);
  root.style.setProperty("--color-accent-soft", `rgba(${r}, ${g}, ${b}, 0.12)`);
  root.style.setProperty("--color-accent-wash", `rgba(${r}, ${g}, ${b}, 0.06)`);
  root.style.setProperty("--color-selection", `rgba(${r}, ${g}, ${b}, 0.25)`);
}

export function AccentProvider() {
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) applyAccent(stored);
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}

export function setAccent(hex: string) {
  applyAccent(hex);
  try {
    window.localStorage.setItem(STORAGE_KEY, hex);
  } catch {
    /* ignore */
  }
}
