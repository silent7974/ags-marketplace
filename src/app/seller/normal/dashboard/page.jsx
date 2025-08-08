"use client";

import { useRouter } from "next/navigation";

export default function FirstTimeDashboard() {
  const router = useRouter()
  return (
    <div className=" py-6">
      {/* Top Titles */}
      <div>
        <h1 className="text-[20px] font-medium font-montserrat text-black">
          Your Dashboard
        </h1>
        <p className="text-[16px] font-medium font-montserrat text-black/50 mt-1">
          Let’s make your first sale.
        </p>
      </div>

      {/* Sales Card */}
      <div className="w-[320px] h-[274px] mt-[24px] rounded-[16px] bg-[#E8F0F1] px-[8px] flex flex-col items-center justify-center text-center mx-auto border border-[#005770]/10">
        <h2 className="text-[30px] font-bold font-montserrat text-[#000000]/40">
          No sales data yet
        </h2>
        <p className="mt-10 text-[18px] font-semibold font-inter text-[#000000]/30">
          Add a product to see your dashboard stats grow.
        </p>
      </div>

      {/* Upload/Profile Cards Carousel */}
      <div className="flex overflow-x-auto mt-[56px] space-x-[8px] px-1 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {/* Upload Product Card */}
        <button 
        className="w-[301px] h-[236px] rounded-[16px] bg-[#7B00C3] flex-shrink-0 flex flex-col items-center snap-start"
        onClick={() => {
          router.push('/seller/normal/dashboard/products/add');
        }}
        >
          <img
            src="/upload-illustration.svg"
            alt="Upload"
            className="w-[140px] mt-9"
          />
          <p className="mt-3.5 text-[20px] font-semibold font-inter text-white text-center">
            Upload your product
          </p>
        </button>

        {/* Edit Profile Card */}
        <button 
        className="w-[301px] h-[236px] rounded-[16px] bg-[#2A9CBC] flex-shrink-0 flex flex-col items-center snap-start"
        onClick={() => {
          router.push('/seller/normal/dashboard/settings');
        }}
        >
          <img
            src="/profile-illustration.svg"
            alt="Profile"
            className="w-[140px] mt-9"
          />
          <p className="mt-3.5 text-[20px] font-semibold font-inter text-white text-center">
            Complete your profile settings
          </p>
        </button>
      </div>

      {/* Help Section */}
      <div className=" mt-[56px] space-y-[16px]">
        <h3 className="text-[20px] font-semibold text-center font-inter text-black">
          Need help getting Started?
        </h3>
        <p className="text-[12px] text-center font-medium font-inter text-black/70">
          Explore tips and resources for successful selling.
        </p>
        <div className="flex justify-center">
          <button 
          className="bg-[#005770] text-white rounded-[4px] px-3 py-2 text-[12px] font-semibold font-inter"
          onClick={() => {
          router.push('/seller/normal/dashboard/help');
        }}
          >
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
}