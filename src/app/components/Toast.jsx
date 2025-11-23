"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-80 left-1/2 -translate-x-1/2 bg-[#000000] text-white text-[15px] 
          p-4 text-center rounded-xl shadow-lg z-[99999] w-[280px] "
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
