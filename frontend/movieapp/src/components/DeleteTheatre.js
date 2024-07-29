import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DeleteTheatre.css';

const DeleteTheatre = () => {
  const [theatreId, setTheatreId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/theatres/${theatreId}`, {
        headers: {
          Authorization: token,
        },
      });

      console.log('Response:', response.data);
      setMessage('Theatre deleted successfully');
      setTheatreId('');
    } catch (error) {
      console.error('Error deleting theatre:', error.response?.data || error.message);
      setMessage('Failed to delete theatre');
    }
  };

  return (
    <div className="delete-theatre-container">
      <h2>Delete Theatre</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Theatre ID"
          value={theatreId}
          onChange={(e) => setTheatreId(e.target.value)}
          required
        />
        <button type="submit">Delete Theatre</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteTheatre;
