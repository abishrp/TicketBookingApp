import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminOptions.css';

function MoviesAdmin() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-options">
      <h1>Manage Movies</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation('/admin/movies/add')}>Add Movie</button>
        <button onClick={() => handleNavigation('/admin/movies/delete')}>Delete Movie</button>
        <button onClick={() => handleNavigation('/admin/movies/update')}>Update Movie</button>
      </div>
    </div>
  );
}

export default MoviesAdmin;
