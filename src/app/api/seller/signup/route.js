import dbConnect from "@/lib/mongodb";
import Seller from "@/models/seller";
import Store from "@/models/store";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import mongoose from "mongoose";

export async function POST(req) {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
    
    session.startTransaction();

    const {
      fullName,
      email,
      phone,
      password,
      category,
      sellerType,
      location,
      brandName, // premium-only
    } = await req.json();

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !category ||
      !sellerType ||
      !location ||
      !location.street ||
      !location.district
    ) {
      throw new Error("All required fields including location must be provided");
    }


    await dbConnect();

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // 1️⃣ Create seller
    const seller = await Seller.create(
      [
        {
          fullName,
          email,
          phone,
          passwordHash,
          category,
          sellerType,
          location,
        },
      ],
      { session }
    );

    // 2️⃣ If premium → create store immediately
    if (sellerType === "premium_seller") {
      if (!brandName) {
        throw new Error("Brand name is required for premium sellers");
      }

      const slug = slugify(brandName, { lower: true, strict: true });

      const store = await Store.create(
        [
          {
            sellerId: seller[0]._id,
            brandName,
            slug,
            isPublished: false,
          },
        ],
        { session }
      );

      // 3️⃣ Link back to seller
      seller[0].brandName = brandName;
      seller[0].storeSlug = store[0].slug;
      await seller[0].save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    return new Response(
      JSON.stringify({ message: "Seller registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Signup Error:", error);

    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 400 }
    );
  }
}