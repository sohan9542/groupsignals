"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Inbox,
  LogOut,
  Mail,
  Menu,
  Radio,
  Settings,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string; icon: LucideIcon };

const ITEMS: NavItem[] = [
  { label: "Watchlist", href: "/dashboard", icon: Radio },
  { label: "Mentions", href: "/dashboard/leads", icon: Inbox },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const ADMIN_ITEM: NavItem = { label: "Settings", href: "/dashboard/settings", icon: Settings };

/** Sidebar on desktop, slide-in drawer on mobile — one component so the nav
 *  items and the account footer are only ever defined once. */
export function DashboardNav({
  email,
  isAdmin,
  children,
}: {
  email: string;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = isAdmin ? [...ITEMS, ADMIN_ITEM] : ITEMS;

  // Drawer is a full-screen overlay on mobile — don't let the page behind it scroll too.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
  }

  const navList = (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-signal/15 text-signal-bright"
                : "text-ash hover:bg-fg/5 hover:text-fg"
            }`}
          >
            <item.icon className="size-4 shrink-0" strokeWidth={1.8} />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const accountFooter = (
    <div className="border-t border-fg/8 p-3">
      <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-signal/15 text-xs font-semibold text-signal-bright">
          {email.slice(0, 1).toUpperCase() || "?"}
        </span>
        <span className="min-w-0 flex-1 truncate text-xs text-ash-dim">{email}</span>
      </div>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
        >
          <LogOut className="size-4" strokeWidth={1.8} />
          Sign out
        </button>
      </form>
    </div>
  );

  return (
    <div className="md:flex md:min-h-dvh">
      {/* Desktop sidebar — persistent, full height. */}
      <aside className="hidden md:sticky md:top-0 md:flex md:h-dvh md:w-60 md:shrink-0 md:flex-col md:border-r md:border-fg/8 md:bg-ink-soft/60">
        <div className="flex h-16 shrink-0 items-center border-b border-fg/8 px-5">
          <Logo href="/dashboard" />
        </div>
        <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-4">
          {navList}
        </nav>
        {accountFooter}
      </aside>

      {/* Mobile top bar. */}
      <header className="flex h-14 items-center justify-between border-b border-fg/8 bg-ink-soft/60 px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-ash hover:bg-fg/5 hover:text-fg"
        >
          <Menu className="size-5" />
        </button>
        <Logo href="/dashboard" />
        <span className="size-9" aria-hidden />
      </header>

      {/* Mobile drawer. */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-fg/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-ink-soft shadow-2xl">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-fg/8 px-4">
              <Logo href="/dashboard" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-ash hover:bg-fg/5 hover:text-fg"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Dashboard" className="flex-1 overflow-y-auto px-3 py-4">
              {navList}
            </nav>
            {accountFooter}
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
