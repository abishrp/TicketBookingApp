// models/movie.js
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration:
      {
        type: DataTypes.STRING,
        allowNull:false
      },
      imageUrl:
      {
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cast: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      language:
      {
        type:DataTypes.STRING,
        allowNull:false
      },
      director:{
        type: DataTypes.STRING,
        allowNull:false
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      censorRating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Movie;
  };
  