import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddMovie.css';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [cast, setCast] = useState('');
  const [censorRating, setCensorRating] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken'); // Ensure token is fetched correctly

    if (!token) {
      setMessage('No token found. Please log in as admin.');
      return;
    }

    const newMovie = {
      title,
      imageUrl,
      description,
      releaseYear,
      director,
      genre,
      language,
      duration,
      cast: cast.split(','), // Assuming cast is a comma-separated string
      censorRating,
    };

    try {
      const response = await axios.post('http://localhost:8000/movies', newMovie, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
        <input type="text" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} required />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <input type="text" placeholder="Cast (comma-separated)" value={cast} onChange={(e) => setCast(e.target.value)} required />
        <input type="text" placeholder="Censor Rating" value={censorRating} onChange={(e) => setCensorRating(e.target.value)} required />
        <button type="submit">Add Movie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddMovie;
