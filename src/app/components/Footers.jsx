import React from 'react';
import Link from "next/link";
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Logo & About */}
          <div>
              <h2 className="text-xl font-bold text-white">AGS Marketplace</h2>
              <p className="mt-3 text-sm leading-6">
                Your trusted platform for buying and selling hardware & mordern clothing.
              </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/Shop" className="hover:underline">Shop</Link></li>
              <li><Link href="/About" className="hover:underline">About</Link></li>
              <li><Link href="/Contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/FAQ" className="hover:underline">FAQ</Link></li>
              <li><Link href="/Privacy Policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/Terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link href="/Returns" className="hover:underline">Return policy</Link></li>
            </ul>
          </div>

          {/* COntact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-400"/>
                <span>Lagos Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-400"/>
                <span>+234 913 237 6668</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-400"/>
                <span>support@agsmarketplace.com</span>
              </li>
            </ul>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-800 text-center py-4 text-sm text-gray-500'>
            &copy; {new Date().getFullYear()} AGS Markeplace. All rights reserved.
          </div>
      </div>
    </footer>
  )
}
