import nodemailer from "nodemailer";
import { config, requireEmailConfig } from "../config.js";
import { buildHtml, buildPlainText } from "./template.js";

export async function sendReadingEmail(reading) {
  requireEmailConfig();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword,
    },
  });

  await transporter.sendMail({
    from: `"The Daily Stoic" <${config.gmailUser}>`,
    to: config.gmailUser,
    subject: `The Daily Stoic — ${reading.theme} | ${reading.date}`,
    text: buildPlainText(reading),
    html: buildHtml(reading),
  });
}
