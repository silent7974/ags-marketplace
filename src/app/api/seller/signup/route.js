import dbConnect from "@/lib/mongodb";
import Seller from "@/models/seller";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { fullName, email, phone, password, category, sellerType } = await req.json();

    if (!fullName || !email || !phone || !password || !category || !sellerType) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    await dbConnect();

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return new Response(JSON.stringify({ message: "Email already registered" }), { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Seller.create({
      fullName,
      email,
      phone,
      passwordHash,
      category,
      sellerType,
    });

    return new Response(JSON.stringify({ message: "Seller registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
