/**
 * Utility helpers used across the app.
 */

/**
 * Tiny `cn` (class-name joiner). Avoids pulling in `clsx`/`tailwind-merge`
 * for what most components actually need: filtering falsy values.
 */
export function cn(
  ...args: Array<string | number | false | null | undefined>
): string {
  return args.filter(Boolean).join(" ");
}

/**
 * Format an ISO date string as "12 May 2026".
 */
export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/**
 * Short month/year — for case study chips.
 */
export function formatYearMonth(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Reading time in whole minutes, rounded up. ~225 wpm average.
 */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 225));
}

/**
 * Roman numerals (I, II, III…) for chapter marks.
 */
export function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return String(num);
  const map: Array<[string, number]> = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let n = num;
  let out = "";
  for (const [sym, val] of map) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
}

/**
 * Pad-zero with width 2 (for project indices: 01 / 12).
 */
export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * Get the absolute URL for a given path. Uses NEXT_PUBLIC_SITE_URL env var
 * if set, falls back to the site.config url.
 */
export function absoluteUrl(path: string, baseUrl: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || baseUrl
  ).replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}
