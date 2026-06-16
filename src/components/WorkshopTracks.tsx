import { WORKSHOP_TRACK_DETAILS } from "@/lib/content";
import { SectionHeading } from "@/components/Schedule";

const ACCENT_STYLES: Record<string, { bg: string; text: string; number: string }> = {
  coral: { bg: "bg-coral-soft", text: "text-coral", number: "text-coral/30" },
  sun: { bg: "bg-sun-soft", text: "text-sun", number: "text-sun/40" },
  teal: { bg: "bg-teal-soft", text: "text-teal", number: "text-teal/30" },
  indigo: { bg: "bg-indigo-soft", text: "text-indigo", number: "text-indigo/30" },
};

export default function WorkshopTracks() {
  return (
    <section id="tracks" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Day 01 — Choose One"
          title="Five tracks, one ticket"
          description="Every student picks a single track for the day. Each session is led by an industry practitioner and built around hands-on exercises, not lectures."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSHOP_TRACK_DETAILS.map((track, index) => {
            const accent = ACCENT_STYLES[track.color];
            return (
              <div
                key={track.name}
                className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className={`font-display absolute -right-2 -top-4 text-7xl font-extrabold ${accent.number}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg} ${accent.text} font-display text-sm font-bold`}>
                  {track.name.charAt(0)}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{track.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{track.blurb}</p>
              </div>
            );
          })}

          {/* filler card to balance the grid on lg screens */}
          <div className="hidden rounded-2xl border border-dashed border-line bg-paper-soft p-6 lg:flex lg:flex-col lg:items-start lg:justify-center">
            <p className="font-display text-lg font-bold">Can&apos;t decide?</p>
            <p className="mt-2 text-sm text-ink-soft">
              Pick the track closest to what you want to do on Day 2 — your
              reel competition team can mix skills across tracks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
