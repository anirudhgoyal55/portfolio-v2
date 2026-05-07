"use server";

import { siteConfig } from "../../../site.config";

type Result = { ok: boolean; error?: string };

/**
 * Contact form server action.
 *
 * Tries every configured channel in this order, returns success if ANY
 * delivers. Configure as many or as few as you want via .env.local.
 *
 *   1. Telegram bot push (instant phone notification, free, no infra)
 *      env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *
 *   2. Resend email
 *      env: RESEND_API_KEY, CONTACT_EMAIL_TO
 *
 *   3. Mailto fallback (just shows the user the error message; the
 *      contact page already has a mailto: link in the body)
 *
 * Honeypot anti-spam: hidden field "honeypot" — if filled, return silent
 * success without sending anything.
 */

async function sendViaTelegram(
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = [
    `*New contact from ${name}*`,
    "",
    `📧 ${email}`,
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

async function sendViaResend(
  name: string,
  email: string,
  message: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || siteConfig.email;
  if (!apiKey) return { ok: false, error: "resend-not-configured" };

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
        error: `resend-${res.status}: ${detail.slice(0, 100)}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "resend-unknown",
    };
  }
}

export async function sendMessage(formData: FormData): Promise<Result> {
  const honeypot = String(formData.get("honeypot") ?? "");
  if (honeypot) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Missing fields." };
  }

  // Try Telegram first (instant push). If unavailable or fails silently,
  // fall through to Resend.
  const telegramSent = await sendViaTelegram(name, email, message);
  const resendResult = await sendViaResend(name, email, message);

  if (telegramSent || resendResult.ok) return { ok: true };

  if (!process.env.TELEGRAM_BOT_TOKEN && !process.env.RESEND_API_KEY) {
    return {
      ok: false,
      error: "No delivery channel configured. Try emailing directly.",
    };
  }

  return {
    ok: false,
    error:
      "error" in resendResult
        ? `Could not deliver: ${resendResult.error}`
        : "Could not deliver. Please email directly.",
  };
}
