import mongoose from "mongoose";


const VariantSchema = new mongoose.Schema(
  {
    color: String,
    size: String,
    quantity: Number,
    sku: String,
  },
  { _id: false, strict: false } // variants can take any shape backend sends
)

const ProductSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    productName: String,
    description: String,
    price: Number,
    formattedPrice: String,
    discountedPrice: Number,
    discount: Number,
    category: String,
    subCategory: String,
    subType: String,
    tag: String,
    trending: String,
    useCase: String,
    sku: String,
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
)

// In ProductSchema definition
ProductSchema.index({
  productName: "text",
  description: "text",
  category: "text",
  subCategory: "text",
  subType: "text",
  tag: "text",
  trending: "text",
  useCase: "text",
  "variants.color": "text",   // ✅ searchable color
  "variants.size": "text",    // ✅ searchable size
})


export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)