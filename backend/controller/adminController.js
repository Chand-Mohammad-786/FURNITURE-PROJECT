import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../model/adminModel.js";

/* ================= CREATE ADMIN (ONE TIME) ================= */
export const createAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    email = email.toLowerCase().trim();

    const exist = await Admin.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //  AUTO adminId (UNIQUE)
    const adminId = "ADMIN-" + Date.now();

    await Admin.create({
      adminId,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error("CREATE ADMIN ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Missing credentials" });
    }

    //  email OR adminId se login
    const admin = await Admin.findOne({
      $or: [{ email }, { adminId: email }],
    });

    if (!admin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin.adminId, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ success: false });
  }
};

/* ================= CHANGE ADMIN EMAIL / PASSWORD ================= */

export const changeAdminCredentials = async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    const admin = await Admin.findOne({ adminId: req.admin.adminId });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    //  verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password incorrect",
      });
    }

    // nothing to update
    if (!newEmail && !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide new email or password",
      });
    }

    //  update email
    if (newEmail) {
      admin.email = newEmail.toLowerCase().trim();
    }

    //  update password
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    res.json({
      success: true,
      message: "Credentials updated successfully",
    });
  } catch (err) {
    console.error("CHANGE CREDENTIALS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
