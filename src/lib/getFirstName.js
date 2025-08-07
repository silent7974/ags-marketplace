import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getFirstNameFromCookie() {
  const cookieStore = await cookies(); // Await here
  const token = cookieStore.get('sellerToken')?.value;

  if (!token) return 'Seller';

  try {
    const decoded = jwt.decode(token);

    const fullName = decoded?.name || 'Seller';
    return fullName.split(' ')[0]; // Just first name
  } catch (err) {
    console.error('JWT Decode Error:', err);
    return 'Seller';
  }
}