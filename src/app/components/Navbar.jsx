import React from 'react'
import { Menu, UserRound, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <div className="flex ">

        
        <Menu size={32} className="text-black" />
    
        <ShoppingCart size={32} className="text-black" />
    </div>
  )
}
