import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";

export async function GET(req, context) {
  const { params } = await context;
  const { id } = params;

  await dbConnect();

  try {
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, context) {
  const { params } = await context;
  const { id } = params;

  await dbConnect();

  const { status } = await req.json();

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus: status },
      { new: true }
    );

    return NextResponse.json(
      { message: "Order updated", order },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}