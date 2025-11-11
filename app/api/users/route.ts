import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/connectToDB";

export async function GET() {
  try {
    connectToDatabase();

    const users = await User.find().sort({ _id: -1 }); // latest first
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
