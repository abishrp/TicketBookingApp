import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation('/admin/movies')}>Movies</button>
        <button onClick={() => handleNavigation('/admin/theatres')}>Theatres</button>
        <button onClick={() => handleNavigation('/admin/showtimes')}>Showtimes</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
