export default function Loading() {
  return (
    <article className="mx-auto max-w-3xl px-6 md:px-10 py-20 md:py-28">
      <div className="h-3 w-16 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 h-12 md:h-14 w-2/3 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 flex items-center gap-3">
        <div className="h-3 w-24 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
        <div className="h-3 w-20 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
      </div>
      <div className="prose mt-12 space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-sm bg-[color:var(--color-rule)] animate-pulse"
            style={{ width: `${55 + ((i * 11) % 40)}%` }}
          />
        ))}
      </div>
    </article>
  );
}
