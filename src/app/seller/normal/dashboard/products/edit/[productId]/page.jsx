import EditProductPageLayout from '@/app/seller/components/EditProductPageLayout'
import { getCategoryFromCookie } from '@/lib/getCategoryFromCookie'


export default async function EditProductPageWrapper() {
    const category = await getCategoryFromCookie()
    return <EditProductPageLayout category={category} />
}