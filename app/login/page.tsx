import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 signal-glow" />

      <Navbar loggedIn={false} />

      <main className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-12 pt-32 sm:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to GroupSignal
        </h1>
        <p className="mt-2 text-sm text-ash">
          We&apos;ll email you a link. No password to remember — and if you
          don&apos;t have an account yet, this creates one.
        </p>

        <div className="mt-8 rounded-2xl border border-fg/10 bg-surface/60 p-6">
          {/* LoginForm reads ?next= via useSearchParams, which opts the subtree
              into client rendering and needs a boundary to prerender around. */}
          <Suspense fallback={<div className="h-[9.5rem]" />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
