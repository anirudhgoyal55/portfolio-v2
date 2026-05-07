import Image from "next/image";
import { getTopArtists } from "@/lib/spotify";
import { siteConfig } from "../../../site.config";
import { pad2 } from "@/lib/utils";

export async function SpotifyTopArtists() {
  if (!siteConfig.integrations.spotify.enabled) return null;
  const artists = await getTopArtists(86400);
  if (!artists.length) return null;

  return (
    <ol className="space-y-3">
      {artists.map((a, i) => (
        <li key={a.url || i}>
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[1.75rem_2.5rem_1fr] items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="font-mono text-[11px] opacity-50 group-hover:text-[color:var(--color-accent)] transition-colors">
              {pad2(i + 1)}
            </span>
            {a.imageUrl ? (
              <Image
                src={a.imageUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
                unoptimized
              />
            ) : (
              <span className="block w-10 h-10 rounded-full bg-[color:var(--color-rule)]" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{a.name}</p>
              {a.genres.length > 0 && (
                <p className="text-[12px] opacity-60 truncate">
                  {a.genres.slice(0, 2).join(", ")}
                </p>
              )}
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}
