import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompetitionRegisterForm from "@/components/CompetitionRegisterForm";
import { Trophy } from "lucide-react";
import { COMPETITION_FEE, TEAM_SIZE } from "@/lib/constants";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  await connectToDatabase();
  const user = await User.findById(session.userId).lean();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-line bg-paper-soft">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-teal">
              Day 02 — Team Registration
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome, {user.fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-ink-soft">
              You&apos;re signed in as{" "}
              <span className="font-semibold text-ink">{user.email}</span>.
              Use the form below to register your {TEAM_SIZE}-member team for
              the CineQuest Reel Competition.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-3xl border border-teal/30 bg-teal-soft p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal text-paper">
                  <Trophy className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold">Reel Competition</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Form a {TEAM_SIZE}-member team from the same college, pick a
                  reel concept, and submit your entry. The team entry fee is
                  ₹{COMPETITION_FEE} for the whole group.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  <li>• You&apos;ll be listed as Member 1 / Team Leader.</li>
                  <li>• All members should be from the same college.</li>
                  <li>• You can register more than one team if needed.</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-8">
                <CompetitionRegisterForm defaultCollege={user.college} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
