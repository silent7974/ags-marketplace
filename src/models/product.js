import mongoose from "mongoose";


const VariantSchema = new mongoose.Schema(
  {
    color: String,
    size: String,
    quantity: Number,
    sku: String,
  },
  { _id: false, strict: false } // variants can take any shape backend sends
);

const ProductSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    productName: String,
    description: String,
    price: Number,
    discount: Number,
    category: String,
    subcategory: String,
    variants: [VariantSchema],
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, strict: false } // let backend control structure
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);