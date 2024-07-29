const express = require('express');
const movieController = require('../controllers/movieController'); // Adjust the path as needed
const authenticateAdmin = require('../middlewares/authAdmin');


const router = express.Router();

// Define routes
router.post('/', authenticateAdmin, movieController.addMovie); // Add a new movie
router.get('/', movieController.getMovies); // Get all movies
router.get('/:id', movieController.getMovieById); // Get a movie by ID
router.put('/:id',authenticateAdmin, movieController.updateMovie); // Update a movie by ID
router.delete('/:id',authenticateAdmin, movieController.deleteMovie); // Delete a movie by ID
router.get('/', movieController.getMovieByTitle);
// router.get('/:movieId/showtimes', movieController.getShowTimesByMovieId);

module.exports = router;
