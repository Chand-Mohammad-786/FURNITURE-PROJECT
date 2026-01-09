import sgMail from "@sendgrid/mail";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey || !apiKey.startsWith("SG.")) {
      console.warn("⚠️ SendGrid API key missing or invalid");
      return; // email fail ho sakta hai but app break nahi hogi
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email send error:", error.response?.body || error);
  }
};
