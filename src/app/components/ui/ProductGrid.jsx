"use client"

import ProductCard from "./ProductCard"

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <p className="col-span-2 text-center text-gray-400">No products found.</p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-[5px] px-2">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  )
}