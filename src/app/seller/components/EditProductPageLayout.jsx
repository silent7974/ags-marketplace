'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetProductByIdQuery, useUpdateProductMutation, useDeleteProductMutation } from '@/redux/services/productApi'
import MultiImageUpload from './MultiImageUpload'
import ProductBasicDetails from './ProductBasicDetails'
import ProductFormFields from './ProductFormFields'
import InventoryTracker from './InventoryTracker'

// Progress bar for required fields
function ProductFormProgress({ progress, total }) {
  const percentage = (progress / total) * 100
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div
        className="w-full"
        style={{ backgroundColor: '#E6ECED', height: 4, borderRadius: 32 }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: '#2A9CBC',
            height: 4,
            borderRadius: 32,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <div className="mt-1 text-[10px] font-inter text-[#2A9CBC]">
        {progress} / {total} required fields completed
      </div>
    </div>
  )
}

// Upload helper
async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ags_unsigned_upload')
  formData.append('folder', 'ags/products')

  const response = await fetch(url, { method: 'POST', body: formData })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error('Cloudinary upload failed: ' + (errorData.error?.message || response.statusText))
  }
  return response.json()
}

export default function EditProductPageLayout({ category }) {
  const router = useRouter()
  const { productId } = useParams()

  // Add a new state to hold original data for comparison
  const [originalData, setOriginalData] = useState(null);

  const { data: product, error, isLoading } = useGetProductByIdQuery(productId)
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  // Change logger
  const logUpdate = (fieldName, oldValue, newValue) => {
    console.log(`[FIELD UPDATED] ${fieldName}:`, {
      oldValue,
      newValue,
      timestamp: new Date().toISOString(),
    })
  }

  // State
  const [productImages, setProductImagesState] = useState([])
  const setProductImages = (newImages) => {
    logUpdate('productImages', productImages, newImages)
    setProductImagesState(newImages)
  }

  const [productData, setProductDataState] = useState({
    productName: '',
    price: 0,
    formattedPrice: '',
    discount: '',
    discountedPrice: 0,
    quantity: 0,
    description: '',
  })
  const setProductData = (newData) => {
    logUpdate('productData', productData, newData)
    setProductDataState(newData)
  }

  const [productCategory, setProductCategoryState] = useState('')
  const setProductCategory = (val) => {
    logUpdate('productCategory', productCategory, val)
    setProductCategoryState(val)
  }

  const [subcategory, setSubcategoryState] = useState('')
  const setSubcategory = (val) => {
    logUpdate('subcategory', subcategory, val)
    setSubcategoryState(val)
  }

  const [variants, setVariantsState] = useState([])
  const setVariants = (val) => {
    logUpdate('variants', variants, val)
    setVariantsState(val)
  }

  const [variantColumns, setVariantColumnsState] = useState([])
  const setVariantColumns = (val) => {
    logUpdate('variantColumns', variantColumns, val)
    setVariantColumnsState(val)
  }

  const [useCase, setUseCaseState] = useState('')
  const setUseCase = (val) => {
    logUpdate('useCase', useCase, val)
    setUseCaseState(val)
  }

  const [tag, setTagState] = useState('')
  const setTag = (val) => {
    logUpdate('tag', tag, val)
    setTagState(val)
  }

  const [trending, setTrendingState] = useState('')
  const setTrending = (val) => {
    logUpdate('trending', trending, val)
    setTrendingState(val)
  }

  // Price formatter
  function formatPrice(value) {
    if (!value) return ''
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function handleVariantChange(updatedVariants) {
    setVariantColumns(updatedVariants)
  }

  // Prefill data
  useEffect(() => {
    if (product?.images) {
      const initialData = {
        
      }
      setProductImages(product.images.map(img => ({
        url: img.url,
        public_id: img.public_id,
      })))

      setProductData({
        productName: product.productName || '',
        price: product.price || 0,
        formattedPrice: product.formattedPrice || formatPrice(String(product.price || 0)),
        discount: product.discount || '',
        discountedPrice: product.discountedPrice || 0,
        quantity: product.quantity || 0,
        description: product.description || '',
      })

      setProductCategory(product.category || '')
      setSubcategory(product.subcategory || '')
      setUseCase(product.useCase || '')
      setTag(product.tag || '')
      setTrending(product.trending || '')
      setVariants(product.variants || [])
      setVariantColumns(product.variantColumns || [])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  // Required fields calculation
  const requiredFieldsTotal = 5
  const requiredFieldsCompleted =
    (productData.productName ? 1 : 0) +
    (productCategory ? 1 : 0) +
    (subcategory ? 1 : 0) +
    (productData.price ? 1 : 0) +
    (productImages.length > 0 ? 1 : 0)

  // Submit handler
  const handleSubmit = async () => {
    try {
      // Upload any new images
      const finalImages = []
      for (const img of productImages) {
        if (img.file) {
          const uploaded = await uploadImageToCloudinary(img.file)
          finalImages.push({
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
          })
        } else {
          finalImages.push(img)
        }
      }

      const payload = {
        id: productId,
        ...productData,
        category: productCategory,
        subcategory,
        variants,
        variantColumns,
        useCase,
        tag,
        trending,
        images: finalImages,
      }

      await updateProduct(payload).unwrap()

      console.log('✅ Product updated successfully')
      router.push('/seller/normal/dashboard/products')
    } catch (err) {
      console.error('❌ Update failed:', err)
    }
  } 

  // Delete handler
    const handleDelete = async () => {
      if (!confirm(`Are you sure you want to delete "${product?.productName}"?`)) return

      try {
        await deleteProduct(productId).unwrap()
        console.log('🗑 Product deleted successfully')
        router.push('/seller/normal/dashboard/products')
      } catch (err) {
        console.error('❌ Delete failed:', err)
      }
    }



  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>

  return (
    <div>
      {/* Header */}
      <div className="mt-6 flex items-start justify-between w-full">
        <div>
          <h1 className="font-montserrat font-medium text-[20px] text-[#000000]">
            Edit {product.productName}
          </h1>
          <p className="font-montserrat font-medium text-[16px] text-black/50 mt-1">
            {category}
          </p>
        </div>
        <button
          type="button"
          disabled={isDeleting}
          onClick={handleDelete}
          className="disabled:opacity-50"
        >
          <img
            src="/trashcan-black.svg"
            alt="Delete"
            width={36}
            height={36}
            className="cursor-pointer"
          />
        </button>
      </div>

      <MultiImageUpload
        productImages={productImages}
        onImageChange={(index, updatedImage) => {
          const next = [...productImages]
          next[index] = updatedImage
          setProductImages(next)
        }}
        onAddImage={(newImage) => setProductImages([...productImages, newImage])}
        onRemoveImage={(index) => setProductImages(productImages.filter((_, i) => i !== index))}
      />

      <div className="flex flex-col items-center max-w-[300px]">
        <p className="text-[12px] font-inter text-black leading-tight">
          Only 3 images upload & minimum resolution must be 800x800
        </p>
        <p className="text-[12px] font-inter text-black/50 mt-[4px] leading-tight">
          To upload videos and more images upgrade to premium seller
        </p>
      </div>

      <ProductBasicDetails productData={productData} setProductData={setProductData} />

      <ProductFormFields
        sellerCategory={product?.sellerCategory || category}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        variants={variants[0] || {}}
        setVariants={(updatedObject) => setVariants([updatedObject])}
        useCase={useCase}
        setUseCase={setUseCase}
        tag={tag}
        setTag={setTag}
        trending={trending}
        setTrending={setTrending}
      />

      <div className="block text-black text-[16px] font-montserrat mt-[16px] mb-[8px]">
        Manage Variants Stock
      </div>

      <InventoryTracker
        productName={productData.productName}
        sellerCategory={product?.sellerCategory || category}
        productCategory={productCategory}
        discountedPrice={productData.discountedPrice}
        quantity={productData.quantity}
        variants={variants[0] || []}
        setVariants={(updatedObject) => setVariants([updatedObject])}
        variantColumns={Array.isArray(variantColumns) ? variantColumns : []}
        setVariantColumns={setVariantColumns}
        onChange={handleVariantChange}
        maxVariants={2}
      />

      {/* Submit Button */}
      <button
        type="button"
        disabled={requiredFieldsCompleted < requiredFieldsTotal || isUpdating}
        onClick={handleSubmit}
        className={`w-full h-[36px] rounded-[4px] bg-[#005770] flex items-center justify-center gap-2 mt-4 ${
          requiredFieldsCompleted < requiredFieldsTotal || isUpdating
            ? 'opacity-60 cursor-not-allowed'
            : 'opacity-100 cursor-pointer'
        }`}
      >
        <span className="font-inter font-semibold text-[12px] text-white">Update Product</span>
        <img src="/thumbs-up.svg" alt="Thumbs up" width={16} height={16} />
      </button>
    </div>
  )
}