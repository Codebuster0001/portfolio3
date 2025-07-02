// Admin Alert
console.log('SMTP_MAIL value:', process.env.SMTP_MAIL); // Debug log
await sendEmail({
  email: process.env.SMTP_MAIL,
  subject: `📬 New Contact Message from ${name}`,
  message: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
}); 