import nodemailer from "nodemailer";

let transporter;

const createTransporter = () => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_API_KEY,
    },
  });

  return transporter;
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailer = createTransporter();

    await mailer.sendMail({
      from: `"Furni Store" <${process.env.BREVO_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to);
    return true;
  } catch (error) {
    console.error("❌ Email failed:", error.message);
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
