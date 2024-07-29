const db = require('../config/database'); // Adjust the path to your models

exports.addShowTime = async (req, res) => {
    const { movieId, theatreId, date, time, price, viewType, totalSeats } = req.body;

    try {
        // Check if movie exists
        const movie = await db.Movie.findByPk(movieId);
        if (!movie) {
            return res.status(400).json({ error: 'Invalid movieId: Movie does not exist' });
        }

        // Check if theatre exists
        const theatre = await db.Theatre.findByPk(theatreId);
        if (!theatre) {
            return res.status(400).json({ error: 'Invalid theatreId: Theatre does not exist' });
        }

        // Create showtime
        const showTime = await db.ShowTime.create({ movieId, theatreId, date, time, price, viewType, totalSeats });

        // Create seats for the showtime
        const seats = [];
        for (let i = 1; i <= totalSeats; i++) {
            seats.push({
                showTimeId: showTime.id,
                seatNumber: `S${i}`, // or any other seat number format
                isAvailable: true,
            });
        }

        await db.Seat.bulkCreate(seats);

        res.status(201).json({ message: 'ShowTime and seats created successfully', showTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getShowTimes = async (req, res) => {
  try {
    const showTimes = await db.ShowTime.findAll();
    res.status(200).json({ showTimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

exports.getShowTimeById = async (req, res) => {
  const { id } = req.params;

  try {
    const showTime = await db.ShowTime.findByPk(id);
    if (!showTime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    res.status(200).json({ showTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getShowTimesByMovieId = async (req, res) => {
  try {
    const showtimes = await db.ShowTime.findAll({
      where: { movieId: req.params.movieId },
      include: [{ model: db.Theatre, attributes: ['name', 'location'] }],
    });
    res.json({ showtimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateShowTime = async (req, res) => {
  const { id } = req.params;
  const { movieId, theatreId,date,time, price, viewType, totalSeats } = req.body;

  try {
    const showTime = await db.ShowTime.findByPk(id);
    if (!showTime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    await showTime.update({ movieId, theatreId,date,date, time, price, viewType, totalSeats });
    res.status(200).json({ message: 'Showtime updated successfully', showTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteShowTime = async (req, res) => {
  const { id } = req.params;

  try {
    const showTime = await db.ShowTime.findByPk(id);
    if (!showTime) {
      return res.status(404).json({ message: 'Showtime not found' }); 
    }

    await showTime.destroy();
    res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
