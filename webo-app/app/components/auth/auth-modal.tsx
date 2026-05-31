"use client";

import { useState } from "react";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GlassButton, GlassPanel } from "../design-system";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

type View = "login" | "register";
type LoginTab = "google" | "password";

type ApiResponse = {
  message?: string;
  error?: string;
  user?: {
    name?: string;
    email?: string;
    picture?: string;
  };
};

export type AuthProfile = {
  firstName: string;
  picture?: string;
};

type Props = {
  onClose: () => void;
  onAuthSuccess: (profile: AuthProfile) => void;
};

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface-variant transition hover:bg-white/15 hover:text-primary"
    >
      ✕
    </button>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "border-b-2 border-secondary pb-1 text-sm font-bold text-secondary"
          : "pb-1 text-sm text-on-surface-variant hover:text-on-surface"
      }
    >
      {children}
    </button>
  );
}

export default function AuthModal({ onClose, onAuthSuccess }: Props) {
  const [view, setView] = useState<View>("login");
  const [loginTab, setLoginTab] = useState<LoginTab>("google");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  function resetState() {
    setStatus("");
    setError("");
    setLoading(false);
  }

  function switchView(v: View) {
    resetState();
    setView(v);
  }

  function getFirstName(name?: string, email?: string) {
    if (name && name.trim()) {
      return name.trim().split(" ")[0];
    }

    if (email && email.includes("@")) {
      return email.split("@")[0];
    }

    return "User";
  }

  // ── Google login ──────────────────────────────────────────────────────────
  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      setError("Google did not return a credential. Please try again.");
      return;
    }
    setError("");
    setStatus("Verifying Google account…");
    setLoading(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "Google login failed.");
      setStatus(data.message || "Signed in successfully.");
      onAuthSuccess({
        firstName: getFirstName(data.user?.name, data.user?.email),
        picture: data.user?.picture,
      });
      setTimeout(onClose, 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  // ── Email / password login ────────────────────────────────────────────────
  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setStatus("Signing in…");
    setLoading(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "Login failed.");
      setStatus(data.message || "Signed in successfully.");
      onAuthSuccess({
        firstName: getFirstName(data.user?.name, data.user?.email || loginEmail),
        picture: data.user?.picture,
      });
      setTimeout(onClose, 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  // ── Registration ──────────────────────────────────────────────────────────
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!regName || !regEmail || !regMobile || !regPassword || !regConfirm) {
      setError("Please fill in all required fields.");
      return;
    }
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^\+?\d{7,15}$/.test(regMobile.replace(/\s/g, ""))) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError("");
    setStatus("Creating account…");
    setLoading(true);

    try {
      const res = await fetch(`${backendBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          mobile: regMobile,
          password: regPassword,
        }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) throw new Error(data.error || "Registration failed.");
      setStatus(data.message || "Account created! Please sign in.");
      setTimeout(() => switchView("login"), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <GlassPanel className="relative w-full max-w-md rounded-2xl p-8">
        <CloseButton onClick={onClose} />

        {view === "login" ? (
          <>
            <h2 className="font-display text-3xl font-semibold text-primary">Welcome back</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Sign in to your OmniBook account.</p>

            {/* Tab row */}
            <div className="mt-5 flex gap-5 border-b border-white/10 pb-0.5">
              <TabButton active={loginTab === "google"} onClick={() => { setLoginTab("google"); resetState(); }}>
                Continue with Google
              </TabButton>
              <TabButton active={loginTab === "password"} onClick={() => { setLoginTab("password"); resetState(); }}>
                Email & Password
              </TabButton>
            </div>

            <div className="mt-6">
              {loginTab === "google" ? (
                <div className="flex flex-col gap-3">
                  {googleClientId ? (
                    <GoogleOAuthProvider clientId={googleClientId}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google login failed. Please try again.")}
                        useOneTap={false}
                        width="100%"
                      />
                    </GoogleOAuthProvider>
                  ) : (
                    <p className="rounded-xl border border-amber-300/40 bg-amber-200/10 px-4 py-3 text-xs text-amber-200">
                      NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set in .env.local.
                    </p>
                  )}
                </div>
              ) : (
                <form className="flex flex-col gap-3" onSubmit={handlePasswordLogin}>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="Email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <input
                    className={inputClass}
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <GlassButton variant="primary" type="submit" className="mt-1 w-full" >
                    {loading ? "Signing in…" : "Sign In"}
                  </GlassButton>
                </form>
              )}
            </div>

            {status && <p className="mt-3 text-center text-xs text-primary">{status}</p>}
            {error && <p className="mt-3 text-center text-xs text-red-400">{error}</p>}

            <p className="mt-5 text-center text-xs text-on-surface-variant">
              New to OmniBook?{" "}
              <button
                type="button"
                className="text-secondary hover:underline"
                onClick={() => switchView("register")}
              >
                Create an account
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl font-semibold text-primary">Create account</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Join OmniBook to book and manage appointments.</p>

            <form className="mt-6 flex flex-col gap-3" onSubmit={handleRegister}>
              <input
                className={inputClass}
                type="text"
                placeholder="Full name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Email address"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-on-surface-variant">
                  +94
                </span>
                <input
                  className={inputClass}
                  type="tel"
                  placeholder="Mobile number (required)"
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value)}
                  required
                  pattern="[\d\s\+\-]{7,15}"
                  title="Enter a valid mobile number"
                />
              </div>
              <input
                className={inputClass}
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                minLength={8}
              />
              <input
                className={inputClass}
                type="password"
                placeholder="Confirm password"
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
                required
                minLength={8}
              />
              <GlassButton variant="primary" type="submit" className="mt-1 w-full">
                {loading ? "Creating account…" : "Create Account"}
              </GlassButton>
            </form>

            {status && <p className="mt-3 text-center text-xs text-primary">{status}</p>}
            {error && <p className="mt-3 text-center text-xs text-red-400">{error}</p>}

            <p className="mt-5 text-center text-xs text-on-surface-variant">
              Already have an account?{" "}
              <button
                type="button"
                className="text-secondary hover:underline"
                onClick={() => switchView("login")}
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </GlassPanel>
    </div>
  );
}
