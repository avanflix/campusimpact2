import { FAQS } from "@/lib/content";
import { SectionHeading } from "@/components/Schedule";

export default function FaqSection() {
  return (
    <section id="faq" className="border-b border-line bg-paper-soft">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Questions"
          title="Before you register"
          description="The essentials about payments, teams and accounts."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FAQS.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-lg font-bold">{faq.question}</h3>
              <p className="mt-2 text-sm text-ink-soft">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
