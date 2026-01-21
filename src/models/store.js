import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    brandName: { type: String, trim: true },
    slug: { type: String, unique: true, index: true, lowercase: true },

    // 🖼 appearance
    bannerMedia: [
      {
        type: { type: String, enum: ["image", "video"] },
        url: String,
        duration: Number,
      },
    ],

    videoMuted: Boolean,

    // 📖 story
    storyHeadline: String,
    storyDescription: String,
    highlights: [
      {
        image: String,
        caption: String,
      },
    ],

    // 🧭 categories (flattened)
    categories: [String],

    // 🎨 theme
    brandColor: String,

    // 🧾 footer
    storeTagline: String,
    socials: {
      instagram: String,
      twitter: String,
      tiktok: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);