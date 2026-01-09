import Order from "../model/orderSchema.js";
import User from "../model/userSchema.js";
import Product from "../model/productSchema.js";
import Blog from "../model/blogSchema.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    // ✅ TOTAL ORDERS (Cancelled exclude)
    const totalOrders = await Order.countDocuments({
      status: { $ne: "Cancelled" },
    });

    // ✅ TOTAL REVENUE
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");

    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name price");

    return res.json({
      success: true,
      status: 200,
      message: "Dashboard stats fetched successfully",
      stats: {
        totalUsers,
        totalProducts,
        totalBlogs,
        totalOrders, // ✅ FIXED
        totalRevenue, // ✅ FIXED
        latestUsers,
        latestProducts,
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    return res.status(500).json({ success: false });
  }
};
