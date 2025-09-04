"use client"

import { Headphones, History } from "lucide-react"
import Image from "next/image"

export default function ProfileModal() {
  return (
    <div className="absolute right-0 top-10 z-50">
      {/* pointer (border + fill so it feels part of the card) */}
      <div className="relative w-[346px]">
        {/* outer border triangle */}
        <div className="absolute left-12 -top-3 w-0 h-0 
                        border-l-[10px] border-r-[10px] border-b-[10px]
                        border-l-transparent border-r-transparent border-b-gray-300" />
        {/* inner white triangle */}
        <div className="absolute left-[52px] -top-[10px] w-0 h-0 
                        border-l-[8px] border-r-[8px] border-b-[8px]
                        border-l-transparent border-r-transparent border-b-white" />

        {/* card */}
        <div className="w-[346px] bg-white rounded-xl border border-gray-300 shadow-md overflow-hidden">

          {/* SIGN IN / REGISTER pill */}
          <div className="w-full flex justify-center pt-3">
            <div className="w-[310px] h-[40px] bg-[#005770] rounded-full
                            flex items-center justify-center">
              <span className="text-white font-semibold tracking-wide">
                SIGN IN / REGISTER
              </span>
            </div>
          </div>

          {/* top row: orders / profile / reviews (each 66x75) */}
          <div className="px-4 pt-3">
            <div className="flex items-center justify-between">
              {/* Your orders */}
              <div className="w-[66px] h-[75px] flex flex-col items-center justify-between py-1">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <Image className="w-5 h-5"
                    src="/orders.svg"
                    alt="Reviews"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-[11px] text-center leading-tight">Your orders</span>
              </div>

              {/* Your profile */}
              <div className="w-[66px] h-[75px] flex flex-col items-center justify-between py-1">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <Image className="w-5 h-5"
                    src="/profile-white.svg"
                    alt="Reviews"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-[11px] text-center leading-tight">Your profile</span>
              </div>

              {/* Your reviews */}
              <div className="w-[66px] h-[75px] flex flex-col items-center justify-between py-1">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <Image className="w-5 h-5"
                    src="/reviews.svg"
                    alt="Reviews"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-[11px] text-center leading-tight">Your reviews</span>
              </div>
            </div>
          </div>

         {/* Divider (364 x 4 from Figma) */}
          <div className="w-[364px] h-[4px] bg-gray-200 mx-auto my-2" />

          {/* Customer support (323 x 72) */}
          <div className="w-full flex justify-center">
            <div className="w-[323px] h-[72px] flex items-center gap-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer border-b border-gray-200">
              <Headphones className="w-6 h-6 text-[#005770]" />
              <span className="text-[14px] font-medium text-gray-800">Customer Support</span>
            </div>
          </div>

          {/* Browsing history (323 x 72) */}
          <div className="w-full flex justify-center">
            <div className="w-[323px] h-[72px] flex items-center gap-3 px-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <History className="w-6 h-6 text-[#005770]" />
              <span className="text-[14px] font-medium text-gray-800">Browsing History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
