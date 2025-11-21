import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, amount, metadata, callback_url, channels } = await req.json();

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        channels,
        metadata,
        callback_url
      })
    });

    const data = await response.json();

    // RETURN PAYSTACK'S RESPONSE DIRECTLY (NO EXTRA WRAPPING)
    return NextResponse.json(data);

  } catch (error) {
    console.error("PAYSTACK INIT ERROR:", error);
    return NextResponse.json({ error: "Initialize payment failed" }, { status: 500 });
  }
}