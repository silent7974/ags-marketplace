'use client'

import FaqDropdown from '@/app/seller/components/FaqDropdown'
import Footer from '@/app/components/Footer'
import SignUpModal from '@/app/seller/components/SignupModal'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SellerIndexPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-[#E8F0F1]">
      {/* Nav */}
      <nav className="w-full h-[80px] bg-[#101010] py-[24px] px-[16px] flex items-center justify-between">
        {/* Left Side: Logo + Text */}
        <div className="flex items-center space-x-2">
          <Image
            src="/ags-logo2.svg"
            alt="AGS Logo"
            width={70}
            height={27}
            priority
          />
          <div>
            <p className="text-white text-[16px] font-semibold font-[Montserrat] leading-none">
              AGS
            </p>
            <p className="text-[#C7C5C5] text-[12px] font-bold font-[Montserrat] leading-none">
              Seller Center
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex items-center space-x-2">
          <button 
          className="text-white text-[16px] font-semibold font-[Inter] px-2 py-2 rounded-[8px]"
          onClick={() => router.push('/seller/signin')}
          >
            Sign In
          </button>
          <button 
          onClick={() => setModalOpen(true)}
          className="bg-[#2A9CBC] text-white text-[16px] font-semibold font-[Inter] px-2 py-2 rounded-[8px]">
            Sign Up
          </button>
        </div>
      </nav>

      <main className="w-full ">

        {/* Hero Section */}
        <div className="relative w-full h-[208px] hero-gradient px-16 py-8">
            <Image
                src="/seller-hero.png"
                alt="Seller Hero"
                width={96}
                height={172}
                className="absolute top-[8px] right-[16px] mr-4"
                priority
            />

            <div className="absolute top-[2px] left-[16px] flex flex-col space-y-[16px] max-w-[180px]">
                {/* Main Heading */}
                <p className="text-white text-[12px] font-black font-[Montserrat] leading-[32px]">
                Start Selling to thousands<br />of buyers on AGS
                </p>

                {/* Subheading */}
                <p className="text-white text-[8px] font-medium font-[Montserrat] leading-tight">
                Join AGS and grow faster
                </p>

                {/* Sign Up Button */}
                <button 
                onClick={() => setModalOpen(true)}
                className="bg-[#2A9CBC] text-white text-[16px] font-semibold font-[Inter] px-2 py-2 rounded-[8px]">
                Sign Up
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[48px] px-2 backdrop-blur-md bg-black/50 flex items-center justify-between" >
                {/* Element 1 */}
                <div className="flex items-center border-r border-white pr-[6px]">
                    <p className="text-white text-[24px] font-semibold mr-1 font-[Inter]">1</p>
                    <div className="flex flex-col ">
                    <p className="text-white text-[8px] font-semibold font-[Inter] mb-1 leading-none">
                        Minute
                    </p>
                    <p className="text-white text-[7px] font-semibold font-[Inter] leading-none">
                        Create your account
                    </p>
                    </div>
                </div>

                {/* Element 2 */}
                <div className="flex items-center border-r border-white pr-[6px] pl-[6px]">
                    <p className="text-white text-[24px] font-semibold mr-1 font-[Inter]">10</p>
                    <div className="flex flex-col ">
                    <p className="text-white text-[8px] font-semibold font-[Inter] mb-1 leading-none">
                        Minutes
                    </p>
                    <p className="text-white text-[7px] font-semibold font-[Inter] leading-none">
                        Complete your application
                    </p>
                    </div>
                </div>

                {/* Element 3 */}
                <div className="flex items-center pl-[6px]">
                    <p className="text-white text-[24px] font-semibold mr-1 font-[Inter]">1</p>
                    <div className="flex flex-col">
                    <p className="text-white text-[8px] font-semibold font-[Inter] mb-1 leading-none">
                        Day
                    </p>
                    <p className="text-white text-[7px] font-semibold font-[Inter] leading-none">
                        Receive application results
                    </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Why Sell on AGS Section */}
        <div className="my-[24px] px-[16px] sm:px-[12px] xs:px-[8px]">
          <h2 className="text-[24px] text-center font-semibold font-[Inter] text-[#18331B]">
            Why Sell on AGS?
          </h2>

          {/* Cards Grid */}
          <div className="mt-[48px] grid grid-cols-2 gap-x-[16px] gap-y-[48px] justify-center">

            {/* Card 1 */}
            <div className="relative bg-white w-[164px] h-[164px] rounded-[8px]">
              {/* Icon */}
              <img
                src="/radio-tower.svg"
                alt="Radio Tower"
                className="absolute left-1/2 -translate-x-1/2 -top-6"
              />

              {/* Title */}
              <p className="mt-[24px] text-[14px] ml-2 font-bold font-[Montserrat]">
                <span className="text-[#005770]">Get Discovered </span>
                <span className="text-[#18331B]">by Thousands</span>
              </p>

              {/* Paragraph */}
              <p className="mt-[12px] text-[8px] font-[Montserrat] text-[#303030] leading-[1.2] px-[8px]">
                AGS puts your products in front of real buyers across Nigeria and beyond.
                Whether you sell kaftans, accessories, or handmade footwear, we help you stand out – no tech skills needed. Just upload, and start selling.
              </p>
            </div>


            {/* Card 2 */}
            <div className="relative bg-white w-[164px] h-[164px] rounded-[8px]">
              <img
                src="/headset.svg"
                alt="Headset"
                className="absolute left-1/2 -translate-x-1/2 -top-6"
              />

              <p className="mt-[24px] text-[14px] ml-2 font-bold font-[Montserrat]">
                <span className="text-[#005770]">Easy Setup  </span>
                <span className="text-[#18331B]">& Local Support</span>
              </p>

              <p className="mt-[12px] text-[8px] font-[Montserrat] text-[#303030] leading-[1.2] px-[8px]">
                No complicated dashboards. AGS is built for sellers in our community - simple tools, fast uploads, and a support team that speaks your language when you need help.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white w-[164px] h-[164px] rounded-[8px]">
              <img
                src="/your-brand.svg"
                alt="Your Brand"
                className="absolute left-1/2 -translate-x-1/2 -top-6"
              />

              <p className="mt-[24px] text-[14px] ml-2 font-bold font-[Montserrat]">
                <span className="text-[#005770]">Build Your  </span>
                <span className="text-[#18331B]">Own Brand </span>
              </p>

              <p className="mt-[12px] text-[8px] font-[Montserrat] text-[#303030] leading-[1.2] px-[8px]">
                Premium sellers enjoy a personalized storefront - your logo, your colors, your vibe. We don’t just give you a shelf; we give you a full branded experience customers will remember.
              </p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white w-[164px] h-[164px] rounded-[8px]">
              <img
                src="/chart-column.svg"
                alt="Chart Column"
                className="absolute left-1/2 -translate-x-1/2 -top-6"
              />

              <p className="mt-[24px] text-[14px] ml-2 font-bold font-[Montserrat]">
                <span className="text-[#005770]">Grow with </span>
                <span className="text-[#18331B]">Confidence </span>
              </p>

              <p className="mt-[12px] text-[8px] font-[Montserrat] text-[#303030] leading-[1.2] px-[8px]">
                From first sale to loyal customers, AGS gives you insights and tools to grow steadily. Premium sellers also enjoy priority exposure and special campaigns to boost visibility.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="my-[56px] px-[16px] sm:px-[12px] xs:px-[8px]">
          <h2 className="text-[36px] text-center font-semibold font-[Inter] text-[#7B7979]">
            FAQ
          </h2>

          <FaqDropdown />
        </div>
      </main>

      <Footer />

      {/* Modal Component */}
      <SignUpModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}