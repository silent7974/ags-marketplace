"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { setBrandColor } from "@/redux/slices/storeSlice";
import ColorPickerModal from "./ColorPickerModal";

const SUGGESTED_COLORS = [
  "#005770",
  "#CFAF5A",
  "#1A1A1A",
  "#4C5866",
  "#276C5E",
  "#888C8D",
  "#4B1E27",
  "#F3F0E8",
  "#394867",
  "#4D5D3A",
  "#9E7E38",
];

export default function BrandTheme() {
  const dispatch = useDispatch();
  const brandColor = useSelector((s) => s.store.brandColor);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <section className="mt-[16px]">
      <label className="text-[12px] font-inter font-medium mb-[4px] block">
        Brand Theme
      </label>

      <p className="text-[10px] font-inter font-medium mb-[12px] text-black/50">
        Pick a color that represents your brand. We’ll use it in your shop theme
      </p>

      <div className="flex flex-wrap gap-[16px]">
        {SUGGESTED_COLORS.map((color) => {
          const selected = brandColor === color;

          return (
            <button
              key={color}
              onClick={() => dispatch(setBrandColor(color))}
              className={`w-[24px] h-[24px] rounded-full flex items-center justify-center
                ${selected ? "border border-black/50 p-[2px]" : ""}`}
            >
              <span
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}

        {/* Custom color */}
        <button
          onClick={() => setShowPicker(true)}
          className="w-[24px] h-[24px] rounded-full
            border border-black/70 border-[0.5px]
            flex items-center justify-center"
        >
          <Plus size={8} className="text-black/70" />
        </button>
      </div>

      {showPicker && (
        <ColorPickerModal onClose={() => setShowPicker(false)} />
      )}
    </section>
  );
}