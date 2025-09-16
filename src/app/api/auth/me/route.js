import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req) {
  try {
    // Grab cookies from request
    const token = req.cookies.get("userToken")?.value
    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token (replace "your_jwt_secret" with your real secret)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Example: you could fetch user from DB here if needed
    const user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "buyer",
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error("Auth check failed:", err.message)
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
  }
}