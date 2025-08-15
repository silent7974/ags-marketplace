'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus } from 'lucide-react'
import productCategoryMap from '@/lib/data/productCategoryMap'

// --- Your dropdown components unchanged ---
function CustomCellDropdown({ label, options = [], selected, onSelect, placeholder = 'Select' }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      <div
        onClick={() => setOpen(true)}
        className="w-full px-3 py-2 border border-black/20 rounded text-[12px] font-inter flex justify-between items-center cursor-pointer bg-white"
      >
        <span className={selected ? 'text-black' : 'text-black/50'}>
          {selected || placeholder}
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-[16px] max-h-[60vh] overflow-y-auto px-4 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[14px] font-inter font-semibold mb-3">{label}</h3>
            <div className="flex flex-col gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onSelect(opt)
                    setOpen(false)
                  }}
                  className={`text-[13px] text-left px-3 py-2 rounded ${
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

function ColorPickerDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Blue', hex: '#2A9CBC' },
    { name: 'Green', hex: '#00A859' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Yellow', hex: '#FFD700' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#7B00C3' },
    { name: 'Custom', hex: null },
  ]
  const [custom, setCustom] = useState('')

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="w-full px-3 py-2 border border-black/20 rounded text-[12px] font-inter flex justify-between items-center cursor-pointer bg-white"
      >
        <span className={selected ? 'text-black' : 'text-black/50'}>
          {selected || 'Select color'}
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full rounded-t-[16px] max-h-[60vh] overflow-y-auto px-4 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[14px] font-inter font-semibold mb-3">Select Color</h3>
            <div className="flex flex-col gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    if (c.name === 'Custom') return
                    onSelect(c.name)
                    setOpen(false)
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded ${
                    selected === c.name
                      ? 'bg-[#2A9CBC]/10 text-[#2A9CBC]'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {c.hex && (
                    <span
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span className="text-[13px]">{c.name}</span>
                </button>
              ))}

              <div className="mt-3 flex gap-2">
                <input
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Custom color name"
                  className="flex-1 border rounded px-3 py-2 text-[13px]"
                />
                <button
                  onClick={() => {
                    if (!custom.trim()) return
                    onSelect(custom.trim())
                    setCustom('')
                    setOpen(false)
                  }}
                  className="bg-[#2A9CBC] text-white px-3 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Main InventoryTracker ---
export default function InventoryTracker({
  productName,
  sellerCategory,
  productCategory,
  discountedPrice,
  quantity,
  variants = [],
  setVariants,
  maxVariants = 2,
  variantColumns = [],
  setVariantColumns,
}) {
  // Determine category mapping
  const categoryData =
    productCategoryMap?.[sellerCategory] || productCategoryMap?.[productCategory] || null
  const productMapping = productCategoryMap?.[productCategory] || categoryData

  // Row definitions based on category
  const rows = useMemo(() => {
    const list = []
    const v = productMapping?.variants || {}

    if (v.colors) list.push({ key: 'color', label: 'Color', type: 'select' })
    if (v.sizes) list.push({ key: 'size', label: 'Size', type: 'select', options: v.sizes })
    if (v.measurement) list.push({ key: 'measurement', label: `${v.measurement}`, type: 'number' })
    if (v.memory) list.push({ key: 'memory', label: 'Memory', type: 'select', options: v.memory })
    if (v.ram) list.push({ key: 'ram', label: 'RAM', type: 'select', options: v.ram })

    list.push({ key: 'quantity', label: 'Quantity', type: 'number' })
    list.push({ key: 'price', label: 'Price', type: 'price' })
    list.push({ key: 'sku', label: 'SKU', type: 'sku' })

    return list
  }, [productMapping])

  function formatNumberWithCommas(v) {
    if (v === '' || v === null || v === undefined) return ''
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function generateSKU(productNameVal = '', colValues = {}) {
    const clean = (s = '') =>
      String(s || '').replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    const a = clean(productNameVal).slice(0, 3) || 'PRD'
    const variantParts = []
    const variantKeys = Object.keys(colValues)
    const preferred = ['color', 'size', 'measurement', 'memory', 'ram']
    for (const p of preferred) {
      if (colValues[p]) variantParts.push(clean(colValues[p]).slice(0, 3))
      if (variantParts.length === 2) break
    }
    // fallback: anything else
    if (variantParts.length < 2) {
      for (const k of variantKeys) {
        if (!preferred.includes(k) && colValues[k]) {
          variantParts.push(clean(colValues[k]).slice(0, 3))
        }
        if (variantParts.length === 2) break
      }
    }
    const rand = Math.floor(1000 + Math.random() * 9000)
    return `${a}-${variantParts[0] || 'XX'}-${variantParts[1] || 'YY'}-${rand}`
  }

  function makeEmptyColumn() {
    const obj = {}
    rows.forEach((r) => {
      if (r.type === 'number' || r.type === 'price') obj[r.key] = '' // raw digits
      else obj[r.key] = '' // selections/text
    })
    // set default quantity and price from base
    obj.quantity = Number(quantity || 0)
    const discounted = Number(discountedPrice || 0)
    obj.price = discounted // raw number
    obj.sku = generateSKU(productName, obj)
    return obj
  }

  const updateCell = (colIndex, key, value) => {
    const updated = [...variantColumns]
    updated[colIndex] = { ...updated[colIndex], [key]: value }
    setVariantColumns(updated)
  }

  function addVariantColumn() {
    if (variantColumns.length >= maxVariants) return
    setVariantColumns((prev) => {
      const next = [...prev, makeEmptyColumn()]
      return next
    })
  }

  function removeColumn(index) {
    setVariantColumns((prev) => prev.filter((_, i) => i !== index))
  }

  useEffect(() => {
      setVariantColumns((prev) => {
        return prev.map((col) => {
          const next = { ...col }
          const discounted = Number(discountedPrice || 0)
          next.price = discounted
          // ensure quantity uses baseQuantity if empty or zero
          if (!next.quantity) next.quantity = Number(quantity || 0)
          // regenerate SKU
          next.sku = generateSKU(productName, next)
          return next
        })
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [discountedPrice, quantity, productName])

  return (
    <div className={"overflow-hidden max-h-[900px] mt-3"}>
        <div className="mt-3 pb-4 bg-white rounded-md shadow-sm">
            <div className="flex items-center justify-between px-2 py-2">
                    <div className="text-[13px] font-inter text-black/70">Variants: {variantColumns.length} / {maxVariants}</div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={addVariantColumn}
                            disabled={variantColumns.length >= maxVariants}
                            className="bg-[#2A9CBC] text-white px-3 py-1 rounded text-[13px] disabled:opacity-50"
                            type="button"
                        >
                            + Add combination
                        </button>
                    </div>
            </div>
                
            {/* Table (horizontal scroll on mobile) */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left text-[12px] font-inter px-3 py-2 border-b" style={{ borderColor: 'rgba(24,51,27,0.5)', borderWidth: '0.5px' }}>Attribute</th>
                            {/* base/main column header */}
                            <th className="text-left text-[12px] font-inter px-3 py-2 border-b" style={{ borderColor: 'rgba(24,51,27,0.5)', borderWidth: '0.5px' }}>Main product</th>
                            {variantColumns.map((_, colIdx) => (
                            <th key={colIdx} className="text-left text-[12px] font-inter px-3 py-2 border-b" style={{ borderColor: 'rgba(24,51,27,0.5)', borderWidth: '0.5px' }}>
                                Variant {colIdx + 1}
                                <button onClick={() => removeColumn(colIdx)} className="ml-2 text-[12px] text-red-500">Remove</button>
                            </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.key}>
                        <td className="px-3 py-2 align-top text-[13px] font-inter border-b" style={{ borderColor: 'rgba(24,51,27,0.5)', borderWidth: '0.5px' }}>
                            <div className="font-medium">{row.label === 'measurement' ? `${productMapping.variants?.measurement || 'Measurement'}` : row.label}</div>
                        </td>

                        {/* base column cell */}
                        <td className="px-3 py-2 align-top border-b" style={{ borderColor: 'rgba(24,51,27,0.5)', borderWidth: '0.5px' }}>
                            {row.key === 'quantity' && (<div className="text-[13px]">{Number(quantity || 0)}</div>)}
                            {row.key === 'price' && (<div className="text-[13px]">₦{formatNumberWithCommas(discountedPrice || 0)}</div>)}
                            {row.key === 'sku' && (<div className="text-[13px] text-black/60">{generateSKU(productName, variants)}</div>)}
                            {row.type === 'select' && ['color','size','memory','ram'].includes(row.key) && (
                                <div className="text-[13px] text-black/60">
                                    {variants[row.key] || '—'}
                                </div>
                            )}

                            {row.type === 'number' && row.key === 'measurement' && (
                                <div className="text-[13px] text-black/60">
                                    {variants.measurement || '—'}
                                </div>
                            )}

                            {/* fallback for showing static values if no input */}
                            {(!['color','size','memory','ram','measurement'].includes(row.key) && row.key !== 'quantity' && row.key !== 'price' && row.key !== 'sku') && (
                                <div className="text-[13px] text-black/60">{variants[row.key] || '—'}</div>
                            )}
                        </td>
                        {variantColumns.map((col, colIndex) => (
                            <td
                            key={colIndex}
                            className="px-3 py-2 align-top border-b"
                            style={{
                                borderColor: 'rgba(24,51,27,0.5)',
                                borderWidth: '0.5px',
                            }}
                            >
                            {row.type === 'select' &&
                                (row.key === 'color' ? (
                                <ColorPickerDropdown
                                    selected={col.color}
                                    onSelect={(v) => updateCell(colIndex, 'color', v)}
                                />
                                ) : (
                                <CustomCellDropdown
                                    label={row.label}
                                    options={row.options || []}
                                    selected={col[row.key]}
                                    onSelect={(v) => updateCell(colIndex, row.key, v)}
                                    placeholder={`Select ${row.label}`}
                                />
                                ))}

                            {row.type === 'number' && row.key === 'measurement' && (
                                <input
                                type="text"
                                inputMode="numeric"
                                value={col.measurement ?? ''}
                                onChange={(e) => {
                                    const digits = e.target.value.replace(/\D/g, '')
                                    updateCell(colIndex, 'measurement', digits)
                                }}
                                placeholder={`Enter ${productMapping?.variants?.measurement || 'value'}`}
                                className="w-full px-3 py-2 border rounded text-[13px]"
                                />
                            )}

                            {row.type === 'number' && row.key === 'quantity' && (
                                <input
                                type="text"
                                inputMode="numeric"
                                value={String(col.quantity ?? '')}
                                onChange={(e) => {
                                    const digits = e.target.value.replace(/\D/g, '')
                                    updateCell(colIndex, 'quantity', digits === '' ? '' : Number(digits))
                                }}
                                placeholder="0"
                                className="w-full px-3 py-2 border rounded text-[13px]"
                                />
                            )}

                            {row.type === 'price' && (
                                <input
                                type="text"
                                inputMode="numeric"
                                value={formatNumberWithCommas(col.price ?? '')}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/[^0-9]/g, '')
                                    updateCell(colIndex, 'price', raw === '' ? '' : Number(raw))
                                }}
                                placeholder={formatNumberWithCommas(discountedPrice || 0)}
                                className="w-full px-3 py-2 border rounded text-[13px]"
                                />
                            )}

                            {row.type === 'sku' && (
                                <div className="text-[13px]">
                                {col.sku || generateSKU(productName, col)}
                                </div>
                            )}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>      
        </div>  
    </div>
  )
}