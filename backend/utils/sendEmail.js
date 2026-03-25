import axios from "axios";
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("API KEY:", process.env.BREVO_API_KEY);
    console.log("SENDER:", process.env.BREVO_SENDER);
    console.log(" TRYING TO SEND EMAIL TO:", to);
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Furni Store",
          email: process.env.BREVO_SENDER,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: "Your order has been placed successfully",
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(" BREVO RESPONSE:", res.data);
    console.log(" Email sent successfully");

    return true;
  } catch (err) {
    console.log(" Email failed:", err.response?.data || err.message);
    return false;
  }
};
