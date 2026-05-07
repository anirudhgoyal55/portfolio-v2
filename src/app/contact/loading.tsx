export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-16 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-48 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 h-4 w-72 max-w-full rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-8 h-4 w-56 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />

      <div className="mt-10 max-w-lg space-y-5">
        {[64, 64, 144].map((h, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            <div
              className="rounded-sm bg-[color:var(--color-rule)] animate-pulse"
              style={{ height: `${h}px` }}
            />
          </div>
        ))}
        <div className="h-9 w-32 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      </div>
    </div>
  );
}
