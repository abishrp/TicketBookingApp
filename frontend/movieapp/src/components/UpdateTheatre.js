import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UpdateTheatre.css';

const UpdateTheatre = () => {
  const [theatreId, setTheatreId] = useState('');
  const [theatreDetails, setTheatreDetails] = useState({
    name: '',
    location: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheatreDetails({ ...theatreDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/theatres/${theatreId}`, theatreDetails, {
        headers: {
          Authorization: token,
        },
      });

      console.log('Response:', response.data);
      setMessage('Theatre updated successfully');
      setTheatreId('');
      setTheatreDetails({
        name: '',
        location: '',
      });
    } catch (error) {
      console.error('Error updating theatre:', error.response?.data || error.message);
      setMessage('Failed to update theatre');
    }
  };

  return (
    <div className="update-theatre-container">
      <h2>Update Theatre</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Theatre ID"
          value={theatreId}
          onChange={(e) => setTheatreId(e.target.value)}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={theatreDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={theatreDetails.location}
          onChange={handleChange}
        />
        <button type="submit">Update Theatre</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateTheatre;
