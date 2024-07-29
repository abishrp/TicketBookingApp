import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/TheatreList.css';

function TheatreList() {
  const { id } = useParams();
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        // Fetch theatres for the movie
        const response = await axios.get(`http://localhost:8000/movies/${id}/theatres`);
        setTheatres(response.data.theatres);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTheatres();
  }, [id]);

  if (loading) return <p>Loading theatres...</p>;
  if (error) return <p>Error loading theatres: {error}</p>;

  if (theatres.length === 0) return <p>No theatres found.</p>;

  return (
    <div className="theatre-list">
      <h1>Theatres for {id}</h1>
      <ul>
        {theatres.map((theatre) => (
          <li key={theatre.id}>
            <h2>{theatre.name}</h2>
            <p>{theatre.address}</p>
            <button className="book-tickets-button">Book Tickets</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TheatreList;
