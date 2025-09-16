import { useMemo } from "react";
import { useGetPublicProductsQuery } from "@/redux/services/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function FeaturedSection({
  titleImg,
  altText,
  filterFn,
  fallbackText,
  showLimitedStockBadge,
}) {
  const { data, isLoading, isError } = useGetPublicProductsQuery();
  
  const router = useRouter()

  // ✅ normalize to array (backend might return { products: [...] })
  const products = Array.isArray(data) ? data : data?.products || [];

  const filteredProducts = useMemo(() => {
    return filterFn ? products.filter(filterFn) : products;
  }, [products, filterFn]);

  const formatPrice = (price) =>
    price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <section className="w-full mt-4">
      <div className="w-full h-9 relative mb-4">
        <Image src={titleImg} alt={altText} fill className="object-contain" />
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : isError ? (
        <p className="text-red-500 text-sm">Failed to load products.</p>
      ) : filteredProducts.length > 0 ? (
        <div className="flex gap-[4px] overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {filteredProducts.map((p) => (
            <div 
              key={p._id} 
              className="min-w-[160px] snap-start overflow-hidden"
              onClick={() => router.push(`/details/${p._id}`)}
            >
              <div>
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={p.images?.[0]?.url || "/placeholder.png"}
                    alt={p.productName || "Product"}
                    fill
                    className="object-cover"
                  />

                  {showLimitedStockBadge && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[45px] h-[20px] rounded-[47px] bg-black/50 flex items-center justify-center">
                      <span className="font-black text-[10px] text-white font-montserrat">
                        {p.quantity} left
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-[2px] mt-[2px] pb-3">
                  <div className="flex items-center gap-[4px]">
                    <p className="font-semibold text-[12px] text-[#D8A31B] font-inter">
                      ₦{formatPrice(p.discountedPrice)}
                    </p>
                    <p className="text-[8px] font-inter text-black/50 line-through">
                      ₦{p.formattedPrice}
                    </p>
                  </div>
                  <div className="w-[24px] h-[14px] border border-[#D8A31B] rounded-[2px] flex items-center justify-center">
                    <span className="text-[8px] font-semibold font-inter text-[#D8A31B]">
                      -{p.discount}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-sm">{fallbackText}</p>
      )}
    </section>
  );
}