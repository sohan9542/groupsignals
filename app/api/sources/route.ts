import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { SOURCE_LIMIT, parseKeywords, parseSourceUrl } from "@/lib/sources";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  let body: { url?: unknown; include?: unknown; exclude?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.url !== "string") {
    return NextResponse.json({ ok: false, error: "Paste a link first." }, { status: 400 });
  }

  const parsed = parseSourceUrl(body.url);
  if ("error" in parsed) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  // Checked here rather than in the DB so the message can name the limit.
  const { count, error: countError } = await supabase
    .from("watch_sources")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (countError) {
    return NextResponse.json({ ok: false, error: countError.message }, { status: 500 });
  }

  if ((count ?? 0) >= SOURCE_LIMIT) {
    return NextResponse.json(
      { ok: false, error: `You're watching ${SOURCE_LIMIT} sources already. Remove one to add another.` },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("watch_sources")
    .insert({
      user_id: user.id,
      platform: parsed.platform,
      url: parsed.url,
      name: parsed.name,
      include_keywords: parseKeywords(typeof body.include === "string" ? body.include : ""),
      exclude_keywords: parseKeywords(typeof body.exclude === "string" ? body.exclude : ""),
    })
    .select()
    .single();

  if (error) {
    // 23505 = unique_violation on (user_id, url).
    if (error.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "You're already watching that one." },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: data });
}
