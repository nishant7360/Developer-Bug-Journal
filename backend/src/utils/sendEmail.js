import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: `"Developer Bug Journal" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default transporter;
