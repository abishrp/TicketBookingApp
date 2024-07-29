import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UpdateShowtime.css';

const UpdateShowtime = () => {
  const [showtimeDetails, setShowtimeDetails] = useState({
    id: '',
    movieId: '',
    theatreId: '',
    date: '',
    time: '',
    price: '',
    viewType: '2D',
    totalSeats: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowtimeDetails({ ...showtimeDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/showtimes/${showtimeDetails.id}`, showtimeDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response.data);
      setMessage('Showtime updated successfully');
      navigate('/showtime-options'); // Navigate back to showtime options
    } catch (error) {
      console.error('Error updating showtime:', error.response?.data || error.message);
      setMessage('Failed to update showtime');
    }
  };

  return (
    <div className="update-showtime-container">
      <h2>Update Showtime</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Showtime ID"
          value={showtimeDetails.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="movieId"
          placeholder="Movie ID"
          value={showtimeDetails.movieId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="theatreId"
          placeholder="Theatre ID"
          value={showtimeDetails.theatreId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="date"
          placeholder="Date (YYYY-MM-DD)"
          value={showtimeDetails.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time (HH:MM)"
          value={showtimeDetails.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={showtimeDetails.price}
          onChange={handleChange}
          required
        />
        <select
          name="viewType"
          value={showtimeDetails.viewType}
          onChange={handleChange}
          required
        >
          <option value="2D">2D</option>
          <option value="3D">3D</option>
        </select>
        <input
          type="text"
          name="totalSeats"
          placeholder="Total Seats"
          value={showtimeDetails.totalSeats}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Showtime</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateShowtime;
