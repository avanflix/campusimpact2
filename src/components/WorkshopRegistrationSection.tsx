import WorkshopRegisterForm from "@/components/WorkshopRegisterForm";

export default function WorkshopRegistrationSection() {
  return (
    <section id="register-workshop" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-coral">
              Day 01 — Individual Registration
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Save your seat for the workshop
            </h2>
            <p className="mt-4 max-w-md text-base text-ink-soft">
              This form is for the Day 1 skills workshop only — one
              registration per student. Pick the track you want and we&apos;ll
              hold your seat for ₹299.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-line bg-paper-soft p-6">
              <p className="text-sm font-semibold">Good to know</p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>• Open to all students — no account required.</li>
                <li>• Choose exactly one of the five tracks.</li>
                <li>• Want to enter the reel competition too? Create an account from the navbar.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-8">
            <WorkshopRegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
