import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        
        // Fetch movie ID by title
        const response = await axios.get(`http://localhost:8000/movies`, {
          params: { title: searchQuery.trim() }
          
        });
        console.log(response.data.movie);
        if (response.data.movie) {
          const movieId = response.data.movie.id;
          navigate(`/movies/${movieId}`);
        } else {
          console.error('Movie not found');
          // Optionally show a user-friendly message
        }
      } catch (error) {
        console.error('Error fetching movie by title:', error);
        // Handle error, e.g., show a message to the user
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">MovieApp</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
        </ul>
      </div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="nav-right">
        <ul className="nav-links">
          <li><Link to="/userlogin">Login</Link></li>
          <li><Link to="/admin-login">Admin Login</Link></li> 
          <li><Link to="/profile">Profile</Link></li> 
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
