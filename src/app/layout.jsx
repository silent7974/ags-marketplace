import { Montserrat, Inter } from "next/font/google"
import "./globals.css"
import MobileOnlyWrapper from "./components/MobileWrapper"
import ReduxProvider from "@/redux/ReduxProvider"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '600'], 
  variable: '--font-inter' })

export const metadata = {
  title: "AGS Marketplace",
  description: "AGS is a curated e-commerce built for rising fashion and lifestyle brands. Offering buyers a trusted space to discover quality, handcrafted and exclusive products. With premium storefronts, secure payments, and real customer support, AGS makes shopping feel personal and selling feel professional - all from one simple, elegant platform.",
  icons: {
    icon: "/ags-logo.svg",
    shortcut: "/ags-logo.svg",
    apple: "/ags-logo.svg",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}, ${inter.variable}`}>
      <body
        className=" bg-[#f8f9fa]"
      >
        <ReduxProvider>
          <MobileOnlyWrapper>
            {children}
          </MobileOnlyWrapper>
        </ReduxProvider>
      </body>
    </html>
  )
}
