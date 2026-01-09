import express from "express";
import {
  adminLogin,
  createAdmin,
  changeAdminCredentials,
} from "../controller/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
const adminAuthRoutes = express.Router();
adminAuthRoutes.post("/login", adminLogin);
adminAuthRoutes.put("/change-credentials", adminAuth, changeAdminCredentials);
adminAuthRoutes.post("/create", createAdmin);
export default adminAuthRoutes;
