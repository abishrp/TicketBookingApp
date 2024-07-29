const db = require('../config/database'); // Adjust the path to your models

exports.addTheatre = async (req, res) => {
  const { name, location } = req.body;

  try {
    const newTheatre = await db.Theatre.create({
      name,
      location,
    });
    res.status(201).json({ message: 'Theatre added successfully', theatre: newTheatre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTheatres = async (req, res) => {
  try {
    const theatres = await db.Theatre.findAll();
    res.status(200).json({ theatres });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTheatreById = async (req, res) => {
  const { id } = req.params;

  try {
    const theatre = await db.Theatre.findByPk(id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }
    res.status(200).json({ theatre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// In your routes file


// In your theatre controller



exports.updateTheatre = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const theatre = await db.Theatre.findByPk(id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    await theatre.update({ name, location });
    res.status(200).json({ message: 'Theatre updated successfully', theatre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTheatre = async (req, res) => {
  const { id } = req.params;

  try {
    const theatre = await db.Theatre.findByPk(id);
    if (!theatre) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    await theatre.destroy();
    res.status(200).json({ message: 'Theatre deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
