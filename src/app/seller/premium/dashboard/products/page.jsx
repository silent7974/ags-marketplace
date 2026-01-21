'use client'

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useGetProductsQuery } from "@/redux/services/productApi"
import {
  setCurrentProduct,
  resetCurrentProduct,
} from '@/redux/slices/productSlice'
import formatPrice from "@/lib/utils/formatPrice"

export default function ProductsOverview() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data: products = [], isLoading, isError } = useGetProductsQuery()
  const productCount = products.length
  const productText = productCount === 1 ? 'product' : 'products'

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>

  const handleEdit = (product) => {
    dispatch(setCurrentProduct({
      _id: product._id,
      productName: product.productName || '',
      subCategory: product.subCategory || '',
      subType: product.subType || '',
      price: product.price || 0,
      quantity: product.quantity || 0,
      description: product.description || '',
      images: product.images || [],
      adVideo: product.adVideo || null,  // ✅ added
      variants: product.variants || {},
      variantColumns: product.variantColumns || [],
    }))
    router.push('/seller/premium/dashboard/products/form')
  }

  return (
    <div>
      <h1 className="mt-4 mb-1 font-montserrat font-medium text-[20px]">My Products</h1>
      <p className="mb-6 font-montserrat font-medium text-[16px] text-black/50">
        Overview of your {productCount} {productText}
      </p>

      {/* Upload Product */}
      <div className="flex justify-center">
        <button
          className="w-[301px] mb-[48px] h-[236px] rounded-[16px] bg-[#7B00C3] flex flex-col items-center"
          onClick={() => {
            dispatch(resetCurrentProduct())
            router.push('/seller/premium/dashboard/products/form')
          }}
        >
          <img src="/upload-illustration.svg" alt="Upload" className="w-[140px] mt-9" />
          <p className="mt-3.5 text-[20px] font-semibold font-inter text-white">Upload your product</p>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-[8px] w-full max-w-[360px]">
        {products.map((product, index) => {
          const firstImage = product.images?.[0]
          const showDiscount = product.discountedPrice && product.discountedPrice < product.price

          return (
            <div
              key={product._id}
              onClick={() => handleEdit(product)}
              className={`relative w-full h-[248px] rounded-[8px] overflow-hidden bg-gray-900 flex flex-col justify-end py-[16px] cursor-pointer ${
                index % 2 === 1 ? "mt-[24px]" : ""
              }`}
            >
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={product.productName}
                  className="absolute inset-0 w-full h-full object-cover rounded-[8px]"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-700 rounded-[8px]" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[8px]" />

              <div className="relative z-10 text-white">
                <h3 className="font-inter font-semibold text-[16px] px-3 mb-1 truncate">
                  {product.productName}
                </h3>
                <div className="flex items-center justify-between px-3">
                  <div>
                      <p className="font-inter font-medium text-[12px]">₦{formatPrice(product.price)}</p>
                  </div>
                  <img src="/product-star.svg" alt="Star" className="w-3 h-3" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}