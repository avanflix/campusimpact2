import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { registerSchema } from "@/lib/validation";
import {
  signSessionToken,
  AUTH_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/auth";

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { fullName, email, phone, college, password } = parsed.data;

    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      fullName,
      email,
      phone,
      college,
      passwordHash,
    });

    const token = signSessionToken({
      userId: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    });

    const response = NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          college: user.college,
        },
      },
      { status: 201 }
    );

    response.cookies.set(AUTH_COOKIE_NAME, token, sessionCookieOptions);

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
