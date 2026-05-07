/**
 * Brand monogram — italic 'a' inside an accent-colored circle.
 * Matches the favicon and OG image so the mark reads as one identity.
 */

export function MonogramMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] text-[#FBFBFA] font-serif italic leading-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        fontVariationSettings: '"opsz" 144, "SOFT" 80',
      }}
    >
      a
    </span>
  );
}
