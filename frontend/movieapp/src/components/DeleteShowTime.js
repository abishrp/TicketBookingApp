import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DeleteShowtime.css';

const DeleteShowtime = () => {
  const [showtimeId, setShowtimeId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setShowtimeId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/showtimes/${showtimeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response.data);
      setMessage('Showtime deleted successfully');
      navigate('/showtime-options'); // Navigate back to showtime options
    } catch (error) {
      console.error('Error deleting showtime:', error.response?.data || error.message);
      setMessage('Failed to delete showtime');
    }
  };

  return (
    <div className="delete-showtime-container">
      <h2>Delete Showtime</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="showtimeId"
          placeholder="Showtime ID"
          value={showtimeId}
          onChange={handleChange}
          required
        />
        <button type="submit">Delete Showtime</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteShowtime;
