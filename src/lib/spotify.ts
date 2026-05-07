/**
 * Spotify Web API client — refresh-token OAuth flow.
 *
 * Setup (one-time):
 *  1. Create app at https://developer.spotify.com/dashboard
 *  2. Add redirect URI http://localhost:3000/callback
 *  3. Run: node scripts/spotify-token.mjs (interactive, prints refresh token)
 *  4. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN in .env.local
 *
 * All exports return null gracefully if env vars are missing — site never breaks.
 */

import "server-only";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10";

export type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
} | null;

export type TopTrack = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

function isConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

async function getAccessToken(): Promise<string | null> {
  if (!isConfigured()) return null;
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

export async function getNowPlaying(
  revalidateSeconds = 60,
): Promise<NowPlaying> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: revalidateSeconds, tags: ["spotify-now"] },
    });
    if (res.status === 204 || res.status > 400) {
      return { isPlaying: false } as NowPlaying;
    }
    const data = (await res.json()) as {
      is_playing?: boolean;
      item?: {
        name?: string;
        artists?: Array<{ name: string }>;
        album?: { name?: string; images?: Array<{ url: string }> };
        external_urls?: { spotify?: string };
      };
    };
    if (!data.item) return { isPlaying: false } as NowPlaying;
    return {
      isPlaying: Boolean(data.is_playing),
      title: data.item.name ?? "",
      artist:
        data.item.artists?.map((a) => a.name).join(", ") ?? "",
      album: data.item.album?.name ?? "",
      albumImageUrl: data.item.album?.images?.[0]?.url ?? "",
      songUrl: data.item.external_urls?.spotify ?? "",
    };
  } catch {
    return null;
  }
}

export async function getTopTracks(
  revalidateSeconds = 86400,
): Promise<TopTrack[]> {
  const token = await getAccessToken();
  if (!token) return [];
  try {
    const res = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: revalidateSeconds, tags: ["spotify-top"] },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      items?: Array<{
        name?: string;
        artists?: Array<{ name: string }>;
        album?: { name?: string; images?: Array<{ url: string }> };
        external_urls?: { spotify?: string };
      }>;
    };
    return (data.items ?? []).map((t) => ({
      title: t.name ?? "",
      artist: t.artists?.map((a) => a.name).join(", ") ?? "",
      album: t.album?.name ?? "",
      albumImageUrl: t.album?.images?.[0]?.url ?? "",
      songUrl: t.external_urls?.spotify ?? "",
    }));
  } catch {
    return [];
  }
}
