'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserRound } from 'lucide-react';
import MenuModal from '../../components/MenuModal';


export default function SellerNavbar({ firstName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="flex justify-between items-center py-4">
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
          className="w-[32px] h-[32px] rounded-full border-[2px] border-[#005770] flex items-center justify-center cursor-pointer"
          onClick={() => window.location.href = '/seller/normal/settings'}
        >
          <UserRound size={24} color="#000000" />
        </div>
      </div>

      {/* Menu Modal */}
      {isMenuOpen && (
        <MenuModal onClose={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}
