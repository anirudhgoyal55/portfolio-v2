/**
 * Public endpoint for the persistent Spotify player.
 * Returns the same NowPlaying shape as our server component, but fetchable
 * from a client polling loop so the bottom-right player can update without
 * a full page nav.
 *
 * Falls back to last-played when nothing's currently playing, so the player
 * always has something to show.
 */

import { NextResponse } from "next/server";
import { getNowPlaying, getLastPlayed } from "@/lib/spotify";

export const runtime = "edge";
export const revalidate = 30;

export async function GET() {
  const live = await getNowPlaying(30);
  if (live && live.isPlaying && live.title) {
    return NextResponse.json({ ...live }, {
      headers: { "Cache-Control": "public, max-age=30, s-maxage=30" },
    });
  }
  const last = await getLastPlayed(60);
  if (last) {
    return NextResponse.json({ ...last, isPlaying: false }, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    });
  }
  return NextResponse.json({ isPlaying: false }, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
  });
}
