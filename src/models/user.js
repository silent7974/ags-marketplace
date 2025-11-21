import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  city: { type: String, default: "Abuja" },
  street: { type: String, required: true },
  district: { type: String, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: AddressSchema, // 👈 nested structure
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);