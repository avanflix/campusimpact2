"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  competitionRegistrationSchema,
  type CompetitionRegistrationInput,
} from "@/lib/validation";
import { COMPETITION_FEE, TEAM_SIZE } from "@/lib/constants";
import { Field } from "@/components/WorkshopRegisterForm";
import { CheckCircle2, Loader2, Users } from "lucide-react";

interface Props {
  defaultCollege?: string;
}

export default function CompetitionRegisterForm({ defaultCollege }: Props) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ teamName: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CompetitionRegistrationInput>({
    resolver: zodResolver(competitionRegistrationSchema),
    defaultValues: {
      teamName: "",
      college: defaultCollege ?? "",
      reelConcept: "",
      members: Array.from({ length: TEAM_SIZE }, () => ({
        fullName: "",
        email: "",
        phone: "",
        college: defaultCollege ?? "",
      })),
    },
  });

  const { fields } = useFieldArray({ control, name: "members" });

  async function onSubmit(values: CompetitionRegistrationInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/registrations/competition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong");
        return;
      }
      setSuccess({ teamName: data.registration.teamName });
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-teal/30 bg-teal-soft p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal" />
        <h3 className="mt-4 font-display text-xl font-bold">
          Team &ldquo;{success.teamName}&rdquo; is registered!
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Complete the ₹{COMPETITION_FEE} team entry fee to lock in your slot
          for the Day 2 reel competition.
        </p>
        <button
          onClick={() => setSuccess(null)}
          className="mt-6 rounded-full border border-line px-5 py-2 text-sm font-semibold transition hover:border-ink"
        >
          Register another team
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Team name" error={errors.teamName?.message}>
          <input {...register("teamName")} type="text" placeholder="The Final Cut" className="form-input" />
        </Field>
        <Field label="College" error={errors.college?.message}>
          <input {...register("college")} type="text" placeholder="Your college name" className="form-input" />
        </Field>
      </div>

      <Field label="Reel concept" error={errors.reelConcept?.message}>
        <textarea
          {...register("reelConcept")}
          rows={3}
          placeholder="Briefly describe what your team plans to shoot"
          className="form-input"
        />
      </Field>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-indigo" />
          <h3 className="font-display text-lg font-bold">
            Team members ({TEAM_SIZE})
          </h3>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-2xl border border-line bg-paper-soft p-4">
              <p className="mb-3 font-mono-tag text-xs font-bold uppercase tracking-widest text-indigo">
                Member {index + 1} {index === 0 ? "(Team Leader — you)" : ""}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Full name" error={errors.members?.[index]?.fullName?.message}>
                  <input {...register(`members.${index}.fullName`)} type="text" placeholder="Full name" className="form-input" />
                </Field>
                <Field label="Email" error={errors.members?.[index]?.email?.message}>
                  <input {...register(`members.${index}.email`)} type="email" placeholder="Email address" className="form-input" />
                </Field>
                <Field label="Phone number" error={errors.members?.[index]?.phone?.message}>
                  <input {...register(`members.${index}.phone`)} type="tel" placeholder="Phone number" className="form-input" />
                </Field>
                <Field label="College" error={errors.members?.[index]?.college?.message}>
                  <input {...register(`members.${index}.college`)} type="text" placeholder="College name" className="form-input" />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      {serverError && (
        <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-medium text-coral">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-between rounded-2xl border border-line bg-paper-soft px-5 py-4">
        <div>
          <p className="text-sm font-semibold">Reel competition entry fee</p>
          <p className="text-xs text-ink-soft">One payment for the whole team</p>
        </div>
        <p className="font-display text-2xl font-extrabold">₹{COMPETITION_FEE}</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-teal/20 transition hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Register team — ₹{COMPETITION_FEE}
      </button>
    </form>
  );
}
