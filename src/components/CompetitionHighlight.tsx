import Link from "next/link";
import { PRIZE_POOL } from "@/lib/content";
import { TEAM_SIZE } from "@/lib/constants";
import { SectionHeading } from "@/components/Schedule";
import { Users, Trophy, LogIn } from "lucide-react";

export default function CompetitionHighlight() {
  return (
    <section id="competition" className="border-b border-line bg-indigo-soft/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Day 02 — Reel Competition"
          title="₹25,000 on the table. 24 hours to shoot it."
          description="Form a team of four, choose a concept, and shoot a competition reel using everything from Day 1. Top reels are judged on-site and prizes are announced before you head home."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-paper p-8 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sun-soft text-sun">
                <Trophy className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold">{PRIZE_POOL.total} prize pool</p>
                <p className="text-sm text-ink-soft">Split across three winning teams</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PRIZE_POOL.breakdown.map((item) => (
                <div key={item.place} className="rounded-2xl border border-line bg-paper-soft p-4 text-center">
                  <p className="font-mono-tag text-xs uppercase tracking-widest text-ink-soft">{item.place}</p>
                  <p className="mt-2 font-display text-2xl font-bold">{item.amount}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-line p-4">
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo" />
              <p className="text-sm text-ink-soft">
                Each team needs exactly <span className="font-semibold text-ink">{TEAM_SIZE} students</span> from
                the same college. Register once per team — the entry fee of ₹499 covers everyone.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-line bg-paper p-8">
            <div>
              <h3 className="font-display text-xl font-bold">Ready to enter?</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Team registration happens from your CineQuest account.
                Create one if you&apos;re new, or sign in if you already
                registered for the workshop.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-5 py-3 text-sm font-semibold text-paper transition hover:opacity-90"
              >
                Create account &amp; register team
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
              >
                <LogIn className="h-4 w-4" />
                Sign in to register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
