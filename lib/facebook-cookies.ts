import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const REQUIRED_COOKIE_NAMES = ["c_user", "xs"];
// A real browser export of facebook.com cookies is a few dozen entries at
// most. Anything past this is someone pasting the wrong thing.
const MAX_COOKIES = 200;
const MAX_RAW_LENGTH = 50_000;

export type FacebookCookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  [key: string]: unknown;
};

/**
 * Validates a pasted cookie export before it's ever encrypted or stored.
 * Cheap checks only — this can't tell a stale cookie from a live one, only
 * that the shape is plausible and the two cookies Facebook auth actually
 * needs (c_user, xs) are present.
 */
export function parseCookiePaste(
  raw: string
): { cookies: FacebookCookie[] } | { error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { error: "Paste your Facebook cookies first." };
  if (trimmed.length > MAX_RAW_LENGTH) {
    return { error: "That's too much text to be a cookie export — check what you copied." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return {
      error:
        "Couldn't read that as JSON. Export facebook.com cookies as JSON (e.g. the Cookie-Editor browser extension, while logged in) and paste the whole array.",
    };
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return { error: "Expected a non-empty JSON array of cookies." };
  }
  if (parsed.length > MAX_COOKIES) {
    return {
      error: `That's ${parsed.length} cookies — more than one browser export should have. Re-check what you pasted.`,
    };
  }

  const cookies: FacebookCookie[] = [];
  for (const entry of parsed) {
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof (entry as Record<string, unknown>).name !== "string" ||
      typeof (entry as Record<string, unknown>).value !== "string"
    ) {
      return { error: "Every cookie needs at least a name and a value — that export looks malformed." };
    }
    cookies.push(entry as FacebookCookie);
  }

  const names = new Set(cookies.map((c) => c.name));
  const missing = REQUIRED_COOKIE_NAMES.filter((name) => !names.has(name));
  if (missing.length > 0) {
    return {
      error: `Missing the ${missing.join(" and ")} cookie${
        missing.length > 1 ? "s" : ""
      } — make sure you exported from a logged-in facebook.com tab.`,
    };
  }

  return { cookies };
}

function encryptionKey(): Buffer {
  const raw = process.env.FACEBOOK_COOKIE_ENCRYPTION_KEY;
  if (!raw) throw new Error("FACEBOOK_COOKIE_ENCRYPTION_KEY is not set");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error(
      "FACEBOOK_COOKIE_ENCRYPTION_KEY must decode to 32 bytes — generate one with `openssl rand -base64 32`"
    );
  }
  return key;
}

/**
 * AES-256-GCM. A saved cookie set is a live, authenticated Facebook session —
 * the only thing standing between a database read and someone else's account
 * — so it never touches disk as plaintext. Format: "<iv>.<authTag>.<ciphertext>",
 * each base64.
 */
export function encryptCookies(cookies: FacebookCookie[]): string {
  const key = encryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(cookies), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv, authTag, ciphertext].map((buf) => buf.toString("base64")).join(".");
}

export function decryptCookies(payload: string): FacebookCookie[] {
  const key = encryptionKey();
  const [ivB64, tagB64, dataB64] = payload.split(".");
  if (!ivB64 || !tagB64 || !dataB64) throw new Error("Malformed cookie ciphertext");

  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(plaintext.toString("utf8")) as FacebookCookie[];
}
