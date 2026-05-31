'use client';

import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type GoogleAuthApiResponse = {
  message?: string;
  error?: string;
  user?: AuthUser;
};

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

export default function GoogleAuthCard() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<string>('Sign in with Google to continue.');
  const [error, setError] = useState<string>('');

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;

    if (!token) {
      setError('Google did not return a credential token. Please try again.');
      return;
    }

    setError('');
    setStatus('Verifying your Google account...');

    try {
      const response = await fetch(`${backendBaseUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = (await response.json()) as GoogleAuthApiResponse;

      if (!response.ok || !data.user) {
        throw new Error(data.error || 'Google login failed.');
      }

      setUser(data.user);
      setStatus(data.message || 'Google login successful.');
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : 'Unable to complete Google login.';
      setUser(null);
      setStatus('Sign in failed.');
      setError(message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError('');
    setStatus('Signed out. Sign in again when you are ready.');
  };

  if (!googleClientId) {
    return (
      <section className="w-full rounded-2xl border border-amber-300/50 bg-amber-200/10 p-6 text-amber-100">
        <h2 className="font-display text-xl font-semibold">Google client ID is missing</h2>
        <p className="mt-2 text-sm text-amber-100/90">
          Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in webo-app/.env.local and restart the Next.js server.
        </p>
      </section>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <section className="w-full rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_14px_50px_rgba(2,8,23,0.35)] backdrop-blur-xl">
        <h2 className="font-display text-2xl font-semibold text-on-surface">Google Authentication</h2>
        <p className="mt-2 text-sm text-on-surface-variant">{status}</p>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-300/40 bg-red-300/10 px-3 py-2 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        {!user ? (
          <div className="mt-5">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                setError('');
                setStatus('One Tap is unavailable in this browser session. Use the Sign in with Google button.');
              }}
            //   useOneTap
            />
            <p className="mt-3 text-xs text-zinc-500">
              One Tap can be blocked by browser privacy settings, dismissed prompts, or Google session state.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              {user.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt={user.name || 'Google user profile'}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {user.name?.slice(0, 1).toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <p className="text-base font-medium text-on-surface">{user.name || 'Google User'}</p>
                <p className="text-sm text-on-surface-variant">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-on-surface hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        )}
      </section>
    </GoogleOAuthProvider>
  );
}
