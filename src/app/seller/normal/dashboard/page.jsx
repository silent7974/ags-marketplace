"use client";

import { Upload, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerDashboard() {
  const router = useRouter();

  return (
    <div className="px-[16px] py-[24px] space-y-[24px]">
      {/* Dashboard Title */}
      <div>
        <h1 className="text-[20px] font-medium font-montserrat text-black">
          Your Dashboard
        </h1>
        <p className="text-[12px] font-medium text-black/60 mt-[4px]">
          Let’s make your first sale.
        </p>
      </div>

      {/* 3-Step Action Cards */}
      <div className="flex space-x-[16px] overflow-x-auto pb-[8px]">
        {/* Add Product Card */}
        <div className="min-w-[240px] bg-white rounded-[8px] shadow p-[16px] flex flex-col items-start gap-[12px]">
          <Upload size={24} className="text-[#005770]" />
          <h2 className="text-[14px] font-semibold font-inter text-black">
            Add Your First Product
          </h2>
          <p className="text-[10px] text-black/60">
            Start by listing your product for thousands to see.
          </p>
          <button
            onClick={() => router.push("/seller/normal/products/add")}
            className="mt-auto bg-[#005770] text-white text-[12px] font-semibold py-[6px] px-[12px] rounded"
          >
            Add Product
          </button>
        </div>

        {/* Complete Profile Card */}
        <div className="min-w-[240px] bg-white rounded-[8px] shadow p-[16px] flex flex-col items-start gap-[12px]">
          <UserCheck size={24} className="text-[#005770]" />
          <h2 className="text-[14px] font-semibold font-inter text-black">
            Complete Your Profile
          </h2>
          <p className="text-[10px] text-black/60">
            Add store info to build buyer trust and get verified.
          </p>
          <button
            onClick={() => router.push("/seller/normal/settings")}
            className="mt-auto bg-[#005770] text-white text-[12px] font-semibold py-[6px] px-[12px] rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Dashboard Metrics Zero-State */}
      <div className="space-y-[16px]">
        <div className="bg-white rounded-[8px] p-[16px] text-center text-black/60 text-[10px]">
          No sales data yet. Add a product to see your dashboard stats grow.
        </div>
      </div>

      {/* Help Section */}
      <div className="space-y-[8px] mt-[32px]">
        <h2 className="text-[16px] font-semibold font-inter text-[#18331B]">
          Need Help Getting Started?
        </h2>
        <p className="text-[10px] text-black/60">
          Explore tips and resources for successful selling.
        </p>
        <button
          onClick={() => router.push("/seller/normal/help")}
          className="bg-[#005770] text-white text-[12px] font-semibold py-[6px] px-[12px] rounded"
        >
          Visit Help Center
        </button>
      </div>
    </div>
  );
}