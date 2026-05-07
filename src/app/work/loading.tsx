/**
 * Skeleton for /work index. Matches the rendered layout so the click
 * feels instantaneous and content fills in without jumping.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-20">
      <div className="h-3 w-24 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-3 h-12 md:h-14 w-72 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
      <div className="mt-4 h-4 w-96 max-w-full rounded-sm bg-[color:var(--color-rule)] animate-pulse" />

      <div className="mt-12 space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="hairline-bottom py-5 grid grid-cols-12 gap-4">
            <div className="col-span-1 h-3 w-6 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
            <div className="col-span-9 space-y-2">
              <div className="h-5 w-2/3 rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
              <div className="h-3 w-1/2 rounded-sm bg-[color:var(--color-rule)] animate-pulse opacity-70" />
            </div>
            <div className="col-span-2 h-3 w-12 ml-auto rounded-sm bg-[color:var(--color-rule)] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
