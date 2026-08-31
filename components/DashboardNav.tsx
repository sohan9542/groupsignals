"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreditCard, Inbox, LogOut, Mail, Radio, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = { label: string; href: string; icon: LucideIcon };

const ITEMS: NavItem[] = [
  { label: "Watchlist", href: "/dashboard", icon: Radio },
  { label: "Leads", href: "/dashboard/leads", icon: Inbox },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const ADMIN_ITEM: NavItem = { label: "Settings", href: "/dashboard/settings", icon: Settings };

export function DashboardNav({ email, isAdmin }: { email: string; isAdmin: boolean }) {
  const pathname = usePathname();
  const items = isAdmin ? [...ITEMS, ADMIN_ITEM] : ITEMS;

  return (
    <div className="flex flex-col gap-4 border-b border-fg/8 pb-4 lg:flex-row lg:items-center lg:justify-between lg:pb-0">
      <nav aria-label="Dashboard" className="-mx-1 overflow-x-auto">
        <ul className="flex items-center gap-1 px-1">
          {items.map((item) => {
            // /dashboard would otherwise light up on every child route.
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-signal/15 text-signal-bright"
                      : "text-ash hover:bg-fg/5 hover:text-fg"
                  }`}
                >
                  <item.icon className="size-4" strokeWidth={1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3 px-1">
        <span className="truncate text-xs text-ash-dim">{email}</span>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-lg border border-fg/10 px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:bg-fg/5 hover:text-fg"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
