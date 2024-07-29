module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    showTimeId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    totalamount:
    {
      type: DataTypes.FLOAT,
      allowNull:false,

    },
    status: {
      type: DataTypes.ENUM('booked', 'canceled'),
      defaultValue: 'booked',
    },
  });

  return Booking;
};
