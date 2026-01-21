"use client";

import { usePathname } from "next/navigation";
import PremiumNavbar from "./PremiumNavbar";
import ProtectedRoute from "../../components/ProtectedRoute";


export default function PremiumDashboardLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname.includes("/settings");

  return (
    <ProtectedRoute allowedType="premium_seller">
      <div className="flex flex-col min-h-screen px-[16px] py-[40px]">
        {!hideNavbar && <PremiumNavbar />}
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedRoute>
  );
}