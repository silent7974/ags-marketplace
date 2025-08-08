'use client'
import { useGetProductsQuery } from '@/redux/services/sellerApi'

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading products</p>

  return (
    <div>
      {products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  )
}