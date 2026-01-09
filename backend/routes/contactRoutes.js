import express from "express";
import {
  sendMessage,
  getAllMessages,
  updateMessageStatus,
} from "../controller/contactController.js";
const router = express.Router();
router.post("/", sendMessage);
router.get("/", getAllMessages);
router.put("/:id", updateMessageStatus);
export default router;
