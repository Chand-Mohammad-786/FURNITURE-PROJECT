import express from "express";
import { getAdminStats } from "../controller/adminDashboardController.js";
const adminDashboardRoutes = express.Router();
adminDashboardRoutes.get("/", getAdminStats);
export default adminDashboardRoutes;
