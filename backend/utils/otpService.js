const nodemailer = require('nodemailer');
const crypto = require('crypto');
const db = require('../config/database'); // Adjust the path to your models

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOtp = (length = 6) => {
  const otp = crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
  return otp;
};

// Send OTP via email
const sendOtp = async (email) => {
  const otp = generateOtp();

  // Store OTP in the database with expiry time
  await db.OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Error sending OTP');
  }
};

// Verify OTP
const verifyOtp = async (email, otp) => {
  const otpRecord = await db.OTP.findOne({
    where: {
      email,
      otp,
      expiresAt: { [db.Sequelize.Op.gt]: new Date() } // Check if OTP is expired
    }
  });
  return otpRecord !== null;
};

module.exports = {
  sendOtp,
  verifyOtp
};
