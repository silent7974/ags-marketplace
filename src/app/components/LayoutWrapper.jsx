"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/redux/slices/cartSlice";
import { fetchSellerProfile } from "@/redux/slices/sellerProfileSlice";
import { useMeQuery } from "@/redux/services/authApi";
import { useGetCartQuery } from "@/redux/services/cartApi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignInLayout from "./SignInLayout";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const isSellerRoute = pathname.startsWith("/seller");
  const isStoreRoute = pathname.startsWith("/stores/");
  const hideChrome = isSellerRoute || isStoreRoute;

  const [showSignIn, setShowSignIn] = useState(false);
  const status = useSelector((state) => state.sellerProfile.status);
  const { data: me, isLoading: meLoading } = useMeQuery();
  const user = me?.user;
  const { data: cartData } = useGetCartQuery(user?._id, { skip: !user });
  const dispatch = useDispatch();

  // 🧠 Sync backend cart to Redux
  useEffect(() => {
    if (cartData?.items) {
      dispatch(setCart(cartData.items));
    }
  }, [cartData, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSellerProfile());
    }
  }, [status, dispatch]);

  const isSignedIn = !!user;

  return (
    <>
      {!hideChrome && <Navbar />}

      {children}

      {!hideChrome && <Footer />}

      {!meLoading && !isSignedIn && (
        <div className="fixed bottom-0 z-[2000] left-0 right-0 bg-black/80 px-4 py-3 flex items-center justify-between">
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

      {showSignIn && <SignInLayout onClose={() => setShowSignIn(false)} />}
    </>
  );
}