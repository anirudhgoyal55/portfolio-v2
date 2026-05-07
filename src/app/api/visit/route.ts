/**
 * Visitor counter — Upstash REST, raw fetch, no SDK dependency.
 *
 * Setup (optional): create a Redis at console.upstash.com (free tier),
 * then set:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Without env vars the route returns `{ count: null }` and the
 * <VisitorCounter /> component renders nothing.
 *
 * GET   → just read the current count (no increment)
 * POST  → increment + return the new count (called once per browser per day)
 */

import { NextResponse } from "next/server";

export const runtime = "edge";

async function upstash(command: string[]): Promise<unknown | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/${command.join("/")}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: unknown };
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const result = await upstash(["get", "visitors"]);
  const count = result === null ? null : Number(result);
  return NextResponse.json({ count }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST() {
  const result = await upstash(["incr", "visitors"]);
  const count = result === null ? null : Number(result);
  return NextResponse.json({ count }, {
    headers: { "Cache-Control": "no-store" },
  });
}
