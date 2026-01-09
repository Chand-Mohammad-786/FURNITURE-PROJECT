import express from "express";
import User from "../model/userSchema.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();
router.get("/", adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({
      success: false,
      users: [],
    });
  }
});
router.get("/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false });
    }
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});
export default router;
