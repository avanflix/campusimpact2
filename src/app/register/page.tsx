"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validation";
import { Field } from "@/components/WorkshopRegisterForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clapperboard, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo text-paper">
              <Clapperboard className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              You&apos;ll use this to register your team for the reel
              competition on Day 2.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field label="Full name" error={errors.fullName?.message}>
                <input {...register("fullName")} type="text" placeholder="Aditi Rao" className="form-input" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} type="email" placeholder="you@college.edu" className="form-input" />
              </Field>
              <Field label="Phone number" error={errors.phone?.message}>
                <input {...register("phone")} type="tel" placeholder="9876543210" className="form-input" />
              </Field>
              <Field label="College" error={errors.college?.message}>
                <input {...register("college")} type="text" placeholder="Your college name" className="form-input" />
              </Field>
              <Field label="Password" error={errors.password?.message}>
                <input {...register("password")} type="password" placeholder="At least 6 characters" className="form-input" />
              </Field>

              {serverError && (
                <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-medium text-coral">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-indigo/20 transition hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-soft">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
