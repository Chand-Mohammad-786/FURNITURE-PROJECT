import Blog from "../model/blogSchema.js";

// GET /admin/blogs
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, blogs });
};

// GET /admin/blogs/:id
export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json({ success: true, blog });
};

// POST /admin/blogs
export const createBlog = async (req, res) => {
  try {
    const io = req.app.get("io"); // ✅ ADD THIS

    const newBlog = await Blog.create({
      title: req.body.title,
      slug: req.body.slug || req.body.title.toLowerCase().replace(/\s+/g, "-"),
      content: req.body.content || "",
      category: req.body.category || "",
      author: "Admin",
      image: req.body.image || "",
      isPublished: Boolean(req.body.isPublished),
    });

    io.emit("blog-updated"); // ✅ ADD THIS

    res.json({ success: true, blog: newBlog });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// PUT /admin/blogs/:id
export const updateBlog = async (req, res) => {
  const io = req.app.get("io");
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  io.emit("blog-updated"); // ✅
  res.json({ success: true, blog: updated });
};

// DELETE /admin/blogs/:id
export const deleteBlog = async (req, res) => {
  const io = req.app.get("io");
  await Blog.findByIdAndDelete(req.params.id);

  io.emit("blog-updated"); // ✅
  res.json({ success: true });
};

// GET /admin/blogs/public
export const getPublishedBlogs = async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({
    createdAt: -1,
  });

  res.json({ success: true, blogs });
};

// import Blog from "../model/blogSchema.js";

// // GET /admin/blogs
// export const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     return res.json({
//       success: true,
//       status: 200,
//       message: "Blogs fetched",
//       blogs,
//       count: blogs.length,
//     });
//   } catch (err) {
//     console.error("getBlogs:", err);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to fetch blogs",
//       blogs: [],
//     });
//   }
// };

// // GET /admin/blogs/:id
// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog)
//       return res.json({
//         success: false,
//         status: 404,
//         message: "Blog not found",
//       });
//     return res.json({
//       success: true,
//       status: 200,
//       message: "Blog fetched",
//       blog,
//     });
//   } catch (err) {
//     console.error("getBlogById:", err);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to fetch blog",
//     });
//   }
// };

// // POST /admin/blogs
// export const createBlog = async (req, res) => {
//   try {
//     const { title, slug, content, author, tags, image, isPublished } = req.body;
//     if (!title)
//       return res.json({
//         success: false,
//         status: 400,
//         message: "Title is required",
//       });

//     const newBlog = await Blog.create({
//       title,
//       slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
//       content: content || "",
//       author: author || "Admin",
//       tags: Array.isArray(tags)
//         ? tags
//         : tags
//         ? tags.split(",").map((t) => t.trim())
//         : [],
//       image: image || "",
//       isPublished: !!isPublished,
//     });

//     return res.json({
//       success: true,
//       status: 201,
//       message: "Blog created",
//       blog: newBlog,
//     });
//   } catch (err) {
//     console.error("createBlog:", err);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to create blog",
//     });
//   }
// };

// // PUT /admin/blogs/:id
// export const updateBlog = async (req, res) => {
//   try {
//     const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updated)
//       return res.json({
//         success: false,
//         status: 404,
//         message: "Blog not found",
//       });
//     return res.json({
//       success: true,
//       status: 200,
//       message: "Blog updated",
//       blog: updated,
//     });
//   } catch (err) {
//     console.error("updateBlog:", err);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to update blog",
//     });
//   }
// };

// // DELETE /admin/blogs/:id
// export const deleteBlog = async (req, res) => {
//   try {
//     const deleted = await Blog.findByIdAndDelete(req.params.id);
//     if (!deleted)
//       return res.json({
//         success: false,
//         status: 404,
//         message: "Blog not found",
//       });
//     return res.json({ success: true, status: 200, message: "Blog deleted" });
//   } catch (err) {
//     console.error("deleteBlog:", err);
//     return res.json({
//       success: false,
//       status: 500,
//       message: "Failed to delete blog",
//     });
//   }
// };

// // GET /blogs (PUBLIC)
// export const getPublishedBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find({ isPublished: true }).sort({
//       createdAt: -1,
//     });

//     res.json({
//       success: true,
//       blogs,
//     });
//   } catch (err) {
//     res.json({ success: false, blogs: [] });
//   }
// };
