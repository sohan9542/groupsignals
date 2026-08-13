import { ADMIN_EMAIL } from "./admin";

const RESEND_BASE = "https://api.resend.com/emails";

function escapeHtml(input: string): string {
  return input.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

async function send(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error("EMAIL_FROM is not set");

  const response = await fetch(RESEND_BASE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend send failed (${response.status}): ${detail.slice(0, 300)}`);
  }
}

export async function sendLeadAlert(options: {
  to: string;
  sourceName: string;
  content: string;
  postUrl: string | null;
  authorName: string | null;
  reason: string;
}): Promise<void> {
  const subject = `New lead in ${options.sourceName}`;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;">
      <p style="color:#111;font-size:15px;line-height:1.5;">
        Someone posted in <strong>${escapeHtml(options.sourceName)}</strong> that matches what you're watching for:
      </p>
      <p style="color:#666;font-size:13px;font-style:italic;">${escapeHtml(options.reason)}</p>
      <blockquote style="border-left:3px solid #10b981;margin:16px 0;padding:4px 16px;color:#222;font-size:14px;white-space:pre-wrap;">${escapeHtml(
        options.content
      ).slice(0, 4000)}</blockquote>
      ${
        options.authorName
          ? `<p style="color:#777;font-size:13px;">— ${escapeHtml(options.authorName)}</p>`
          : ""
      }
      ${
        options.postUrl
          ? `<p><a href="${escapeHtml(options.postUrl)}" style="color:#10b981;font-size:14px;">Open the post →</a></p>`
          : ""
      }
    </div>
  `;
  await send(options.to, subject, html);
}

/** Fires when a scan run using a pooled cookie fails and that cookie gets
 *  marked banned — see app/api/apify/webhook/route.ts. */
export async function sendAdminCookieAlert(options: {
  cookieName: string;
  error: string;
}): Promise<void> {
  const subject = `Facebook cookie "${options.cookieName}" looks dead`;
  const html = `
    <p style="font-family:-apple-system,Segoe UI,sans-serif;font-size:14px;color:#111;">
      A scan using the "<strong>${escapeHtml(options.cookieName)}</strong>" cookie failed and it's
      been marked <strong>banned</strong> in Settings.
    </p>
    <p style="font-family:-apple-system,Segoe UI,sans-serif;font-size:13px;color:#666;">${escapeHtml(
      options.error
    )}</p>
    <p style="font-family:-apple-system,Segoe UI,sans-serif;font-size:14px;color:#111;">
      Replace it when you get a chance — private-group scans skip banned cookies, so the pool is
      just smaller until you do.
    </p>
  `;
  await send(ADMIN_EMAIL, subject, html);
}
