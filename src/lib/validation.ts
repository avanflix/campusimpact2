import { z } from "zod";
import { WORKSHOP_TRACKS } from "@/lib/constants";

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  college: z.string().trim().min(2, "Enter your college name"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const workshopRegistrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  college: z.string().trim().min(2, "Enter your college name"),
  track: z.enum(WORKSHOP_TRACKS, {
    message: "Choose a workshop track",
  }),
});

export type WorkshopRegistrationInput = z.infer<typeof workshopRegistrationSchema>;

const teamMemberSchema = z.object({
  fullName: z.string().trim().min(2, "Enter member name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  college: z.string().trim().min(2, "Enter college name"),
});

export const competitionRegistrationSchema = z.object({
  teamName: z.string().trim().min(2, "Enter your team name"),
  college: z.string().trim().min(2, "Enter your college name"),
  reelConcept: z
    .string()
    .trim()
    .min(10, "Describe your reel concept in a few words"),
  members: z
    .array(teamMemberSchema)
    .length(4, "A team must have exactly 4 members"),
});

export type CompetitionRegistrationInput = z.infer<
  typeof competitionRegistrationSchema
>;
