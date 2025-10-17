import { Montserrat, Inter } from "next/font/google"
import "./globals.css"
import MobileOnlyWrapper from "./components/MobileWrapper"
import ReduxProvider from "@/redux/ReduxProvider"
import LayoutWrapper from "./components/LayoutWrapper"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '600'], 
  variable: '--font-inter' 
})

export const metadata = {
  title: "Malltiply",
  description: "Malltiply is a curated e-commerce built for rising fashion and lifestyle brands. Offering buyers a trusted space to discover quality, handcrafted and exclusive products. With premium storefronts, secure payments, and real customer support, Malltiply makes shopping feel personal and selling feel professional - all from one simple, elegant platform.",
  icons: {
    icon: "/malltiply-logo.svg?v=2",
    shortcut: "/malltiply-logo.svg?v=2",
    apple: "/malltiply-logo.svg?v=2",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-[#f8f9fa] ">
        <ReduxProvider>
          <MobileOnlyWrapper>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </MobileOnlyWrapper>
        </ReduxProvider>
      </body>
    </html>
  )
}