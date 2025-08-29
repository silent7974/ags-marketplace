"use client"

import { User, ShoppingCart, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav
      className="w-full flex flex-col px-4 py-3 shadow-md"
      style={{ backgroundColor: "#EEEEEE" }}
    >
      {/* Top row - Hamburger, Logo, Icons */}
      <div className="flex items-center justify-between w-full">
        {/* Left - Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <Link href="#">
            <Image src="/ags-hamburger.svg" alt="Menu" width={24} height={24} />
          </Link>
          <span className="font-bold text-xl">AGS</span>
          <Image src="/ags-logo.svg" alt="AGS Logo" width={28} height={28} />
        </div>

        {/* Right - User & Cart */}
        <div className="flex items-center gap-4">
          <button>
            <User size={24} className="text-black" />
          </button>
          <button>
            <ShoppingCart size={24} className="text-black" />
          </button>
        </div>
      </div>

      {/* Search bar row */}
      <div className="w-full flex justify-center mt-3">
        <Link href="/search" className="w-[361px]">
          <div className="flex items-center h-[32px] bg-gray-100 px-3 rounded-full border border-gray-300 cursor-pointer">
            {/* Search Icon */}
            <Search size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-400 text-sm">
              Search products, shops and categories
            </span>
          </div>
        </Link>
      </div>
    </nav>
  )
}
