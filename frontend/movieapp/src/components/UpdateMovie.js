import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UpdateMovie.css';

const UpdateMovie = () => {
  const [movieId, setMovieId] = useState('');
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    imageUrl: '',
    description: '',
    releaseYear: '',
    director: '',
    genre: '',
    language: '',
    duration: '',
    cast: '',
    censorRating: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({ ...movieDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      // Ensure cast is an array
      const formattedDetails = {
        ...movieDetails,
        cast: movieDetails.cast.split(',').map(c => c.trim()), // Convert cast to array
      };

      // Debugging: Log the request details
      console.log('Updating movie with details:', formattedDetails);

      const response = await axios.put(`http://localhost:8000/movies/${movieId}`, formattedDetails, {
        headers: {
          Authorization: token,
        },
      });

      console.log('Response:', response.data);
      setMessage('Movie updated successfully');
      setMovieId('');
      setMovieDetails({
        title: '',
        imageUrl: '',
        description: '',
        releaseYear: '',
        director: '',
        genre: '',
        language: '',
        duration: '',
        cast: '',
        censorRating: '',
      });
    } catch (error) {
      console.error('Error updating movie:', error.response?.data || error.message);
      setMessage('Failed to update movie');
    }
  };

  return (
    <div className="update-movie-container">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieDetails.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={movieDetails.imageUrl}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={movieDetails.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          placeholder="Release Year"
          value={movieDetails.releaseYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieDetails.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={movieDetails.genre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieDetails.language}
          onChange={handleChange}
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={movieDetails.duration}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cast"
          placeholder="Cast (comma separated)"
          value={movieDetails.cast}
          onChange={handleChange}
        />
        <input
          type="text"
          name="censorRating"
          placeholder="Censor Rating"
          value={movieDetails.censorRating}
          onChange={handleChange}
        />
        <button type="submit">Update Movie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateMovie;
