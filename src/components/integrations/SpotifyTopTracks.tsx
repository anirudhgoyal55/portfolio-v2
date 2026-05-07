import Image from "next/image";
import { getTopTracks } from "@/lib/spotify";
import { siteConfig } from "../../../site.config";
import { pad2 } from "@/lib/utils";

export async function SpotifyTopTracks() {
  if (!siteConfig.integrations.spotify.enabled) return null;
  const tracks = await getTopTracks(86400);
  if (!tracks.length) return null;

  return (
    <ol className="space-y-3">
      {tracks.map((t, i) => (
        <li key={t.songUrl || i}>
          <a
            href={t.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[1.75rem_2.5rem_1fr] items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="font-mono text-[11px] opacity-50">{pad2(i + 1)}</span>
            {t.albumImageUrl ? (
              <Image
                src={t.albumImageUrl}
                alt=""
                width={40}
                height={40}
                className="rounded-sm"
                unoptimized
              />
            ) : (
              <span className="block w-10 h-10 bg-[color:var(--color-rule)]" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{t.title}</p>
              <p className="text-[12px] opacity-60 truncate">{t.artist}</p>
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}
