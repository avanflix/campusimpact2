"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workshopRegistrationSchema,
  type WorkshopRegistrationInput,
} from "@/lib/validation";
import { WORKSHOP_TRACKS, WORKSHOP_FEE } from "@/lib/constants";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function WorkshopRegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WorkshopRegistrationInput>({
    resolver: zodResolver(workshopRegistrationSchema),
  });

  async function onSubmit(values: WorkshopRegistrationInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/registrations/workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong");
        return;
      }
      setSuccess(true);
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-teal/30 bg-teal-soft p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-teal" />
        <h3 className="mt-4 font-display text-xl font-bold">You&apos;re on the list!</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Your Day 1 workshop seat is reserved. Pay ₹{WORKSHOP_FEE} at the
          campus help desk or via the link sent to your email to confirm it.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-full border border-line px-5 py-2 text-sm font-semibold transition hover:border-ink"
        >
          Register another student
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Aditi Rao"
            className="form-input"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@college.edu"
            className="form-input"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="9876543210"
            className="form-input"
          />
        </Field>
        <Field label="College" error={errors.college?.message}>
          <input
            {...register("college")}
            type="text"
            placeholder="Your college name"
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Choose your track" error={errors.track?.message}>
        <select {...register("track")} className="form-input" defaultValue="">
          <option value="" disabled>
            Select a workshop track
          </option>
          {WORKSHOP_TRACKS.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
      </Field>

      {serverError && (
        <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-medium text-coral">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-between rounded-2xl border border-line bg-paper-soft px-5 py-4">
        <div>
          <p className="text-sm font-semibold">Workshop fee</p>
          <p className="text-xs text-ink-soft">One seat, one student</p>
        </div>
        <p className="font-display text-2xl font-extrabold">₹{WORKSHOP_FEE}</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-coral/20 transition hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Reserve my workshop seat — ₹{WORKSHOP_FEE}
      </button>
    </form>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-coral">{error}</span>}
    </label>
  );
}
