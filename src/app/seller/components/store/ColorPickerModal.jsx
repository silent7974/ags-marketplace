"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setBrandColor } from "@/redux/slices/storeSlice";

function hsvToHex(h, s, v) {
  let f = (n, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  let r = Math.round(f(5) * 255);
  let g = Math.round(f(3) * 255);
  let b = Math.round(f(1) * 255);
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

function hexToHsv(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return { h, s, v };
}

function isValidHex(value) {
  return /^#([0-9A-Fa-f]{6})$/.test(value);
}

export default function ColorPickerModal({ onClose }) {
  const dispatch = useDispatch();
  const currentColor = useSelector((s) => s.store.brandColor);

  const gradientRef = useRef(null);
  const dragging = useRef(false);

  const initial = hexToHsv(currentColor);

  const [h, setH] = useState(initial.h);
  const [s, setS] = useState(initial.s);
  const [v, setV] = useState(initial.v);
  const [input, setInput] = useState(currentColor.toUpperCase());

  const color = hsvToHex(h, s, v);

  // Sync HSV → Redux
  useEffect(() => {
    dispatch(setBrandColor(color));
    setInput(color.toUpperCase());
  }, [h, s, v]);

  // Handle drag movement
  function updateFromPointer(e) {
    const rect = gradientRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);

    setS(x / rect.width);
    setV(1 - y / rect.height);
  }

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50">
        <div onClick={onClose} className="absolute inset-0 bg-black/30" />

        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
        >
          {/* Header */}
          <div className="h-[56px] bg-[#F8F9FA] border-b border-black/20
            flex items-center justify-center rounded-t-[24px]">
            <p className="font-inter font-medium text-[18px]">
              Color Picker
            </p>
          </div>

          <div className="px-4 py-6 space-y-[20px]">
            {/* Gradient */}
            <div
              ref={gradientRef}
              className="relative w-full h-[160px] rounded-[24px]"
              style={{
                background: `
                  linear-gradient(to top, black, transparent),
                  linear-gradient(to right, white, hsl(${h}, 100%, 50%))
                `,
              }}
              onPointerDown={(e) => {
                dragging.current = true;
                updateFromPointer(e);
              }}
              onPointerMove={(e) => dragging.current && updateFromPointer(e)}
              onPointerUp={() => (dragging.current = false)}
              onPointerLeave={() => (dragging.current = false)}
            >
              <div
                className="absolute w-[24px] h-[24px] rounded-full bg-[#F8F9FA]
                flex items-center justify-center pointer-events-none"
                style={{
                  left: `${s * 100}%`,
                  top: `${(1 - v) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="w-[18px] h-[18px] rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>

            {/* Hue slider */}
            <input
              type="range"
              min="0"
              max="360"
              value={h}
              onChange={(e) => setH(+e.target.value)}
              className="w-full h-[18px] rounded-[32px]"
            />

            {/* Hex input */}
            <input
              value={input}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setInput(val);

                if (isValidHex(val)) {
                  const hsv = hexToHsv(val);
                  setH(hsv.h);
                  setS(hsv.s);
                  setV(hsv.v);
                }
              }}
              className="w-full h-[36px] rounded-[4px]
                border border-black/30 px-3
                font-inter text-[16px] text-black"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}