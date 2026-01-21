"use client";
import React, { useEffect, useRef, useState } from "react";
import { useClearCartMutation } from "@/redux/services/cartApi";
import { useUpdateOrderStatusMutation } from "@/redux/services/orderApi";
import AllOrders from "../components/orders/AllOrders";
import PendingOrders from "../components/orders/PendingOrders";
import ProcessingOrders from "../components/orders/ProcessingOrders";
import ShippedOrders from "../components/orders/ShippedOrders";
import DeliveredOrders from "../components/orders/DeliveredOrders";
import CancelledOrders from "../components/orders/CancelledOrders";

const TABS = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Returned",
];

export default function OrdersPage() {
  const [clearCart] = useClearCartMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [activeTab, setActiveTab] = useState("All");
  const tabRefs = useRef({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tabRefs.current[tab]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");
    if (!reference) return;

    async function verify() {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const data = await res.json();
      const success =
        data?.status === true && data?.data?.status === "success";

      if (!success) return;

      const orderId =
        data?.data?.metadata?.orderId || data?.metadata?.orderId;

      if (!orderId) return;

      await updateOrderStatus({ orderId, status: "paid" }).unwrap();
      await clearCart().unwrap();
    }

    verify();
  }, []);

  return (
    <div className="relative min-h-screen pb-[72px]">
      {/* Tabs */}
      <div className="w-full pt-4 px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[tab] = el)}
                onClick={() => handleTabClick(tab)}
                className="relative flex flex-col items-center pb-2"
              >
                <span
                  className={`font-[600] font-montserrat text-[16px] ${
                    isActive ? "text-black" : "text-black/50"
                  }`}
                >
                  {tab}
                </span>

                {isActive && (
                  <span className="absolute bottom-1 w-[20px] h-[4px] rounded-full bg-black" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "All" && <AllOrders />}
          {activeTab === "Pending" && <PendingOrders />}
          {activeTab === "Processing" && <ProcessingOrders />}
          {activeTab === "Shipped" && <ShippedOrders />}
          {activeTab === "Delivered" && <DeliveredOrders />}
          {activeTab === "Cancelled" && <CancelledOrders />}
        </div>
      </div>

      {/* 🔒 Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[56px] bg-[#F8F9FA] border-t border-black/20 flex items-center justify-center z-50">
        <div className="flex gap-4">
          {/* Refund */}
          <button className="px-4 py-2 rounded-[40px] border border-black/20">
            <span className="font-inter font-medium text-[16px] text-black">
              Refund
            </span>
          </button>

          {/* Track */}
          <button className="px-10 py-2 rounded-[44px] bg-[#005770]">
            <span className="font-inter font-medium text-[16px] text-white">
              Track
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}