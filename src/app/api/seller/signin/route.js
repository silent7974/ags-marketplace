import clientPromise from "@/lib/mongodb"
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const client = await clientPromise
        const db = client.db('ags-marketplace')
        const sellers = db.collection('sellers')

        const seller = await sellers.findOne({ email })
        if (!seller) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        // Now properly compare hashed password
        const isMatch = await bcrypt.compare(password, seller.passwordHash)
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        const token = jwt.sign(
            { id: seller._id.toString(), type: 'normal_seller' },
            JWT_SECRET,
            { expiresIn: '7d' }
        )

        const response = NextResponse.json({ message: 'Login successful' })
        response.cookies.set('sellerToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
        })

        return response

    } catch (error) {
        console.error('Login Error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}