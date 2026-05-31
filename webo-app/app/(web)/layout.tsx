"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal, { type AuthProfile } from "../components/auth/auth-modal";

type NavItem = {
  label: string;
  href: string;
};

export default function WebLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showAuth, setShowAuth] = useState(false);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navItems: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Priceing", href: "/priceing" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen text-on-background">
      <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/10 bg-white/5 px-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-2xl font-black text-primary">
            OmniBook
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "border-b-2 border-secondary pb-1 text-sm font-bold text-secondary"
                      : "rounded px-2 py-1 text-sm text-on-surface-variant hover:bg-white/10 hover:text-primary"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:flex">
            <input
              className="w-28 bg-transparent text-sm text-on-surface outline-none"
              placeholder="Search..."
              type="text"
            />
          </div>
          {profile ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5"
                aria-haspopup="menu"
                aria-expanded={showUserMenu}
              >
                {profile.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.picture} alt={profile.firstName} className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                    {profile.firstName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-on-surface">{profile.firstName}</span>
                <span className="pr-1 text-xs text-on-surface-variant">▾</span>
              </button>

              {showUserMenu ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-surface-container-high/95 p-1.5 shadow-xl backdrop-blur-md"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfile(null);
                      setShowUserMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <button onClick={() => setShowAuth(true)} className="rounded px-3 py-1.5 text-sm text-primary hover:bg-white/10">Login</button>
              <button onClick={() => setShowAuth(true)} className="rounded bg-secondary px-4 py-1.5 text-sm font-semibold text-on-secondary hover:bg-secondary/80">
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuthSuccess={(data) => {
            setProfile(data);
          }}
        />
      )}

      <main className="flex flex-col">{children}</main>

      <footer className="mt-[80px] w-full border-t border-white/10 bg-surface-container-highest/30 px-4 pb-[48px] pt-[80px] backdrop-blur-md md:px-[48px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mb-[80px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-[80px] lg:grid-cols-4">
            <div className="flex flex-col gap-[24px]">
              <span className="font-display text-2xl font-black text-primary">OmniBook</span>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Empowering salons and wellness centers with professional booking and management solutions. Your beauty, our priority.
              </p>
            </div>

            <div>
              <h4 className="mb-[24px] font-mono text-xs uppercase tracking-wider text-primary">Legal</h4>
              <ul className="flex flex-col gap-[12px]">
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    Cookies Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-[24px] font-mono text-xs uppercase tracking-wider text-primary">Help</h4>
              <ul className="flex flex-col gap-[12px]">
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    Support
                  </a>
                </li>
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-[24px] font-mono text-xs uppercase tracking-wider text-primary">Follow Us</h4>
              <div className="flex gap-[24px]">
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition-all hover:bg-white/10 hover:text-primary"
                  href="#"
                  aria-label="Website"
                >
                  <span className="text-[20px]">◎</span>
                </a>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition-all hover:bg-white/10 hover:text-primary"
                  href="#"
                  aria-label="Share"
                >
                  <span className="text-[18px]">⇄</span>
                </a>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition-all hover:bg-white/10 hover:text-primary"
                  href="#"
                  aria-label="Chat"
                >
                  <span className="text-[18px]">◍</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-[48px] text-center">
            <p className="font-mono text-xs text-on-surface-variant">© 2024 OmniBook SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
