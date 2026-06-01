"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";
const ADMIN_SESSION_STORAGE_KEY = "webo.admin.session";

type AdminLoginResponse = {
  message?: string;
  error?: string;
  admin?: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("akalankaimesh@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("Signing in...");
    setLoading(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = (await res.json()) as AdminLoginResponse;
      if (!res.ok || !data.admin) {
        throw new Error(data.error || "Admin login failed.");
      }

      window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(data.admin));
      setStatus(data.message || "Welcome back.");
      router.replace("/admin");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Admin login failed.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-surface-container-low to-surface-container-high px-4 py-10 text-on-surface">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/20 shadow-[0_20px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border-b border-outline-variant/30 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">OmniBook Admin</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-on-surface lg:text-5xl">
              Global Admin Dashboard Overview
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-on-surface-variant">
              Control appointments, bookings, confirmations, and revenue from one glassmorphic workspace. Sign in to access
              your admin tools.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-outline-variant/30 bg-surface-container-high/30 p-4">
                <p className="text-xs uppercase tracking-wide text-on-surface-variant">Appointments Today</p>
                <p className="mt-2 font-display text-3xl font-bold text-primary">24</p>
              </div>
              <div className="rounded-lg border border-outline-variant/30 bg-surface-container-high/30 p-4">
                <p className="text-xs uppercase tracking-wide text-on-surface-variant">Pending Reviews</p>
                <p className="mt-2 font-display text-3xl font-bold text-tertiary">5</p>
              </div>
            </div>
          </section>

          <section className="p-8 lg:p-10">
            <h2 className="font-display text-3xl font-semibold text-on-surface">Admin Login</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Use your admin credentials to continue.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-on-surface-variant">Email</label>
                <input
                  type="email"
                  className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-on-surface-variant">Password</label>
                <input
                  type="password"
                  className="w-full rounded border border-outline-variant/40 bg-surface-container-low/70 px-4 py-3 text-sm text-on-surface outline-none transition focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In to Admin"}
              </button>

              {status ? <p className="text-center text-xs text-primary">{status}</p> : null}
              {error ? <p className="text-center text-xs text-error">{error}</p> : null}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
