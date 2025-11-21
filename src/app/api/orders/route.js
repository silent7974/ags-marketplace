import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

// Create order
export async function POST(req) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const tokenValue = cookieStore.get("userToken")?.value;

    if (!tokenValue) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// Get user orders
export async function GET(req) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await Order.find({ userId: token.id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}