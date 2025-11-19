import { authOptions } from "@/libs/auth";
import { connectDb } from "@/libs/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json(
        { message: "User does not have any session" },
        { status: 400 }
      );
    }

   const user = await User.findById(session.user.id).select("-password")
   if(!user){
    return NextResponse.json(
        { message: "User is not found" },
        { status: 400 }
      );
   }

   return NextResponse.json(
        user,
        { status: 200 }
      );


  } catch (error) {
    return NextResponse.json(
        error,
        { status: 500 }
      );
  }
}
