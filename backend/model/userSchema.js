import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    otp: { type: String, default: null },
    otpExpire: { type: Date, default: null },
  },
  { timestamps: true }
);
const userDataSchema = mongoose.model("user", userSchema);
export default userDataSchema;
