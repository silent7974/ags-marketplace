import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

const JWT_SECRET = process.env.JWT_SECRET;

// POST create a new product
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sellerToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse incoming data exactly as frontend sends it
    const data = await req.json();

    const {
      productName,
      description,
      price,
      discountedPrice,
      formattedPrice,
      quantity,
      discount = 0,
      productCategory,
      subcategory = "",
      useCase = "",
      tag = "",
      trending = "",
      variants = {}, // Keep as object if frontend sends object
      variantColumns = [],
      images = [],
    } = data;

    // Basic required field checks
    if (!productName || !productCategory || price == null || quantity == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
    }

    await dbConnect();

    const productDoc = {
      sellerId: decoded.id,
      productName: productName.trim(),
      description: description?.trim() || "",
      price,
      formattedPrice,
      discountedPrice,
      quantity,
      discount,
      category: productCategory.trim(),
      subcategory: subcategory?.trim() || "",
      useCase,
      tag,
      trending,
      variants, // save exactly as sent
      variantColumns,
      images,
    };

    console.log("SUBMITTING:", productDoc)

    const created = await Product.create(productDoc);

    return NextResponse.json(
      { message: "Product added successfully", product: created },
      { status: 201 },
    );
  } catch (err) {
    console.error("Add Product Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}