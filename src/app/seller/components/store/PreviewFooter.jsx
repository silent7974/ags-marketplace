'use client'

import { useSelector } from "react-redux";
import Image from "next/image";
import { useGetMyStoreQuery } from "@/redux/services/storeApi";

export default function PreviewFooter() {
  const { data: store } = useGetMyStoreQuery();
  

  const {storeTagline, socials } = useSelector((s) => s.store);

  // Array of available social icons
  const socialIcons = [
    { platform: 'instagram', url: socials.instagram, src: '/instagram2.svg' },
    { platform: 'tiktok', url: socials.tiktok, src: '/tiktok2.svg' },
    { platform: 'twitter', url: socials.twitter, src: '/twitter2.svg' },
  ].filter(s => s.url); // Only show if user added link

  return (
    <footer className="bg-[#eeeeee] mt-8 py-6 flex flex-col items-center text-center space-y-3">
      {/* Brand Name */}
      <h1 className="font-[montserrat] font-bold italic text-[24px] text-[#474545]">
        {store?.brandName || "Your Store"}
      </h1>

      {/* Tagline */}
      {storeTagline && (
        <p className="font-inter font-light text-[16px] text-[#474545]">
          {storeTagline}
        </p>
      )}

      {/* Follow us */}
      {socialIcons.length > 0 && (
        <>
          <p className="font-inter font-semibold text-[16px] text-[#474545]">
            Follow us:
          </p>

          <div className="flex items-center justify-center gap-12">
            {socialIcons.map((s, idx) => (
              <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer">
                <Image src={s.src} alt={s.platform} width={20} height={20} />
              </a>
            ))}
          </div>
        </>
      )}

      {/* Powered by Malltiply */}
      <div className="flex items-center gap-2">
        <Image src="/malltiply-logo.svg" alt="Malltiply" width={12} height={12} />
        <span className="text-[12px] text-[#474545] font-inter">
          Powered by Malltiply
        </span>
      </div>
    </footer>
  )
}