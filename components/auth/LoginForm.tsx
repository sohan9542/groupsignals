"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "error";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    // Where to land after the link is clicked. Kept as a path, never a full
    // URL from the query string, so this can't be turned into an open redirect.
    const next = searchParams.get("next");
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-signal/15">
          <MailCheck className="size-5 text-signal-bright" />
        </span>
        <p className="mt-4 text-sm font-semibold text-fg">Check your email</p>
        <p className="mt-1.5 text-sm text-ash">
          We sent a sign-in link to {email}. It expires in an hour.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-ash-dim underline underline-offset-4 hover:text-fg"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-email" className="block text-sm font-medium text-fg">
        Email address
      </label>
      <input
        id="login-email"
        type="email"
        required
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="mt-2 w-full rounded-xl border border-fg/12 bg-fg/5 px-4 py-3.5 text-sm text-fg placeholder:text-ash-dim focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/25"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3.5 text-sm font-semibold text-on-signal transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Email me a sign-in link
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {message}
        </p>
      )}
    </form>
  );
}
