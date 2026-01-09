import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE HERE (TOP)

import nodemailer from "nodemailer";

console.log("EMAIL_USER in emailConfig:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS in emailConfig:",
  process.env.EMAIL_PASS ? "SET" : "NOT SET"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter READY");
  }
});

export const EMAIL_FROM = `"Furni Store" <${process.env.EMAIL_USER}>`;
export default transporter;
