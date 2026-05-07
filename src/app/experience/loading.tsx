export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-24 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-56 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 h-4 w-80 max-w-full rounded-sm bg-[color:var(--color-rule)] animate-pulse" />

      <ol className="mt-12 space-y-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <li
            key={i}
            className="hairline-bottom pb-10 grid grid-cols-12 items-baseline gap-4"
          >
            <div className="col-span-3 h-3 w-24 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            <div className="col-span-9 space-y-3">
              <div className="h-5 w-2/3 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
              <div className="h-3 w-3/4 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
              <div className="h-3 w-1/2 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-50" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
