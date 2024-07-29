import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShowtimeOptions.css';

const ShowtimeOptions = () => {
  return (
    <div className="showtime-options-container">
      <h2>Showtime Management</h2>
      <div className="options">
        <Link to="add">
          <button>Add Showtime</button>
        </Link>
        <Link to="update">
          <button>Update Showtime</button>
        </Link>
        <Link to="delete">
          <button>Delete Showtime</button>
        </Link>
      </div>
    </div>
  );
};

export default ShowtimeOptions;
