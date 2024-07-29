
// export default Booking;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Booking.css';

// const Booking = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { showTimeId, seats } = location.state || { showTimeId: null, seats: [] };
//     const [bookingDetails, setBookingDetails] = useState({
//         userId: '',
//         movieId: '',
//         theatreId: '',
//         bookingDate: new Date().toISOString(),
//         totalamount: 0
//     });
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchShowTimeDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/showtimes/details/${showTimeId}`);
//                 const showTimeData = response.data;

//                 setBookingDetails((prevDetails) => ({
//                     ...prevDetails,
//                     movieId: showTimeData.showTime.movieId,
//                     theatreId: showTimeData.showTime.theatreId,
//                     totalamount: seats.length * showTimeData.showTime.price // Assume each seat has the same price
//                 }));

//                 const token = localStorage.getItem('userToken');
//                 if (token) {
//                     const userResponse = await axios.get('http://localhost:8000/users/profile', {
//                         headers: { Authorization: token }
//                     });
//                     setBookingDetails((prevDetails) => ({
//                         ...prevDetails,
//                         userId: userResponse.data.user.id
//                     }));
//                 }
//             } catch (error) {
//                 console.error('Error fetching showtime details:', error.message);
//                 setMessage(`Failed to fetch showtime details: ${error.message}`);
//             }
//         };

//         fetchShowTimeDetails();
//     }, [showTimeId, seats]);

//     const handleBooking = async (e) => {
//         e.preventDefault();

//         const bookingPayload = {
//             ...bookingDetails,
//             showTimeId,
//             seatIds: seats
//         };

//         try {
//             const response = await axios.post('http://localhost:8000/bookings', bookingPayload);
//             setMessage('Booking successful!');
//             console.log('Booking response:', response.data);
//             // Optionally, navigate to a confirmation page or home page
//             navigate('/booking-confirmation', { state: { bookingId: response.data.id } });
//         } catch (error) {
//             console.error('Error booking seats:', error.message);
//             setMessage(`Failed to book seats: ${error.message}`);
//         }
//     };

//     return (
//         <div className="booking-container">
//             <h2>Booking Summary</h2>
//             {message && <p>{message}</p>}
//             <form onSubmit={handleBooking}>
//                 <p><strong>ShowTime ID:</strong> {showTimeId}</p>
//                 <p><strong>Seats:</strong> {seats.join(', ')}</p>
//                 <p><strong>Movie ID:</strong> {bookingDetails.movieId}</p>
//                 <p><strong>Theatre ID:</strong> {bookingDetails.theatreId}</p>
//                 <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
//                 <p><strong>Total Amount:</strong> ${bookingDetails.totalamount.toFixed(2)}</p>
//                 <button type="submit">Confirm Booking</button>
//             </form>
//         </div>
//     );
// };

// export default Booking;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Booking.css';

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { showTimeId, seats } = location.state || { showTimeId: null, seats: [] };
//   const [bookingDetails, setBookingDetails] = useState({
//     userId: '',
//     movieId: '',
//     theatreId: '',
//     bookingDate: new Date().toISOString(), 
//     totalamount: 0
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchShowTimeDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/showtimes/details/${showTimeId}`);
//         const showTimeData = response.data;

//         setBookingDetails((prevDetails) => ({
//           ...prevDetails,
//           movieId: showTimeData.showTime.movieId,
//           theatreId: showTimeData.showTime.theatreId,
//           totalamount: seats.length * showTimeData.showTime.price // Assume each seat has the same price
//         }));

//         const token = localStorage.getItem('userToken');
//         if (token) {
//           const userResponse = await axios.get('http://localhost:8000/users/profile', {
//             headers: { Authorization: token }
//           });
//           setBookingDetails((prevDetails) => ({
//             ...prevDetails,
//             userId: userResponse.data.user.id
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching showtime details:', error.message);
//         setMessage(`Failed to fetch showtime details: ${error.message}`);
//       }
//     };

//     fetchShowTimeDetails();
//   }, [showTimeId, seats]);

//   const handleBooking = async (e) => {
//     e.preventDefault();

//     const bookingPayload = {
//       ...bookingDetails,
//       showTimeId,
//       seatIds: seats,
//       status: 'booked'
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/bookings', bookingPayload);
//       setMessage('Booking successful!');
//       console.log('Booking response:', response.data);
//       // Optionally, navigate to a confirmation page or home page
//       navigate('/booking-confirmation', { state: { bookingId: response.data.id } });
//     } catch (error) {
//       console.error('Error booking seats:', error.message);
//       setMessage(`Failed to book seats: ${error.message}`);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h2>Booking Summary</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleBooking}>
//         <p><strong>ShowTime ID:</strong> {showTimeId}</p>
//         <p><strong>Seats:</strong> {seats.join(', ')}</p>
//         <p><strong>Movie ID:</strong> {bookingDetails.movieId}</p>
//         <p><strong>Theatre ID:</strong> {bookingDetails.theatreId}</p>
//         <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
//         <p><strong>Total Amount:</strong> ${bookingDetails.totalamount.toFixed(2)}</p>
//         <button type="submit">Confirm Booking</button>
//       </form>
//     </div>
//   );
// };

// export default Booking;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Booking.css';

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { showTimeId, seats } = location.state || { showTimeId: null, seats: [] };
//   const [bookingDetails, setBookingDetails] = useState({
//     userId: '',
//     movieId: '',
//     theatreId: '',
//     bookingDate: new Date().toISOString(), 
//     totalamount: 0
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchShowTimeDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/showtimes/details/${showTimeId}`);
//         const showTimeData = response.data;

//         setBookingDetails((prevDetails) => ({
//           ...prevDetails,
//           movieId: showTimeData.showTime.movieId,
//           theatreId: showTimeData.showTime.theatreId,
//           totalamount: seats.length * showTimeData.showTime.price // Assume each seat has the same price
//         }));

//         const token = localStorage.getItem('userToken');
//         if (token) {
//           const userResponse = await axios.get('http://localhost:8000/users/profile', {
//             headers: { Authorization: token }
//           });
//           setBookingDetails((prevDetails) => ({
//             ...prevDetails,
//             userId: userResponse.data.user.id
//           }));
//         }
//       } catch (error) {
//         console.error('Error fetching showtime details:', error.message);
//         setMessage(`Failed to fetch showtime details: ${error.message}`);
//       }
//     };

//     fetchShowTimeDetails();
//   }, [showTimeId, seats]);

//   const handleBooking = async (e) => {
//     e.preventDefault();

//     const bookingPayload = {
//       ...bookingDetails,
//       showTimeId,
//       seatIds: seats,
//       status: 'booked'
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/bookings', bookingPayload);
//       setMessage('Booking successful!');
//       console.log('Booking response:', response.data);
//       // Navigate to the booking confirmation page
//       navigate('/bookingconfirmation', { state: { bookingDetails: response.data } });
//     } catch (error) {
//       console.error('Error booking seats:', error.message);
//       setMessage(`Failed to book seats: ${error.message}`);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h2>Booking Summary</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleBooking}>
//         <p><strong>ShowTime ID:</strong> {showTimeId}</p>
//         <p><strong>Seats:</strong> {seats.join(', ')}</p>
//         <p><strong>Movie ID:</strong> {bookingDetails.movieId}</p>
//         <p><strong>Theatre ID:</strong> {bookingDetails.theatreId}</p>
//         <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
//         <p><strong>Total Amount:</strong> ${bookingDetails.totalamount.toFixed(2)}</p>
//         <button type="submit">Confirm Booking</button>
//       </form>
//     </div>
//   );
// };

// export default Booking;





// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Booking.css';

// const Booking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { showTimeId, seats } = location.state || { showTimeId: null, seats: [] };
//   const [bookingDetails, setBookingDetails] = useState({
//     userId: '',
//     userName: '',
//     movieId: '',
//     movieTitle: '',
//     theatreId: '',
//     theatreName: '',
//     showTimeDate: '',
//     showTimeTime: '',
//     bookingDate: new Date().toISOString(), 
//     totalamount: 0,
//     seats: []
//   });
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         // Fetch showtime details
//         const showTimeResponse = await axios.get(`http://localhost:8000/showtimes/details/${showTimeId}`);
//         const showTimeData = showTimeResponse.data;
//         const showTimeDetails = showTimeData.showTime;

//         // Fetch movie details
//         const movieResponse = await axios.get(`http://localhost:8000/movies/${showTimeDetails.movieId}`);
//         const movieDetails = movieResponse.data.movie;


//         // Fetch theatre details
//         const theatreResponse = await axios.get(`http://localhost:8000/theatres/${showTimeDetails.theatreId}`);
//         const theatreDetails = theatreResponse.data.theatre;

//         // Fetch user details
//         const token = localStorage.getItem('userToken');
//         let userDetails = {};
//         if (token) {
//           const userResponse = await axios.get('http://localhost:8000/users/profile', {
//             headers: { Authorization: token }
//           });
//           userDetails = userResponse.data.user;
//         }

//         // Fetch seat details
//         const seatDetailsPromises = seats.map(seatId =>
//           axios.get(`http://localhost:8000/seats/${seatId}`)
//         );
//         const seatDetailsResponses = await Promise.all(seatDetailsPromises);
//         const seatDetails = seatDetailsResponses.map(response => response.data);

//         setBookingDetails({
//           userId: userDetails.id || '',
//           userName: userDetails.name || '',
//           movieId: showTimeDetails.movieId,
//           movieTitle: movieDetails.title,
//           theatreId: showTimeDetails.theatreId,
//           theatreName: theatreDetails.name,
//           showTimeDate: showTimeDetails.date,
//           showTimeTime: showTimeDetails.time,
//           bookingDate: new Date().toISOString(),
//           totalamount: seats.length * showTimeDetails.price, // Assume each seat has the same price
//           seats: seatDetails
//         });
//       } catch (error) {
//         console.error('Error fetching details:', error.message);
//         setMessage(`Failed to fetch details: ${error.message}`);
//       }
//     };

//     fetchDetails();
//   }, [showTimeId, seats]);

//   const handleBooking = async (e) => {
//     e.preventDefault();

//     const bookingPayload = {
//       ...bookingDetails,
//       showTimeId,
//       seatIds: seats.map(seat => seat.id), // Assuming seat object contains id
//       status: 'booked'
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/bookings', bookingPayload);
//       setMessage('Booking successful!');
//       console.log('Booking response:', response.data);
//       // Navigate to the booking confirmation page
//       navigate('/bookingconfirmation', { state: { bookingDetails: response.data } });
//     } catch (error) {
//       console.error('Error booking seats:', error.message);
//       setMessage(`Failed to book seats: ${error.message}`);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h2>Booking Summary</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleBooking}>
//         <p><strong>User ID:</strong> {bookingDetails.userId}</p>
//         <p><strong>User Name:</strong> {bookingDetails.userName}</p>
//         <p><strong>Movie ID:</strong> {bookingDetails.movieId}</p>
//         <p><strong>Movie Title:</strong> {bookingDetails.movieTitle}</p>
//         <p><strong>Theatre ID:</strong> {bookingDetails.theatreId}</p>
//         <p><strong>Theatre Name:</strong> {bookingDetails.theatreName}</p>
//         <p><strong>ShowTime ID:</strong> {showTimeId}</p>
//         <p><strong>ShowTime Date:</strong> {bookingDetails.showTimeDate}</p>
//         <p><strong>ShowTime Time:</strong> {bookingDetails.showTimeTime}</p>
//         <p><strong>Seats:</strong> {bookingDetails.seats.map(seat => `${seat.id} (${seat.seatNumber})`).join(', ')}</p>
//         <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
//         <p><strong>Total Amount:</strong> ${bookingDetails.totalamount.toFixed(2)}</p>
//         <button type="submit">Confirm Booking</button>
//       </form>
//     </div>
//   );
// };

// export default Booking;




import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { showTimeId, seats } = location.state || { showTimeId: null, seats: [] };
  const [bookingDetails, setBookingDetails] = useState({
    userId: '',
    userName: '',
    movieId: '',
    movieTitle: '',
    movieLanguage: '',
    movieImage: '',
    theatreId: '',
    theatreName: '',
    theatreLocation: '',
    showTimeDate: '',
    showTimeTime: '',
    bookingDate: new Date().toISOString(),
    totalamount: 0,
    seats: []
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch showtime details
        const showTimeResponse = await axios.get(`http://localhost:8000/showtimes/details/${showTimeId}`);
        const showTimeData = showTimeResponse.data;
        const showTimeDetails = showTimeData.showTime;
        

        // Fetch movie details
        const movieResponse = await axios.get(`http://localhost:8000/movies/${showTimeDetails.movieId}`);
        const movieDetails = movieResponse.data.movie;

        // Fetch theatre details
        const theatreResponse = await axios.get(`http://localhost:8000/theatres/${showTimeDetails.theatreId}`);
        const theatreDetails = theatreResponse.data.theatre;

        // Fetch user details
        const token = localStorage.getItem('userToken');
        let userDetails = {};
        if (token) {
          const userResponse = await axios.get('http://localhost:8000/users/profile', {
            headers: { Authorization: token }
          });
          userDetails = userResponse.data.user;
        }

        // Fetch seat details
        const seatDetailsPromises = seats.map(seatId =>
          axios.get(`http://localhost:8000/seats/${seatId}`)
        );
        const seatDetailsResponses = await Promise.all(seatDetailsPromises);
        const seatDetails = seatDetailsResponses.map(response => response.data);
        console.log("Seat details promises", seatDetailsPromises);
        console.log("Seat details", seatDetails);

        setBookingDetails({
          userId: userDetails.id || '',
          userName: userDetails.name || '',
          movieId: showTimeDetails.movieId,
          movieTitle: movieDetails.title,
          movieLanguage: movieDetails.language,
          movieImage: movieDetails.imageUrl,
          theatreId: showTimeDetails.theatreId,
          theatreName: theatreDetails.name,
          theatreLocation: theatreDetails.location,
          showTimeDate: showTimeDetails.date,
          showTimeTime: showTimeDetails.time,
          bookingDate: new Date().toISOString(),
          totalamount: seats.length * showTimeDetails.price, // Assume each seat has the same price
          seats: seatDetails
        });
        console.log("Seaaats",bookingDetails.seats);
      } catch (error) {
        console.error('Error fetching details:', error.message);
        setMessage(`Failed to fetch details: ${error.message}`);
      }
    };

    fetchDetails();
  }, [showTimeId, seats]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingPayload = {
      ...bookingDetails,
      showTimeId,
      seatIds: seats.map(seat => seat.id), // Assuming seat object contains id
      status: 'booked'
    };
    console.log(bookingPayload);

    try {
      const response = await axios.post('http://localhost:8000/bookings', bookingPayload);
      setMessage('Booking successful!');
      console.log('Booking response:', response.data);
      // Navigate to the booking confirmation page
      navigate('/bookingconfirmation', { state: { bookingDetails: response.data } });
    } catch (error) {
      console.error('Error booking seats:', error.message);
      setMessage(`Failed to book seats: ${error.message}`);
    }
  };

  return (
    <div className="bookings-container">
      <h2>Booking Summary</h2>
      {message && <p>{message}</p>}
      <div className="bookings-card">
        <div className="bookings-header">
          <div className='bookings-section movies-info'>
               <h3>Movie Information</h3>
              <p><strong>Movie:</strong> {bookingDetails.movieTitle}</p>
              <p><strong>Language:</strong> {bookingDetails.movieLanguage}</p>
          </div>
          <div className='bookings-section theatres-info'>
            <h3>Theatre Information</h3>
            <p><strong>Theatre:</strong> {bookingDetails.theatreName}</p>
            <p><strong>Location:</strong> {bookingDetails.theatreLocation}</p>
          </div>
        </div>
        <div className="bookings-section users-info">
          <h3>User Information</h3>
          <p><strong>User ID:</strong> {bookingDetails.userId}</p>
          <p><strong>User Name:</strong> {bookingDetails.userName}</p>
        </div>
        <div className="bookings-section showtimes-info">
          <h3>ShowTime Information</h3>
          <p><strong>Show Date:</strong> {bookingDetails.showTimeDate}</p>
          <p><strong>Show Time:</strong> {bookingDetails.showTimeTime}</p>
        </div>
        <div className="bookings-section seats-info">
          <h3>Seats Information</h3>
          <p><strong>Seats:</strong> {bookingDetails.seats.map(seat => `${seat.id} (${seat.seatNumber})`).join(', ')}</p>
        </div>
        <div className="bookings-section payments-info">
          <h3>Payment Information</h3>
          <p><strong>Booking Date:</strong> {new Date(bookingDetails.bookingDate).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ${bookingDetails.totalamount.toFixed(2)}</p>
        </div>
        <button type="submit" onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default Booking;
