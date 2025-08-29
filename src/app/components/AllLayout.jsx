"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const banners = [
  { src: "/banners/banner.jpg", alt: "Banner 1" },
  { src: "/banners/premium-banner.jpg", alt: "Banner 2" },
]

export default function AllLayout() {
  const [index, setIndex] = useState(0)

  // auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[96px] overflow-hidden">
      <motion.div
        key={index}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={banners[index].src}
          alt={banners[index].alt}
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  )
}