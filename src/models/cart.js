import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  price: Number,
  discountedPrice: Number,
  image: String,
  color: String,
  size: String,
  quantity: { type: Number, default: 1 },
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [CartItemSchema],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  totalDiscountedPrice: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);