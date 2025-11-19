import { connectDb } from "@/libs/db";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {authOptions} from "@/libs/auth"
import { uploadOnCloudinary } from "@/libs/cloudinary"

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions); 

    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json(
        { message: "User does not have any session" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    let imageUrl = session.user.image ?? null;

    if (file) {
      const uploaded = await uploadOnCloudinary(file);
      if (uploaded) imageUrl = uploaded;
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { image: imageUrl },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
