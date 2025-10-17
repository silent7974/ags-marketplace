'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useSelector } from "react-redux";
import MenuModal from '../../components/MenuModal';

export default function SellerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { fullName, profileImage } = useSelector((state) => state.sellerProfile);
  const firstName = fullName ? fullName.split(' ')[0] : "Seller";

  return (
    <nav className="flex justify-between items-center pt-[48px]">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <Image
          src="/ags-hamburger.svg"
          alt="Menu"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
        <p className="text-[#005770] text-[20px] font-medium">
          Welcome, {firstName}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Image
          src="/notification.svg"
          alt="Notification"
          width={32}
          height={32}
          className="cursor-pointer"
        />
        <div
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => window.location.href = '/seller/normal/dashboard/settings'}
        >
          <Image
            src={profileImage || "/profile.svg"}
            alt="Profile"
            width={32}
            height={32}
            className="w-[32px] h-[32px] object-cover rounded-full"
          />
        </div>
      </div>

      {/* Menu Modal */}
      {isMenuOpen && (
        <MenuModal onClose={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}