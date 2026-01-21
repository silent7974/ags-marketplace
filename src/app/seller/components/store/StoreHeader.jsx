'use client'

import { useState, useEffect } from "react";
import Image from "next/image";

import { useGetMyStoreQuery } from "@/redux/services/storeApi";
import PreviewStore from "./PreviewStore";

export default function StoreHeader() {
  const { data: store } = useGetMyStoreQuery();
  const [scrolled, setScrolled] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 bg-[#F8F9FA]
          transition-all duration-200
          ${scrolled ? "pt-[40px] pb-3" : "py-3"}
        `}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-[montserrat] font-medium text-[16px] text-black">
            {store?.brandName || "Your Store"}
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenPreview(true)}
              className="flex items-center gap-1 text-[16px] font-inter text-black/50"
            >
              <Image src="/preview.svg" alt="Preview" width={12} height={12} />
              Preview
            </button>

            {/* Copy link */}
            <button
              onClick={() => navigator.clipboard.writeText(storeUrl)}
              className="flex items-center gap-1 text-[16px] font-[inter] font-regular text-black/50"
            >
              <Image src="/link.svg" alt="Copy link" width={12} height={12} />
              Link
            </button>
          </div>
        </div>
      </header>

      {openPreview && <PreviewStore onClose={() => setOpenPreview(false)} />}
    </>
  );
}