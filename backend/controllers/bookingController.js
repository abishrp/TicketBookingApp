const db = require('../config/database'); // Adjust the path if necessary);


// exports.createBooking = async (req, res) => {
//   try {
//     const { userId, showTimeId, bookingDate, totalamount,seatIds, movieId, status } = req.body;

//     // Create the booking record
//     const newBooking = await db.Booking.create({
//       userId,
//       showTimeId,
//       bookingDate,
//       totalamount,
//       movieId,
//       status 
//     });

//     // Create booking-seat associations (assuming a many-to-many relationship)
//     if (Array.isArray(seatIds)) {
//       const seatPromises = seatIds.map(seatId => db.BookingSeat.create({ bookingId: newBooking.id, seatId }));
//       await Promise.all(seatPromises);
//     } else {
//       throw new Error('seatIds must be an array');
//     }

//     res.status(201).json(newBooking);
//   } catch (error) {
//     console.error('Error creating booking:', error.message);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// };


exports.createBooking = async (req, res) => {
  const { userId, showTimeId, seatIds, bookingDate, totalamount, movieId, status } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    // Create the booking record
    const newBooking = await db.Booking.create({
      userId,
      showTimeId,
      bookingDate,
      totalamount,
      movieId,
      status
    }, { transaction });

    // Update seat availability
    await db.Seat.update(
      { isAvailable: false },
      {
        where: {
          id: seatIds,
          showTimeId: showTimeId
        },
        transaction
      }
    );

    // Reduce the number of tickets in the showTime
    await db.ShowTime.update(
      { ticketsAvailable: db.Sequelize.literal(`ticketsAvailable - ${seatIds.length}`) },
      {
        where: { id: showTimeId },
        transaction
      }
    );

    // Commit the transaction
    await transaction.commit();

    res.status(201).json(newBooking);
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};







exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await db.Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await db.Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { userId, seatId, showTimeId, movieId, bookingDate, status } = req.body;

  try {
    const booking = await db.Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.update({ userId, seatId, showTimeId, movieId, bookingDate, status });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await db.Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// controllers/bookingController.js



exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Make sure req.user.id is correctly set by the middleware
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found' });
    }
    console.log('User ID:', userId);

    
    // Fetch bookings where userId matches the authenticated user's ID
    const bookings = await db.Booking.findAll({
      where: { userId: userId }
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};



// exports.getBookingsByUserId = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const bookings = await db.Booking.findAll({ where: { userId } });
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching bookings' });
//   }
// };


