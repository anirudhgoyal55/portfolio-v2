/**
 * Inline SVG icons for the bottom navigation. currentColor + stroke-based
 * so they inherit theme color and stay crisp at any size.
 */

const ICONS: Record<string, string> = {
  home: "M3 11l9-8 9 8M5 9.5V21h14V9.5",
  work: "M4 7h16v13H4zM9 7V4h6v3",
  experience: "M3 6h18M3 12h18M3 18h12",
  writing: "M4 20h16M5 16l8-12 4 4-8 12H5z",
  now: "M12 2v6m0 8v6M2 12h6m8 0h6",
  listening: "M9 17V5l12-2v12M9 17a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z",
  uses: "M14.7 6.3a4 4 0 105.7 5.7l-2.5 2.5L21 19l-3 3-4.5-3.1-2.5 2.5a4 4 0 11-5.7-5.7l3.4-3.4 2.6 2.6L14.7 6.3z",
  contact: "M3 7l9 6 9-6M3 7v10h18V7M3 7l9-4 9 4",
  more: "M5 12h.01M12 12h.01M19 12h.01",
};

export type NavIconName = keyof typeof ICONS;

export function NavIcon({
  name,
  size = 18,
  className = "",
}: {
  name: NavIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
