import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { reference } = await req.json();

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Verify payment failed" }, { status: 500 });
  }
}