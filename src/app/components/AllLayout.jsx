"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import FeaturedSection from "./FeaturedSection"

const banners = [
  { src: "/banners/banner.jpg", alt: "Banner 1" },
  { src: "/banners/premium-banner.jpg", alt: "Banner 2" },
]

const slides = [
  {
    icon: "/truck.svg",
    iconW: 16,
    iconH: 9,
    title: "Fast Delivery",
    subtitle: "Reliable and secure shipping",
  },
  {
    icon: "/shield.svg",
    iconW: 14,
    iconH: 17,
    title: "Secure Payments",
    subtitle: "100% safe transactions",
  },
  {
    icon: "/return.svg",
    iconW: 14,
    iconH: 16,
    title: "Easy Returns",
    subtitle: "within 10 days from purchase date",
  },
]

const whySlides = [
  { icon: "/padlock.svg", title: "Security policy" },
  { icon: "/card.svg", title: "Safe payments" },
  { icon: "/package.svg", title: "Delivery guarantee" },
]

export default function AllLayout() {
  const [index, setIndex] = useState(0)
  const [textIndex, setTextIndex] = useState(0)
  const [whyIndex, setWhyIndex] = useState(0)

  // auto-slide banners every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // auto-slide text every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // auto-slide whySlides every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setWhyIndex((prev) => (prev + 1) % whySlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Banner Section */}
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

      {/* Text Slides Section */}
      <div className="px-4 mt-4">
        <div className="w-full h-[48px] rounded bg-[#C6D8DE] px-[4px] pt-[4px] flex items-center justify-between overflow-hidden">
          {/* Left side */}
          <div className="flex items-start gap-2 border-r border-black/50 pr-2">
            <div className="flex flex-col">
              {/* icon + title row */}
              <div className="flex items-center gap-[2px]">
                <Image src="/star.svg" alt="Star" width={16} height={15} />
                <span className="font-bold text-[12px] text-[#474545]">
                  Shop from Top-Rated Sellers
                </span>
              </div>

              {/* subtitle aligned under icon */}
              <span className="font-medium text-[8px] text-[#474545]">
                Trusted vendors with exclusive deals
              </span>
            </div>
          </div>

          {/* Right side (animated slides) */}
          <div className="flex-1 pl-2 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.68, -0.55, 0.27, 1.55], // easeInOutBack
                }}
                className="flex flex-col"
              >
                {/* icon + title row */}
                <div className="flex items-center gap-[2px]">
                  <Image
                    src={slides[textIndex].icon}
                    alt={slides[textIndex].title}
                    width={slides[textIndex].iconW}
                    height={slides[textIndex].iconH}
            
                  />
                  <span className="font-bold text-[12px] text-[#474545]">
                    {slides[textIndex].title}
                  </span>
                </div>

                {/* subtitle aligned under icon */}
                <span className="font-medium text-[8px] text-[#474545]">
                  {slides[textIndex].subtitle}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Why Choose Section (on top of light-blue) */}
      <div className="w-full shadow-[0_-2px_6px_rgba(0,0,0,0.1)] -mt-[3px]">
        <div className="bg-[#F8F9FA] px-[16px] py-[8px]">
          <div className="bg-[#1A7709] px-[8px] flex items-center justify-between rounded">
            {/* Left side */}
            <div className="flex items-center gap-[8px]">
              <Image
                src="/shield-white.svg"
                alt="Shield"
                width={16}
                height={16}
              />
              <span className="text-[14px] text-white font-normal font-inter">
                Why choose AGS?
              </span>
            </div>

            {/* Right side animations */}
            <div className="flex items-center gap-[24px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={whyIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.68, -0.55, 0.27, 1.55],
                  }}
                  className="flex items-center gap-[2px]"
                >
                  <Image
                    src={whySlides[whyIndex].icon}
                    alt={whySlides[whyIndex].title}
                    width={14}
                    height={14}
                  />
                  <span className="text-[12px] text-white font-normal font-inter">
                    {whySlides[whyIndex].title}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Chevron */}
              <ChevronRight size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Limited-Time Offer */}
        <FeaturedSection
          titleImg="/titles/Limited-time.jpg"
          altText="Limited-Time Offer"
          filterFn={(p) => p.discount >= 75}
          fallbackText="No limited-time offers yet. Check back soon!"
        />

        {/* Limited Stock */}
        <FeaturedSection
          titleImg="/titles/Limited-stocks.jpg"
          altText="Limited Stock"
          filterFn={(p) => p.quantity <= 20}
          fallbackText="No limited-stock items available right now."
        />

        {/* Featured Brands */}
        <FeaturedSection
          titleImg="/titles/Featured-brands.jpg"
          altText="Featured Brands"
          filterFn={() => false} // force no products
          fallbackText="Our featured brands are coming soon!"
        />
      </div>
    </>
  )
}