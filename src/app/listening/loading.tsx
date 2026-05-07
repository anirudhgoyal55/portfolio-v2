export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-12 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-3/4 max-w-md rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 h-4 w-96 max-w-full rounded-sm bg-[color:var(--color-rule)] animate-pulse" />

      <div className="mt-12 hairline pt-6">
        <div className="h-3 w-32 rounded-sm bg-[color:var(--color-rule)] animate-pulse mb-3" />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 w-40 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            <div className="h-2.5 w-28 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {Array.from({ length: 2 }).map((_, col) => (
          <div key={col}>
            <div className="h-3 w-40 rounded-sm bg-[color:var(--color-rule)] animate-pulse mb-3" />
            <ul className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.75rem_2.5rem_1fr] items-center gap-3"
                >
                  <div className="h-3 w-6 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
                  <div className="w-10 h-10 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-2/3 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
                    <div className="h-2.5 w-1/2 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
