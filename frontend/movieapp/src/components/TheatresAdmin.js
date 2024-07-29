import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminOptions.css';

function TheatresAdmin() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-options">
      <h1>Manage Theatres</h1>
      <div className="button-container">
        <button onClick={() => handleNavigation('/admin/theatres/add')}>Add Theatre</button>
        <button onClick={() => handleNavigation('/admin/theatres/delete')}>Delete Theatre</button>
        <button onClick={() => handleNavigation('/admin/theatres/update')}>Update Theatre</button>
      </div>
    </div>
  );
}

export default TheatresAdmin;
