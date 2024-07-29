import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MovieList.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies');
        setMovies(response.data.movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  return (
    <div className="movie-list">
      <h2>Featured Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.releaseYear}</p>
              <a href={`/movies/${movie.id}`} className="book-button">Book Now</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
