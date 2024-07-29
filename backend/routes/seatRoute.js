const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

// Create a new seat
router.post('/', seatController.createSeat);

// Get all seats
router.get('/', seatController.getAllSeats);

// Get seats by theatre
router.get('/showtimes/:showTimeId', seatController.getSeatsByShowTime);

// Get seat by ID
router.get('/:id', seatController.getSeatById);

// Update a seat
router.put('/:id', seatController.updateSeat);

// Delete a seat
router.delete('/:id', seatController.deleteSeat);

module.exports = router;
