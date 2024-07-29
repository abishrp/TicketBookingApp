// models/seat.js
module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
      showTimeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      seatNumber: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      isAvailable: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
      },
  });

  Seat.associate = (models) => {
      Seat.belongsTo(models.ShowTime, { foreignKey: 'showTimeId' });
  };

  return Seat;
};
