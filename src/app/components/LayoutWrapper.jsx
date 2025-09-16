"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"
import SignInLayout from "./SignInLayout"
import { useMeQuery } from "@/redux/services/authApi"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isSellerRoute = pathname.startsWith("/seller")

  const [showSignIn, setShowSignIn] = useState(false)

  // ✅ use RTK Query to check session
  const { data, isLoading } = useMeQuery()
  const isSignedIn = !!data?.user

  return (
    <>
      {!isSellerRoute && <Navbar />}
      {children}
      {!isSellerRoute && <Footer />}

      {/* ✅ Sign-in CTA for unsigned users */}
      {!isSellerRoute && !isLoading && !isSignedIn && (
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
      {showSignIn && <SignInLayout onClose={() => setShowSignIn(false)} />}
    </>
  )
}