'use client'

import { useRef, useState } from 'react'

export default function MultiImageUpload({
  productImages = [],
  onImageChange = () => {},
  onAddImage = () => {},
  onRemoveImage = () => {},
}) {
  const [mainIndex, setMainIndex] = useState(0)
  const fileInputRef = useRef(null)
  const fileInputMoreRef = useRef(null)

  const MIN_RESOLUTION = 800

  function openFileDialog() {
    if (fileInputRef.current) {
      fileInputRef.current.value = null
      fileInputRef.current.click()
    }
  }

  function openFileDialogMore() {
    if (fileInputMoreRef.current) {
      fileInputMoreRef.current.value = null
      fileInputMoreRef.current.click()
    }
  }

  async function handleFilesSelected(e, isAdding = false) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    let newFiles = isAdding ? [...productImages] : []

    if (files.length + newFiles.length > 3) {
      alert('You can select up to 3 images only')
      return
    }

    const filteredFiles = files.filter(
      (file) =>
        !newFiles.some(
          (img) => img.file && img.file.name === file.name && img.file.size === file.size
        )
    )

    if (filteredFiles.length !== files.length) {
      alert('Some duplicate images were ignored')
    }

    const processedFiles = await Promise.all(
      filteredFiles.map(
        (file) =>
          new Promise((resolve) => {
            const url = URL.createObjectURL(file)
            const img = new Image()
            img.onload = () => {
              if (img.width < MIN_RESOLUTION || img.height < MIN_RESOLUTION) {
                alert(
                  `Image "${file.name}" is low resolution (${img.width}x${img.height}). Minimum allowed is ${MIN_RESOLUTION}px`
                )
                URL.revokeObjectURL(url)
                resolve(null)
              } else {
                resolve({ url, file, width: img.width, height: img.height })
              }
            }
            img.onerror = () => {
              alert(`Failed to load image "${file.name}"`)
              URL.revokeObjectURL(url)
              resolve(null)
            }
            img.src = url
          })
      )
    )

    const validImages = processedFiles.filter((img) => img !== null)
    newFiles = [...newFiles, ...validImages].slice(0, 3)

    if (!isAdding) setMainIndex(0)

    // Push all new images to parent
    if (!isAdding) {
      // replace
      newFiles.forEach((img, idx) => onImageChange(idx, img))
    } else {
      validImages.forEach((img) => onAddImage(img))
    }
  }

  function selectMainImage(index) {
    setMainIndex(index)
  }

  function deleteImage(idx) {
    onRemoveImage(idx)
    if (mainIndex >= productImages.length - 1) {
      setMainIndex(productImages.length - 2 >= 0 ? productImages.length - 2 : 0)
    }
  }

  return (
    <div className="flex my-[24px] flex-col items-center">
      {productImages.length === 0 ? (
        <div
          onClick={openFileDialog}
          className="w-[216px] h-[227px] rounded-[16px] border border-dashed border-black/50 cursor-pointer flex flex-col items-center justify-center"
        >
          <img src="/upload.svg" alt="Upload" className="w-[104px]" />
          <p className="mt-2 text-[24px] font-inter font-normal text-black">
            Tap to upload
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={(e) => handleFilesSelected(e, false)}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <>
          <div
            className="relative rounded-[16px]"
            style={{
              width: '100%',
              maxWidth: '416px',
              height: '295px',
              boxSizing: 'content-box',
              padding: '4px',
            }}
          >
            <img
              src={productImages[mainIndex].url}
              alt={`Selected ${mainIndex + 1}`}
              className="w-full h-full object-cover rounded-[16px]"
            />
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => selectMainImage(idx)}
                className={`relative cursor-pointer rounded-[2px] overflow-hidden ${
                  idx === mainIndex ? 'border border-black' : ''
                }`}
                style={{
                  width: '64px',
                  height: '64px',
                  boxSizing: 'content-box',
                  padding: idx === mainIndex ? '4px' : '0',
                }}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-[2px]"
                />
                {idx === mainIndex && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteImage(idx)
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[2px]"
                  >
                    <img src="/trashcan.svg" alt="Delete" className="w-[48px]" />
                  </button>
                )}
              </div>
            ))}

            {productImages.length < 3 && (
              <div
                onClick={openFileDialogMore}
                className="w-[64px] h-[64px] rounded-[4px] border border-dashed border-black cursor-pointer flex items-center justify-center"
              >
                <img
                  src="/upload-more.svg"
                  alt="Upload more"
                  className="w-[32px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputMoreRef}
                  onChange={(e) => handleFilesSelected(e, true)}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}