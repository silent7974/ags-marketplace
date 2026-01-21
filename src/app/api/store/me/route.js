import dbConnect from "@/lib/mongodb";
import Store from "@/models/store";
import Seller from "@/models/seller";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import slugify from "slugify";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  await dbConnect();

  const token = cookies().get("sellerToken")?.value;
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  const seller = await Seller.findById(decoded.id);
  if (!seller) {
    return Response.json({ message: "Seller not found" }, { status: 404 });
  }

  let store = await Store.findOne({ sellerId: seller._id });

  // 🔥 AUTO-CREATE STORE
  if (!store) {
    const slug = slugify(seller.brandName, { lower: true, strict: true });
    store = await Store.create({
      sellerId: seller._id,
      brandName: seller.brandName,
      slug: slug,
      isPublished: false,
    });
  }

  return Response.json(store);
}

export async function PUT(req) {
  await dbConnect();

  const token = cookies().get("sellerToken")?.value;
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const seller = await Seller.findById(decoded.id);
  if (!seller) {
    return Response.json({ message: "Seller not found" }, { status: 404 });
  }

  const store = await Store.findOne({ sellerId: seller._id });
  if (!store) {
    return Response.json({ message: "Store not found" }, { status: 404 });
  }

  const draft = await req.json();

  if (Array.isArray(draft.bannerMedia)) {
    store.bannerMedia = draft.bannerMedia;
  }
  store.videoMuted = draft.videoMuted;
  store.storyHeadline = draft.storyHeadline;
  store.storyDescription = draft.storyDescription;
  store.highlights = draft.highlights || [];
  store.categories = [
    ...(draft.categories?.suggested || []),
    ...(draft.categories?.fromProducts || []),
  ];
  store.brandColor = draft.brandColor;
  store.storeTagline = draft.storeTagline;
  store.socials = draft.socials;
  store.isPublished = true;

  await store.save();

  return Response.json({ success: true, slug: store.slug });
}