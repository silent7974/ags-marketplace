import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";
import Seller from "@/models/seller";
import Product from "@/models/product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("sellerToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Find seller products
    const products = await Product.find({ sellerId: decoded.id }).select("_id");
    const productIds = products.map(p => p._id);

    // 🔹 Find orders containing seller products
    const orders = await Order.find({
      "items.productId": { $in: productIds },
    }).sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });

  } catch (err) {
    console.error("Get Orders Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const tokenValue = cookieStore.get("userToken")?.value;

    if (!tokenValue) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    const data = await req.json();
    const {
      items,
      shippingMethod,
      shippingAddress,
      pickupAddress,
      paymentMethod,
      paymentStatus,
      itemsTotal,
      discountTotal,
      shippingFee,
      totalAmount,
    } = data;

    // 1️⃣ Create the order (ONLY — no stock updates here)
    const order = await Order.create({
      userId: decoded.id,
      items,
      shippingMethod,
      shippingAddress,
      pickupAddress,
      paymentMethod,
      paymentStatus,
      itemsTotal,
      discountTotal,
      shippingFee,
      totalAmount,
    });

    // 2️⃣ Return success
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}