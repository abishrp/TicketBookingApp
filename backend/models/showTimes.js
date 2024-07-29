// models/showTime.js
module.exports = (sequelize, DataTypes) => {
  const ShowTime = sequelize.define('ShowTime', {
      movieId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      theatreId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      time: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      
      price: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      viewType: {
          type: DataTypes.ENUM('2D', '3D'),
          allowNull: false,
      },
      totalSeats: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  });

  ShowTime.associate = (models) => {
      ShowTime.hasMany(models.Seat, { foreignKey: 'showTimeId' });
  };

  return ShowTime;
};
