import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/register', { name, dob, email, password });
      setMessage('OTP sent to your email. Please verify.');
      // Navigate to the OTP verification page and pass the email and password
      navigate('/verifyotp', { state: { name, dob, email, password } });
    } catch (error) {
      console.error(error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="auth-input"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
          className="auth-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button type="submit" className="auth-button">Register</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
