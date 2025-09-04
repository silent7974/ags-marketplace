"use client"

import { ShoppingCart, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import SearchModal from "./SearchModal"
import ProfileModal from "./ProfileModal"


export default function Navbar() {
  const pathname = usePathname()
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <nav className="w-full flex flex-col px-[16px] relative">
      {/* Top row - Hamburger, Logo, Icons */}
      <div className="flex items-center justify-between w-full">
        {/* Left - Hamburger & Logo */}
        <div className="flex items-center gap-[8px]">
          <Link href="/category">
            <Image
              src={pathname === "/category" ? "/hamburger-red.svg" : "/ags-hamburger.svg"}
              alt="Menu"
              width={32}
              height={32}
            />
          </Link>
          <Link className="flex items-center gap-[4px]" href="/">
            <span className="font-montserrat font-bold text-[32px] text-[#474545]">AGS</span>
            <Image src="/ags-logo.svg" alt="AGS Logo" width={32} height={32} />
          </Link>
        </div>

        {/* Right - User & Cart */}
        <div className="flex items-center gap-[24px] relative">
          {/* Profile button */}
          <button onClick={() => setShowProfile((prev) => !prev)}>
            <Image src="/profile.svg" alt="User profile" width={32} height={32} />
          </button>

          {/* Profile Modal */}
          {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}

          {/* Cart */}
          <Link href="/cart">
            <ShoppingCart size={32} className="text-black" />
          </Link>
        </div>
      </div>

      {/* Search bar row */}
      <div className="w-full flex justify-center mt-[4px]">
        <button
          onClick={() => setShowSearch(true)}
          className="w-[361px] flex items-center h-[32px] bg-[#E1E6E8] px-[4px] gap-[8px] rounded-full cursor-pointer"
        >
          <Search size={24} className="text-black/50" />
          <span className="font-montserrat text-[12px] font-medium text-black/50">
            Search products, shops and categories
          </span>
        </button>
      </div>

      {/* Modals */}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </nav>
  )
}
