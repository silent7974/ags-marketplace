import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "AGS Marketplace",
  description: "Your #1 trusted marketplace",
  icons: {
    icon: "ags-logo.svg",
    shortcut: "ags-logo.svg",
    apple: "ags-logo.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body
        className="bg-[#f8f9fa]"
      > < Navbar />
        {children}
        
      </body>
    </html>
  );
}
