"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import SignInLayout from "./SignInLayout"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  // Hide Navbar & Footer if route starts with /seller
  const isSellerRoute = pathname.startsWith("/seller")

  // 🔑 Mock authentication (replace later with real auth state)
  const isSignedIn = false

  // Modal state
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <>
      {!isSellerRoute && <Navbar />}
      {children}
      {!isSellerRoute && <Footer />}

      {/* ✅ Sign-in CTA for unsigned users */}
      {!isSellerRoute && !isSignedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 px-4 py-3 flex items-center justify-between">
          <p className="text-white font-inter font-bold text-[12px]">
            Sign in for the best experience
          </p>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-[#005770] text-white font-inter font-medium text-[14px] px-5 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            Sign In
          </button>
        </div>
      )}

      {/* 🔥 Modal for SignInLayout */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <SignInLayout onSuccess={() => setShowSignIn(false)} />
          </div>
        </div>
      )}
    </>
  )
}