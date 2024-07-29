module.exports = (sequelize, DataTypes) => {
    const BookingSeat = sequelize.define('BookingSeat', {
      bookingId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Bookings', // name of the target model
          key: 'id', // key in the target model
        }
      },
      seatId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Seats', // name of the target model
          key: 'id', // key in the target model
        }
      },
    });
  
    return BookingSeat;
  };
    