// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/BookingConfirmation.css';

// const BookingConfirmation = () => {
//   const location = useLocation();
//   const { bookingDetails,seatDetails } = location.state || { bookingDetails: {} }||{ seatDetails: {} };
//   console.log(bookingDetails);
//   console.log("seat",seatDetails);

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="booking-confirmation-container">
//       <h2>Booking Confirmation</h2>
//       <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
//       <p><strong>ShowTime ID:</strong> {bookingDetails.showTimeId}</p>
//       <p><strong>Seats:</strong> {}</p>
//       <p><strong>Movie ID:</strong> {bookingDetails.movieId}</p>
//       <p><strong>Theatre ID:</strong> {bookingDetails.theatreId}</p>
//       <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
//       <p><strong>Total Amount:</strong> ${bookingDetails.totalamount?.toFixed(2)}</p>
//       <button onClick={handlePrint}>Print</button>
//     </div>
//   );
// };

// export default BookingConfirmation;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BookingConfirmation.css';

const BookingConfirmation = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState({});
  const [showTimes, setShowTimes] = useState({});
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token) {
      // Fetch bookings by user ID
      axios.get(`http://localhost:8000/bookings/user`, {
        headers: { Authorization: token }
      })
        .then(response => {
          const bookingsData = response.data;
          setBookings(bookingsData);

          // Collect movie and showtime IDs from bookings
          const movieIds = [...new Set(bookingsData.map(booking => booking.movieId))];
          const showTimeIds = [...new Set(bookingsData.map(booking => booking.showTimeId))];

          // Fetch movie details for all movie IDs
          movieIds.forEach(movieId => {
            axios.get(`http://localhost:8000/movies/${movieId}`)
              .then(movieResponse => {
                setMovies(prevMovies => ({
                  ...prevMovies,
                  [movieId]: movieResponse.data
                }));
              })
              .catch(error => console.error('Error fetching movie details:', error));
          });

          // Fetch showtime details for all showtime IDs
          showTimeIds.forEach(showTimeId => {
            axios.get(`http://localhost:8000/showtimes/${showTimeId}`)
              .then(showTimeResponse => {
                setShowTimes(prevShowTimes => ({
                  ...prevShowTimes,
                  [showTimeId]: showTimeResponse.data
                }));
              })
              .catch(error => console.error('Error fetching showtime details:', error));
          });
        })
        .catch(error => console.error('Error fetching bookings:', error));
    }
  }, [token]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="booking-confirmation-container">
      <h2>Booking Confirmation</h2>
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <div key={booking.id} className="booking-details">
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>ShowTime ID:</strong> {booking.showTimeId}</p>
            <p><strong>Movie:</strong> {movies[booking.movieId]?.title || 'Loading...'}</p>
            <p><strong>ShowTime:</strong> {showTimes[booking.showTimeId] ? new Date(showTimes[booking.showTimeId].startTime).toLocaleString() : 'Loading...'}</p>
            <p><strong>Seats:</strong> {booking.seatDetails?.join(', ') || 'Loading...'}</p>
            <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${booking.totalamount?.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>Loading booking details...</p>
      )}
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default BookingConfirmation;




