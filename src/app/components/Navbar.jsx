'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, UserRound, ShoppingCart } from "lucide-react"

export default function Navbar() {
  return (
    <div className="flex ">

        <div className="flex justify-betwwen items-end space-x-4 mt-10">
          <Image 
          src="/logo.png"
          alt="Company logo"
          width={150}
          height={50}/>
          <Menu size={32} className="text-black " />
            <Link href="/join-as-seller">test</Link>

          <UserRound size={32} className="text-black"/>
    
          <ShoppingCart size={32} className="text-black " />
        </div>
    </div>
  )
}
