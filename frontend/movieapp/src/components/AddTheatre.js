import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddTheatre.css';

const AddTheatre = () => {
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
      const response = await axios.post('http://localhost:8000/theatres', theatreDetails, {
        headers: {
          Authorization: token,
        },
      });

      console.log('Response:', response.data);
      setMessage('Theatre added successfully');
      setTheatreDetails({
        name: '',
        location: '',
      });
    } catch (error) {
      console.error('Error adding theatre:', error.response?.data || error.message);
      setMessage('Failed to add theatre');
    }
  };

  return (
    <div className="add-theatre-container">
      <h2>Add Theatre</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={theatreDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={theatreDetails.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Theatre</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTheatre;
