import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/product"

// GET all products (public)
export async function GET() {
  try {
    await dbConnect()

    // Fetch all products, regardless of seller
    const products = await Product.find({});

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Public Get Products Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}