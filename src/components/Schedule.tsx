import { SCHEDULE } from "@/lib/content";
import { Film, Trophy } from "lucide-react";

export default function Schedule() {
  return (
    <section id="schedule" className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="The Format"
          title="Two days. One campus. Two ways to join."
          description="Each college runs its own two-day cycle — a skills workshop on Day 1, followed by a same-campus reel competition on Day 2."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ScheduleCard
            icon={<Film className="h-6 w-6" />}
            label={SCHEDULE.day1.label}
            title={SCHEDULE.day1.title}
            description={SCHEDULE.day1.description}
            fee={SCHEDULE.day1.fee}
            feeNote={SCHEDULE.day1.feeNote}
            accent="coral"
            footnote="Open to any student — no account needed to register."
          />
          <ScheduleCard
            icon={<Trophy className="h-6 w-6" />}
            label={SCHEDULE.day2.label}
            title={SCHEDULE.day2.title}
            description={SCHEDULE.day2.description}
            fee={SCHEDULE.day2.fee}
            feeNote={SCHEDULE.day2.feeNote}
            accent="teal"
            footnote="Sign in to your CineQuest account to register your team."
          />
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-indigo">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-ink-soft">{description}</p>
    </div>
  );
}

function ScheduleCard({
  icon,
  label,
  title,
  description,
  fee,
  feeNote,
  accent,
  footnote,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  fee: number;
  feeNote: string;
  accent: "coral" | "teal";
  footnote: string;
}) {
  const iconBg = accent === "coral" ? "bg-coral text-paper" : "bg-teal text-paper";
  const border = accent === "coral" ? "border-coral/30" : "border-teal/30";

  return (
    <div className={`rounded-3xl border ${border} bg-paper p-8 shadow-sm`}>
      <div className="flex items-center justify-between">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
          {icon}
        </span>
        <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-ink-soft">
          {label}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>

      <div className="mt-6 flex items-baseline gap-2 border-t border-line pt-5">
        <span className="font-display text-3xl font-extrabold">₹{fee}</span>
        <span className="text-sm text-ink-soft">{feeNote}</span>
      </div>

      <p className="mt-3 text-xs text-ink-soft">{footnote}</p>
    </div>
  );
}
