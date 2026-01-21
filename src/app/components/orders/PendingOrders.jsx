"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Funnel, Check, Hourglass } from "lucide-react";
import { useGetBuyerOrdersQuery } from "@/redux/services/orderApi";
import { useMeQuery } from "@/redux/services/authApi";
import OrderDetails from "./OrderDetails";

const FILTERS = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

export default function PendingOrders() {
  const { data: orders = [] } = useGetBuyerOrdersQuery();
  const { data } = useMeQuery();
  const userId = data?.user?._id;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const pendingOrders = useMemo(() => {
    const now = new Date();

    return orders
      .filter((o) => String(o.userId) === String(userId))
      .filter((o) => o.orderStatus === "pending")
      .filter((o) => o.items?.length > 0)
      .filter((o) => {
        if (filter === "all") return true;
        const days = Number(filter);
        const diff =
          (now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24);
        return diff <= days;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, filter, userId]);

  const formatPrice = (n) =>
    new Intl.NumberFormat("en-NG").format(n || 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-[Montserrat] font-medium text-[20px] text-black">
          Pending ({pendingOrders.length})
        </p>

        <div className="relative">
          <button onClick={() => setShowFilter(!showFilter)}>
            <Funnel size={20} className="text-black/50" />
          </button>

          {showFilter && (
            <div className="absolute right-0 mt-2 w-[160px] bg-white rounded-[8px] shadow-lg border z-50">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setFilter(f.value);
                    setShowFilter(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-[14px] hover:bg-[#EEEEEE]"
                >
                  <span>{f.label}</span>
                  {filter === f.value && (
                    <Check size={16} className="text-[#005770]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="mt-4 border border-black/20 rounded-[2px] p-2 overflow-hidden">
        <div className="flex items-center gap-2 text-[#1A7709]">
          <Hourglass size={19} />
          <div className="relative w-full overflow-hidden">
            <div className="whitespace-nowrap animate-marquee text-[12px] font-inter font-medium">
             We’ve confirmed your order and notified the seller
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {pendingOrders.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-[16px] font-inter font-medium text-black">
            No pending orders
          </p>
          <p className="text-[14px] text-black/50">
            Orders awaiting seller confirmation will appear here.
          </p>
        </div>
      )}

      {/* Orders */}
      <div className="mt-4 space-y-6">
        {pendingOrders.map((order) => (
          <div key={order._id}>
            {/* Meta */}
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-inter text-black/50">
                ID: {order._id.slice(-8)}
              </p>

              <button onClick={() => setSelectedOrder(order)}>
                <span className="text-[12px] font-inter text-black/50">
                  View
                </span>
              </button>
            </div>

            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            )}

            {/* Items + Summary */}
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="flex gap-4 overflow-x-auto">
                {order.items.map((item, i) => (
                  <div key={i} className="w-[88px] flex-shrink-0">
                    <div className="relative w-[88px] h-[74px]">
                      <Image
                        src={item.image || "/placeholder.png"}
                        fill
                        alt={item.name}
                        className="object-cover rounded-[4px]"
                      />
                    </div>

                    <p className="mt-[4px] text-[10px] font-[Montserrat] text-black/50 truncate">
                      {item.name}
                    </p>

                    <p className="text-[8px] font-[Montserrat] text-black">
                      {item.color && `Color: ${item.color}`}{" "}
                      {item.size && `/ Size: ${item.size}`}
                    </p>

                    <p className="text-[12px] font-inter font-semibold text-[#005770]">
                      ₦{formatPrice(item.discountedPrice)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 w-[80px] h-[123px] bg-[#F8F9FA] rounded-[6px] flex flex-col items-center justify-center">
                <p className="text-[16px] font-inter font-medium text-black/50">
                  ₦{formatPrice(order.totalAmount)}
                </p>
                <p className="mt-[8px] text-[12px] font-inter font-medium text-black/50">
                  {order.items.length}{" "}
                  {order.items.length > 1 ? "items" : "item"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}