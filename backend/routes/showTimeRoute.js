const express = require('express');
const showTimeController = require('../controllers/showTimeController'); // Adjust the path as needed
const authenticateAdmin = require('../middlewares/authAdmin');

const router = express.Router();

// Define routes
router.post('/', authenticateAdmin, showTimeController.addShowTime); // Add a new showtime
router.get('/', showTimeController.getShowTimes); // Get all showtimes
router.get('/details/:id', showTimeController.getShowTimeById); // Get a showtime by ID
router.put('/:id', authenticateAdmin,showTimeController.updateShowTime); // Update a showtime by ID
router.delete('/:id',authenticateAdmin, showTimeController.deleteShowTime); // Delete a showtime by ID
router.get('/:movieId', showTimeController.getShowTimesByMovieId);

module.exports = router;
