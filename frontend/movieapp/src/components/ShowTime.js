import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Showtimes.css';

function ShowTimes() {
  const { id } = useParams(); // movieId from URL
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/showtimes/${id}`);
        setShowtimes(response.data.showtimes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movies/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchShowTimes();
    fetchMovieDetails();
  }, [id]);

  const handleViewSeats = (showtimeId) => {
    navigate(`/showtimes/${showtimeId}/seats`);
  };

  if (loading) return <p>Loading showtimes...</p>;
  if (error) return <p>Error loading showtimes: {error}</p>;
  if (!showtimes.length) return <p>No showtimes available.</p>;

  return (
    <div className="showtimes-container">
      <h2>Showtimes</h2>
      <ul className="showtimes-list">
        {showtimes.map(showtime => (
          <li key={showtime.id} className="showtime-item">
            <div className="showtime-content">
              {movie && (
                <div className="showtime-image">
                  <img src={movie.imageUrl} alt={movie.title} />
                </div>
              )}
              <div className="showtime-details">
                <p><strong>Theatre:</strong> {showtime.Theatre.name}</p>
                <p><strong>Location:</strong> {showtime.Theatre.location}</p>
                <p><strong>Date:</strong> {showtime.date}</p>
                <p><strong>Time:</strong> {showtime.time}</p>
                <p><strong>Price:</strong> ${showtime.price}</p>
                <p><strong>View Type:</strong> {showtime.viewType}</p>
                <p><strong>Total Seats:</strong> {showtime.totalSeats}</p>
              </div>
            </div>
            <div className="view-seats-button-container">
              <button
                className="view-seats-button"
                onClick={() => handleViewSeats(showtime.id)}
              >
                View Seats
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowTimes;
