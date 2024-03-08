// utils/email.js

const nodemailer = require('nodemailer');

// Create a transporter using your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'lakshmisowjanya212@gmail.com',
    pass: 'wmgy xptn wvgc pfmn'
  }
});

const sendPasswordResetEmail = async (toEmail, resetToken) => {
  try {
    // Email content and formatting
    const mailOptions = {
      from: 'lakshmisowjanya212@gmail.com',
      to: toEmail,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://localhost:3000/reset-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = sendPasswordResetEmail;
