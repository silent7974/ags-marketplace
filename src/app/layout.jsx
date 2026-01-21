import { Montserrat, Inter, Mooli } from "next/font/google"
import "./globals.css"
import MobileOnlyWrapper from "./components/MobileWrapper"
import ReduxProvider from "@/redux/ReduxProvider"
import LayoutWrapper from "./components/LayoutWrapper"

// Montserrat for headlines
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// Inter for general text
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '600'], 
  variable: '--font-inter' 
})

// Mooli for brand story description
const mooli = Mooli({   // We'll pretend Mooli is imported similarly, adjust if real Mooli import
  variable: "--font-mooli",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata = {
  title: "Malltiply",
  description: "Malltiply connects buyers with trusted Abuja fashion brands. Shop quality kaftans, abayas, footwears, and more - all from verified Abuja local sellers.",
  icons: {
    icon: "/malltiply-logo.svg?v=2",
    shortcut: "/malltiply-logo.svg?v=2",
    apple: "/malltiply-logo.svg?v=2",
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} ${mooli.variable}`}>
      <body className="bg-[#f8f9fa]">
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