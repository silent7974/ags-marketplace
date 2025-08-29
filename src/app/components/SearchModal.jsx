"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, ChevronLeft, Search } from "lucide-react"
import Image from "next/image"

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("")

  // Mock results for now
  const results = query
    ? [
        { id: 1, text: query, strong: true },
        { id: 2, text: query + " dress", strong: true },
        { id: 3, text: query + " shoes", strong: false },
      ]
    : []

  return (
    <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 bg-white z-50 px-4 pt-4 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-[8px] mb-4">
                        <ChevronLeft
                          size={24}
                          className="text-black cursor-pointer"
                          onClick={onClose}
                        />
            <div className="flex-1 relative flex items-center bg-transparent border border-black rounded-full h-[40px] pl-[16px] pr-[46px]">
              <input
                type="text"
                placeholder="Search AGS"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-black placeholder:text-[#00000080] font-montserrat font-medium text-[16px] outline-none"
              />

              {/* Cancel button (inside input, absolute left of search icon) */}
              {query && (
                <Image
                  src="/cancel-search.svg"
                  alt="Cancel"
                  width={18}
                  height={18}
                  className="absolute right-[50px] cursor-pointer"
                  onClick={() => setQuery("")}
                />
              )}

              {/* Search button (always pinned at far right) */}
              <Image
                src="/search-white.svg"
                alt="Search"
                width={42}
                height={42}
                className="absolute right-[4px]"
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 h-[36px] border-b border-black/20 px-1"
              >
                <Search size={16} strokeWidth={1} className="text-black" />
                <span
                  className={`text-[12px] ${
                    item.strong ? "font-medium" : "font-normal"
                  } font-inter text-black`}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
    </AnimatePresence>
  )
}