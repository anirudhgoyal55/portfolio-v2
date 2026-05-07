/**
 * Static dot-grid background. Pure CSS, zero runtime cost.
 * Theme-aware via the --color-rule token. Fades to transparent at the
 * edges so it never fights with content.
 */

export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 bg-grid"
    />
  );
}
