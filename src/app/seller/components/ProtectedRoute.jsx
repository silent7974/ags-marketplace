"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedType, children }) {
  const router = useRouter();
  const seller = useSelector((state) => state.sellerProfile);

  useEffect(() => {
    if (seller.status === "failed") {
      router.replace("/seller/signin");
    }

    if (
      seller.status === "succeeded" &&
      allowedType &&
      seller.sellerType !== allowedType
    ) {
      router.replace(
        seller.sellerType === "premium_seller"
          ? "/seller/premium/dashboard"
          : "/seller/normal/dashboard"
      );
    }
  }, [seller, allowedType, router]);

  if (seller.status !== "succeeded") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return <>{children}</>;
}