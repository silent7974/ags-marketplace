import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
        {/* Footer Section */}
        <div>
          {/* Dropdown Sections */}
          <div className="text-black font-[montserrat] font-medium text-[12px] mt-[16px]">
            {/* Company Info */}
            <details className="group border-b border-black/10 cursor-pointer">
              <summary className="flex justify-between w-full px-[16px] h-[36px] items-center font-medium">
                Company Info
                <svg
                  className="w-[12px] h-[12px] text-black/50 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <ul className="bg-[#F2F2F2] px-[16px] py-[8px] space-y-[8px] font-[inter] font-normal text-[12px] text-black">
                <li>
                  About AGS{" "} <br/>
                  <span className="font-light text-black/50">
                    AGS - Your Market Place. Your Hustle. Your rules.
                  </span>
                </li>
                <li>Careers</li>
                <li>Contact us</li>
                <li>Press & Media</li>
                <li>Affiliate program: Earn commission</li>
              </ul>
            </details>

            {/* Customer Service */}
            <details className="group border-b border-black/10 cursor-pointer">
              <summary className="flex w-full px-[16px] h-[36px] justify-between items-center font-medium">
                Customer Service
                <svg
                  className="w-[12px] h-[12px] text-black/50 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <ul className="bg-[#F2F2F2] px-[16px] py-[8px] space-y-[8px] font-[inter] font-normal text-[12px] text-black">
                <li>Return and Refund Policy</li>
                <li>Intellectual Property Policy</li>
                <li>Shipping Info</li>
                <li>Report suspicious activity</li>
              </ul>
            </details>

            {/* Help */}
            <details className="group border-b border-black/10 cursor-pointer">
              <summary className="flex w-full px-[16px] h-[36px] justify-between items-center font-medium">
                Help
                <svg
                  className="w-[12px] h-[12px] text-black/50 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <ul className="bg-[#F2F2F2] px-[16px] py-[8px] space-y-[8px] font-[inter] font-normal text-[12px] text-black">
                <li>Support center & FAQ</li>
                <li>Safety center</li>
                <li>AGS purchase protection</li>
                <li>Sitemap</li>
                <li>Partner with AGS</li>
              </ul>
            </details>
          </div>

          {/* Second part of footer */}
          <div className="bg-[#EEEEEE] py-[16px]">
            <div className="flex justify-center items-center gap-[48px]">
              <Image src="/instagram.svg" alt="Instagram" width={16} height={16} />
              <Image src="/facebook.svg" alt="Facebook" width={16} height={16} />
              <Image src="/twitter.svg" alt="Twitter" width={16} height={16} />
              <Image src="/tiktok.svg" alt="TikTok" width={16} height={16} />
              <Image src="/youtube.svg" alt="Youtube" width={16} height={12} />
            </div>

            <div className="font-[inter] text-[12px] font-light text-[#7B7979] text-center mt-[24px]">
              <p>© 2025 Aliki Global Services™</p>
              <div className="mt-[24px] font-normal text-black/40 space-x-[24px]">
                <Link href="/terms" className="underline">
                  Terms of use
                </Link>
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
                <Link href="/ad-choices" className="underline">
                  Ad Choices
                </Link>
              </div>

              {/* Privacy choices with icon */}
              <div className="flex justify-center items-center gap-[4px] mt-[16px] text-black/40 font-normal">
                <Link href="/privacy-choices" className="underline">
                  Your privacy choices
                </Link>

                <Image
                  src="/consent.svg"
                  alt="Consent"
                  width={16}
                  height={8}
                />
              </div>
            </div>

          </div>
        </div>
    </>
  );
}