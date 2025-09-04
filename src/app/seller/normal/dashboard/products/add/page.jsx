'use client'

import { useState } from 'react'
import { useAddProductMutation } from '@/redux/services/productApi'
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import ProductBasicDetails from '@/app/seller/components/ProductBasicDetails'
import ProductFormFields from '@/app/seller/components/ProductFormFields'
import VariantAccordion from '@/app/seller/components/VariantAccordion'
import MultiImageUpload from '@/app/seller/components/MultiImageUpload'

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
      <div className="mt-1 text-[10px] font-inter text-[#2A9CBC] font-regular">
        {progress} / {total} required fields completed
      </div>
    </div>
  )
}

async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'ags_unsigned_upload') // your preset
  formData.append('folder', 'ags/products')

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error('Cloudinary upload failed: ' + (errorData.error?.message || response.statusText))
  }

  return response.json()
}

export default function AddProductLayout() {
  const router = useRouter()

  const category = useSelector((state) => state.sellerProfile.category)

  const [productImages, setProductImages] = useState([])

  const handleImageChange = (index, updatedImage) => {
    setProductImages((prev) => {
      const newImages = [...prev]
      newImages[index] = updatedImage
      return newImages
    })
  }

  const handleAddImage = (newImage) => {
    setProductImages((prev) => [...prev, newImage])
  }

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index))
  }

  const [productData, setProductData] = useState({
    productName: '',
    subCategory: '',
    subType: '',
    price: 0,
    discountedPrice: 0,
    formattedPrice: '',
    quantity: 0,
    discount: 0,
    description: '',
  })

  const [subCategory, setSubCategory] = useState('')
  const [subType, setSubType] = useState('')
  const [variants, setVariants] = useState({}) // fixed: use object as per your comment
  const [useCase, setUseCase] = useState('')
  const [tag, setTag] = useState('')
  const [trending, setTrending] = useState('')

  const [variantColumns, setVariantColumns] = useState([])

  // RTK Query mutation hook
  const [addProduct, { isLoading, isSuccess, isError, error }] = useAddProductMutation()

  const requiredFieldsTotal = 5
  const requiredFieldsCompleted = (() => {
    let count = 0
    if (productImages.length > 0) count++
    if (productData.productName.trim() !== '') count++
    if (Number(productData.price) > 0) count++
    if (Number(productData.quantity) > 0) count++
    if (subCategory.trim() !== '') count++
    return count
  })()

  const handleSubmit = async () => {
    if (requiredFieldsCompleted < requiredFieldsTotal) return // safety check

    try {
      const uploadedImages = await Promise.all(
        productImages.map(imageObj => uploadImageToCloudinary(imageObj.file))
      )

      const imagesForBackend = uploadedImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
      }))

      // Build final data object to send to backend
      const dataToSubmit = {
        images: imagesForBackend,
        ...productData,
        category,          // seller’s top category
        subCategory,       // dropdown 2
        subType,           // dropdown 3 if exists
        variants,
        useCase,
        tag,
        trending,
        variantColumns,
      }


      await addProduct(dataToSubmit).unwrap()
      alert('Product saved successfully!')
      router.push('/seller/normal/dashboard/products')
    } catch (err) {
      alert('Failed to save product: ' + (err?.data?.message || err.error || err.message || 'Unknown error'))
    }
  }

  function handleVariantChange(updatedVariants) {
    setVariantColumns(updatedVariants)
  }

  return (
    <div className="mb-[40px]">
      <h1 className="mt-6 font-montserrat font-medium text-[20px] text-[#000000]">Add a Product</h1>
      <p className="font-montserrat font-medium text-[16px] text-black/50 mt-1">{category}</p>

      <MultiImageUpload
        productImages={productImages}
        onImageChange={handleImageChange}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />

      <div className="flex flex-col items-center max-w-[300px]">
        <p className="text-[12px] font-inter font-normal text-black leading-tight">
          Only 3 images upload & minimum resolution must be 800x800
        </p>
        <p className="text-[12px] font-inter font-normal text-black/50 mt-[4px] leading-tight">
          To upload videos and more images upgrade to premium seller
        </p>
      </div>

      <ProductBasicDetails productData={productData} setProductData={setProductData} />

      <ProductFormFields
        category={category}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        subType={subType}
        setSubType={setSubType}
        variants={variants}
        setVariants={setVariants}
        useCase={useCase}
        setUseCase={setUseCase}
        tag={tag}
        setTag={setTag}
        trending={trending}
        setTrending={setTrending}
      />

      <VariantAccordion
        productName={productData.productName}
        productCategory={productData.productCategory}
        sellerCategory={category}
        basePrice={Number(productData.price || 0)}
        baseQuantity={Number(productData.quantity || 0)}
        discountPercent={Number(productData.discount || 0)}
        baseVariants={variants}
        variantColumns={variantColumns}
        setVariantColumns={setVariantColumns}
        onChange={handleVariantChange}
        maxVariants={2}
      />

      {/* Progress Tracker */}
      <ProductFormProgress 
        progress={requiredFieldsCompleted} total={requiredFieldsTotal} 
      />

      {/* Submit Button */}
      <button
        type="button"
        disabled={requiredFieldsCompleted < requiredFieldsTotal || isLoading}
        onClick={handleSubmit}
        className={`w-full h-[36px] rounded-[4px] bg-[#005770] flex items-center justify-center gap-2 mt-4
          ${
            requiredFieldsCompleted < requiredFieldsTotal || isLoading
              ? 'opacity-60 cursor-not-allowed'
              : 'opacity-100 cursor-pointer'
          }
        `}
      >
        <span className="font-inter font-semibold text-[12px] text-white">Save Product</span>

        {/* Simple thumbs-up SVG */}
        <img
            src="/thumbs-up.svg"
            alt="Thumbs up"
            width={16}
            height={16}
        />
      </button>

      {/* Error or Success Messages */}
      {isError && (
        <div className="text-red-500 text-sm mt-2">Failed to save product. Please try again.</div>
      )}
      {isSuccess && <div className="text-green-600 text-sm mt-2">Product saved successfully!</div>}
    </div>
  )
}