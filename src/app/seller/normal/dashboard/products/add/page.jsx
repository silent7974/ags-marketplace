import AddProductLayout from '@/app/seller/components/AddProductPageLayout'
import { getCategoryFromCookie } from '@/lib/getCategoryFromCookie'


export default async function AddProductPageWrapper() {
    const category = await getCategoryFromCookie()
    return <AddProductLayout category={category} />
}