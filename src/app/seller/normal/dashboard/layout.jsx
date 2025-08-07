import { getFirstNameFromCookie } from '@/lib/getFirstName'
import SellerNavbar from './SellerNavbar'

export default async function DashboardLayout({ children }) {
  const firstName = await getFirstNameFromCookie()

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-4 py-[40px]">
      <SellerNavbar firstName={firstName} />
      {children} {/* This line was missing */}
    </div>
  )
}