import mongoose from "mongoose"

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  image: String,
  color: String,
  size: String,
  quantity: { type: Number, required: true },
  price: Number,
  discountedPrice: Number,
  sku: String,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [OrderItemSchema],

  // shipping info
  shippingMethod: {
    type: String,
    enum: ["standard", "pickup"],
    default: "standard",
  },
  shippingAddress: {
    fullName: String,
    phone: String,
    street: String,
    district: String,
    city: String,
  },
  pickupAddress: {
    name: String,      // GIG station name
    street: String,    // exact street GIG expects
    district: String,
    city: { type: String, default: "Abuja" },
    phone: String,     // optional, if GIG needs
  },

  paymentMethod: { type: String, enum: ["card", "bank_transfer"], default: "card" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

  itemsTotal: Number,
  discountTotal: Number,
  shippingFee: Number,
  totalAmount: Number,

  orderStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)