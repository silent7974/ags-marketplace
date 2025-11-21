import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function PUT(req) {
  try {
    await dbConnect();

    const token = req.cookies.get("userToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const body = await req.json();
    const { fullName, phone, address } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(fullName && { fullName }),
          ...(phone && { phone }),
          ...(address && { address }),
        },
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}