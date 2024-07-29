import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleEdit = () => {
        navigate('/edit-profile');
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {profile.user.name}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Date of Birth:</strong> {formatDate(profile.user.dob)}</p>
            {message && <p>{message}</p>}
            <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>
    );
};

export default Profile;
