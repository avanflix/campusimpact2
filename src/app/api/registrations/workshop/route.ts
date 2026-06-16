import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { WorkshopRegistration, WORKSHOP_FEE } from "@/models/WorkshopRegistration";
import { workshopRegistrationSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";

/**
 * Day 1 workshop registration.
 * Open to any student — does not require an account.
 * If the visitor happens to be logged in, we link the
 * registration to their account for record-keeping.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = workshopRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const session = await getSession();

    const registration = await WorkshopRegistration.create({
      ...parsed.data,
      amount: WORKSHOP_FEE,
      paymentStatus: "pending",
      user: session?.userId ?? undefined,
    });

    return NextResponse.json(
      {
        registration: {
          id: registration._id.toString(),
          track: registration.track,
          amount: registration.amount,
          paymentStatus: registration.paymentStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Workshop registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
