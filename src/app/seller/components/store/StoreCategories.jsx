"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";

export default function StoreCategories() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="mt-[32px]">
      <div className="mt-[20px]">
        <p className="text-[16px] font-inter text-black">
          Store Categories
        </p>
        <p className="mt-[4px] text-[12px] font-inter italic text-black/50">
          Choose how your products are grouped in your store
        </p>
      </div>

      <div className="mt-[16px]">
        <label className="text-[12px] font-inter font-medium mb-[4px] block">
          Category
        </label>

        <button
          onClick={() => setShowModal(true)}
          className="w-full h-[40px] bg-[#EEEEEE]
          px-[12px] rounded-[4px]
          flex items-center justify-between"
        >
          <span className="text-[12px] font-inter text-black/30">
            Add category
          </span>
          <ChevronDown size={13} className="text-black/50" />
        </button>
      </div>

      {showModal && (
        <AddCategoryModal onClose={() => setShowModal(false)} />
      )}
    </section>
  );
}