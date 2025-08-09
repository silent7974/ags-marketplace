'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { UserIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()
  const hideNavbarRoutes = ['/join-as-seller', '/signin', '/signup']
  const shouldHide = hideNavbarRoutes.includes(pathname)

  if (shouldHide) return null

  return (
    <div className="flex">
      <div className="flex justify-between items-end space-x-4 mt-10">
        <Image 
          src="/logo.png"
          alt="Company logo"
          width={150}
          height={50}
        />
        
        <Bars3Icon className="h-6 w-6 text-black" />
        
        <Link href="/join-as-seller">test</Link>

        <UserIcon className="h-6 w-6 text-black" />
        
        <ShoppingCartIcon className="h-6 w-6 text-black" />
      </div>
    </div>
  )
}
