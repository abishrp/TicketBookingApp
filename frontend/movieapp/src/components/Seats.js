import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Seats.css';

function Seats() {
  const { showTimeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { movieId } = location.state || { movieId: null };

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/seats/showtimes/${showTimeId}`);
        console.log(response.data);
        setSeats(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showTimeId]);

  const handleSeatClick = (seatId) => {
    console.log(seatId);
    
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const handleBookSeats = () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const bookingDate = new Date().toISOString();
      const userId = parseJwt(userToken).id; // Assuming JWT has user ID in payload

      navigate('/booking', { 
        state: { 
          showTimeId, 
          movieId, 
          seats: selectedSeats, 
          bookingDate, 
          userId 
        } 
      });
    } else {
      alert('User not logged in');
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  if (loading) return <p>Loading seats...</p>;
  if (error) return <p>Error loading seats: {error}</p>;
  if (!seats.length) return <p>No seats available.</p>;

  return (
    <div className="seats-container">
      <h2>Seats</h2>
      <ul className="seats-list">
        {seats.map(seat => (
          <li key={seat.id} className={`seat-item ${seat.isAvailable ? 'available' : 'booked'}`}>
            <button 
              className={`seat-button ${selectedSeats.includes(seat.id) ? 'selected' : ''}`} 
              onClick={() => handleSeatClick(seat.id)}
              disabled={!seat.isAvailable}
            >
              {seat.seatNumber}
            </button>
          </li>
        ))}
      </ul>
      <button className="book-seats-button" onClick={handleBookSeats} disabled={!selectedSeats.length}>
        Book Seats
      </button>
    </div>
  );
}

export default Seats;
