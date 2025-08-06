import clientPromise from '@/lib/mongodb'
import { createSellerModel } from '@/models/seller'
import bcrypt from 'bcrypt.js' 

export async function POST(req) {
  const body = await req.json();
  const { fullName, email, phone, password, category, sellerType } = body;

  // Basic validation (more can be added)
  if (!fullName || !email || !phone || !password || !category || !sellerType) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), {
      status: 400,
    });
  }

  const client = await clientPromise;
  const db = client.db('ags-marketplace');
  const sellers = db.collection('sellers');

  // Check if email already exists
  const existing = await sellers.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: 'Email already registered' }), {
      status: 409,
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const seller = createSellerModel({
    fullName,
    email,
    phone,
    passwordHash,
    category,
    sellerType,
  });

  await sellers.insertOne(seller);

  return new Response(JSON.stringify({ message: 'Seller registered successfully' }), {
    status: 201,
  });
}