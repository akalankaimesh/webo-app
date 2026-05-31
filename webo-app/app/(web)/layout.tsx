"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal, { type AuthProfile } from "../components/auth/auth-modal";

type NavItem = {
  label: string;
  href: string;
};

const AUTH_PROFILE_STORAGE_KEY = "webo.auth.profile";
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

type UserDetailsResponse = {
  user?: {
    email?: string;
    mobile?: string;
    verified?: boolean;
    hasPassword?: boolean;
    profileComplete?: boolean;
  };
  error?: string;
};

export default function WebLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showAuth, setShowAuth] = useState(false);
  const [profile, setProfile] = useState<AuthProfile | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(AUTH_PROFILE_STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw) as AuthProfile;
      return parsed?.firstName ? parsed : null;
    } catch {
      window.localStorage.removeItem(AUTH_PROFILE_STORAGE_KEY);
      return null;
    }
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [completeMobile, setCompleteMobile] = useState("");
  const [completePassword, setCompletePassword] = useState("");
  const [completeConfirmPassword, setCompleteConfirmPassword] = useState("");
  const [completeError, setCompleteError] = useState("");
  const [completeSaving, setCompleteSaving] = useState(false);
  const profileEmail = profile?.email || "";
  const navItems: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Priceing", href: "/priceing" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (!profileEmail) {
      return;
    }

    let cancelled = false;

    async function fetchUserDetails() {
      try {
        const res = await fetch(
          `${backendBaseUrl}/api/auth/user-details?email=${encodeURIComponent(profileEmail)}`
        );
        const data = (await res.json()) as UserDetailsResponse;
        if (!res.ok || !data.user || cancelled) {
          return;
        }

        const needsMobile = !(data.user.mobile || "").trim();
        const needsPassword = !data.user.hasPassword;

        setCompleteMobile(data.user.mobile || "");
        setShowProfileCompletion(needsMobile || needsPassword);
      } catch {
        // Ignore background profile checks; user can continue using the site.
      }
    }

    void fetchUserDetails();

    return () => {
      cancelled = true;
    };
  }, [profileEmail]);

  async function handleCompleteProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!profile?.email) {
      setCompleteError("Session expired. Please login again.");
      return;
    }

    if (!/^\+?\d{7,15}$/.test(completeMobile.replace(/\s/g, ""))) {
      setCompleteError("Please enter a valid mobile number.");
      return;
    }

    if (completePassword.length < 8) {
      setCompleteError("Password must be at least 8 characters.");
      return;
    }

    if (completePassword !== completeConfirmPassword) {
      setCompleteError("Passwords do not match.");
      return;
    }

    setCompleteError("");
    setCompleteSaving(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/auth/complete-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email,
          mobile: completeMobile,
          password: completePassword,
        }),
      });

      const data = (await res.json()) as UserDetailsResponse;
      if (!res.ok || !data.user) {
        setCompleteError(data.error || "Failed to update details.");
        return;
      }

      const mergedProfile: AuthProfile = {
        ...profile,
        mobile: data.user.mobile || completeMobile,
        verified: data.user.verified,
        hasPassword: data.user.hasPassword,
        profileComplete: data.user.profileComplete,
      };

      setProfile(mergedProfile);
      window.localStorage.setItem(AUTH_PROFILE_STORAGE_KEY, JSON.stringify(mergedProfile));
      setCompletePassword("");
      setCompleteConfirmPassword("");
      setShowProfileCompletion(false);
    } catch {
      setCompleteError("Failed to update details.");
    } finally {
      setCompleteSaving(false);
    }
  }

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
                      window.localStorage.removeItem(AUTH_PROFILE_STORAGE_KEY);
                      setShowUserMenu(false);
                      setShowProfileCompletion(false);
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
            window.localStorage.setItem(AUTH_PROFILE_STORAGE_KEY, JSON.stringify(data));
            setShowUserMenu(false);
            setShowProfileCompletion(Boolean(data.email && (!data.mobile || !data.hasPassword)));
            setCompleteMobile(data.mobile || "");
            setCompletePassword("");
            setCompleteConfirmPassword("");
            setCompleteError("");
          }}
        />
      )}

      {showProfileCompletion ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface-container-high/95 p-6 shadow-xl backdrop-blur-md">
            <h3 className="font-display text-2xl font-semibold text-primary">Complete Your Profile</h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              Please add your mobile number and set a password to continue using your account.
            </p>

            <form className="mt-5 flex flex-col gap-3" onSubmit={handleCompleteProfileSubmit} autoComplete="off">
              <input
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
                type="tel"
                placeholder="Mobile number"
                autoComplete="off"
                value={completeMobile}
                onChange={(e) => setCompleteMobile(e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
                type="password"
                placeholder="Set password"
                autoComplete="off"
                value={completePassword}
                onChange={(e) => setCompletePassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition"
                type="password"
                placeholder="Confirm password"
                autoComplete="off"
                value={completeConfirmPassword}
                onChange={(e) => setCompleteConfirmPassword(e.target.value)}
                required
                minLength={8}
              />

              {completeError ? <p className="text-center text-xs text-red-400">{completeError}</p> : null}

              <button
                type="submit"
                disabled={completeSaving}
                className="mt-1 rounded bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary transition hover:bg-secondary/80 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {completeSaving ? "Saving…" : "Save Details"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

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
