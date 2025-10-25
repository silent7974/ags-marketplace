import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/cart";

const JWT_SECRET = process.env.JWT_SECRET;

export async function DELETE() {
  await dbConnect();

  const cookieStore = await cookies();
  const token = cookieStore.get("userToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    // 🛒 Find user's cart
    const cart = await Cart.findOne({ userId: decoded.id });

    if (!cart) {
      return NextResponse.json(
        { message: "No cart found to clear", cleared: false },
        { status: 200 }
      );
    }

    // 🧹 Clear all items
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    cart.totalDiscountedPrice = 0;

    await cart.save();

    return NextResponse.json(
      {
        message: "Cart cleared successfully",
        cleared: true,
        cart,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error clearing cart:", err);
    return NextResponse.json(
      { error: "Failed to clear cart", details: err.message },
      { status: 500 }
    );
  }
}