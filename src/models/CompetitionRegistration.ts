import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import { COMPETITION_FEE, TEAM_SIZE } from "@/lib/constants";

export { COMPETITION_FEE, TEAM_SIZE };

/** A single teammate's details within a competition team. */
export interface ITeamMember {
  fullName: string;
  email: string;
  phone: string;
  college: string;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
  },
  { _id: false }
);

/**
 * Day 2 — reel competition registration.
 * Registered by a logged-in student (team leader) on behalf of a
 * group of 4 students. Payment is per-team.
 */
export interface ICompetitionRegistration extends Document {
  teamLeader: Types.ObjectId;
  teamName: string;
  college: string;
  members: ITeamMember[];
  reelConcept: string;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompetitionRegistrationSchema = new Schema<ICompetitionRegistration>(
  {
    teamLeader: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamName: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    members: {
      type: [TeamMemberSchema],
      required: true,
      validate: {
        validator: (members: ITeamMember[]) => members.length === TEAM_SIZE,
        message: `A reel competition team must have exactly ${TEAM_SIZE} members.`,
      },
    },
    reelConcept: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, default: COMPETITION_FEE },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

export const CompetitionRegistration: Model<ICompetitionRegistration> =
  mongoose.models.CompetitionRegistration ||
  mongoose.model<ICompetitionRegistration>(
    "CompetitionRegistration",
    CompetitionRegistrationSchema
  );
