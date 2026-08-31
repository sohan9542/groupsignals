"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "What You Get", href: "#what-you-get" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The open mobile sheet covers the page, so freeze the body behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-fg/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
          >
            Sign in
          </a>
          <a
            href="/login"
            className="rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-on-signal shadow-[0_0_24px_-4px_var(--color-signal)] transition hover:bg-signal-bright hover:shadow-[0_0_32px_-2px_var(--color-signal)]"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-fg transition-colors hover:bg-fg/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-fg/10 bg-ink/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 border-t border-fg/10 pt-4">
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-fg/10 px-4 py-2.5 text-center text-sm font-medium text-fg transition-colors hover:bg-fg/5"
              >
                Sign in
              </a>
              <a
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-signal px-4 py-2.5 text-center text-sm font-semibold text-on-signal shadow-[0_0_24px_-4px_var(--color-signal)]"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
