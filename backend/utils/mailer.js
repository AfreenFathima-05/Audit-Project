const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null; // not configured -- caller falls back to logging
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
};

// Sends an email if SMTP is configured via env vars; otherwise logs it so
// nothing silently fails and the booking flow never breaks on a missing
// mail setup. Configure SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS to
// enable real delivery.
const sendMail = async ({ to, subject, html }) => {
  const t = getTransporter();
  if (!t) {
    console.log(`[mailer] SMTP not configured -- would send to ${to}: "${subject}"`);
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || `"Aurilious & Co." <no-reply@aurilious.co>`,
      to,
      subject,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error('[mailer] send failed:', error.message);
    return { sent: false, reason: error.message };
  }
};

module.exports = { sendMail };
