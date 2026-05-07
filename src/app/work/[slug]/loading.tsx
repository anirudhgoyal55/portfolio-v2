export default function Loading() {
  return (
    <article className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28">
      <div className="flex items-center gap-4">
        <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
        <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
      </div>
      <div className="mt-4 h-12 md:h-14 w-3/4 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-4 w-2/3 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-80" />

      <dl className="mt-10 hairline pt-6 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            <div className="h-3 w-20 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
          </div>
        ))}
      </dl>

      <div className="prose mt-14 space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-sm bg-[color:var(--color-rule)] animate-pulse"
            style={{ width: `${60 + ((i * 13) % 35)}%` }}
          />
        ))}
      </div>
    </article>
  );
}
