"use client"

import { X, ListTodo, User, Star } from "lucide-react"

export default function ProfileModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[300px] h-[220px] relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-3 px-3 py-4">
          {/* Top Row */}
          <div className="flex justify-between px-3 py-3 border-b border-gray-300">
            <div className="w-[66px] h-[75px] flex flex-col items-center justify-center gap-1">
              <ListTodo className="w-5 h-5" />
              <span className="text-xs text-center">Your orders</span>
            </div>
            <div className="w-[66px] h-[75px] flex flex-col items-center justify-center gap-1">
              <User className="w-5 h-5" />
              <span className="text-xs text-center">Your profile</span>
            </div>
            <div className="w-[66px] h-[75px] flex flex-col items-center justify-center gap-1">
              <Star className="w-5 h-5" />
              <span className="text-xs text-center">Your reviews</span>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex flex-col gap-2">
            <button className="bg-gray-100 py-2 px-4 rounded-lg text-sm">
              Account Settings
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
