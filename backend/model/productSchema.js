import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    // stock: { type: Number, default: 0 },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    specs: { type: [String], default: [] },
    image: { type: String, default: "" },
  },
  { timestamps: true },
);
const Product = mongoose.model("product", productSchema);
export default Product;
