// models/Seller.js
import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    passwordHash: { type: String, required: true },
    category: { type: String, required: true },
    sellerType: { type: String, enum: ["normal_seller", "premium_seller"], default: "normal_seller" }
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);