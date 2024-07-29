const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpService = require('../utils/otpService'); // Adjust the path

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user is already registered
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'User already registered. OTP not required.' });
      }
  
      // Invalidate any previous OTPs for this email
      await db.OTP.destroy({
        where: { email }
      });
  
      // Send a new OTP
      await otpService.sendOtp(email);
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
  };

exports.verifyOtpAndRegister = async (req, res) => {
  const { email, otp, name, password, dob } = req.body;

  try {
    const isValidOtp = await otpService.verifyOtp(email, otp);

    if (!isValidOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Destroy OTP record after successful verification
    await db.OTP.destroy({ where: { email, otp } });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await db.User.create({
      email,
      name,
      password: hashedPassword,
      dob,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error:error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.USER_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
 // Adjust the path to your models

exports.updateProfile = async (req, res) => {
  const { name, dob, password } = req.body;
  const userId = req.user.id;

  try {
    const updates = { name, dob };

    // Hash the new password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    await db.User.update(updates, { where: { id: userId } });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get user profile
exports.getProfile = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await db.User.findByPk(userId, {
        attributes: { exclude: ['password'] } // Exclude the password field from the response
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
