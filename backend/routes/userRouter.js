import express from "express";
import {
  signup,
  login,
  findUser,
  findByIdByBody,
  findByIdByParams,
  dataDelete,
  userUpdate,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controller/userController.js";

import {
  placeOrder,
  getOrdersByUser,
  getSingleOrderByUser,
  cancelOrder,
  removeOrderFromHistory,
  trackOrder,
} from "../controller/orderController.js";
const userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/findUser", findUser);
userRouter.post("/findByIdByBody", findByIdByBody);
userRouter.get("/findByIdByParams/:id", findByIdByParams);
userRouter.delete("/dataDelete/:id", dataDelete);
userRouter.put("/userUpdate/:id", userUpdate);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/orders", placeOrder);
userRouter.get("/orders/detail/:id", getSingleOrderByUser);
userRouter.put("/orders/cancel/:id", cancelOrder);
userRouter.delete("/orders/remove/:id", removeOrderFromHistory);
userRouter.get("/orders/track/:trackingNumber", trackOrder);
userRouter.get("/orders/:userId", getOrdersByUser);
export default userRouter;
