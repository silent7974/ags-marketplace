"use client";
import React, { useEffect } from "react";
import { useClearCartMutation } from "@/redux/services/cartApi";
import { useUpdateOrderStatusMutation } from "@/redux/services/orderApi";

export default function OrdersPage() {
  const [clearCart] = useClearCartMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (!reference) return;

    async function verify() {
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const data = await verifyRes.json();

      // CORRECT PAYSTACK SUCCESS CHECK
      const isSuccessful =
        data?.status === true &&
        data?.data?.status === "success";

      if (!isSuccessful) {
        alert("Payment failed.");
        return;
      }

      // CORRECT ORDER ID EXTRACTION
      const orderId =
        data?.data?.metadata?.orderId ||
        data?.metadata?.orderId;

      if (!orderId) {
        console.log("❌ No orderId found in verify response");
        return;
      }

      // UPDATE ORDER STATUS → DB
      await updateOrderStatus({ orderId, status: "paid" }).unwrap();

      // CLEAR CART
      await clearCart().unwrap();
    }

    verify();
  }, []);

  return (
    <div className="w-full px-[16px] h-screen flex justify-center items-center">
      <p className="text-[20px] text-center font-inter">Thank you! Your order is confirmed.</p>
    </div>
  );
}