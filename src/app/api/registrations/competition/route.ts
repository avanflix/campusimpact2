import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import {
  CompetitionRegistration,
  COMPETITION_FEE,
} from "@/models/CompetitionRegistration";
import { competitionRegistrationSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";

/**
 * Day 2 reel competition registration.
 * Requires the student to be logged in — they register as
 * the team leader on behalf of a 4-member team.
 */
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Please log in to register your team" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = competitionRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const registration = await CompetitionRegistration.create({
      ...parsed.data,
      amount: COMPETITION_FEE,
      paymentStatus: "pending",
      teamLeader: session.userId,
    });

    return NextResponse.json(
      {
        registration: {
          id: registration._id.toString(),
          teamName: registration.teamName,
          amount: registration.amount,
          paymentStatus: registration.paymentStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Competition registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/** Fetch the logged-in student's own team registrations. */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Please log in to view your registrations" },
      { status: 401 }
    );
  }

  await connectToDatabase();

  const registrations = await CompetitionRegistration.find({
    teamLeader: session.userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    registrations: registrations.map((r) => ({
      id: r._id.toString(),
      teamName: r.teamName,
      college: r.college,
      members: r.members,
      reelConcept: r.reelConcept,
      amount: r.amount,
      paymentStatus: r.paymentStatus,
      createdAt: r.createdAt,
    })),
  });
}
