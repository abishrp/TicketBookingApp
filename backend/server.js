require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database'); // Import the database initialization file
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');
const movieRoutes = require('./routes/movieRoute');
const bookingRoutes = require('./routes/bookingRoute');
const paymentRoutes = require('./routes/paymentRoute');
const seatRoutes = require('./routes/seatRoute');
const showTimeRoutes = require('./routes/showTimeRoute');
const theatreRoutes = require('./routes/theatreRoute');




// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/movies', movieRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/seats', seatRoutes);
app.use('/showtimes', showTimeRoutes);
app.use('/theatres', theatreRoutes);

// Sync Database and Start Server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.log('Error: ', err);
});

module.exports = app;
