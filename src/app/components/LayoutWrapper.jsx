"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  // Hide Navbar & Footer if route starts with /seller
  const isSellerRoute = pathname.startsWith("/seller")

  return (
    <>
      {!isSellerRoute && <Navbar />}
      {children}
      {!isSellerRoute && <Footer />}
    </>
  )
}