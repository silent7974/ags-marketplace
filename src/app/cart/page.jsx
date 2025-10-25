"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { EllipsisVertical, CircleAlert, Check, Circle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import {
  useRemoveCartItemMutation,
  useClearCartMutation,
  useUpdateCartItemMutation,
} from "@/redux/services/cartApi";
import { removeItem, clearCart, updateQuantity } from "@/redux/slices/cartSlice";
import formatPrice from "@/lib/utils/formatPrice";
import productCategoryMap from "@/lib/data/productCategoryMap";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [removeCartItemApi] = useRemoveCartItemMutation();
  const [updateCartItemApi] = useUpdateCartItemMutation();
  const [clearCartApi] = useClearCartMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, i) => sum + i.discountedPrice * i.quantity,
    0
  );
  const totalOriginal = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = selectedIds.length === cart.items.length && cart.items.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(cart.items.map((i) => i.productId._id || i.productId));
  };

  const toggleSelect = (id) => {
    const pid = id._id || id; // handle both object and string
    if (selectedIds.includes(pid)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== pid));
    } else {
      setSelectedIds([...selectedIds, pid]);
    }
  };


  const handleQuantityChange = async (item, type) => {
    const newQuantity = type === "plus" ? item.quantity + 1 : item.quantity - 1;
    const productId = item.productId._id || item.productId;

    if (newQuantity <= 0) {
      handleRemove(item);
      return;
    }

    // ✅ 1. Optimistically update the Redux store (instant UI change)
    dispatch(
      updateQuantity({
        productId,
        color: item.color,
        size: item.size,
        quantity: newQuantity,
      })
    );

    try {
      // ✅ 2. Trigger the backend update in background
      await updateCartItemApi({ productId, quantity: newQuantity }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);

      // ⚠️ 3. Roll back UI if it fails
      dispatch(
        updateQuantity({
          productId,
          color: item.color,
          size: item.size,
          quantity: item.quantity, // revert to previous
        })
      );
    }
  };


  const handleRemove = async (item) => {
    dispatch(removeItem(item));
    try {
      await removeCartItemApi(item.productId._id || item.productId).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };


  const handleClearSelected = async () => {
    if (selectedIds.length === 0) return;

    const itemsToClear = cart.items.filter((i) =>
      selectedIds.includes(i.productId._id || i.productId)
    );

    // ✅ 1. Optimistically remove selected items
    itemsToClear.forEach((item) =>
      dispatch(
        removeItem({
          productId: item.productId._id || item.productId,
          color: item.color,
          size: item.size,
        })
      )
    );

    try {
      // ✅ 2. Remove them from backend one by one
      await Promise.all(
        itemsToClear.map((item) =>
          removeCartItemApi(item.productId._id || item.productId).unwrap()
        )
      );
    } catch (err) {
      console.error("Failed to clear selected items:", err);
    }

    setSelectedIds([]);
    setDropdownOpen(false);
  };


  return (
    <div className="px-4 py-4 min-h-screen bg-white relative pb-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        {/* Left - Select All */}
        <div className="flex items-center gap-1.5">
          <button onClick={toggleSelectAll} className="relative w-[14px] h-[14px] flex items-center justify-center">
            {allSelected ? (
              <Image 
                width={14} 
                height={14}
                src={"/selected-indicator.svg"}
                alt={"Selected Indicator"}
              />
            ) : (
              <Circle size={14} color="#000000" strokeWidth={0.5} />
            )}
          </button>
          <span className="text-[14px] font-inter text-black">All</span>
        </div>

        {/* Middle - Cart quantity */}
        <p className="text-[16px] font-inter font-medium text-black">
          Cart ({totalQuantity})
        </p>

        {/* Right - Options */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <EllipsisVertical size={20} color="#000000" />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[160px] bg-white border border-black/10 rounded-[8px] shadow-lg z-10"
              >
                <button
                  onClick={handleClearSelected}
                  className="w-full text-left px-4 py-2 text-[14px] text-black/80 hover:bg-gray-50"
                >
                  Clear selected cart
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-[14px] text-black/80 hover:bg-gray-50"
                >
                  Share cart
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notice */}
      <div className="flex items-center justify-between border border-black/20 rounded-[2px] p-2">
        <div className="flex items-center gap-2 text-[#099404]">
          <Check size={19} />
          <span className="text-[12px] font-inter font-medium">
            Free delivery across Abuja
          </span>
        </div>
        <p className="text-[12px] font-inter font-medium text-black/50">
          limited time
        </p>
      </div>

      {/* Cart Items */}
      <div className="mt-3 flex flex-col gap-2">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-[140px] h-[140px] flex items-center justify-center rounded-full bg-[#EEEEEE]">
              <ShoppingBasket
                size={70}
                strokeWidth={1.5}
                className="text-black/70"
              />
            </div>
            <p className="text-[16px] font-inter text-black/60 mt-3">
              Your cart is feeling lonely 🛒
            </p>
            <a
              href="/"
              className="mt-4 bg-[#005770] text-white px-6 py-2 rounded-[30px] font-inter font-medium text-[14px] shadow-md hover:bg-[#004659] transition-all"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          cart.items.map((item) => {
            const pid = item.productId._id || item.productId;
            const selected = selectedIds.includes(pid);
            const category = productCategoryMap[item.category] || {};
            const variantLine = (() => {
              const parts = [];
              if (item.color) parts.push(`Color: ${item.color}`);
              if (item.size) parts.push(`Label size: ${item.size}`);
              if (item.measurement) parts.push(`Measurement: ${item.measurement}`);
              return parts.join(" / ");
            })();

            return (
              <div
                key={`${item.productId}-${item.color || 'nocolor'}-${item.size || 'nosize'}`}
                className="flex items-start gap-2 pb-2"
              >

                {/* Select item */}
                <button onClick={() => toggleSelect(pid)} className="mt-2">
                  {selected ? (
                    <Image 
                      width={14} 
                      height={14}
                      alt={"Selected Indicator"}
                      src={"/selected-indicator.svg"}
                    />
                  ) : (
                    <Circle size={14} color="#000000" strokeWidth={0.5} />
                  )}
                </button>

                {/* Image */}
                <div className="relative w-[88px] h-[74px]">
                  <Image
                    src={item.image || "/placeholder.png"}
                    fill
                    alt={item.name}
                    className="object-cover rounded-[4px]"
                  />
                  {item.quantity < 20 && (
                    <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[82px] h-[16px] bg-black/50 rounded-[47px] flex items-center justify-center">
                      <p className="text-[7px] text-white font-montserrat font-medium">
                        ALMOST SOLD OUT
                      </p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 border-b border-black/20 pb-2">
                  <div className="flex justify-between items-start">
                    <p className="text-[11px] text-black/50 font-montserrat">
                      {item.name}
                    </p>
                    <Image
                      src="/trashcan-cart.svg"
                      alt="Delete"
                      width={12}
                      height={12}
                      className="cursor-pointer"
                      onClick={() => handleRemove({
                        productId: item.productId,
                        color: item.color,
                        size: item.size
                      })}
                    />
                  </div>

                  {variantLine && (
                    <p className="mt-1 text-[8px] text-black font-montserrat">
                      {variantLine}
                    </p>
                  )}

                  {/* Price & Quantity */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <p className="text-[14px] font-inter font-semibold text-black">
                        ₦{formatPrice(item.discountedPrice)}
                      </p>
                      <p className="text-[12px] font-inter font-light text-black/50 line-through">
                        ₦{formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="w-[80px] h-[24px] flex border border-black/30 rounded-[4px] overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item, "minus")}
                        className="w-[24px] h-full bg-[#EEEEEE] flex items-center justify-center"
                      >
                        <span className="text-[16px] font-medium text-black/50">
                          -
                        </span>
                      </button>
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-[14px] font-medium text-black">
                          {item.quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => handleQuantityChange(item, "plus")}
                        className="w-[24px] h-full bg-[#EEEEEE] flex items-center justify-center"
                      >
                        <span className="text-[16px] font-medium text-black/50">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Availability Notice */}
      {cart.items.length > 0 && (
        <div className="mt-2 w-full bg-[#EEEEEE] h-[32px] flex items-center px-4 rounded-[4px]">
          <CircleAlert size={14} color="rgba(0,0,0,0.3)" />
          <p className="ml-1 text-[11px] font-inter font-medium text-black/30">
            Item availability is not guaranteed until payment is final
          </p>
        </div>
      )}

      {/* Bottom Summary Bar */}
      {cart.items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-black/10 flex justify-center items-center z-50">
          <div className="flex items-center justify-between w-[90%] max-w-[400px]">
            <div className="flex flex-col">
              <p className="text-[14px] font-inter line-through text-black">
                ₦{formatPrice(totalOriginal)}
              </p>
              <p className="text-[18px] font-inter font-semibold text-[#005770]">
                ₦{formatPrice(totalPrice)}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-[200px] h-[48px] bg-[#005770] rounded-[44px] text-white font-inter font-semibold text-[20px] flex items-center justify-center gap-2 shadow-lg"
            >
              Checkout ({totalQuantity})
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}