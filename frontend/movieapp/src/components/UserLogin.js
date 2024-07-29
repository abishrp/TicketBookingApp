import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/UserLogin.css';

const UserLogin = () => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/users/login', userDetails);

            console.log('Response:', response.data);
            setMessage('Login successful');
            localStorage.setItem('userToken', response.data.token); // Store token
            navigate('/profile'); // Navigate to the profile page or any other page after login
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            setMessage(`Failed to login: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="user-login-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>New user? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default UserLogin;
