'use client';
import { useState } from 'react'

export default function FaqDropdown() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How much does it cost to sell on Malltiply?",
      answer:
        "Selling on Malltiply is completely free for normal sellers — no signup fees or hidden charges. Premium sellers enjoy advanced store features for a small fee, and we only charge a minimal commission on each successful sale.",
    },
    {
      question: "Can I customize my store on Malltiply?",
      answer:
        "Yes, premium sellers on Malltiply can fully customize their stores — from logos and banners to brand colors and product displays. Normal sellers have a standard layout but still enjoy a professional store presence.",
    },
    {
      question: "How do I get paid after selling on Malltiply?",
      answer:
        "Payments are made securely through your preferred payout method. Once a buyer completes an order, your funds are processed, and you receive your earnings after a small commission is deducted.",
    },
    {
      question: "What support do I get if I run into problems?",
      answer:
        "Malltiply provides 24/7 seller support, including live chat and help center resources. Whether you face technical issues or need sales advice, our team is here to guide you every step of the way.",
    },
  ];

  return (
    <div className="bg-white my-[24]">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="px-[16px] border-b border-[#E0E0E0]"
        >
          {/* Question Row */}
          <div
            className="flex justify-between items-center py-[16px] cursor-pointer"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <p className="text-[12px] font-[Montserrat] text-black">
              {item.question}
            </p>
            <svg
              className={`w-[12px] h-[12px] text-black/50 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Answer */}
          {openIndex === index && (
            <p className="text-[10px] font-[Montserrat] text-[#6D6D6D] pb-[16px]">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}