export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-40 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-3 w-44 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
      <div className="prose mt-12 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-sm bg-[color:var(--color-rule)] animate-pulse"
            style={{ width: `${60 + ((i * 11) % 35)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
