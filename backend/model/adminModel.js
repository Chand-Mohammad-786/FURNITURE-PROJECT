import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    changeOtp: String,
    changeOtpExpiry: Date,
    pendingEmail: String,
    pendingPassword: String,
  },
  { timestamps: true }
);
export default mongoose.model("Admin", adminSchema);
