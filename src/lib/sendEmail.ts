"use server";
import nodemailer from "nodemailer";

type SendEmailProps = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: SendEmailProps) {
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_ZEPTO_HOST! as string,
    port: Number(process.env.NEXT_ZEPTO_PORT! as string),
    secure: false,
    auth: {
      user: process.env.NEXT_ZEPTO_USER! as string,
      pass: process.env.NEXT_ZEPTO_PASS! as string,
    },
    tls: {
      rejectUnauthorized: false, // Windows/OpenSSL issue fix
    },
  });

  // 2. Send email
  const info = await transporter.sendMail({
    from: `Example Team ${process.env.NEXT_FROM_EMAIL! as string} `,
    to,
    subject,
    html: text,
  });

  console.log("Email sent:", info.messageId);
  return info;
}
