import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import {
  WORKSHOP_TRACKS,
  WORKSHOP_FEE,
  type WorkshopTrack,
} from "@/lib/constants";

export { WORKSHOP_TRACKS, WORKSHOP_FEE };
export type { WorkshopTrack };

/**
 * Day 1 — individual workshop registration.
 * One student picks one track. Payment is per-person.
 */
export interface IWorkshopRegistration extends Document {
  user?: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  track: WorkshopTrack;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkshopRegistrationSchema = new Schema<IWorkshopRegistration>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    track: { type: String, enum: WORKSHOP_TRACKS, required: true },
    amount: { type: Number, required: true, default: WORKSHOP_FEE },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

export const WorkshopRegistration: Model<IWorkshopRegistration> =
  mongoose.models.WorkshopRegistration ||
  mongoose.model<IWorkshopRegistration>(
    "WorkshopRegistration",
    WorkshopRegistrationSchema
  );
