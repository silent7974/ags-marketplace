'use client';

import { X, Home, Package, Wallet, BarChart4, LifeBuoy, Settings, LogOut, Folders } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function MenuModal({ onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/seller/normal/dashboard' },
    { name: 'My Products', icon: Folders, path: '/seller/normal/dashboard/products' },
    { name: 'Orders', icon: Package, path: '/seller/normal/dashboard/orders' },
    { name: 'Payments', icon: Wallet, path: '/seller/normal/dashboard/payments' },
    { name: 'Performance', icon: BarChart4, path: '/seller/normal/dashboard/performance' },
    { name: 'Help Center', icon: LifeBuoy, path: '/seller/normal/dashboard/help' },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-[188px] bg-[#005770] rounded-tr-[24px] py-[48px] px-[16px] z-50 flex flex-col justify-between transition-transform duration-300">
      {/* Close Button */}
      <div className="flex justify-end mb-[16px]">
        <X size={16} color="#ffffff" onClick={onClose} className="cursor-pointer" />
      </div>

      {/* Logo and AGS Text */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-[4px] mb-[32px]">
          <span className="text-[32px] font-bold text-white font-montserrat">AGS</span>
          <img src="/ags-logo-white.svg" width={32} height={32} alt="AGS Logo" />
        </div>

        {/* Navigation Links */}
        <div className="w-full">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <div key={item.name} className="relative">
                {/* Edge Indicator */}
                {isActive && (
                  <div className="absolute left-[-16px] h-[72px] w-[4px] bg-white rounded-r-[16px]" />
                )}
                <button
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-[12px] py-[24px] ${
                    isActive ? 'text-white' : 'text-white/60'
                  }`}
                >
                  <Icon size={24} className={isActive ? 'text-white' : 'text-white/60'} />
                  <span className="text-[16px] font-medium font-montserrat">{item.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full">
        {/* Settings */}
        <button
          onClick={() => {
            router.push('/seller/normal/dashboard/settings');
            onClose();
          }}
          className="w-full flex items-center gap-[12px] py-[12px] text-white/60"
        >
          <Settings size={24} className="text-white/60" />
          <span className="text-[16px] font-medium font-montserrat">Settings</span>
        </button>

        {/* Logout */}
        <button
          onClick={async () => {
            await fetch('/api/seller/logout', { method: 'POST' });
            router.push('/seller/signin');
          }}
          className="w-full flex items-center gap-[12px] py-[12px] text-white mt-[16px]"
        >
          <LogOut size={24} className="text-white" />
          <span className="text-[16px] font-medium font-montserrat">Logout</span>
        </button>
      </div>
    </div>
  );
}
