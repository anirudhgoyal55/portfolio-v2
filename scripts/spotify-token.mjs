#!/usr/bin/env node
/**
 * One-time Spotify OAuth helper.
 *
 * Usage:
 *   1. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
 *      (create app at https://developer.spotify.com/dashboard, add
 *      redirect URI: http://127.0.0.1:8765/callback   ← loopback IP, NOT "localhost")
 *   2. Run: node scripts/spotify-token.mjs
 *   3. Open the URL printed in your terminal, authorize
 *   4. Copy the printed refresh token into .env.local as SPOTIFY_REFRESH_TOKEN
 */

import http from "node:http";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

// Tiny .env.local loader (no extra deps)
try {
  const env = readFileSync(".env.local", "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8765;
// Spotify requires loopback IP form (not "localhost") for non-HTTPS redirects.
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-top-read user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local",
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT,
  }).toString();

console.log("\nOpen this URL to authorize:\n\n  " + authUrl + "\n");

const opener = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
spawn(opener, [authUrl], { stdio: "ignore", shell: true }).unref();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }
  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Missing code");
    return;
  }
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });
  const json = await tokenRes.json();
  res.writeHead(200, { "Content-Type": "text/html" }).end(
    "<h1>Done.</h1><p>Check your terminal. You can close this tab.</p>",
  );

  console.log("\nRefresh token:\n");
  console.log("  " + json.refresh_token + "\n");
  console.log("Add this to .env.local as SPOTIFY_REFRESH_TOKEN.\n");
  server.close();
});

server.listen(PORT);
