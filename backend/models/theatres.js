// models/theatre.js
module.exports = (sequelize, DataTypes) => {
    const Theatre = sequelize.define('Theatre', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Theatre;
  };
  