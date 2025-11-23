import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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