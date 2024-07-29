const db = require('../config/database'); // Adjust the path as needed

// Create a new payment
exports.createPayment = async (req, res) => {
  const { bookingId, amount, paymentMethod, status } = req.body;

  try {
    const payment = await db.Payment.create({ bookingId, amount, paymentMethod, status });
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await db.Payment.findAll();
    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await db.Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a payment
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, paymentMethod, status } = req.body;

  try {
    const payment = await db.Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.update({ amount, paymentMethod, status });
    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await db.Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.destroy();
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
