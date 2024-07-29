const db = require('../config/database'); // Adjust the path if necessary

exports.createSeat = async (req, res) => {
  const { showTimeId, seatNumber, isAvailable } = req.body;

  try {
    const seat = await db.Seat.create({ showTimeId, seatNumber, isAvailable });
    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSeats = async (req, res) => {
  try {
    const seats = await db.Seat.findAll();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeatsByShowTime = async (req, res) => {
  const { showTimeId } = req.params;

  try {
    const seats = await db.Seat.findAll({ where: { showTimeId } });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSeatById = async (req, res) => {
  const { id } = req.params;

  try {
    const seat = await db.Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }
    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSeat = async (req, res) => {
  const { id } = req.params;
  const { showTimeId, seatNumber, isAvailable } = req.body;

  try {
    const seat = await db.Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    await seat.update({ showTimeId, seatNumber, isAvailable });
    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSeat = async (req, res) => {
  const { id } = req.params;

  try {
    const seat = await db.Seat.findByPk(id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    await seat.destroy();
    res.status(200).json({ message: 'Seat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
