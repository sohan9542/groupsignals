import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Sign in", href: "/login" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
];

export function Footer() {
  return (
    <footer className="border-t border-fg/8 bg-ink-soft/60">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo href="/" />
            <p className="mt-4 text-sm leading-relaxed text-ash-dim">
              Facebook group leads for home service pros, sent to your inbox.
            </p>
            <p className="mt-4 inline-flex max-w-full text-pretty rounded-lg border border-fg/8 bg-fg/5 px-3 py-1.5 text-xs text-ash">
              Lead Generation for Plumbers, HVAC & Electricians
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ash transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-fg/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash-dim">
            © {new Date().getFullYear()} GroupSignal. All rights reserved. Not
            affiliated with or endorsed by Meta Platforms, Inc.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ash-dim transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
