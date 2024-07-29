const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middlewares/authUser');

// Create a new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get a booking by ID
router.get('/:id', bookingController.getBookingById);

// Update a booking
router.put('/:id', bookingController.updateBooking);

// Delete a booking
router.delete('/:id', bookingController.deleteBooking);

//userid
router.get('/user', authenticate,  bookingController.getBookingsByUserId);

module.exports = router;
