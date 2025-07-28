'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function JoinAsSeller() {
  return (
    <>
      {/* First Section (Dark Panel) */}
      <div className="bg-gray-900 min-h-screen flex justify-center items-start py-6 px-2">
        <div className="w-[393px] max-h-[872px] bg-gradient-to-b from-[#121212] to-[#0c2e4e] rounded-2xl shadow-2xl overflow-y-auto text-white">
          {/* Header */}
          <div className="flex justify-between items-center px-4 pt-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="AGS Logo" width={36} height={36} />
              <span className="font-semibold text-base text-white">AGS Seller Center</span>
            </div>
            <div className="flex gap-2 items-center">
              <Link href="/signin">
                <span className="text-sm text-white hover:underline">Sign in</span>
              </Link>
              <Link href="/signup">
                <button className="bg-[#1992f4] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#1580d4]">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 mt-8 mb-4">
            <h1 className="text-xl font-bold leading-snug mb-2">
              Start Selling to Thousands<br />of Buyers on AGS
            </h1>
            <p className="text-sm text-gray-300 mb-4">
              Join AGS and grow your business faster
            </p>

            <Link href="/signup">
              <button className="bg-[#1992f4] text-white w-full py-2 rounded-md text-sm font-semibold hover:bg-[#1580d4] transition">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Phone Image */}
          <div className="w-full flex justify-center my-4">
            <Image
              src="/mockup-phone.png"
              alt="Phone Preview"
              width={50}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Bottom Feature Panel */}
          <div className="text-xs grid grid-cols-3 divide-x divide-white text-center py-4 px-2 bg-black/50 text-white p-4">
            <div>
              <p className="font-bold text-base">1 Minute</p>
              <p>Create your account</p>
            </div>
            <div>
              <p className="font-bold text-base">10 Minutes</p>
              <p>Complete your application</p>
            </div>
            <div>
              <p className="font-bold text-base">1 Day</p>
              <p>Receive application results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section (Why Sell) */}
      <div className="bg-white py-12 px-4 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Sell on AGS?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">📡</div>
              <h3 className="text-xl font-semibold mb-2">Get Discovered by Thousands</h3>
              <p className="text-gray-600">
                AGS puts your products in front of real buyers across Nigeria and beyond.
                Whether you sell kaftans, accessories, or handmade software, we help you
                stand out. No tech skills needed. Just upload and start selling.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Easy Setup & Local Support</h3>
              <p className="text-gray-600">
                No complicated dashboards. AGS is built for sellers in our community —
                simple tools, fast uploads, and a support team that speaks your language
                when you need help.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Build Your Own Brand</h3>
              <p className="text-gray-600">
                Use your custom shop design, logos, and product layouts to build a unique
                brand your customers remember and trust.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Grow with Confidence</h3>
              <p className="text-gray-600">
                Backed by training, community support, and insights to help you scale from
                side hustle to full-time success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
