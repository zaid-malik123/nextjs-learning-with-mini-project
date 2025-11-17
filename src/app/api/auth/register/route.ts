import { connectDb } from "@/libs/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  try {
    const { userName, email, password } = await req.json();

    await connectDb();

    // Check existing user
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }

    // Password check
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Create user
    const createdUser = await User.create({
      userName,
      email,
      password: hash,
    });

    return NextResponse.json(
      user,
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}