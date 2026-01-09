import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, index: true },
    content: { type: String, default: "" },
    author: { type: String, default: "Admin" },
    tags: { type: [String], default: [] },
    image: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);
export default Blog;
