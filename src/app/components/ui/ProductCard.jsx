"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProductCard({ product, index }) {
  const hasDiscount = product.discount && product.discount > 0
  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price

  const formatPrice = (price) => {
    if (!price || price === 0) return ""
    return `₦${price.toLocaleString("en-NG")}`
  }

  const router = useRouter()

  return (
    <div 
      key={product._id}
      onClick={() => router.push(`/details/${product._id}`)}
    >
      {/* Product Image */}
      <Image
        src={product.images?.[0]?.url || "/placeholder.png"}
        alt={product.productName}
        width={500}
        height={index % 2 === 0 ? 132 : 168}
        className={`w-full object-cover ${
          index % 2 === 0 ? "h-[132px]" : "h-[168px]"
        }`}
      />

      {/* Product Info */}
      <div className="mt-[2px]">
        <h3 className="font-[Montserrat] text-[11px] text-black/50 truncate">
          {product.productName}
        </h3>

        <div className="flex items-center justify-between mt-[2px]">
          <div className="flex items-baseline space-x-[2px]">
            <span className="font-[Inter] font-medium text-[10px]">
              {discountedPrice > 0 ? formatPrice(discountedPrice) : ""}
            </span>
            {hasDiscount && product.price > 0 && (
              <span className="font-[Inter] text-[8px] text-black/50 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="w-[36px] h-[29px] flex items-center justify-center border border-black/50 rounded-[24px]">
            <Image
              src="/add-shopping-cart.svg"
              width={16}
              height={16}
              alt="Add shopping cart"
            />
          </div>
        </div>

        <div className="mt-[2px] font-[Inter] text-[8px] text-[#016A87]">
          {hasDiscount ? `${product.discount}% off` : ""}
        </div>
      </div>
    </div>
  )
}