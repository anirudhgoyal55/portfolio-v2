"use server";

import { siteConfig } from "../../../site.config";

type Result = { ok: boolean; error?: string };

/**
 * Server action to send a contact message.
 *
 * If RESEND_API_KEY + CONTACT_EMAIL_TO are set, sends via Resend.
 * Otherwise returns an error pointing the user to a mailto link.
 */
export async function sendMessage(formData: FormData): Promise<Result> {
  const honeypot = String(formData.get("honeypot") ?? "");
  if (honeypot) {
    // Silent success — bot doesn't need to know
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Missing fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || siteConfig.email;

  if (!apiKey) {
    return {
      ok: false,
      error: "Email delivery not configured. Try emailing directly.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <portfolio@${siteConfig.domain}>`,
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Mail provider rejected: ${res.status} ${detail.slice(0, 100)}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
