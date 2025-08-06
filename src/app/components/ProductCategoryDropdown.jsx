
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ProductCategoryDropdown({ selected, onSelect }) {
  const categories = [
    "Men's Clothing", "Women's Clothing", "Men's Shoes", "Women's Shoes",
    "Women's Lingerie and Lounge", "Men's Underwear and Sleepwear",
    "Sports and Outdoors", "Jewelry and Accessories", "Beauty and Health",
    "Toys and Games", "Kid's Fashion", "Baby & Maternity",
    "Electronics", "Smart Home", "Furniture", "Bags and Luggage"
  ];

  const [openModal, setOpenModal] = useState(false)

  const handleSelect = (category) => {
    onSelect(category)
    setOpenModal(false);
  };

  return (
    <div className="w-full">
      {/* Trigger Field */}
      <label className="block mt-[16px] text-[12px] font-[Inter] font-medium text-[#000000]">
        Product Category
      </label>
      <div
        onClick={() => setOpenModal(true)}
        className="w-full mt-[4px] px-[12px] py-[10px] border border-black/30 rounded-[4px] text-[12px] font-[Inter] font-medium flex justify-between items-center"
      >
        <span className={selected ? 'text-black' : 'text-black/50'}>
          {selected || 'Select category'}
        </span>
        <ChevronDown size={16} className="text-black/50" />
      </div>

      {/* Dropdown Modal */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end z-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white w-full rounded-t-[16px] max-h-[60vh] overflow-y-auto px-[16px] py-[16px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[14px] font-[Inter] font-semibold mb-[8px]">
              Select Product Category
            </h2>
            <div className="flex flex-col gap-[8px]">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelect(category)}
                  className={`text-[12px] font-[Inter] px-[12px] py-[8px] text-left rounded-[4px] ${
                    selected === category
                      ? 'bg-[#2A9CBC]/10 text-[#2A9CBC]'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}