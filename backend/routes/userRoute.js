const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers'); // Adjust the path
const authenticate = require('../middlewares/authUser'); // Adjust the path

// Send OTP for registration
router.post('/register', userController.sendOtp);

// Verify OTP and register user
router.post('/verifyotp', userController.verifyOtpAndRegister);

// User login
router.post('/login', userController.loginUser);

// Update user profile - Protected
router.put('/update-profile', authenticate, userController.updateProfile);

// Get user profile - Protected
router.get('/profile', authenticate, userController.getProfile);

module.exports = router;
