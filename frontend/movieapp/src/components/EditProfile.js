import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        dob: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://localhost:8000/users/profile', {
                    headers: { Authorization: token },
                });

                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);
                setMessage(`Failed to fetch profile: ${error.response?.data?.error || error.message}`);
            }
        };

        fetchProfile(); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('userToken');
            await axios.put('http://localhost:8000/users/update-profile', profile, {
                headers: { Authorization: token },
            });

            setMessage('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            setMessage(`Failed to update profile: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={profile.dob ? profile.dob.split('T')[0] : ''} // Format date to yyyy-mm-dd
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={profile.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Profile</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditProfile;
