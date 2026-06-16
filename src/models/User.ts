import mongoose, { Schema, type Document, type Model } from "mongoose";

/**
 * A registered student account.
 * Students sign up once, then log in to access the
 * reel competition registration form.
 */
export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
