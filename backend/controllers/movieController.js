const db = require('../config/database'); // Adjust the path to your models

exports.addMovie = async (req, res) => {
  const { title,imageUrl, description, releaseYear, director, genre, language,duration, cast, censorRating } = req.body;

  try {
    const newMovie = await db.Movie.create({
      title,
      imageUrl,
      description,
      releaseYear,
      director,
      genre,
      language,
      duration,
      cast,
      censorRating,
    });
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await db.Movie.findAll();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMovieByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const movie = await db.Movie.findOne({ where: { title } });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ movie: { id: movie.id, title: movie.title } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/movieController.js

// exports.getShowTimesByMovieId = async (req, res) => {
//   try {
//     const { movieId } = req.params;
//     const showtimes = await db.ShowTime.findAll({
//       where: { movieId },
//       include: [
//         {
//           model: db.Theatre,
//           as: 'Theatre', // Make sure 'Theatre' is the correct alias
//         },
//       ],
//     });
//     res.json({ showtimes });
//   } catch (error) {
//     console.error('Error fetching showtimes:', error);
//     res.status(500).json({ error: 'Error fetching showtimes' });
//   }
// };

exports.getShowTimesByMovieId = async (req, res) => {
  try {
    const showtimes = await ShowTime.findAll({
      where: { movieId: req.params.movieId },
    });
    res.json({ showtimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title,imageUrl, description, releaseYear, director, genre, language,duration, cast, censorRating } = req.body;

  try {
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.update({ title,imageUrl, description, releaseYear, director, genre, language,duration, cast, censorRating });
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await db.Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.destroy();
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 