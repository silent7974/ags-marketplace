"use client";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMeQuery } from "@/redux/services/authApi";

export default function FloatingCart() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const { data: me } = useMeQuery();
  const user = me?.user;

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const PAGE_PADDING = 20;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const defaultX = window.innerWidth - clientWidth - PAGE_PADDING;
        const defaultY = window.innerHeight - clientHeight - 100;
        setPosition({ x: defaultX, y: defaultY });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const startRef = useRef({ x: 0, y: 0 });

  // 🧠 If no logged-in user, hide the floating cart completely
  if (!user) return null;

  return (
    <motion.div
      ref={containerRef}
      drag
      dragMomentum={false}
      dragElastic={0.15}
      onDragStart={(event, info) => {
        setIsDragging(true);
        startRef.current = position;
      }}
      onDrag={(event, info) => {
        const nextX = startRef.current.x + info.offset.x;
        const nextY = startRef.current.y + info.offset.y;

        const { width, height } = containerRef.current.getBoundingClientRect();
        const clampedX = Math.min(
          window.innerWidth - width - PAGE_PADDING,
          Math.max(PAGE_PADDING, nextX)
        );
        const clampedY = Math.min(
          window.innerHeight - height - PAGE_PADDING,
          Math.max(PAGE_PADDING, nextY)
        );

        setPosition({ x: clampedX, y: clampedY });
      }}
      onDragEnd={() => setIsDragging(false)}
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        zIndex: 60,
        cursor: isDragging ? "grabbing" : "grab",
        left: 0,
        top: 0,
      }}
      className="flex flex-col items-center gap-[-8px]"
    >
      {/* Cart Circle */}
      <div
        className="relative w-[52px] h-[52px] rounded-full flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#F8F9FA",
          border: "2px solid #005770",
        }}
      >
        <ShoppingCart size={20} color="#005770" />
        <span
          className="font-inter font-bold"
          style={{
            color: "#005770",
            fontSize: "10px",
            marginTop: "1px",
          }}
        >
          Cart
        </span>

        {/* Quantity badge */}
        {totalQuantity > 0 && (
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: "-4px",
              right: "-6px",
              width: "22px",
              height: "18px",
              borderRadius: "8px",
              backgroundColor: "#005770",
              color: "#ffffff",
              fontSize: "9px",
              fontFamily: "Inter",
              fontWeight: 600,
            }}
          >
            {totalQuantity}
          </div>
        )}
      </div>

      {/* Free delivery tag */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "72px",
          height: "16px",
          borderRadius: "12px",
          backgroundColor: "#005770",
        }}
      >
        <span
          className="font-inter font-medium"
          style={{ fontSize: "8px", color: "#ffffff" }}
        >
          Free delivery
        </span>
      </div>
    </motion.div>
  );
}