import axios from "axios";
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Furni Store",
          email: process.env.BREVO_SENDER, // 👈 IMPORTANT
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    console.log("✅ Email sent");
    return true;
  } catch (err) {
    console.log("❌ Email failed:", err.response?.data || err.message);
    return false;
  }
};

// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp-relay.brevo.com",
//       port: 587,
//       secure: false, // must be false for port 587
//       requireTLS: true, // ✅ THIS LINE IS IMPORTANT
//       auth: {
//         user: process.env.BREVO_USER,
//         pass: process.env.BREVO_API_KEY,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Furni Store" <${process.env.BREVO_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent");
//     return true;
//   } catch (error) {
//     console.error("❌ Email failed:", error);
//     return false;
//   }
// };
