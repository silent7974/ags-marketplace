import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/product"

export async function GET(req) {
  try {
    await dbConnect()

    // Extract query params
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const subCategory = searchParams.get("subCategory")
    const subType = searchParams.get("subType")

    // Build dynamic filter
    const filter = {}
    if (category) filter.category = category
    if (subCategory) filter.subCategory = subCategory
    if (subType) filter.subType = subType

    const products = await Product.find(filter)

    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    console.error("Public Get Products Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}