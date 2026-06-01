"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type AdminSession = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const ADMIN_SESSION_STORAGE_KEY = "webo.admin.session";

const navItems = [
  { label: "Home", href: "/admin", icon: "⌂" },
  { label: "Categories", href: "/admin/categories", icon: "◫" },
  { label: "Calendar", href: "#", icon: "◷" },
  { label: "Bookings", href: "#", icon: "☰" },
  { label: "Website Builder", href: "#", icon: "⌘" },
  { label: "Settings", href: "#", icon: "⚙" },
];

const pageTitles: Record<string, string> = {
  "/admin": "Overview",
  "/admin/categories": "Categories",
};

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin] = useState<AdminSession | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as AdminSession;
      return parsed?.email ? parsed : null;
    } catch {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (!admin) {
      window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      router.replace("/admin/login");
    }
  }, [admin, router]);

  if (!admin) {
    return <div className="min-h-screen bg-surface" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-container-low to-surface-container-high text-on-surface antialiased">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
        <nav className="hidden h-full flex-col border-r border-outline-variant/30 bg-surface-container-lowest/20 py-6 shadow-[4px_0_24px_rgba(0,0,0,0.2)] backdrop-blur-xl md:flex">
          <div className="mb-12 px-6">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-on-surface">OmniBook Admin</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-on-surface-variant">Business Manager</p>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    isActive
                      ? "flex items-center rounded border-l-4 border-primary bg-primary/10 px-3 py-2 text-sm font-bold text-primary"
                      : "flex items-center rounded border-l-4 border-transparent px-3 py-2 text-sm text-on-surface-variant transition-all hover:bg-surface-variant/30 hover:text-on-surface"
                  }
                >
                  <span className="mr-3 inline-flex h-5 w-5 items-center justify-center text-sm">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="px-6 pb-6">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90"
            >
              + New Booking
            </button>
          </div>

          <div className="space-y-1 border-t border-outline-variant/30 px-3 pt-3">
            <a
              href="#"
              className="flex items-center rounded border-l-4 border-transparent px-3 py-2 text-sm text-on-surface-variant transition-all hover:bg-surface-variant/30 hover:text-on-surface"
            >
              <span className="mr-3 inline-flex h-5 w-5 items-center justify-center text-sm">?</span>
              Help
            </a>
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
                router.replace("/admin/login");
              }}
              className="flex w-full items-center rounded border-l-4 border-transparent px-3 py-2 text-left text-sm text-on-surface-variant transition-all hover:bg-surface-variant/30 hover:text-on-surface"
            >
              <span className="mr-3 inline-flex h-5 w-5 items-center justify-center text-sm">↪</span>
              Logout
            </button>
          </div>
        </nav>

        <main className="min-h-screen w-full overflow-x-hidden">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest/20 px-4 py-3 shadow-md backdrop-blur-xl md:px-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-on-surface md:text-3xl">{pageTitles[pathname] || "Admin"}</h2>
              <p className="text-sm text-on-surface-variant">Here&apos;s what&apos;s happening with your business today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-on-surface">{admin.name}</p>
                <p className="text-xs text-on-surface-variant">{admin.role.replace("_", " ")}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                {admin.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <section className="px-4 pb-12 pt-8 md:px-6">{children}</section>
        </main>
      </div>
    </div>
  );
}
