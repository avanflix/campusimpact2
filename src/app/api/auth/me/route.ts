import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  await connectToDatabase();
  const user = await User.findById(session.userId).lean();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      college: user.college,
      phone: user.phone,
    },
  });
}
