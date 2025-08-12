import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getCategoryFromCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sellerToken')?.value

  if (!token) return 'Category Unknown'

  try {
    const decoded = jwt.decode(token)

    return decoded?.category || 'Category Unknown'
  } catch {
    return 'Category Unknown'
  }
}