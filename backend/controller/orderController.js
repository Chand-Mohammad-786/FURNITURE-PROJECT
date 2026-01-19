import mongoose from "mongoose";
import Order from "../model/orderSchema.js";
import Product from "../model/productSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../model/userSchema.js";
/* ===================== UTILITIES ===================== */

const generateTrackingNumber = () =>
  "TRK-" + Math.floor(100000 + Math.random() * 900000);

const generateInvoice = () => "INV-" + Date.now();

const generateEstimatedDelivery = () => {
  const days = Math.floor(Math.random() * 5) + 3;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

/* ===================== IMAGE HANDLER ===================== */

const FRONTEND_URL = "http://localhost:3000";

const buildImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/images")) return `${FRONTEND_URL}${imagePath}`;
  return `http://localhost:9696/uploads/${imagePath}`;
};

const transformOrderForResponse = (orderDoc) => {
  if (!orderDoc) return null;
  const order =
    typeof orderDoc.toObject === "function" ? orderDoc.toObject() : orderDoc;

  order.items = Array.isArray(order.items)
    ? order.items.map((it) => ({
        ...it,
        productImage: buildImageUrl(it.productImage),
      }))
    : [];

  return order;
};

/* ===================== PLACE ORDER ===================== */
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, phone, email } = req.body;

    let safeEmail = email;

    if (!safeEmail && userId && mongoose.Types.ObjectId.isValid(userId)) {
      const userDoc = await User.findById(userId).select("email");
      safeEmail = userDoc?.email;
    }

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    /* ================= BUILD ITEMS ================= */

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        let product = null;
        if (item.productId && mongoose.Types.ObjectId.isValid(item.productId)) {
          product = await Product.findById(item.productId).lean();
        }

        return {
          productId: item.productId || null,
          productName: product?.name || item.productName || "Unknown Product",
          price: item.price,
          quantity: item.quantity,
          productImage:
            product?.image || item.productImage || "/images/default.png",
          productSnapshot: {
            description:
              product?.description ||
              item.description ||
              item.productSnapshot?.description ||
              "",
            category:
              product?.category ||
              item.category ||
              item.productSnapshot?.category ||
              "",
            dimensions:
              product?.dimensions ||
              item.dimensions ||
              item.productSnapshot?.dimensions ||
              {},
            seatHeight:
              product?.seatHeight ||
              item.seatHeight ||
              item.productSnapshot?.seatHeight ||
              "",
            material:
              product?.material ||
              item.material ||
              item.productSnapshot?.material ||
              "",
            color:
              product?.color || item.color || item.productSnapshot?.color || "",
          },
        };
      }),
    );

    const calculatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    /* ================= CREATE ORDER ================= */

    const order = await Order.create({
      userId,
      email: safeEmail,
      items: updatedItems,
      totalAmount: calculatedTotal,
      address,
      phone,
      paymentMethod: "cod",
      invoiceNumber: generateInvoice(),
      trackingNumber: generateTrackingNumber(),
      estimatedDelivery: generateEstimatedDelivery(),
      timeline: { orderedAt: new Date() },
    });

    req.app.get("io")?.emit("orderPlaced", transformOrderForResponse(order));

    /* ================= EMAIL (NON-BLOCKING SAFE) ================= */

    if (safeEmail) {
      sendEmail({
        to: safeEmail,
        subject: "Order Placed Successfully",
        html: `
          <h3>Your order has been placed</h3>
          <p><b>Order ID:</b> ${order._id}</p>
          <p><b>Tracking Number:</b> ${order.trackingNumber}</p>
        `,
      })
        .then(() => console.log("✅ Order confirmation email sent"))
        .catch((err) => console.error("❌ Email send failed:", err.message));
    }

    /* ================= RESPONSE ================= */

    return res.status(201).json({
      success: true,
      order: transformOrderForResponse(order),
    });
  } catch (err) {
    console.error("placeOrder error:", err);
    return res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
};

/* ===================== USER ORDERS ===================== */

export const getOrdersByUser = async (req, res) => {
  const orders = await Order.find({
    userId: req.params.userId,
  }).sort({ createdAt: -1 });

  res.json({
    success: true,
    orders: orders.map(transformOrderForResponse),
  });
};

export const getSingleOrderByUser = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false });

  res.json({
    success: true,
    order: transformOrderForResponse(order),
  });
};

/* ===================== CANCEL ORDER ===================== */

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId");

    if (!order) return res.status(404).json({ success: false });

    if (order.status === "Delivered" || order.status === "Cancelled") {
      return res.json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    order.cancelledBy = "user";
    order.cancelReason = "Cancelled by user";
    order.timeline = order.timeline || {};
    order.timeline.cancelledAt = new Date();

    await order.save();

    req.app.get("io")?.emit("orderStatusUpdated", order);

    if (order.userId?.email) {
      sendEmail({
        to: order.userId.email,
        subject: "Order Cancelled Successfully",
        html: `
          <h2>Order Cancelled</h2>
          <p>Hello <b>${order.userId.name || "Customer"}</b>,</p>
          <p>Your order <b>#${order._id}</b> has been cancelled.</p>
          <p><b>Reason:</b> Cancelled by you</p>
        `,
      }).catch((err) =>
        console.error("Cancel order email failed:", err.message),
      );
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Cancel order error:", err);
    return res.status(500).json({ success: false });
  }
};

/* ===================== TRACK ORDER ===================== */

export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!order) return res.status(404).json({ success: false });

    res.json({
      success: true,
      order: transformOrderForResponse(order),
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ===================== ADMIN UPDATE STATUS ===================== */

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "email name",
    );

    if (!order) return res.status(404).json({ success: false });

    order.status = status;
    order.timeline = order.timeline || {};

    // When Admin Cancels Order
    if (status === "Cancelled") {
      order.cancelledBy = "admin";
      order.cancelReason = reason || "Cancelled by seller";
      order.timeline.cancelledAt = new Date();

      let userEmail = order.userId?.email || order.email;

      if (userEmail) {
        await sendEmail({
          to: userEmail,
          subject: "Your Order Has Been Cancelled",
          html: `
            <h2>Order Cancelled by Admin</h2>
            <p>Hello <b>${order.userId?.name || "Customer"}</b>,</p>
            <p>Your order <b>#${order._id}</b> has been cancelled.</p>
            <p><b>Reason:</b> ${order.cancelReason}</p>
          `,
        });

        console.log("✅ Admin cancel email sent");
      } else {
        console.log("❌ No email found for this order");
      }
    }

    await order.save();
    req.app.get("io")?.emit("orderStatusUpdated", order);

    return res.json({ success: true });
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return res.status(500).json({ success: false });
  }
};

/* ===================== ANALYTICS & DASHBOARD ===================== */

export const getCancelAnalytics = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { status: "Cancelled" } },
    { $group: { _id: "$cancelledBy", count: { $sum: 1 } } },
  ]);

  res.json({ success: true, data });
};

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments({
      status: { $ne: "Cancelled" },
    });

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenueAgg[0]?.total || 0,
      },
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

export const getOrderStatusAnalytics = async (req, res) => {
  try {
    const { date } = req.query;
    let match = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      match.createdAt = { $gte: start, $lte: end };
    }

    const stats = await Order.aggregate([
      { $match: match },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({ success: true, stats });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ===================== REMOVE ORDER FROM HISTORY ===================== */
export const removeOrderFromHistory = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    // 🔔 SOCKET UPDATE
    req.app.get("io")?.emit("orderRemoved", req.params.id);

    return res.json({
      success: true,
      message: "Order permanently removed",
    });
  } catch (error) {
    console.error("removeOrderFromHistory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove order",
    });
  }
};

/* ===================== ADMIN DELETE ORDER ===================== */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    // 🔔 SOCKET UPDATE
    req.app.get("io")?.emit("orderRemoved", order._id);

    return res.json({
      success: true,
      message: "Order permanently deleted",
    });
  } catch (error) {
    console.error("deleteOrder error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
    });
  }
};

/* ===================== ADMIN → GET SINGLE ORDER DETAILS ===================== */
export const getOrderDetailsAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order: transformOrderForResponse(order),
    });
  } catch (error) {
    console.error("getOrderDetailsAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

/* ===================== ADMIN → GET ALL ORDERS ===================== */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders: orders.map(transformOrderForResponse),
    });
  } catch (error) {
    console.error("getOrders error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
