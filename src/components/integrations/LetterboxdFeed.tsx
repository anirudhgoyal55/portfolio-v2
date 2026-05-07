import Image from "next/image";
import { getRecentFilms } from "@/lib/letterboxd";
import { siteConfig } from "../../../site.config";

export async function LetterboxdFeed({ limit = 8 }: { limit?: number }) {
  if (!siteConfig.integrations.letterboxd.enabled) return null;
  const films = await getRecentFilms(
    limit,
    siteConfig.integrations.letterboxd.revalidateSeconds,
  );
  if (!films.length) return null;

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {films.map((f) => (
        <li key={f.url}>
          <a
            href={f.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            {f.posterUrl ? (
              <Image
                src={f.posterUrl}
                alt={f.filmTitle}
                width={150}
                height={225}
                className="w-full aspect-[2/3] object-cover rounded-sm"
                unoptimized
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-[color:var(--color-rule)] rounded-sm" />
            )}
            <div className="mt-2">
              <p className="text-sm font-medium leading-tight truncate">
                {f.filmTitle}
              </p>
              <p className="font-mono text-[11px] opacity-60">
                {f.filmYear}
                {f.rating ? ` · ${f.rating}/5` : ""}
                {f.rewatch ? " · rewatch" : ""}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
