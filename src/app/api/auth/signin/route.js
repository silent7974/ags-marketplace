import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/models/user"

export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json()
    const { emailOrPhone, password } = body

    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { error: "Email/Phone and password are required" },
        { status: 400 }
      )
    }

    // Find user by email OR phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    const response = NextResponse.json({
        message: "Login successful",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
        },
    })

    response.cookies.set("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
    })

    return { status:200 }, response
    
  } catch (err) {
    console.error("Signin Error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}