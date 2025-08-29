"use client"

import { Search, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isClosing, setIsClosing] = useState(false)
  const router = useRouter()

  const suggestions = [
    "Kashmir babbar riga",
    "babbar riga monogram",
    "getzner babbar riga",
    "babbar riga na zamani",
    "babban riga",
  ]

  const handleBack = () => {
    setIsClosing(true) // trigger exit animation
    setTimeout(() => {
      router.push("/") // navigate after animation
    }, 800) // must match transition duration
  }

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          key="searchModal"
          initial={{ y: "100%", borderTopLeftRadius: "50%", borderTopRightRadius: "50%" }}
          animate={{ y: 0, borderTopLeftRadius: "0%", borderTopRightRadius: "0%" }}
          exit={{ y: "100%", borderTopLeftRadius: "50%", borderTopRightRadius: "50%" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden"
        >
          {/* Header with back + search bar */}
          <div className="flex items-center gap-2 px-4 py-3 shadow-md border-b">
            {/* Back button */}
            <button onClick={handleBack} className="flex-shrink-0">
              <ChevronLeft size={28} strokeWidth={2.5} className="text-black cursor-pointer" />
            </button>

            {/* Search bar */}
            <div className="flex items-center h-[36px] flex-1 bg-gray-100 px-3 rounded-full border border-gray-300">
              <input
                type="text"
                autoFocus
                placeholder="Search products, shops and categories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400"
              />
              <Search size={18} className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* Suggestions */}
          <div className="p-4 overflow-y-auto">
            <ul className="space-y-3">
              {suggestions
                .filter((item) =>
                  item.toLowerCase().includes(query.toLowerCase())
                )
                .map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-center text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-2 rounded-md"
                  >
                    <Search size={18} className="text-gray-500 mr-2" />
                    {item}
                  </motion.li>
                ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
