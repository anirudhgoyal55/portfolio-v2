export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-40 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="prose mt-12 space-y-4">
        {Array.from({ length: 3 }).map((_, section) => (
          <div key={section} className="space-y-2">
            <div className="h-5 w-32 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded-sm bg-[color:var(--color-rule)] animate-pulse"
                style={{ width: `${55 + ((i * 13) % 35)}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
