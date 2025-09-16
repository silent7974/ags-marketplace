"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import { ChevronDown, Upload, Ruler, ChevronRight } from "lucide-react";
import productCategoryMap from '@/lib/data/productCategoryMap';

export default function ProductDetailsPage({ params }) {
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.productId;
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId);

  // =======================
  // STATE
  // =======================
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const descRef = useRef(null);
  const carouselRef = useRef(null);

  // =======================
  // MEMOIZED VALUES
  // =======================
  const mergedVariants = useMemo(() => {
    const baseVariants = (product?.variants || []).map(v => ({
      ...v,
      price: v.price ?? product?.discountedPrice,
      sku: v.sku ?? product?.sku,
      quantity: v.quantity ?? product?.quantity,
      isBase: true, // mark base variants so we know later
    }));

    const extraVariants = product?.variantColumns || [];
    return [...baseVariants, ...extraVariants];
  }, [product]);

  const variantType = useMemo(() => {
    if (!product?.category) return null;
    const categoryConfig = productCategoryMap[product.category];
    if (!categoryConfig?.variants) return null;

    if (categoryConfig.variants.sizes) return "size";
    if (categoryConfig.variants.measurement) return "measurement";
    if (categoryConfig.variants.memory || categoryConfig.variants.ram) return "tech-spec";
    return null;
  }, [product]);

  const allColors = useMemo(
    () => [...new Set(mergedVariants.map(v => v.color).filter(Boolean))],
    [mergedVariants]
  );

  const colorVariants = useMemo(
    () => mergedVariants.filter(v =>
      selectedColor ? v.color?.toLowerCase() === selectedColor?.toLowerCase() : true
    ),
    [mergedVariants, selectedColor]
  );

  const activeVariant = useMemo(() => {
    if (!selectedColor) return null;
    return mergedVariants.find(v =>
      v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
      ((variantType === "size" && v.size === selectedSize) ||
      (variantType === "measurement" && v.measurement === selectedSize) ||
      (variantType === "tech-spec" && (v.memory === selectedSize || v.ram === selectedSize)) ||
      (!variantType && !selectedSize)) // <- if no size/spec, match just by color
    );
  }, [mergedVariants, selectedColor, selectedSize, variantType]);

  // Make sure we always have correct display values
  const displayPrice = activeVariant?.price ?? product?.discountedPrice ?? product?.price ?? 0;
  const displayQuantity = activeVariant?.quantity ?? product?.quantity ?? 1;
  const displaySku = activeVariant?.sku ?? product?.sku ?? "N/A";

  // =======================
  // EFFECTS
  // =======================
  useEffect(() => {
    if (product?.variants?.[0]?.color) {
      setSelectedColor(product.variants[0].color);
    }
  }, [product]);

  useEffect(() => {
    setSelectedSize(colorVariants[0]?.size ?? null);
    setSelectedQuantity(1);
  }, [colorVariants]);

  useEffect(() => {
    if (descRef.current) {
      setIsOverflowing(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [product]);

  // =======================
  // HANDLERS
  // =======================
  const handleQuantityChange = (type) => {
    if (type === "plus" && selectedQuantity < displayQuantity) {
      setSelectedQuantity(prev => prev + 1);
    } else if (type === "minus" && selectedQuantity > 1) {
      setSelectedQuantity(prev => prev - 1);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedQuantity(1);
  };

  const handleVariantSelect = (value) => {
    setSelectedSize(value);
    setSelectedQuantity(1);
  };

  let startX = 0, endX = 0;
  const handleTouchStart = (e) => startX = e.touches[0].clientX;
  const handleTouchMove = (e) => endX = e.touches[0].clientX;
  const handleTouchEnd = () => {
    if (startX - endX > 50 && currentIndex < (product?.images?.length ?? 0) - 1) setCurrentIndex(prev => prev + 1);
    if (endX - startX > 50 && currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  if (isLoading) return <p className="flex items-center justify-center mt-70">Loading...</p>;
  if (isError || !product) return <p className="flex items-center justify-center mt-70">Product not found</p>;

  const images = product.images || [];
  const formatPrice = (price) => new Intl.NumberFormat("en-NG").format(price || 0);

  // =======================
  // RENDER
  // =======================
  return (
    <div className="w-full">
      {/* Image Carousel */}
      <div
        className="relative py-4 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.length > 0 ? (
            images.map((img, idx) => (
              <img key={idx} src={img.url} alt={`product-image-${idx}`}
                className="w-full h-[393px] object-cover flex-shrink-0" />
            ))
          ) : (
            <img src="/placeholder.png" alt="placeholder"
              className="w-full h-[393px] object-cover flex-shrink-0" />
          )}
        </div>

        {/* Upload icon */}
        <div className="absolute top-6 right-3 w-9 h-9 flex items-center justify-center bg-black/80 rounded-full cursor-pointer">
          <Upload size={20} color="#ffffff" />
        </div>

        {/* Image indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-3 flex items-center justify-center px-3 h-6 bg-black/80 rounded-[32px]">
            <p className="text-white font-inter font-semibold text-[16px]">
              {currentIndex + 1}/{images.length}
            </p>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-4">
        {/* Product name + description */}
        <div className="flex items-start gap-1">
          <p
            ref={descRef}
            className={`text-[16px] font-inter text-black leading-snug ${expanded ? "" : "line-clamp-2"}`}
          >
            {product.productName} – {product.description}
          </p>
          {!expanded && isOverflowing && (
            <button onClick={() => setExpanded(true)} className="flex-shrink-0 mt-1">
              <ChevronDown size={13} color="rgba(0,0,0,0.7)" />
            </button>
          )}
        </div>

        {/* Prices */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <p className="text-[20px] font-inter font-semibold text-black">
              ₦{formatPrice(displayPrice)}
            </p>
            <p className="text-[18px] font-inter font-light text-black/50 line-through">
              ₦{formatPrice(product.price)}
            </p>
          </div>
          {product.discount > 0 && (
            <div className="w-[45px] h-[22px] flex items-center justify-center rounded-[4px] border border-[#D8A31B]">
              <p className="text-[16px] font-inter font-medium text-[#D8A31B]">
                -{product.discount}%
              </p>
            </div>
          )}
        </div>

        {/* Color Selector */}
        {allColors.length > 0 && (
          <div className="mt-4">
            <h3 className="font-[Montserrat] font-medium text-[20px] text-black mb-3">Color</h3>
            <div className="flex flex-wrap gap-4">
              {allColors.map((color, idx) => (
                <div key={idx} className="flex items-center gap-3 cursor-pointer"
                     onClick={() => handleColorSelect(color)}>
                  <div style={{
                    backgroundColor: colorMap[color.toLowerCase()] || color,
                    width: "22px", height: "22px", borderRadius: "50%",
                    border: selectedColor?.toLowerCase() === color.toLowerCase()
                      ? "2px solid black"
                      : "1px solid rgba(0,0,0,0.4)"
                  }} />
                  <span className="text-[13px] font-[Inter] text-black">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size / Measurement / Tech Spec Selector */}
        {variantType && colorVariants.some(v => v[variantType]) && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-[Montserrat] font-medium text-[20px] text-black">
                {variantType === "size" ? "Size" :
                 variantType === "measurement" ? "Measurement" : "Spec"}
              </h3>
              {variantType === "size" && (
                <button className="flex items-center justify-center gap-[2px] w-[115px] h-[24px] rounded-[16px] bg-[#EEEEEE] px-[8px]">
                  <Ruler size={16} className="text-black" />
                  <span className="text-[16px] font-inter text-black">Size Guide</span>
                </button>
              )}
            </div>
            <div className="flex gap-3">
              {colorVariants.map((variant, idx) => {
                const value = variantType === "size" ? variant.size :
                              variantType === "measurement" ? variant.measurement :
                              variant.memory ?? variant.ram;
                return (
                  <button
                    key={idx}
                    onClick={() => handleVariantSelect(value)}
                    className={`px-4 py-1 rounded-[24px] border text-[16px] font-inter font-medium
                      ${selectedSize === value
                        ? "border-black border-[1px]"
                        : "border-black/50 border-[0.5px]"}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex justify-between items-center">
          <div className="mt-4 flex gap-3">
            <p className="text-[16px] font-medium font-inter text-black">Qty</p>

            {/* Quantity Input */}
            <div className="w-[80px] h-[24px] flex border border-black/30 rounded-[4px] overflow-hidden">
              <button
                onClick={() => handleQuantityChange("minus")}
                className="w-[24px] h-full bg-[#EEEEEE] flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-black/50">-</span>
              </button>
              <div className="flex-1 h-full flex items-center justify-center">
                <span className="text-[14px] font-medium text-black">{selectedQuantity}</span>
              </div>
              <button
                onClick={() => handleQuantityChange("plus")}
                className="w-[24px] h-full bg-[#EEEEEE] flex items-center justify-center"
              >
                <span className="text-[16px] font-medium text-black/50">+</span>
              </button>
            </div>
          </div>
          {/* Low Stock Badge */}
            {displayQuantity < 20 && (
              <div
                className="flex items-center justify-center"
                style={{
                  backgroundColor: "#005770",
                  width: "60px",
                  height: "24px",
                  borderRadius: "2px",
                }}
              >
                <span
                  className="font-inter font-bold text-white"
                  style={{ fontSize: "8px" }}
                >
                  Only {displayQuantity} left
                </span>
              </div>
            )}
        </div>


        {/* SKU + Available Quantity */}
        <div className="mt-4 text-sm text-black/70">
          <p>SKU: {displaySku}</p>
          <p>Available: {displayQuantity}</p>
        </div>
      </div>

      {/* ======================= */}
      {/* DELIVERY & SHIPPING INFO */}
      {/* ======================= */}
      <div className="mt-4 w-full h-[4px] bg-[#EEEEEE]" />

        <div className="px-4 mt-4">
          {/* Delivery within 24 hours */}
          <a href="/delivery" className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/truck-green.svg" alt="Delivery Icon" className="w-6 h-6" />
              <span className="text-[16px] font-inter font-normal text-[#1A7709]">
                Delivery within 24 hours
              </span>
            </div>
            <ChevronRight size={13} color="rgba(0,0,0,0.7)" />
          </a>

          {/* Shipping fee */}
          <p className="mt-[22px] text-[16px] font-inter font-medium text-black">
            Shipping fee:{" "}
            <span className="font-normal text-black/50">Calculated at checkout</span>
          </p>

          {/* Courier company */}
          <p className="mt-2 text-[16px] font-inter font-medium text-black">
            Courier company:{" "}
            <span className="font-normal text-black/50">GIG</span>
          </p>

          {/* Late delivery credit */}
          <p className="mt-2 text-[16px] font-inter font-normal text-black/50">
            Get a ₦1,500 credit for late delivery
          </p>

          {/* Internal Separator */}
          <div className="mt-4 border-t border-black/20" />

          {/* Returns Section */}
          <a href="/returns" className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <img src="/return-green.svg" alt="Returns Icon" className="w-6 h-6" />
              <span className="text-[16px] font-inter font-normal text-[#1A7709]">
                10-Day Returns
              </span>
            </div>
            <ChevronRight size={13} color="rgba(0,0,0,0.7)" />
          </a>
        </div>

        {/* External Separator */}
        <div className="mt-4 w-full h-[4px] bg-[#EEEEEE]" />

        {/* Shopping Security Section */}
        <div className="px-4 mt-4">
          <a href="/security" className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/shield-green.svg" alt="Security Icon" className="w-6 h-6" />
              <span className="text-[16px] font-inter font-normal text-[#1A7709]">
                Shopping Security
              </span>
            </div>
            <ChevronRight size={13} color="rgba(0,0,0,0.7)" />
          </a>

          {/* Dot Listing (2 columns) */}
          <div className="mt-2 flex justify-between">
            <span className="text-[16px] font-inter font-normal text-black/50">
              • Safe payments
            </span>
            <span className="text-[16px] font-inter font-normal text-black/50">
              • Verified sellers
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-[16px] font-inter font-normal text-black/50">
              • Secure privacy
            </span>
            <span className="text-[16px] font-inter font-normal text-black/50">
              • Buyer protection
            </span>
          </div>
      </div>

      {/* Closing Separator */}
      <div className="mt-4 w-full h-[4px] bg-[#EEEEEE]" />

    </div>
  );
}

const colorMap = {
  white: "#FFFFFF",
  black: "#000000",
  blue: "#2E2B77",
  brown: "#8B4513",
  red: "#FF0000",
  green: "#008000",
  gold: "#FFD700",
  silver: "#C0C0C0",
};