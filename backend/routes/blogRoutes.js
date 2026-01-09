import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
} from "../controller/blogController.js";
const blogRoutes = express.Router();
blogRoutes.get("/", getBlogs);
blogRoutes.get("/public", getPublishedBlogs);
blogRoutes.get("/:id", getBlogById);
blogRoutes.post("/", createBlog);
blogRoutes.put("/:id", updateBlog);
blogRoutes.delete("/:id", deleteBlog);
export default blogRoutes;
