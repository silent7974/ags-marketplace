import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <div>
        {/* Footer Section */}
        <div className="bg-[#f8f9fa] text-gray-700 text-sm mt-8">
          {/* Dropdown Sections */}
          <div className="divide-y divide-gray-300 border rounded-xl overflow-hidden">
            {/* Company Info */}
            <details className="group px-6 py-4 cursor-pointer">
              <summary className="flex justify-between items-center font-medium">
                Company Info
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
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
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>
                  About AGS{" "}
                  <span className="text-gray-400">
                    (AGS - Your Market Place. Your Hustle. Your rules.)
                  </span>
                </li>
                <li>Careers</li>
                <li>Contact us</li>
                <li>Press & Media</li>
                <li>Affiliate program: Earn commission</li>
              </ul>
            </details>

            {/* Customer Service */}
            <details className="group px-6 py-4 cursor-pointer">
              <summary className="flex justify-between items-center font-medium">
                Customer Service
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
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
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>Return and Refund Policy</li>
                <li>Intellectual Property Policy</li>
                <li>Shipping Info</li>
                <li>Report suspicious activity</li>
              </ul>
            </details>

            {/* Help */}
            <details className="group px-6 py-4 cursor-pointer">
              <summary className="flex justify-between items-center font-medium">
                Help
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
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
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>Support center & FAQ</li>
                <li>Safety center</li>
                <li>AGS purchase protection</li>
                <li>Sitemap</li>
                <li>Partner with AGS</li>
              </ul>
            </details>
          </div>

          {/* Space before Social Icons */}
          <div
            className="p-4 mt-6 flex justify-center items-center gap-[56px]"
            style={{ width: "304px", margin: "0 auto" }}
          >
            <Link href="#">
              <Instagram size={20} />
            </Link>
            <Link href="#">
              <Facebook size={20} />
            </Link>
            <Link href="#">
              <Twitter size={20} />
            </Link>
            <Link href="#">
              <Youtube size={20} />
            </Link>
          </div>

          {/* Footer Bottom */}
          <div className="text-center mt-4">
            <p>© 2025 Aliki Global Services™. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/terms" className="underline">
                Terms of use
              </Link>
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              <Link href="/ad-choices" className="underline">
                Ad Choices
              </Link>
              <Link href="/privacy-choices" className="underline">
                Your privacy choices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

console.log("Footer loaded");
