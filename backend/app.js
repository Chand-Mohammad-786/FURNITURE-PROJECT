import express from "express";
import dbConnect from "./connect/dbConnect.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import productRoutes from "./routes/productRoutes.js";
import adminRouter from "./routes/adminRouter.js";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9696;
// const port = 9696;
console.log("Email service initialized");

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://furniture-project-w231.vercel.app"],
    credentials: true,
  })
);
// app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", userRouter);
app.use("/products", productRoutes);
app.use("/admin", adminRouter);
app.use("/api/contact", contactRoutes);
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://furniture-project-w231.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
app.set("io", io);
export { io };
io.on("connection", (socket) => {
  console.log("⚡ Socket Connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected:", socket.id);
  });
});
httpServer.listen(PORT, () => {
  // console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`🚀 Server running on port ${PORT}`);
});
