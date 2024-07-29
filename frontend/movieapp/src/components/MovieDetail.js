import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/movies/${id}`);
        setMovie(response.data.movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>Error loading movie details: {error}</p>;
  if (!movie) return <p>No movie found.</p>;

  const handleViewShowtimes = () => {
    navigate(`/movies/${id}/showtimes`, { state: { movieId: movie.id } });
  };

  return (
    <>
      <div className="movie-detail">
        <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Duration:</strong> {movie.duration} minutes</p>
          <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
          <p><strong>Censor Rating:</strong> {movie.censorRating}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
      </div>
      <div className="booking-button-container">
        <button className="view-showtimes-button" onClick={handleViewShowtimes}>View Showtimes</button>
      </div>
    </>
  );
}

export default MovieDetail;
