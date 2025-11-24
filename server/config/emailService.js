// config/emailService.js
import axios from "axios";

export async function sendEmail({ to, subject, html }) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Mộc Thiên Long",
          email: "9c5e03001@smtp-brevo.com", // 👉 Email Brevo cho phép gửi
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_PASS, // 👉 SMTP key dùng làm API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📨 Email sent via Brevo API:", response.data);
    return { success: true };
  } catch (error) {
    console.error(
      "❌ Email send error:",
      error.response?.data || error.message
    );
    return { success: false, error };
  }
}
