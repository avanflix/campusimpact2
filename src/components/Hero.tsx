import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* ambient color blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-soft blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-32 h-80 w-80 rounded-full bg-coral-soft blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sun-soft blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper-soft px-4 py-1.5 font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
              <Sparkles className="h-3.5 w-3.5 text-coral" />
              A two-day campus takeover
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Learn it on{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Day One.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-sun/70" />
              </span>
              <br />
              Shoot it on{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Day Two.</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-teal/60" />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              CineQuest brings a full film-craft workshop — Direction, Acting,
              Photography, Videography and Modeling — straight to your campus,
              then turns the lessons into a 60-second reel competition with
              real prize money.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#schedule"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-coral/20 transition hover:opacity-90"
              >
                See the schedule
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
              >
                Register your spot
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <Stat value="5" label="Workshop tracks" />
              <Stat value="₹25K" label="Total prize pool" />
              <Stat value="4" label="Per competition team" />
            </div>
          </div>

          {/* Signature element: stacked "clapperboard" day tickets */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-6 -top-6 h-full w-full rounded-3xl bg-indigo-soft" />
            <div className="absolute -left-6 top-10 h-full w-full rounded-3xl border-2 border-dashed border-teal/40" />
            <div className="relative rounded-3xl border border-line bg-paper p-6 shadow-xl">
              <ClapperHeader />
              <div className="mt-6 space-y-4">
                <DayTicket
                  day="Day 01"
                  title="Workshop"
                  items={["Direction", "Acting", "Photography", "Videography", "Modeling"]}
                  price="₹299"
                  priceNote="per student"
                  accent="coral"
                />
                <DayTicket
                  day="Day 02"
                  title="Reel Competition"
                  items={["Write", "Shoot", "Edit", "Submit"]}
                  price="₹499"
                  priceNote="per team of 4"
                  accent="teal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-extrabold text-ink">{value}</p>
      <p className="text-sm text-ink-soft">{label}</p>
    </div>
  );
}

function ClapperHeader() {
  const stripes = Array.from({ length: 10 });
  return (
    <div className="overflow-hidden rounded-xl">
      <div className="flex h-7">
        {stripes.map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i % 2 === 0 ? "bg-ink" : "bg-paper"}`}
            style={{
              transform: "skewX(-20deg)",
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between bg-ink px-4 py-2 text-paper">
        <span className="font-mono-tag text-xs uppercase tracking-widest">
          Scene 01 — Take 02
        </span>
        <span className="font-mono-tag text-xs uppercase tracking-widest">
          Campus Tour
        </span>
      </div>
    </div>
  );
}

function DayTicket({
  day,
  title,
  items,
  price,
  priceNote,
  accent,
}: {
  day: string;
  title: string;
  items: string[];
  price: string;
  priceNote: string;
  accent: "coral" | "teal";
}) {
  const accentBg = accent === "coral" ? "bg-coral-soft" : "bg-teal-soft";
  const accentText = accent === "coral" ? "text-coral" : "text-teal";
  const dotColor = accent === "coral" ? "bg-coral" : "bg-teal";

  return (
    <div className={`rounded-2xl ${accentBg} p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <span className={`font-mono-tag text-xs font-bold uppercase tracking-widest ${accentText}`}>
            {day}
          </span>
          <p className="font-display text-xl font-bold">{title}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-bold">{price}</p>
          <p className="text-xs text-ink-soft">{priceNote}</p>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs font-medium">
            <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
