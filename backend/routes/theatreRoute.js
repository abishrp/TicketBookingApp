const express = require('express');
const theatreController = require('../controllers/theatreController'); // Adjust the path as needed
const authenticateAdmin = require('../middlewares/authAdmin');

const router = express.Router();

// Define routes
router.post('/',authenticateAdmin, theatreController.addTheatre); // Add a new theatre
router.get('/', theatreController.getTheatres); // Get all theatres
router.get('/:id', theatreController.getTheatreById); // Get a theatre by ID
router.put('/:id',authenticateAdmin, theatreController.updateTheatre); // Update a theatre by ID
router.delete('/:id',authenticateAdmin, theatreController.deleteTheatre); // Delete a theatre by ID


module.exports = router; 
