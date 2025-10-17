'use client'

import { useEffect, useState } from 'react'

export default function MobileOnlyWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth <= 430);
    };
    checkSize(); // Initial check
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (!isMobile) {
    return (
      <div className="flex items-center justify-center h-screen p-4 text-center bg-white">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mobile Only</h2>
          <p className="text-gray-600">
            Malltiply is currently available only for mobile devices. Please switch to a mobile screen to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>
}