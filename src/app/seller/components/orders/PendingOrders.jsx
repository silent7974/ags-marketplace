"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Funnel, ChevronDown, Loader2, Check } from "lucide-react";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/services/orderApi";
import OrderDetails from "@/app/seller/components/orders/OrderDetails";

const FILTERS = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

export default function PendingOrders() {
  const { data: orders = [] } = useGetOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const pendingOrders = useMemo(() => {
    const now = new Date();

    return orders
      .filter((o) => o.items?.length > 0)
      .filter((o) => o.orderStatus === "pending")
      .filter((o) => {
        if (filter === "all") return true;
        const days = Number(filter);
        const createdAt = new Date(o.createdAt);
        const diff = (now - createdAt) / (1000 * 60 * 60 * 24);
        return diff <= days;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, filter]);

  const totalAmount = pendingOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  const formatPrice = (n) =>
    new Intl.NumberFormat("en-NG").format(n || 0);

  const handleStartProcessing = async (orderId) => {
    try {
        setLoadingId(orderId);
        await updateStatus({
            orderId,
            orderStatus: "processing",
        }).unwrap();
    } finally {
      setLoadingId(null);
    }
  };

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

      <div className="flex justify-between mt-4">
        <p className="font-[Montserrat] font-medium text-[16px] text-black">
          Total price:
        </p>
        <p className="font-[Montserrat] font-medium text-[16px] text-black">
          ₦{formatPrice(totalAmount)}
        </p>
      </div>

      {/* Empty State */}
      {pendingOrders.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="mt-4 text-[16px] font-inter font-medium text-black">
            No pending orders
          </p>
          <p className="mt-1 text-[14px] text-black/50 max-w-[260px]">
            Orders awaiting processing will appear here.
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
                <ChevronDown size={16} className="text-black/50" />
              </button>
            </div>

            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            )}

            <p className="mt-[4px] text-[12px] italic font-inter text-black/50">
              Buyer: {order.shippingAddress?.fullName || "Unknown"}
            </p>

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

                    <div className="flex justify-between mt-[4px]">
                      <p className="text-[12px] font-inter text-[#005770] font-semibold">
                        ₦{formatPrice(item.discountedPrice)}
                      </p>
                      <p className="text-[10px] text-black/50 line-through">
                        ₦{formatPrice(item.price)}
                      </p>
                    </div>
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

            {/* Action */}
            <div className="mt-4 flex justify-center">
              <button
                disabled={loadingId === order._id}
                onClick={() => handleStartProcessing(order._id)}
                className="w-[164px] h-[43px] rounded-[44px] bg-black flex items-center justify-center"
              >
                {loadingId === order._id ? (
                  <Loader2
                    size={18}
                    className="animate-spin text-[#F8F9FA]"
                  />
                ) : (
                  <span className="font-inter font-medium text-[16px] text-[#F8F9FA]">
                    Start processing
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}