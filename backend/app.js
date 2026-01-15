import dotenv from "dotenv";
dotenv.config();
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

import contactRoutes from "./routes/contactRoutes.js";
import { sendEmail } from "./utils/sendEmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://furniture-project-w231.vercel.app",
      "https://furniture-project-spox.onrender.com",
      "https://furniture-project-6d2z.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user", userRouter);
app.use("/products", productRoutes);
app.use("/admin", adminRouter);
app.use("/api/contact", contactRoutes);
// app.use("/api", userRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://furniture-project-w231.vercel.app",
      "https://furniture-project-spox.onrender.com",
      "https://furniture-project-6d2z.vercel.app",
    ],
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
app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: "chand13695@gmail.com",
      subject: "Test Email",
      html: "<h2>Gmail SMTP Working Successfully</h2>",
    });
    res.send("Email sent");
  } catch (err) {
    console.error("Test email error:", err.message);
    res.status(500).send("Email failed");
  }
});

httpServer.listen(PORT, () => {
  // console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`🚀 Server running on port ${PORT}`);
});
