import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req) {
  try {
    const token = req.cookies.get("userToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    await dbConnect();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}