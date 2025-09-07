import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)