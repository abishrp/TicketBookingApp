// models/payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Payment;
  };
  