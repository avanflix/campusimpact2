import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-coral text-paper">
                <Clapperboard className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold">CineQuest</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              A two-day campus workshop and reel competition touring colleges
              with hands-on sessions in Direction, Acting, Photography,
              Videography and Modeling.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-12">
            <div>
              <p className="font-mono-tag text-xs uppercase tracking-widest text-paper/50">Explore</p>
              <ul className="mt-3 space-y-2 text-sm text-paper/80">
                <li><Link href="/#schedule" className="hover:text-paper">Schedule</Link></li>
                <li><Link href="/#tracks" className="hover:text-paper">Workshop tracks</Link></li>
                <li><Link href="/#competition" className="hover:text-paper">Reel competition</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono-tag text-xs uppercase tracking-widest text-paper/50">Account</p>
              <ul className="mt-3 space-y-2 text-sm text-paper/80">
                <li><Link href="/register" className="hover:text-paper">Register</Link></li>
                <li><Link href="/login" className="hover:text-paper">Sign in</Link></li>
                <li><Link href="/dashboard" className="hover:text-paper">Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-paper/10 pt-6 text-xs text-paper/50">
          © {new Date().getFullYear()} CineQuest Workshops. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
