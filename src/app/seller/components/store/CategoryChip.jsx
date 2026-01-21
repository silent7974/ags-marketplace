"use client";

import { Plus, X } from "lucide-react";

export default function CategoryChip({
  label,
  icon = "plus", // "plus" | "x" | "none"
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex items-center gap-[4px]
        px-[12px] py-[6px]
        rounded-[24px]
        bg-[#EEEEEE]
        font-inter font-medium text-[12px]
        text-black/50
        disabled:opacity-40
        whitespace-nowrap
      "
    >
      <span>{label}</span>

      {icon === "plus" && <Plus size={8} />}
      {icon === "x" && <X size={8} />}
    </button>
  );
}