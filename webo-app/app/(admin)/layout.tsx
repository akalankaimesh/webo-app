import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-surface-container-lowest/40 p-5 backdrop-blur-xl">
          <h1 className="font-display text-2xl font-semibold text-primary">OmniBook Admin</h1>
          <p className="mt-1 text-xs text-on-surface-variant">Dashboard Workspace</p>
          <nav className="mt-6 space-y-2 text-sm">
            <a href="/admin" className="block rounded-lg bg-primary/15 px-3 py-2 text-primary">
              Overview
            </a>
            <a href="#" className="block rounded-lg px-3 py-2 text-on-surface-variant hover:bg-white/5 hover:text-on-surface">
              Bookings
            </a>
            <a href="#" className="block rounded-lg px-3 py-2 text-on-surface-variant hover:bg-white/5 hover:text-on-surface">
              Customers
            </a>
            <a href="#" className="block rounded-lg px-3 py-2 text-on-surface-variant hover:bg-white/5 hover:text-on-surface">
              Settings
            </a>
          </nav>
        </aside>

        <section className="flex flex-col">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-surface/70 px-5 py-4 backdrop-blur-md">
            <p className="font-display text-xl font-semibold text-on-surface">Admin Dashboard</p>
          </header>
          <main className="flex-1 p-5 md:p-8">{children}</main>
        </section>
      </div>
    </div>
  );
}
