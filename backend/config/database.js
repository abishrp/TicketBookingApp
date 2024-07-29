const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("MovieData", "postgres", "qwert@123", {
  host: "localhost",
  dialect: "postgres",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models 
db.User = require('../models/users')(sequelize, DataTypes);
db.OTP = require('../models/otps')(sequelize, DataTypes);
db.Movie = require('../models/movies')(sequelize, DataTypes);
db.Booking = require('../models/bookings')(sequelize, DataTypes);
db.Payment = require('../models/payments')(sequelize, DataTypes);
db.Seat = require('../models/seats')(sequelize, DataTypes);
db.ShowTime = require('../models/showTimes')(sequelize, DataTypes);
db.Theatre = require('../models/theatres')(sequelize, DataTypes);
db.BookingSeat = require('../models/bookingSeat')(sequelize, DataTypes);

// Relationships

// User - Booking relationship
db.User.hasMany(db.Booking, { foreignKey: 'userId' });
db.Booking.belongsTo(db.User, { foreignKey: 'userId' });

// Movie - ShowTime relationship
db.Movie.hasMany(db.ShowTime, { foreignKey: 'movieId' });
db.ShowTime.belongsTo(db.Movie, { foreignKey: 'movieId' });

// Theatre - ShowTime relationship
db.Theatre.hasMany(db.ShowTime, { foreignKey: 'theatreId' });
db.ShowTime.belongsTo(db.Theatre, { foreignKey: 'theatreId' });

// ShowTime - Seat relationship
db.ShowTime.hasMany(db.Seat, { foreignKey: 'showTimeId' });
db.Seat.belongsTo(db.ShowTime, { foreignKey: 'showTimeId' });

// Seat - Booking relationship
db.Seat.hasMany(db.Booking, { foreignKey: 'seatId' });
db.Booking.belongsTo(db.Seat, { foreignKey: 'seatId' });

// Booking - Payment relationship
db.Booking.hasMany(db.Payment, { foreignKey: 'bookingId' });
db.Payment.belongsTo(db.Booking, { foreignKey: 'bookingId' });

// Theatre - Seat relationship
db.Theatre.hasMany(db.Seat, { foreignKey: 'theatreId' });
db.Seat.belongsTo(db.Theatre, { foreignKey: 'theatreId' });


// Booking - Seat many-to-many relationship
db.Booking.belongsToMany(db.Seat, { through: db.BookingSeat, foreignKey: 'bookingId' });
db.Seat.belongsToMany(db.Booking, { through: db.BookingSeat, foreignKey: 'seatId' });


  
// db.Movie.hasMany(db.Theatre, { foreignKey: 'movieId'})
// db.Theatre.belongsTo(db.Movie, { foreignKey: 'movieId' });

 
module.exports = db;
