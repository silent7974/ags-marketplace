"use client"

import { ArrowLeft, CircleHelp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SizeGuide() {
  const [unit, setUnit] = useState("CM")

  const convertValue = (value) => {
    if (unit === "CM") return value
    const num = parseFloat(value)
    if (isNaN(num)) return value
    return (num * 0.393701).toFixed(1) // 1 cm = 0.393701 inch
  }

  const convertRange = (range) => {
    const parts = range.split("-")
    if (parts.length === 2) {
      return `${convertValue(parts[0])}-${convertValue(parts[1])}`
    }
    return convertValue(range)
  }

  const bodyMeasurements = [
    ["XS", "88-92", "74-78", "170-175"],
    ["S", "92-96", "78-82", "170-175"],
    ["M", "96-100", "82-86", "175-180"],
    ["L", "100-105", "86-91", "180-185"],
    ["XL", "105-110", "91-96", "185-190"],
    ["XXL", "110-115", "96-102", "185-190"],
  ]

  const productDetails = [
    ["XS", "42", "96", "65", "21"],
    ["S", "44", "100", "67", "22"],
    ["M", "46", "104", "69", "23"],
    ["L", "48", "108", "71", "24"],
    ["XL", "50", "112", "73", "25"],
  ]

  return (
    <div className="w-[393px] min-h-screen bg-[#F9F9F9] mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[80px] border-b border-gray-200">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-6 h-6 text-black" />
          <h1 className="text-lg font-semibold">Size Guide</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setUnit("CM")}
            className={`w-[45px] h-[30px] rounded-full border text-sm font-medium ${
              unit === "CM"
                ? "bg-black text-white border-black"
                : "bg-transparent text-black border-gray-400"
            }`}
          >
            CM
          </button>
          <button
            onClick={() => setUnit("IN")}
            className={`w-[45px] h-[30px] rounded-full border text-sm font-medium ${
              unit === "IN"
                ? "bg-black text-white border-black"
                : "bg-transparent text-black border-gray-400"
            }`}
          >
            IN
          </button>
        </div>
      </div>

      {/* Switch to + Stretch */}
      <div className="mt-4">
        <p className="font-semibold text-gray-700">Switch to</p>
      </div>

      <div className="mt-4">
        <p className="font-semibold text-gray-700 mb-2">Stretch</p>
        <div className="w-full relative">
          <div className="w-full h-[1px] bg-gray-400"></div>
          <div className="flex justify-between text-gray-500 text-sm mt-2">
            <span>Non</span>
            <span>Slight</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Body measurements */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-[16px]">Body measurements</h2>
          <Link href="/how-to-measure-body">
            <div className="flex items-center gap-1 opacity-70">
              <span className="text-sm">How to measure body</span>
              <CircleHelp className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="w-[342.29px] h-[371px] overflow-hidden border border-gray-300 rounded-md">
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-100 font-medium">
              <tr>
                <th className="border px-2 py-2">Label Size</th>
                <th className="border px-2 py-2">Bust ({unit})</th>
                <th className="border px-2 py-2">Waist ({unit})</th>
                <th className="border px-2 py-2">Height ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {bodyMeasurements.map(([size, bust, waist, height], i) => (
                <tr key={i} className="border-t">
                  <td className="border px-2 py-2">{size}</td>
                  <td className="border px-2 py-2">{convertRange(bust)}</td>
                  <td className="border px-2 py-2">{convertRange(waist)}</td>
                  <td className="border px-2 py-2">{convertRange(height)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Depending on your body type and dressing habits, the above sizes are for reference only.
        </p>
      </div>

      {/* Product details */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-[16px]">Product details</h2>
          <Link href="/how-to-measure-product">
            <div className="flex items-center gap-1 opacity-70">
              <span className="text-sm">How to measure product</span>
              <CircleHelp className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="w-[367px] h-[371px] overflow-hidden border border-gray-300 rounded-md">
          <table className="w-full text-center text-sm">
            <thead className="bg-gray-100 font-medium">
              <tr>
                <th className="border px-2 py-2">Label Size</th>
                <th className="border px-2 py-2">Shoulder ({unit})</th>
                <th className="border px-2 py-2">Chest ({unit})</th>
                <th className="border px-2 py-2">Length ({unit})</th>
                <th className="border px-2 py-2">Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map(([size, shoulder, chest, length, sleeve], i) => (
                <tr key={i} className="border-t">
                  <td className="border px-2 py-2">{size}</td>
                  <td className="border px-2 py-2">{convertValue(shoulder)}</td>
                  <td className="border px-2 py-2">{convertValue(chest)}</td>
                  <td className="border px-2 py-2">{convertValue(length)}</td>
                  <td className="border px-2 py-2">{convertValue(sleeve)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
