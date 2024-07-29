import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DeleteMovie.css';

const DeleteMovie = () => {
  const [movieId, setMovieId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMovieId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const response = await axios.delete(`http://localhost:8000/movies/${movieId}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessage('Movie deleted successfully');
      setMovieId('');
    } catch (error) {
      console.error('Error deleting movie:', error);
      setMessage('Failed to delete movie');
    }
  };

  return (
    <div className="delete-movie-container">
      <h2>Delete Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={handleChange}
          required
        />
        <button type="submit">Delete Movie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteMovie;
