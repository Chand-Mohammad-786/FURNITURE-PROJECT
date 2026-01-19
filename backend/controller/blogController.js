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
    const io = req.app.get("io"); // ADD THIS

    const newBlog = await Blog.create({
      title: req.body.title,
      slug: req.body.slug || req.body.title.toLowerCase().replace(/\s+/g, "-"),
      content: req.body.content || "",
      category: req.body.category || "",
      author: "Admin",
      image: req.body.image || "",
      isPublished: Boolean(req.body.isPublished),
    });

    io.emit("blogupdated"); //  ADD THIS

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

  io.emit("blogupdated"); //
  res.json({ success: true, blog: updated });
};

// DELETE /admin/blogs/:id
export const deleteBlog = async (req, res) => {
  const io = req.app.get("io");
  await Blog.findByIdAndDelete(req.params.id);

  io.emit("blogupdated");
  res.json({ success: true });
};

// GET /admin/blogs/public
export const getPublishedBlogs = async (req, res) => {
  const blogs = await Blog.find({ isPublished: true }).sort({
    createdAt: -1,
  });

  res.json({ success: true, blogs });
};
