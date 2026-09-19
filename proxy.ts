import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];
const AUTH_PATHS = ["/login"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // This runs on every request, so throwing here 500s the entire site —
  // marketing pages included. A misconfigured deploy should cost us signups,
  // not all traffic. Authorization does not depend on this: the dashboard
  // layout re-checks the user server-side and is what actually gates data.
  if (!url || !anonKey) {
    console.error(
      "[proxy] Supabase env missing — skipping session refresh. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
    return response;
  }

  let user = null;
  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refreshes the session cookie as a side effect. Every page still re-checks
    // the user itself — this is a redirect convenience, not the authorization.
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (cause) {
    console.error(
      "[proxy] session refresh failed — continuing without auth redirect",
      cause
    );
    return response;
  }

  const path = request.nextUrl.pathname;

  if (PROTECTED_PATHS.some((p) => path.startsWith(p)) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (AUTH_PATHS.some((p) => path.startsWith(p)) && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and metadata routes.
     * sitemap.xml / robots.txt must stay out of proxy — a thrown session
     * refresh here turns those into HTTP 500s even when the files are static.
     * (Next.js docs use this same exclusion list.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
