'use client'

import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

export default function CategoriesTabs() {
  const { categories, brandColor } = useSelector((s) => s.store);
  const allCategories = ["All", ...(categories.suggested || []), ...(categories.fromProducts || [])];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const tabsRef = useRef({});

  // Scroll selected tab into center view
  useEffect(() => {
    if (tabsRef.current[activeCategory]) {
      tabsRef.current[activeCategory].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  return (
    <div className="w-full h-[40px] border-y border-black/20 flex items-center">
      <div className="flex  overflow-x-auto scrollbar-hide">
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              ref={(el) => (tabsRef.current[category] = el)}
              onClick={() => setActiveCategory(category)}
              className="relative inline-flex items-center justify-center pb-2 px-2"
            >
              <span
                className={`font-[600] font-montserrat text-[16px] whitespace-nowrap ${
                  isActive ? "text-black" : "text-black/50"
                }`}
              >
                {category}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[20px] h-[4px] rounded-full"
                  style={{ backgroundColor: brandColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}