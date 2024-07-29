import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/OtpVerify.css"

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { name, dob, email, password } = location.state || {};

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/verifyotp', { name, dob, email, password, otp });
      setMessage('Email verified successfully! You can now log in.');
      // Redirect to login page
      setTimeout(() => navigate('/userlogin'), 2000);
    } catch (error) {
      console.error(error);
      setMessage('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleVerify} className="auth-form">
        <h2>Verify OTP</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="auth-input"
          readOnly
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="auth-input"
        />
        <button type="submit" className="auth-button">Verify</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default OtpVerify;
