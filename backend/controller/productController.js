import Product from "../model/productSchema.js";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    res.json({ success: false, products: [] });
  }
};

// ================= GET PRODUCT BY ID =================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.json({ success: false });
    res.json({ success: true, product });
  } catch {
    res.json({ success: false });
  }
};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  try {
    const { description, ...rest } = req.body;

    const specs = description
      ? description
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const product = await Product.create({
      ...rest,
      description,
      specs,
    });

    const io = req.app.get("io");
    io.emit("productChanged");

    res.json({ success: true, product });
  } catch {
    res.json({ success: false });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const { description, ...rest } = req.body;

    const specs = description
      ? description
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    await Product.findByIdAndUpdate(req.params.id, {
      ...rest,
      description,
      specs,
    });

    const io = req.app.get("io");
    io.emit("productChanged");

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.emit("productChanged");

    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
};
