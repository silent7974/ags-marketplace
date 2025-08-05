import { Montserrat, Inter } from "next/font/google"
import "./globals.css"
import MobileOnlyWrapper from "./components/MobileWrapper"

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
  description: "Your #1 trusted marketplace",
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
        <MobileOnlyWrapper>
          {children}
        </MobileOnlyWrapper>
      </body>
    </html>
  )
}
