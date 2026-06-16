"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clapperboard, Menu, X } from "lucide-react";

interface SessionUser {
  fullName: string;
}

export default function Navbar() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-paper">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            CineQuest
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#schedule" className="text-sm font-medium text-ink-soft hover:text-ink">
            Schedule
          </Link>
          <Link href="/#tracks" className="text-sm font-medium text-ink-soft hover:text-ink">
            Workshop Tracks
          </Link>
          <Link href="/#competition" className="text-sm font-medium text-ink-soft hover:text-ink">
            Reel Competition
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-ink-soft hover:text-ink">
            FAQ
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-indigo px-5 py-2 text-sm font-semibold text-paper shadow-sm transition hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                Hi, {user.fullName.split(" ")[0]}
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-indigo px-5 py-2 text-sm font-semibold text-paper shadow-sm transition hover:opacity-90"
              >
                Reel Competition Form
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
              >
                Log out
              </button>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-paper px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link href="/#schedule" className="py-1 text-sm font-medium text-ink-soft" onClick={() => setMenuOpen(false)}>
              Schedule
            </Link>
            <Link href="/#tracks" className="py-1 text-sm font-medium text-ink-soft" onClick={() => setMenuOpen(false)}>
              Workshop Tracks
            </Link>
            <Link href="/#competition" className="py-1 text-sm font-medium text-ink-soft" onClick={() => setMenuOpen(false)}>
              Reel Competition
            </Link>
            <Link href="/#faq" className="py-1 text-sm font-medium text-ink-soft" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              {!loading && !user && (
                <>
                  <Link href="/login" className="rounded-full border border-line px-4 py-2 text-center text-sm font-semibold" onClick={() => setMenuOpen(false)}>
                    Sign in
                  </Link>
                  <Link href="/register" className="rounded-full bg-indigo px-4 py-2 text-center text-sm font-semibold text-paper" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
              {!loading && user && (
                <>
                  <Link href="/dashboard" className="rounded-full bg-indigo px-4 py-2 text-center text-sm font-semibold text-paper" onClick={() => setMenuOpen(false)}>
                    Reel Competition Form
                  </Link>
                  <button onClick={handleLogout} className="rounded-full border border-line px-4 py-2 text-center text-sm font-semibold">
                    Log out
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
