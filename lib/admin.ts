/**
 * Single owner-operator account. Hardcoded rather than an is_admin column or
 * role table because there is exactly one admin and it isn't expected to
 * change often — a schema for that would be pure ceremony right now.
 * Override with ADMIN_EMAIL only if you actually need a different admin in a
 * given environment (e.g. staging).
 */
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "foundersohan@gmail.com").toLowerCase();

export function isAdmin(email: string | null | undefined): boolean {
  return typeof email === "string" && email.toLowerCase() === ADMIN_EMAIL;
}
