import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,

    phone: String,

    email: { type: String, required: true },
    message: { type: String, required: true },

    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
