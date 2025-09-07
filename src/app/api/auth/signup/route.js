import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { fullName, email, phone, password } = body;

    // Basic validation
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json({ error: "Email or phone already registered" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "Signup successful",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}