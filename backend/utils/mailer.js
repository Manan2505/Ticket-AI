import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_SMTP_HOST,
      port: process.env.MAIL_TRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_TRAP_SMTP_USER,
        pass: process.env.MAIL_TRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from:`"Inngest TMS" <${process.env.MAIL_TRAP_SMTP_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Sending email to:", to);
console.log("Subject:", subject);
console.log("Mailtrap host:", process.env.MAIL_TRAP_SMTP_HOST);

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail error", error.message);
    throw error;
  }
};