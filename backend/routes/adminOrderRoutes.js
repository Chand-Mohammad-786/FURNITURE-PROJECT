import express from "express";
import {
  getOrders,
  deleteOrder,
  updateOrderStatus,
  getOrderDetailsAdmin,
  getCancelAnalytics,
  getOrderStatusAnalytics,
} from "../controller/orderController.js";
const router = express.Router();
router.get("/", getOrders);
router.get("/cancel-analytics", getCancelAnalytics);
router.get("/status-analytics", getOrderStatusAnalytics);
router.get("/:id", getOrderDetailsAdmin);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);
export default router;
