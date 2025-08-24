import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import productCategoryMap from '@/lib/data/productCategoryMap'

function CustomDropdown({ label, options, selected, onSelect, placeholder }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      {label && (
        <label className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]">
          {label}
        </label>
      )}
      <div
        onClick={() => setOpen(true)}
        className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium flex justify-between items-center cursor-pointer"
      >
        <span className={selected ? 'text-black' : 'text-black/50'}>
          {selected || placeholder}
        </span>
        <ChevronDown size={16} className="text-black/50" />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-[16px] max-h-[60vh] overflow-y-auto scrollbar-hide px-[16px] py-[36px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[14px] text-center font-[Inter] font-semibold mb-[16px]">
              Select {label}
            </h2>
            <div className="flex flex-col gap-[8px]">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt)
                    setOpen(false)
                  }}
                  className={`text-[12px] font-[Inter] px-[12px] py-[8px] text-left rounded-[4px] ${
                    selected === opt
                      ? 'bg-[#2A9CBC]/10 text-[#2A9CBC]'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ColorDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const colors = [
    { name: 'Red', hex: '#B43232' },
    { name: 'Blue', hex: '#2E2B77' },
    { name: 'Green', hex: '#438260' },
    { name: 'Black', hex: '#292929' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Custom', hex: null },
  ]

  const [customColor, setCustomColor] = useState('')

  return (
    <div className="w-full">
      <label className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]">
        Color
      </label>
      <div
        onClick={() => setOpen(true)}
        className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium flex justify-between items-center cursor-pointer"
      >
        <span className={selected ? 'text-black' : 'text-black/50'}>
          {selected || 'Select color'}
        </span>
        <ChevronDown size={16} className="text-black/50" />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-[16px] max-h-[60vh] overflow-y-auto scrollbar-hide px-[16px] py-[36px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[14px] text-center font-[Inter] font-semibold mb-[16px]">
              Select Color
            </h2>
            <div className="flex flex-col gap-[8px]">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    if (c.name === 'Custom') return
                    onSelect(c.name)
                    setOpen(false)
                  }}
                  className={`flex items-center gap-2 text-[12px] font-[Inter] px-[12px] py-[8px] text-left rounded-[4px] ${
                    selected === c.name
                      ? 'bg-[#2A9CBC]/10 text-[#2A9CBC]'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {c.hex && (
                    <span
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: c.hex }}
                    ></span>
                  )}
                  {c.name}
                </button>
              ))}

              {/* Custom color input */}
              <div className="flex flex-col gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Enter custom color name"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="border rounded p-2 text-[12px] font-[Inter]"
                />
                <button
                  onClick={() => {
                    if (customColor.trim()) {
                      onSelect(customColor)
                      setOpen(false)
                    }
                  }}
                  className="bg-[#2A9CBC] text-white rounded px-4 py-2 text-[12px] font-[Inter]"
                >
                  Save Custom Color
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductFormFields({ 
  sellerCategory, 
  productCategory, 
  setProductCategory,
  subcategory,
  setSubcategory,
  variants = [0],
  setVariants,
  useCase,
  setUseCase,
  tag,
  setTag,
  trending,
  setTrending
}) {

  if (!sellerCategory) {
    return <p className="text-red-500">No seller category found.</p>
  }

  const categoryData = productCategoryMap[sellerCategory]

  if (!categoryData) {
    return <p className="text-red-500">No product mapping found for {sellerCategory}.</p>
  }

  const v = categoryData.variants

  return (
    <div className="space-y-4">
      {/* Product Category */}
      <CustomDropdown
        label="Product Category"
        placeholder="Select product category"
        options={Object.keys(categoryData.categories)}
        selected={productCategory}
        onSelect={(val) => {
          setProductCategory(val)
        }}
      />

      {/* Subcategory */}
      {productCategory && (
        <CustomDropdown
          label="Subcategory"
          placeholder="Select subcategory"
          options={categoryData.categories[productCategory]}
          selected={subcategory}
          onSelect={(val) => setSubcategory(val)}
        />
      )}

      {/* Variant Fields */}
      {productCategory && (
        <div className="mt-4 space-y-4">
          {v.sizes && (
            <CustomDropdown
              label="Size"
              placeholder="Select size"
              options={v.sizes}
              selected={Array.isArray(variants.size)
                ? variants.size.join(', ')
                : variants.size
              }
              onSelect={(val) => setVariants({ ...variants, size: val })}
            />
          )}

          {v.measurement && (
            <div>
              <label className="block mb-1 font-medium text-[12px] font-[Inter]">
                Measurement ({v.measurement})
              </label>
              <input
                type="number"
                className="border rounded p-2 w-full text-[12px] font-[Inter]"
                placeholder={`Enter ${v.measurement}`}
                onChange={(e) =>
                  setVariants({ ...variants, measurement: e.target.value })
                }
              />
            </div>
          )}

          {v.memory && (
            <CustomDropdown
              label="Memory"
              placeholder="Select memory"
              options={v.memory}
              selected={
                Array.isArray(variants.memory)
                  ? variants.memory.join(', ')
                  : variants.memory
              }
              onSelect={(val) => setVariants({ ...variants, memory: val })}
            />
          )}

          {v.ram && (
            <CustomDropdown
              label="RAM"
              placeholder="Select RAM"
              options={v.ram}
              selected={
                Array.isArray(variants.ram) ? variants.ram.join(', ') : variants.ram
              }
              onSelect={(val) => setVariants({ ...variants, ram: val })}
            />
          )}

          {v.colors && (
            <ColorDropdown
              selected={
                Array.isArray(variants.color)
                  ? variants.color.join(', ')
                  : variants.color
              }
              onSelect={(val) => setVariants({ ...variants, color: val })}
            />
          )}

          {/* NEW — Use Cases */}
          <CustomDropdown
            label="Use Cases"
            placeholder="Select use case"
            options={[
              'Casual Outings',
              'Office Wear',
              'Weddings & Events',
              'Traditional Occasions',
              'Religious Gatherings',
              'Everyday Wear',
              'Sports & Fitness',
              'Travel & Holidays',
              'Gifting',
              'Home Decoration',
              'Baby & Toddler Essentials',
              'School & Education',
              'Farming & Agriculture',
              'Tech Work & Gadgets',
            ]}
            selected={useCase}
            onSelect={(val) => setUseCase(val)}
          />

          {/* NEW — Tags */}
          <CustomDropdown
            label="Tags"
            placeholder="Select tag"
            options={[
              'Hausa Style',
              'Arewa Bride',
              'Arewa Groom',
              'Ankara',
              'Atamfa',
              'Kaftan',
              'Jallabiya',
              'Agbada',
              'Kente',
              'Aso Ebi',
              'Chiffon',
              'Adire',
              'Beads & Jewelry',
              'Modest Fashion',
              'Streetwear NG',
              'Local Made',
              'Handmade NG',
              'Eco-friendly',
              'Premium Quality',
              'Budget-friendly',
            ]}
            selected={tag}
            onSelect={(val) => setTag(val)}
          />

          {/* NEW — Trending */}
          <CustomDropdown
            label="Trending"
            placeholder="Select trending"
            options={[
              'Eid Collection',
              'Sallah Special',
              'Ramadan Essentials',
              'Arewa Weddings',
              'Fresh Ankara Drops',
              'Back to School',
              'New Tech Gadgets',
              'Streetwear Wave',
              'Skincare Glow',
              'Foodie Finds',
              'Home Makeover',
              'Baby Shower Picks',
              'Bridal Showers',
              'Valentine Specials',
              'Independence Day Sale',
            ]}
            selected={trending}
            onSelect={(val) => setTrending(val)}
          />
        </div>
      )}
    </div>
  )
}