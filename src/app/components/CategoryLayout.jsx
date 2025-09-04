"use client"

import { useState } from "react"
import { useGetPublicProductsQuery } from "@/redux/services/productApi"
import headerCategoryMap from "@/lib/data/headerCategoryMap"
import productCategoryMap from "@/lib/data/productCategoryMap"
import ProductGrid from "./ui/ProductGrid"
import Image from "next/image"
import { ChevronRight, PackageX } from "lucide-react"

export default function CategoryLayout({ category }) {
  const mappedCategory = headerCategoryMap[category]
  const categoryData = productCategoryMap[mappedCategory]

  const subCategories = ["All", ...(Object.keys(categoryData?.categories || {}))]
  const [activeSubCategory, setActiveSubCategory] = useState("All")
  const [activeSubType, setActiveSubType] = useState("All")

  const { data, isLoading, isError } = useGetPublicProductsQuery(
    { category: mappedCategory },
    { skip: !mappedCategory }
  )

  const products = data?.products || []

  // Client-side filtering
  const filteredProducts = products.filter((p) => {
    if (p.category !== mappedCategory) return false
    if (activeSubCategory !== "All" && p.subCategory !== activeSubCategory) return false
    if (activeSubType !== "All" && p.subType !== activeSubType) return false
    return true
  })

  if (!categoryData) {
    return (
      <div className="p-4 text-center text-gray-500">
        No data for this category yet.
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ⭐ Top-rated Sellers Banner */}
      <button className="w-full h-6 bg-[#C6D8DE] px-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src="/star.svg" alt="Top rated" width={12} height={12} />
          <span className="font-montserrat font-semibold text-[10px] text-[#474545]">
            Shop from Top-Rated Sellers
          </span>
        </div>
        <div className="flex items-center gap-[2px]">
          <span className="font-montserrat font-medium text-[8px] text-[#474545]">
            Trusted vendors with exclusive deals
          </span>
          <ChevronRight size={10} className="text-[#474545]" />
        </div>
      </button>

      {/* 🖼 Subcategory Circles */}
      <div className="mt-4 px-4 py-[6px] flex gap-4 overflow-x-auto scrollbar-hide">
      {subCategories.map((sub) => {
        const isActive = activeSubCategory === sub

        // ✅ Fixed: Only pull products that belong to the current category
        const firstProduct =
          sub === "All"
            ? products.find((p) => p.category === mappedCategory)
            : products.find((p) => p.subCategory === sub)

        return (
          <button
            key={sub}
            onClick={() => {
              setActiveSubCategory(sub)
              setActiveSubType("All")
            }}
            className="flex flex-col items-center"
          >
            <div
              className={`w-[68px] h-[68px] rounded-full overflow-hidden flex items-center justify-center ${
                isActive ? "ring-1 ring-black ring-offset-2" : ""
              }`}
            >
              {firstProduct?.images?.[0]?.url ? (
                <Image
                  src={firstProduct.images[0].url}
                  alt={sub}
                  width={68}
                  height={68}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-[68px] h-[68px] bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs">{sub[0]}</span>
                </div>
              )}
            </div>
            <span
              className={`mt-1 font-montserrat text-[10px] font-medium ${
                isActive ? "text-black" : "text-black/50"
              }`}
            >
              {sub}
            </span>
          </button>
        )
      })}

      </div>

      {/* Sub-type Tabs */}
      <div className="w-full h-[32px] border-b border-black/10 flex items-center">
        <div className="flex gap-3 px-4 overflow-x-auto scrollbar-hide">
          {activeSubCategory !== "All" && (
            <>
              <button
                key="All"
                onClick={() => setActiveSubType("All")}
                className="relative flex flex-col items-center"
              >
                <span
                  className={`font-[500] font-montserrat text-[13px] whitespace-nowrap ${
                    activeSubType === "All" ? "text-black" : "text-black/40"
                  }`}
                >
                  All
                </span>
                {activeSubType === "All" && (
                  <span className="absolute bottom-0 w-[12px] h-[2px] rounded-full bg-black" />
                )}
              </button>
              {categoryData.categories[activeSubCategory]?.map((type) => {
                const isActive = activeSubType === type
                return (
                  <button
                    key={type}
                    onClick={() => setActiveSubType(type)}
                    className="relative flex flex-col items-center"
                  >
                    <span
                      className={`font-[500] font-montserrat text-[13px] whitespace-nowrap ${
                        isActive ? "text-black" : "text-black/40"
                      }`}
                    >
                      {type}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 w-[12px] h-[2px] rounded-full bg-black" />
                    )}
                  </button>
                )
              })}
            </>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <p className="col-span-2 text-center text-gray-400 p-4">Loading...</p>
      ) : isError ? (
        <p className="col-span-2 text-center text-red-500 p-4">Failed to load products.</p>
      ) : filteredProducts.length === 0 ? (
        <div className="w-full py-10 flex flex-col items-center justify-center text-gray-400">
          <PackageX size={32} />
          <p className="mt-2 text-sm">No products found in this category yet</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  )
}