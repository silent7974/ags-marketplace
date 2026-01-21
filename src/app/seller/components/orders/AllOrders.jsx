"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Funnel, Check, ChevronDown } from "lucide-react";
import { useGetOrdersQuery } from "@/redux/services/orderApi";
import { useGetProfileQuery } from "@/redux/services/sellerApi";
import OrderDetails from "@/app/seller/components/orders/OrderDetails";

const FILTERS = [
  { label: "All time", value: "all" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
];

const STATUS_STYLES = {
  pending: { bg: "#676300", text: "#FAFFA3", label: "Pending" },
  processing: { bg: "#001D67", text: "#A3CEFF", label: "Processing" },
  shipped: { bg: "#440067", text: "#DDA3FF", label: "Shipped" },
  delivered: { bg: "#006707", text: "#A3FFA9", label: "Delivered" },
  cancelled: { bg: "#671D00", text: "#FFB7A3", label: "Cancelled" },
};

export default function AllOrders() {
  const { data: orders = [] } = useGetOrdersQuery();
  const { data: seller } = useGetProfileQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

  const sellerOrders = useMemo(() => {
    const now = new Date();

    return orders
      .filter((order) => order.items?.length > 0)
      .filter((order) => {
        if (filter === "all") return true;

        const days = Number(filter);
        const createdAt = new Date(order.createdAt);
        const diff = (now - createdAt) / (1000 * 60 * 60 * 24);
        return diff <= days;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, filter]);

  const totalAmount = sellerOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const formatPrice = (n) =>
    new Intl.NumberFormat("en-NG").format(n || 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-[Montserrat] font-medium text-[20px] text-black">
          All ({sellerOrders.length})
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

      {/* Total */}
      <div className="flex justify-between mt-4">
        <p className="font-[Montserrat] font-medium text-[16px] text-black">
          Total price:
        </p>
        <p className="font-[Montserrat] font-medium text-[16px] text-black">
          ₦{formatPrice(totalAmount)}
        </p>
      </div>

      {sellerOrders.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="mt-4 text-[16px] font-inter font-medium text-black">
            No orders yet
          </p>
          <p className="mt-1 text-[14px] text-black/50 max-w-[260px]">
            Orders from buyers will appear here.
          </p>
        </div>
      )}

      {/* Orders */}
      <div className="mt-4 space-y-6">
        {sellerOrders.map((order) => {
          const status = STATUS_STYLES[order.orderStatus];

          return (
            <div key={order._id}>
              {/* Order Meta */}
              <div className="flex justify-between items-center">
                <p className="text-[12px] font-inter text-black/50">
                  ID: {order._id.slice(-8)}
                </p>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-[10px] py-[4px] rounded-[24px] text-[12px] font-inter font-medium"
                  style={{
                    backgroundColor: status.bg,
                    color: status.text,
                  }}
                >
                  {status.label}
                </button>

                {selectedOrder && (
                  <OrderDetails
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                  />
                )}


              </div>

              <p className="mt-[4px] text-[12px] italic font-inter text-black/50">
                Buyer: {order.shippingAddress?.fullName || "Unknown"}
              </p>

              {/* Items + Summary Row */}
              <div className="mt-3 flex items-start justify-between gap-4">
                {/* Items */}
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

                      {/* Name */}
                      <p className="mt-[4px] text-[10px] font-[Montserrat] text-black/50 truncate w-full">
                        {item.name}
                      </p>

                      {/* Variants */}
                      <p className="mt-[4px] text-[8px] font-[Montserrat] text-black">
                        {item.color && `Color: ${item.color}`}{" "}
                        {item.size && `/ Size: ${item.size}`}
                      </p>

                      {/* Prices */}
                      <div className="flex items-center justify-between mt-[4px] w-full">
                        <p className="text-[12px] font-inter text-[#005770] font-semibold">
                          ₦{formatPrice(item.discountedPrice)}
                        </p>
                        <p className="text-[10px] text-black/50 line-through">
                          ₦{formatPrice(item.price)}
                        </p>
                      </div>

                      {item.quantity > 1 && (
                        <p className="text-[10px] font-inter font-medium mt-[1px]">
                          x{item.quantity}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Order Summary (far right) */}
                <div className="flex-shrink-0 w-[80px] h-[123px] bg-[#F8F9FA] rounded-[6px] flex flex-col items-center justify-center text-center">
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
          );
        })}
      </div>
    </div>
  );
}