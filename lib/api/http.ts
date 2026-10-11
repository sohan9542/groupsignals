import { NextResponse } from "next/server";

/** Consistent JSON error shape used by every authenticated API route. */
export function apiError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Consistent JSON success shape (`{ ok: true, ...data }`). */
export function apiOk<T extends Record<string, unknown>>(data?: T) {
  return NextResponse.json({ ok: true, ...(data ?? {}) });
}

/**
 * Parse a JSON request body. Returns a typed failure response on invalid JSON
 * so callers don't each re-implement the same try/catch.
 */
export async function parseJsonBody<T>(
  request: Request
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  try {
    return { ok: true, data: (await request.json()) as T };
  } catch {
    return { ok: false, response: apiError("Invalid request.", 400) };
  }
}
