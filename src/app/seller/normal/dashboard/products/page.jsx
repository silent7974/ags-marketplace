'use client'

import { useRouter } from "next/navigation"
import { useGetProductsQuery } from '@/redux/services/productApi'

export default function ProductsOverview() {
  const { data: products, error, isLoading } = useGetProductsQuery()
  const productCount = products?.length || 0
  const productText = productCount === 1 ? 'product' : 'products'
  const router = useRouter()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading products</div>

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500, // medium
          fontSize: '20px',
          color: '#000000',
          marginBottom: '4px',
        }}
      >
        My Products
      </h1>

      <p
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: '16px',
          color: 'rgba(0, 0, 0, 0.5)', // 50% opacity black
          marginTop: 0,
          marginBottom: '24px',
        }}
      >
        Overview of your {productCount} {productText}
      </p>
      {/* Upload Product Card */}
      <div className="flex justify-center">
        <button 
          className="w-[301px] mb-[48px] h-[236px] rounded-[16px] bg-[#7B00C3] flex flex-col items-center"
          onClick={() => {
            router.push('/seller/normal/dashboard/products/add');
          }}
        >
          <img
            src="/upload-illustration.svg"
            alt="Upload"
            className="w-[140px] mt-9"
          />
          <p className="mt-3.5 text-[20px] font-semibold font-inter text-white text-center">
            Upload your product
          </p>
        </button>
      </div>

      {/* Grid container */}
      <div className="flex flex-wrap gap-x-2 gap-y-6 max-w-[360px]">
        {products?.map((product, index) => {
          // Decide top margin for the stagger effect on every second product
          const marginTop = index % 2 === 1 ? 'mt-6' : 'mt-0' // 24px marginTop for even indexes (1,3,5...)

          const firstImage = product.images?.[0]

          const showDiscount = product.discountedPrice && product.discountedPrice < product.price

          return (
            <div
              key={product._id}
              onClick={() => router.push(`/seller/normal/dashboard/products/edit/${product._id}`)}
              className={`relative w-[168px] h-[248px] rounded-[8px] overflow-hidden bg-gray-900 flex flex-col justify-end py-[16px] cursor-pointer ${marginTop}`}
            >
              {/* Product image */}
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={product.productName}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius: '8px' }}
                />
              ) : (
                <div className="absolute inset-0 bg-gray-700 rounded-[8px]" />
              )}

              {/* Overlay with gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[8px]" />

              {/* Text container */}
              <div className="relative z-10 text-white">
                <h3 className="font-inter font-semibold text-[16px] px-3 py-4 mb-1">
                  {product.productName}
                </h3>

                <div className="flex items-center justify-between px-3">
                  <div>
                    {showDiscount ? (
                      <>
                        <p className="font-inter font-medium text-[12px]">
                          ₦{product.discountedPrice.toLocaleString()}
                        </p>
                        <p className="font-inter font-normal text-[10px] line-through opacity-80 mt-[-2px]">
                          ₦{product.formattedPrice.replace(/,/g, '')}
                        </p>
                      </>
                    ) : (
                      <p className="font-inter font-medium text-[12px]">
                        ₦{product.formattedPrice}
                      </p>
                    )}
                  </div>

                  {/* Star icon */}
                  <img
                    src="/product-star.svg"
                    alt="Star"
                    className="w-3 h-3"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}