"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  setStoreTagline,
  setSocial,
} from "@/redux/slices/storeSlice";

export default function StoreFooter() {
  const dispatch = useDispatch();
  const { storeTagline, socials } = useSelector((s) => s.store);

  return (
    <section className="mt-[32px]">
      {/* Tagline */}
      <label className="text-[12px] font-inter font-medium mb-[4px] block">
        Store tagline
      </label>

      <p className="text-[10px] font-inter font-medium mb-[12px] text-black/50">
        A short phrase that represents your brand
      </p>

      <input
        value={storeTagline}
        onChange={(e) => dispatch(setStoreTagline(e.target.value))}
        maxLength={60}
        placeholder="Quality you can trust"
        className="w-full h-[40px] bg-[#EEEEEE] px-[12px]
        text-[12px] rounded-[4px]
        placeholder:text-black/30 placeholder:font-inter"
      />

      {/* Socials */}
      <div className="mt-[16px]">
        <label className="text-[12px] font-inter font-medium mb-[4px] block">
          Connect Socials
        </label>

        <p className="text-[10px] font-inter font-medium mb-[12px] text-black/50">
          Let shoppers follow you and helps us understand your brand better
        </p>

        <div className="space-y-[12px]">
          {/* Instagram */}
          <div
            className="flex items-center gap-[12px]
            h-[40px] px-[12px]
            border border-black/30 rounded-[4px]"
          >
            <Image
              src="/instagram2.svg"
              alt="Instagram"
              width={20}
              height={20}
            />
            <input
              value={socials.instagram}
              onChange={(e) =>
                dispatch(
                  setSocial({
                    platform: "instagram",
                    value: e.target.value,
                  })
                )
              }
              placeholder="https://instagram.com/yourstore"
              className="flex-1 h-full text-[12px] font-inter
              placeholder:text-black/30 outline-none bg-transparent"
            />
          </div>

          {/* TikTok */}
          <div
            className="flex items-center gap-[12px]
            h-[40px] px-[12px]
            border border-black/30 rounded-[4px]"
          >
            <Image
              src="/tiktok2.svg"
              alt="TikTok"
              width={20}
              height={20}
            />
            <input
              value={socials.tiktok}
              onChange={(e) =>
                dispatch(
                  setSocial({
                    platform: "tiktok",
                    value: e.target.value,
                  })
                )
              }
              placeholder="https://tiktok.com/@yourstore"
              className="flex-1 h-full text-[12px] font-inter
              placeholder:text-black/30 outline-none bg-transparent"
            />
          </div>

          {/* Twitter / X */}
          <div
            className="flex items-center gap-[12px]
            h-[40px] px-[12px]
            border border-black/30 rounded-[4px]"
          >
            <Image
              src="/twitter2.svg"
              alt="X"
              width={20}
              height={20}
            />
            <input
              value={socials.twitter}
              onChange={(e) =>
                dispatch(
                  setSocial({
                    platform: "twitter",
                    value: e.target.value,
                  })
                )
              }
              placeholder="https://x.com/yourstore"
              className="flex-1 h-full text-[12px] font-inter
              placeholder:text-black/30 outline-none bg-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}