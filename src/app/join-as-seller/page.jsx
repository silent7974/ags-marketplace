'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Tiktok } from "lucide-react";

export default function JoinAsSeller() {
  return (
    <>
      <div className="bg-[#f8f9fa]">
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
                <button className="bg-[#1992f4] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#1580d4]">
                  Sign Up
                </button>
              </Link>
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
        <div className="bg-[#E8F0F1] py-12 px-4 md:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Why Sell on AGS?</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: "📡", title: "Get Discovered by Thousands", desc: "AGS puts your products in front of real buyers across Nigeria and beyond. Whether you sell kaftans, accessories, or handmade software, we help you stand out. No tech skills needed. Just upload and start selling." },
                { icon: "🔒", title: "Easy Setup & Local Support", desc: "No complicated dashboards. AGS is built for sellers in our community — simple tools, fast uploads, and a support team that speaks your language when you need help." },
                { icon: "⭐", title: "Build Your Own Brand", desc: "Use your custom shop design, logos, and product layouts to build a unique brand your customers remember and trust." },
                { icon: "📊", title: "Grow with Confidence", desc: "Backed by training, community support, and insights to help you scale from side hustle to full-time success." }
              ].map((card, idx) => (
                <div key={idx} className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#E8F0F1] py-12 px-4 md:px-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="divide-y divide-gray-300 border rounded-xl overflow-hidden">
              {[
                {
                  q: "How much does it cost to sell on AGS?",
                  a: "Selling on AGS is free, but we charge a small commission per sale. You can view full pricing in your seller dashboard.",
                },
                {
                  q: "Can I customize my store on AGS?",
                  a: "Yes, AGS allows you to personalize your shop with logos, banners, and product layouts to reflect your brand.",
                },
                {
                  q: "How do I get paid after selling on AGS?",
                  a: "Payouts are sent directly to your registered bank account within 3–5 business days after a successful order.",
                },
                {
                  q: "What support do I get if I run into problems?",
                  a: "We offer 24/7 seller support via email, chat, and a dedicated help center for any issues you face.",
                },
              ].map((item, idx) => (
                <details key={idx} className="group open:bg-blue-50 px-6 py-4 cursor-pointer transition-all">
                  <summary className="flex justify-between items-center font-medium text-gray-800 group-open:text-blue-700">
                    <span>{item.q}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="text-center text-sm text-gray-600 py-6">
          By creating a seller account, you agree to our{' '}
          <Link href="/seller-privacy-policy" className="text-blue-600 underline hover:text-blue-800">
            Seller Privacy Policy
          </Link>
        </div>

        {/* Company Info + Footer Section */}
        <div className="bg-[#E8F0F1] py-12 px-4 md:px-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Company Info</h2>
            <div className="divide-y divide-gray-300 border rounded-xl overflow-hidden">
              {[
                "About AGS",
                "AGS - Your Market Place. Your hustle. Your rules.",
                "Careers",
                "Contact us",
                "Press & Media",
                "Affiliate program: Earn commission",
                "Customer Service",
                "Help",
              ].map((item, idx) => (
                <details key={idx} className="group open:bg-blue-50 px-6 py-4 cursor-pointer transition-all">
                  <summary className="flex justify-between items-center font-medium text-gray-800 group-open:text-blue-700">
                    <span>{item}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                </details>
              ))}
            </div>
          </div>

          {/* Footer links and social icons */}
          <div className="mt-12 max-w-4xl mx-auto text-center space-y-4 text-gray-700 text-sm">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/terms" className="hover:underline">Terms of use</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/ad-choices" className="hover:underline">Ad Choices</Link>
              <Link href="/privacy-choices" className="hover:underline">Your privacy choices</Link>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mt-4 text-gray-700">
              <Link href="https://instagram.com"><Instagram className="w-5 h-5 hover:text-blue-600" /></Link>
              <Link href="https://facebook.com"><Facebook className="w-5 h-5 hover:text-blue-600" /></Link>
              <Link href="https://twitter.com"><Twitter className="w-5 h-5 hover:text-blue-600" /></Link>
              <Link href="https://tiktok.com"><Tiktok className="w-5 h-5 hover:text-blue-600" /></Link>
              <Link href="https://youtube.com"><Youtube className="w-5 h-5 hover:text-blue-600" /></Link>
            </div>

            <p className="pt-6 text-xs text-gray-500">
              © 2025 Aliki Global Services™. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
